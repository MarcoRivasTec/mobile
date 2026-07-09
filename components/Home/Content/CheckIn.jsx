import React, { useContext, useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
	Animated,
	Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import { checkin as styles } from "./styles";
import ContentHeader from "./ContentHeader";
import Working from "./Design/Working";
import Confirm from "./Design/Confirm";

import { HomeContext } from "../../HomeContext";
import { AppContext } from "../../AppContext";
import fetchPost from "../../fetching";

const DEVICE_ID_KEY = "@tecma_checkin_device_id";

const MAX_LOCATION_ACCURACY_METERS = 75;

const CHECK_IN_TYPE = "CHECK_IN";
const CHECK_OUT_TYPE = "CHECK_OUT";

// Local visual pre-validation only.
// The API should still make the final geofence decision.
const FENCE_CENTER = {
	latitude: 31.621117,
	longitude: -106.448624,
};

const FENCE_RADIUS_METERS = 140;

const HANDLE_CHECK_IN_MUTATION = `
	mutation HandleCheckIn($input: CheckInInput!) {
		handleCheckIn(input: $input) {
			success
			status
			message
			checkIn {
				type
				registeredAt
			}
		}
	}
`;

const TODAY_CHECK_INS_QUERY = `
	query TodayCheckIns {
		TodayCheckIns {
			success
			message
			data {
				date
				timezone
				entrada_1
				salida_1
				entrada_2
				salida_2
				entrada_1_raw
				salida_1_raw
				entrada_2_raw
				salida_2_raw
				serverNow
			}
		}
	}
`;

function createLocalId() {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;
}

function formatMeters(value) {
	if (value === null || value === undefined || Number.isNaN(Number(value))) {
		return "Pendiente";
	}

	return `${Math.round(Number(value))} m`;
}

function getTimezone() {
	try {
		return (
			Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chihuahua"
		);
	} catch {
		return "America/Chihuahua";
	}
}

function hasPunch(value) {
	return value !== null && value !== undefined && String(value).trim() !== "";
}

function formatPunchTime(value) {
	if (!hasPunch(value)) {
		return "--:--";
	}

	const cleanValue = String(value).trim();

	if (/^\d{1,2}:\d{2}/.test(cleanValue)) {
		return cleanValue.slice(0, 5);
	}

	const parsedDate = new Date(cleanValue);

	if (!Number.isNaN(parsedDate.getTime())) {
		return parsedDate.toLocaleTimeString("es-MX", {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	return cleanValue;
}

function getNextPunchAction(checkIns) {
	if (!hasPunch(checkIns?.entrada_1)) {
		return {
			type: CHECK_IN_TYPE,
			label: "Registrar entrada",
			successTitle: "Entrada registrada",
			successText: "Tu entrada fue registrada correctamente.",
		};
	}

	if (!hasPunch(checkIns?.salida_1)) {
		return {
			type: CHECK_OUT_TYPE,
			label: "Registrar salida",
			successTitle: "Salida registrada",
			successText: "Tu salida fue registrada correctamente.",
		};
	}

	if (!hasPunch(checkIns?.entrada_2)) {
		return {
			type: CHECK_IN_TYPE,
			label: "Registrar entrada",
			successTitle: "Entrada registrada",
			successText: "Tu segunda entrada fue registrada correctamente.",
		};
	}

	if (!hasPunch(checkIns?.salida_2)) {
		return {
			type: CHECK_OUT_TYPE,
			label: "Registrar salida",
			successTitle: "Salida registrada",
			successText: "Tu segunda salida fue registrada correctamente.",
		};
	}

	return null;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
	function toRad(x) {
		return (x * Math.PI) / 180;
	}

	const R = 6371000;
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c;
}

async function getOrCreateDeviceId() {
	const existingDeviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);

	if (existingDeviceId) {
		return existingDeviceId;
	}

	const newDeviceId = `tmc-${createLocalId()}`;

	await AsyncStorage.setItem(DEVICE_ID_KEY, newDeviceId);

	return newDeviceId;
}

function PunchTable({ checkIns, isLoading }) {
	const firstEntry = checkIns?.entrada_1;
	const firstExit = checkIns?.salida_1;
	const secondEntry = checkIns?.entrada_2;
	const secondExit = checkIns?.salida_2;

	return (
		<View style={styles.punchTable}>
			<View style={styles.punchHeaderRow}>
				<Text style={[styles.punchHeaderText, styles.punchRoundCell]}>
					Horario
				</Text>
				<Text style={[styles.punchHeaderText, styles.punchCell]}>Entrada</Text>
				<Text style={[styles.punchHeaderText, styles.punchCell]}>Salida</Text>
			</View>

			<View style={styles.punchRow}>
				<View style={styles.punchRoundCell}>
					<Text style={styles.punchRoundText}>1</Text>
				</View>

				<View style={styles.punchCell}>
					<Text
						style={[
							styles.punchTimeText,
							!hasPunch(firstEntry) && styles.pendingText,
						]}
					>
						{isLoading ? "..." : formatPunchTime(firstEntry)}
					</Text>
				</View>

				<View style={styles.punchCell}>
					<Text
						style={[
							styles.punchTimeText,
							!hasPunch(firstExit) && styles.pendingText,
						]}
					>
						{isLoading ? "..." : formatPunchTime(firstExit)}
					</Text>
				</View>
			</View>

			<View style={styles.punchRow}>
				<View style={styles.punchRoundCell}>
					<Text style={styles.punchRoundText}>2</Text>
				</View>

				<View style={styles.punchCell}>
					<Text
						style={[
							styles.punchTimeText,
							!hasPunch(secondEntry) && styles.pendingText,
						]}
					>
						{isLoading ? "..." : formatPunchTime(secondEntry)}
					</Text>
				</View>

				<View style={styles.punchCell}>
					<Text
						style={[
							styles.punchTimeText,
							!hasPunch(secondExit) && styles.pendingText,
						]}
					>
						{isLoading ? "..." : formatPunchTime(secondExit)}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default function CheckIn() {
	const { accessToken } = useContext(HomeContext);
	const { appVersion } = useContext(AppContext);

	const [isWorking, setIsWorking] = useState(false);
	const [isLoadingCheckIns, setIsLoadingCheckIns] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const [todayCheckIns, setTodayCheckIns] = useState(null);
	const [lastStatus, setLastStatus] = useState("Cargando checadas del día...");
	const [confirmData, setConfirmData] = useState({
		title: "Entrada registrada",
		text: "Tu entrada fue registrada correctamente.",
	});

	const pulse = useRef(new Animated.Value(0)).current;

	const nextPunchAction = getNextPunchAction(todayCheckIns);
	const isDayComplete = !nextPunchAction;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(pulse, {
					toValue: 1,
					duration: 1300,
					useNativeDriver: true,
				}),
				Animated.timing(pulse, {
					toValue: 0,
					duration: 0,
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();

		return () => animation.stop();
	}, [pulse]);

	useEffect(() => {
		if (!accessToken) return;

		loadTodayCheckIns();
	}, [accessToken]);

	const pulseScale = pulse.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 1.55],
	});

	const pulseOpacity = pulse.interpolate({
		inputRange: [0, 1],
		outputRange: [0.35, 0],
	});

	function confirmationModalHandler() {
		setIsConfirmVisible(false);
	}

	async function getCurrentCoords() {
		setLastStatus("Solicitando permiso de ubicación...");

		const permission = await Location.requestForegroundPermissionsAsync();

		if (permission.status !== "granted") {
			throw new Error("LOCATION_PERMISSION_DENIED");
		}

		setLastStatus("Obteniendo ubicación actual...");

		const currentLocation = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.Highest,
			mayShowUserSettingsDialog: true,
		});

		return currentLocation.coords;
	}

	function getLocalLocationValidation(coords) {
		const distance = haversineDistance(
			coords.latitude,
			coords.longitude,
			FENCE_CENTER.latitude,
			FENCE_CENTER.longitude,
		);

		return {
			distance,
			isInsideLocalFence: distance <= FENCE_RADIUS_METERS,
		};
	}

	async function buildCheckInPayload(coords, type) {
		const deviceId = await getOrCreateDeviceId();

		return {
			type,
			latitude: Number(coords.latitude),
			longitude: Number(coords.longitude),
			accuracy: coords.accuracy !== undefined ? Number(coords.accuracy) : null,
			clientTimestamp: new Date().toISOString(),
			clientTimezone: getTimezone(),
			deviceId,
			platform: Platform.OS,
			appVersion: appVersion ? String(appVersion) : null,
			idempotencyKey: createLocalId(),
		};
	}

	async function sendCheckInToApi(input) {
		const query = {
			query: HANDLE_CHECK_IN_MUTATION,
			variables: {
				input,
			},
		};

		const response = await fetchPost({
			query,
			token: accessToken,
		});

		return response?.data?.handleCheckIn;
	}

	async function fetchTodayCheckIns() {
		const query = {
			query: TODAY_CHECK_INS_QUERY,
			variables: {
				input: {
					timezone: getTimezone(),
				},
			},
		};

		const response = await fetchPost({
			query,
			token: accessToken,
		});

		// console.log("Today check-ins response:", JSON.stringify(response, null, 2));

		const result = response?.data?.TodayCheckIns;

		if (response?.errors?.length) {
			console.error("Today check-ins GraphQL errors:", response.errors);
			throw new Error(response.errors[0]?.message || "GRAPHQL_ERROR");
		}

		if (!result) {
			throw new Error("EMPTY_TODAY_CHECK_INS_RESPONSE");
		}

		if (result.success === false) {
			throw new Error(result.message || "TODAY_CHECK_INS_REJECTED");
		}

		return result.data;
	}

	async function loadTodayCheckIns(options = {}) {
		const { silent = false } = options;

		if (!accessToken) return;

		try {
			if (!silent) {
				setIsLoadingCheckIns(true);
			}

			const checkIns = await fetchTodayCheckIns();

			setTodayCheckIns(checkIns);

			const nextAction = getNextPunchAction(checkIns);

			if (nextAction) {
				setLastStatus(`Listo para ${nextAction.label.toLowerCase()}`);
			} else {
				setLastStatus("Registros completos del día");
			}
		} catch (error) {
			console.error("Today check-ins error:", error);
			setLastStatus("No se pudieron cargar las checadas");
		} finally {
			if (!silent) {
				setIsLoadingCheckIns(false);
			}
		}
	}

	async function handleCheckIn() {
		if (isWorking || isLoadingCheckIns) return;

		if (!accessToken) {
			Alert.alert(
				"Sesión no válida",
				"No se encontró una sesión activa. Inicia sesión nuevamente.",
			);
			return;
		}

		const currentAction = getNextPunchAction(todayCheckIns);

		if (!currentAction) {
			Alert.alert(
				"Jornada completa",
				"Ya tienes registradas las cuatro checadas del día.",
			);
			return;
		}

		try {
			setIsWorking(true);

			const coords = await getCurrentCoords();
			const localValidation = getLocalLocationValidation(coords);

			if (
				coords.accuracy !== null &&
				coords.accuracy !== undefined &&
				coords.accuracy > MAX_LOCATION_ACCURACY_METERS
			) {
				setLastStatus("Precisión insuficiente");

				Alert.alert(
					"Ubicación poco precisa",
					`La precisión actual es de ${formatMeters(
						coords.accuracy,
					)}. Muévete a un área más abierta e intenta de nuevo.`,
				);

				return;
			}

			setLastStatus("Preparando información...");

			const payload = await buildCheckInPayload(coords, currentAction.type);

			console.log("CheckIn payload:", JSON.stringify(payload, null, 2));

			setLastStatus(
				currentAction.type === CHECK_OUT_TYPE
					? "Enviando salida..."
					: "Enviando entrada...",
			);

			const result = await sendCheckInToApi(payload);

			if (!result) {
				throw new Error("EMPTY_API_RESPONSE");
			}

			if (result.success === true) {
				// console.log("CheckIn success:", JSON.stringify(result, null, 1));

				setLastStatus(
					currentAction.type === CHECK_OUT_TYPE
						? "Salida registrada"
						: "Entrada registrada",
				);

				setConfirmData({
					title: currentAction.successTitle,
					text:
						result.message ||
						(localValidation.isInsideLocalFence
							? currentAction.successText
							: "Tu ubicación fue enviada para validación."),
				});

				// small delay to allow UI update/animation before reloading data
				await new Promise((res) => setTimeout(res, 3000));

				await loadTodayCheckIns({ silent: true });

				setIsConfirmVisible(true);
				return;
			}

			setLastStatus(result.status || "Registro rechazado");

			Alert.alert(
				"Registro no realizado",
				result.message || "No fue posible registrar tu checada.",
			);
		} catch (error) {
			console.error("CheckIn error:", error);

			if (error.message === "LOCATION_PERMISSION_DENIED") {
				setLastStatus("Permiso de ubicación denegado");

				Alert.alert(
					"Permiso requerido",
					"Necesitas permitir el acceso a tu ubicación para registrar tu checada.",
				);

				return;
			}

			setLastStatus("Error al registrar checada");

			Alert.alert(
				"Error",
				"No se pudo registrar la checada. Intenta nuevamente.",
			);
		} finally {
			setIsWorking(false);
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				<ContentHeader title="Check In" />

				<View style={styles.contentContainer}>
					{/* <View style={styles.card}> */}
					<View style={styles.headerBlock}>
						<Text style={styles.eyebrow}>Control de asistencia</Text>
						<Text style={styles.title}>
							{nextPunchAction?.label || "Jornada completa"}
						</Text>
						<Text style={styles.subtitle}>
							Consulta tus checadas del día y registra tu siguiente movimiento.
						</Text>
					</View>

					<View style={styles.statusPill}>
						<View style={styles.statusDot} />
						<Text style={styles.statusText}>{lastStatus}</Text>
					</View>

					<PunchTable checkIns={todayCheckIns} isLoading={isLoadingCheckIns} />

					<View style={styles.actionArea}>
						<Animated.View
							pointerEvents="none"
							style={[
								styles.pulseRing,
								{
									opacity: isDayComplete ? 0 : pulseOpacity,
									transform: [{ scale: pulseScale }],
								},
							]}
						/>

						<TouchableOpacity
							onPress={handleCheckIn}
							disabled={isWorking || isLoadingCheckIns || isDayComplete}
							activeOpacity={0.88}
							style={[
								styles.checkButton,
								(isWorking || isLoadingCheckIns || isDayComplete) &&
									styles.checkButtonDisabled,
							]}
						>
							<Text style={styles.checkButtonIcon}>
								{isDayComplete ? "✓" : "↳"}
							</Text>
							<Text style={styles.checkButtonText}>
								{isWorking
									? "Validando..."
									: isLoadingCheckIns
										? "Cargando..."
										: nextPunchAction?.label || "Completo"}
							</Text>
						</TouchableOpacity>
					</View>

					<Text style={styles.footerText}>
						{isDayComplete ??
							"Ya tienes registradas las cuatro checadas del día."}
					</Text>
					{/* </View> */}
				</View>

				{isWorking && (
					<Working isModalVisible={isWorking} text="Verificando ubicación..." />
				)}

				{isConfirmVisible && (
					<Confirm
						isModalVisible={isConfirmVisible}
						onCallback={confirmationModalHandler}
						onExit={confirmationModalHandler}
						customTitle={confirmData.title}
						customText={confirmData.text}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}
