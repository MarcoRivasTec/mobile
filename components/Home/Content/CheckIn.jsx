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
const ZONE_REFRESH_INTERVAL_MS = 3000;
const ZONE_REFRESH_INTERVAL_SECONDS = Math.ceil(
	ZONE_REFRESH_INTERVAL_MS / 1000,
);

const CHECK_IN_TYPE = "CHECK_IN";
const CHECK_OUT_TYPE = "CHECK_OUT";

const HANDLE_CHECK_IN_MUTATION = `
	mutation HandleCheckIn($input: CheckInInput!) {
		handleCheckIn(input: $input) {
			success
			status
			message
			checkIn {
				type
				registeredAt
				geofenceName
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
				punches {
					horario
					entrada
					salida
					entrada_raw
					salida_raw
				}
				serverNow
			}
		}
	}
`;

const CHECK_IN_ZONE_STATUS_QUERY = `
	query CheckInZoneStatus($input: CheckInZoneStatusInput!) {
		CheckInZoneStatus(input: $input) {
			success
			message
			data {
				canCheckIn
				isInsideAllowedZone
				isBypass
				status
				message
				geofenceName
				latitude
				longitude
				accuracy
				maxAccuracy
				checkedAt
			}
		}
	}
`;

function createLocalId() {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;
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

const MAX_PUNCH_ROUNDS = 6;

function getPunchRows(checkIns) {
	if (Array.isArray(checkIns?.punches)) {
		return checkIns.punches;
	}

	return Array.from({ length: MAX_PUNCH_ROUNDS }, (_, index) => {
		const round = index + 1;

		return {
			horario: round,
			entrada: checkIns?.[`entrada_${round}`] || null,
			salida: checkIns?.[`salida_${round}`] || null,
			entrada_raw: checkIns?.[`entrada_${round}_raw`] || null,
			salida_raw: checkIns?.[`salida_${round}_raw`] || null,
		};
	});
}

function getRoundLabel(round) {
	if (round === 1) return "";
	return ` ${round}`;
}

function getLastPunchState(checkIns) {
	const punches = Array.isArray(checkIns?.punches) ? checkIns.punches : [];

	if (!punches.length) {
		return {
			nextLabel: "Registrar checada",
			successTitle: "Checada registrada",
			successText: "Tu checada fue registrada correctamente.",
		};
	}

	const sortedPunches = [...punches].sort(
		(a, b) => Number(a.horario) - Number(b.horario),
	);

	const lastRound = sortedPunches[sortedPunches.length - 1];

	if (hasPunch(lastRound?.entrada) && !hasPunch(lastRound?.salida)) {
		return {
			nextLabel: "Registrar salida",
			successTitle: "Salida registrada",
			successText: "Tu salida fue registrada correctamente.",
		};
	}

	return {
		nextLabel: "Registrar entrada",
		successTitle: "Entrada registrada",
		successText: "Tu entrada fue registrada correctamente.",
	};
}

function getNextPunchAction(checkIns) {
	const state = getLastPunchState(checkIns);

	return {
		type: CHECK_IN_TYPE, // kept only because your current schema requires it
		label: state.nextLabel,
		successTitle: state.successTitle,
		successText: state.successText,
	};
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
	const punches = Array.isArray(checkIns?.punches) ? checkIns.punches : [];

	return (
		<View style={styles.punchTable}>
			<View style={styles.punchHeaderRow}>
				<Text style={[styles.punchHeaderText, styles.punchRoundCell]}>
					Horario
				</Text>
				<Text style={[styles.punchHeaderText, styles.punchCell]}>
					Entrada
				</Text>
				<Text style={[styles.punchHeaderText, styles.punchCell]}>
					Salida
				</Text>
			</View>

			{punches.length === 0 && !isLoading ? (
				<View style={styles.punchRow}>
					<View style={styles.punchRoundCell}>
						<Text style={styles.punchRoundText}>1</Text>
					</View>

					<View style={styles.punchCell}>
						<Text style={[styles.punchTimeText, styles.pendingText]}>
							--:--
						</Text>
					</View>

					<View style={styles.punchCell}>
						<Text style={[styles.punchTimeText, styles.pendingText]}>
							--:--
						</Text>
					</View>
				</View>
			) : (
				punches.map((row) => (
					<View key={`punch-row-${row.horario}`} style={styles.punchRow}>
						<View style={styles.punchRoundCell}>
							<Text style={styles.punchRoundText}>{row.horario}</Text>
						</View>

						<View style={styles.punchCell}>
							<Text
								style={[
									styles.punchTimeText,
									!hasPunch(row.entrada) && styles.pendingText,
								]}
							>
								{isLoading ? "..." : formatPunchTime(row.entrada)}
							</Text>
						</View>

						<View style={styles.punchCell}>
							<Text
								style={[
									styles.punchTimeText,
									!hasPunch(row.salida) && styles.pendingText,
								]}
							>
								{isLoading ? "..." : formatPunchTime(row.salida)}
							</Text>
						</View>
					</View>
				))
			)}
		</View>
	);
}

export default function CheckIn() {
	const { accessToken } = useContext(HomeContext);
	const { appVersion } = useContext(AppContext);

	const [isWorking, setIsWorking] = useState(false);
	const [isLoadingCheckIns, setIsLoadingCheckIns] = useState(false);
	const [isCheckingZone, setIsCheckingZone] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const [todayCheckIns, setTodayCheckIns] = useState(null);
	const [zoneStatus, setZoneStatus] = useState(null);
	const [zoneRefreshSecondsLeft, setZoneRefreshSecondsLeft] = useState(
		ZONE_REFRESH_INTERVAL_SECONDS,
	);
	const [lastStatus, setLastStatus] = useState("Cargando checadas del día...");
	const [confirmData, setConfirmData] = useState({
		title: "Entrada registrada",
		text: "Tu entrada fue registrada correctamente.",
	});

	const pulse = useRef(new Animated.Value(0)).current;
	const zoneRefreshInFlightRef = useRef(false);

	const nextPunchAction = getNextPunchAction(todayCheckIns);
	const isDayComplete = false;
	const canCheckInFromZone = zoneStatus?.canCheckIn === true;

	const canPressCheckButton =
		!isWorking && !isLoadingCheckIns && !isCheckingZone && canCheckInFromZone;

	const shouldPulseButton = canPressCheckButton;

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

		initializeCheckInScreen();
	}, [accessToken]);

	useEffect(() => {
		if (!accessToken) return;

		if (isDayComplete) {
			setZoneRefreshSecondsLeft(0);
			return;
		}

		setZoneRefreshSecondsLeft(ZONE_REFRESH_INTERVAL_SECONDS);

		const intervalId = setInterval(() => {
			setZoneRefreshSecondsLeft((previousValue) => {
				if (previousValue <= 1) {
					refreshZoneStatus({
						silent: true,
						showAlert: false,
						updateFetchingStatus: false,
					});

					return ZONE_REFRESH_INTERVAL_SECONDS;
				}

				return previousValue - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [accessToken, isDayComplete]);

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

	async function initializeCheckInScreen() {
		await loadTodayCheckIns();
		await refreshZoneStatus({
			silent: false,
			showAlert: false,
			updateFetchingStatus: true,
		});
	}

	async function getCurrentCoords(options = {}) {
		const { updateFetchingStatus = true } = options;

		if (updateFetchingStatus) {
			setLastStatus("Solicitando permiso de ubicación...");
		}

		const permission = await Location.requestForegroundPermissionsAsync();

		if (permission.status !== "granted") {
			throw new Error("LOCATION_PERMISSION_DENIED");
		}

		if (updateFetchingStatus) {
			setLastStatus("Obteniendo ubicación actual...");
		}

		const currentLocation = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.Highest,
			mayShowUserSettingsDialog: true,
		});

		return currentLocation.coords;
	}

	async function buildCheckInPayload(coords, type) {
		const deviceId = await getOrCreateDeviceId();

		return {
			type,
			latitude: Number(coords.latitude),
			longitude: Number(coords.longitude),
			accuracy: coords.accuracy !== undefined ? Number(coords.accuracy) : null,
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

	async function fetchCheckInZoneStatus(coords) {
		const query = {
			query: CHECK_IN_ZONE_STATUS_QUERY,
			variables: {
				input: {
					latitude: Number(coords.latitude),
					longitude: Number(coords.longitude),
					accuracy:
						coords.accuracy !== undefined ? Number(coords.accuracy) : null,
				},
			},
		};

		const response = await fetchPost({
			query,
			token: accessToken,
		});

		if (response?.errors?.length) {
			console.error("Check-in zone GraphQL errors:", response.errors);
			throw new Error(response.errors[0]?.message || "ZONE_GRAPHQL_ERROR");
		}

		const result = response?.data?.CheckInZoneStatus;

		if (!result) {
			throw new Error("EMPTY_ZONE_STATUS_RESPONSE");
		}

		if (result.success === false) {
			throw new Error(result.message || "ZONE_STATUS_REJECTED");
		}

		return result.data;
	}

	async function refreshZoneStatus(options = {}) {
		const {
			silent = false,
			showAlert = false,
			updateFetchingStatus = true,
		} = options;

		if (!accessToken || zoneRefreshInFlightRef.current) return null;

		zoneRefreshInFlightRef.current = true;

		try {
			if (!silent) {
				setIsCheckingZone(true);
			}

			const coords = await getCurrentCoords({ updateFetchingStatus });
			const result = await fetchCheckInZoneStatus(coords);

			setZoneStatus(result);
			setZoneRefreshSecondsLeft(ZONE_REFRESH_INTERVAL_SECONDS);

			if (isDayComplete) {
				setLastStatus("Registros completos del día");
			} else if (result.canCheckIn) {
				setLastStatus(
					result.geofenceName && result.geofenceName !== "BYPASS"
						? `Dentro de zona: ${result.geofenceName}`
						: "Dentro de zona permitida",
				);
			} else {
				setLastStatus(result.message || "Fuera de zona permitida");
			}

			return result;
		} catch (error) {
			console.error("Check-in zone status error:", error);

			setZoneStatus(null);

			if (error.message === "LOCATION_PERMISSION_DENIED") {
				setLastStatus("Permiso de ubicación denegado");

				if (showAlert) {
					Alert.alert(
						"Permiso requerido",
						"Necesitas permitir el acceso a tu ubicación para registrar tu checada.",
					);
				}

				return null;
			}

			setLastStatus("No se pudo validar la zona");

			if (showAlert) {
				Alert.alert(
					"Error",
					"No se pudo validar tu ubicación. Intenta nuevamente.",
				);
			}

			return null;
		} finally {
			zoneRefreshInFlightRef.current = false;

			if (!silent) {
				setIsCheckingZone(false);
			}
		}
	}

	async function fetchTodayCheckIns() {
		const query = {
			query: TODAY_CHECK_INS_QUERY,
		};

		const response = await fetchPost({
			query,
			token: accessToken,
		});

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

			if (!zoneStatus) {
				if (nextAction) {
					setLastStatus("Validando zona...");
				} else {
					setLastStatus("Registros completos del día");
				}
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
		if (!canPressCheckButton) return;

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
				"Ya tienes registradas las checadas permitidas del día.",
			);
			return;
		}

		try {
			setIsWorking(true);

			const coords = await getCurrentCoords({ updateFetchingStatus: true });

			setLastStatus("Validando zona...");

			const currentZoneStatus = await fetchCheckInZoneStatus(coords);

			setZoneStatus(currentZoneStatus);

			if (!currentZoneStatus?.canCheckIn) {
				setLastStatus(currentZoneStatus?.message || "Fuera de zona permitida");

				Alert.alert(
					"Fuera de zona",
					currentZoneStatus?.message ||
						"No estás dentro de una zona permitida para registrar tu checada.",
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
				setLastStatus(
					currentAction.type === CHECK_OUT_TYPE
						? "Salida registrada"
						: "Entrada registrada",
				);

				setConfirmData({
					title: currentAction.successTitle,
					text: result.message || currentAction.successText,
				});

				await new Promise((res) => setTimeout(res, 3000));

				await loadTodayCheckIns({ silent: true });
				await refreshZoneStatus({
					silent: true,
					showAlert: false,
					updateFetchingStatus: false,
				});

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
					{/* <View style={styles.headerBlock, { borderWidth: 1, borderColor: "blue"}}> */}
					<View style={styles.headerBlock}>
						<Text style={styles.eyebrow}>Control de asistencia</Text>
						<Text style={styles.title}>
							{nextPunchAction?.label || "Registrar checada"}
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
									opacity: shouldPulseButton ? pulseOpacity : 0,
									transform: [{ scale: pulseScale }],
								},
							]}
						/>

						<TouchableOpacity
							onPress={handleCheckIn}
							disabled={!canPressCheckButton}
							activeOpacity={0.88}
							style={[
								styles.checkButton,
								!canPressCheckButton && styles.checkButtonDisabled,
							]}
						>
							<Text style={styles.checkButtonIcon}>
								{isDayComplete ? "✓" : canCheckInFromZone ? "↳" : "×"}
							</Text>
							<Text style={styles.checkButtonText}>
								{isWorking
									? "Validando..."
									: isLoadingCheckIns
										? "Cargando..."
										: isCheckingZone
											? "Validando zona..."
											: isDayComplete
												? "Completo"
												: canCheckInFromZone
													? nextPunchAction?.label
													: "Fuera de zona"}
							</Text>
						</TouchableOpacity>
					</View>

					<Text style={styles.footerText}>
						{isDayComplete
							? "Ya tienes registradas las checadas permitidas del día."
							: `${
									zoneStatus?.message ||
									"La zona será validada automáticamente antes de registrar la checada."
								} Próxima validación en ${zoneRefreshSecondsLeft}s.`}
					</Text>
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
