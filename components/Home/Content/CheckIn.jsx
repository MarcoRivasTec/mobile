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

import { opiniones } from "./styles";
import ContentHeader from "./ContentHeader";
import Working from "./Design/Working";
import Confirm from "./Design/Confirm";

import { HomeContext } from "../../HomeContext";
import { AppContext } from "../../AppContext";
import fetchPost from "../../fetching";

// Adjust this path if your fetchPost helper lives somewhere else.

const DEVICE_ID_KEY = "@tecma_checkin_device_id";

const MAX_LOCATION_ACCURACY_METERS = 75;

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
				id
				type
				registeredAt
				geofenceName
				latitude
				longitude
				accuracy
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
		return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chihuahua";
	} catch {
		return "America/Chihuahua";
	}
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

function InfoRow({ label, value, valueStyle }) {
	return (
		<View style={opiniones.infoRow}>
			<Text style={opiniones.infoLabel}>{label}</Text>
			<Text style={[opiniones.infoValue, valueStyle]}>{value}</Text>
		</View>
	);
}

export default function CheckIn() {
	const { accessToken } = useContext(HomeContext);
	const { appVersion } = useContext(AppContext);

	const [isWorking, setIsWorking] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const [locationSnapshot, setLocationSnapshot] = useState(null);
	const [lastStatus, setLastStatus] = useState("Listo para validar ubicación");
	const [confirmData, setConfirmData] = useState({
		title: "Check-in exitoso",
		text: "Tu entrada fue registrada correctamente.",
	});

	const pulse = useRef(new Animated.Value(0)).current;

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

	async function buildCheckInPayload(coords) {
		const deviceId = await getOrCreateDeviceId();

		return {
			type: "CHECK_IN",
			latitude: Number(coords.latitude),
			longitude: Number(coords.longitude),
			accuracy: coords.accuracy !== undefined ? Number(coords.accuracy) : null,
			// altitude: coords.altitude !== undefined ? coords.altitude : null,
			// heading: coords.heading !== undefined ? coords.heading : null,
			// speed: coords.speed !== undefined ? coords.speed : null,
			timestamp: new Date().toISOString(),
			timezone: getTimezone(),
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

	function updateLocalLocationSnapshot(coords) {
		const distance = haversineDistance(
			coords.latitude,
			coords.longitude,
			FENCE_CENTER.latitude,
			FENCE_CENTER.longitude,
		);

		const isInsideLocalFence = distance <= FENCE_RADIUS_METERS;

		setLocationSnapshot({
			latitude: coords.latitude,
			longitude: coords.longitude,
			accuracy: coords.accuracy,
			distance,
			isInsideLocalFence,
			checkedAt: new Date(),
		});

		return {
			distance,
			isInsideLocalFence,
		};
	}

	async function handleCheckIn() {
		if (isWorking) return;

		if (!accessToken) {
			Alert.alert(
				"Sesión no válida",
				"No se encontró una sesión activa. Inicia sesión nuevamente.",
			);
			return;
		}

		try {
			setIsWorking(true);

			const coords = await getCurrentCoords();
			const localValidation = updateLocalLocationSnapshot(coords);

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

			const payload = await buildCheckInPayload(coords);

			console.log("CheckIn payload:", JSON.stringify(payload, null, 2));

			setLastStatus("Enviando check-in...");

			const result = await sendCheckInToApi(payload);

			if (!result) {
				throw new Error("EMPTY_API_RESPONSE");
			}

			if (result.success === true) {
				setLastStatus("Check-in registrado");

				setConfirmData({
					title: "Check-in exitoso",
					text:
						result.message ||
						(localValidation.isInsideLocalFence
							? "Estás dentro del área permitida."
							: "Tu ubicación fue enviada para validación."),
				});

				setIsConfirmVisible(true);
				return;
			}

			setLastStatus(result.status || "Check-in rechazado");

			Alert.alert(
				"Check-in no registrado",
				result.message || "No fue posible registrar tu check-in.",
			);
		} catch (error) {
			console.error("CheckIn error:", error);

			if (error.message === "LOCATION_PERMISSION_DENIED") {
				setLastStatus("Permiso de ubicación denegado");

				Alert.alert(
					"Permiso requerido",
					"Necesitas permitir el acceso a tu ubicación para hacer check-in.",
				);

				return;
			}

			setLastStatus("Error al registrar check-in");

			Alert.alert(
				"Error",
				"No se pudo registrar el check-in. Intenta nuevamente.",
			);
		} finally {
			setIsWorking(false);
		}
	}

	const accuracyIsGood =
		locationSnapshot?.accuracy !== null &&
		locationSnapshot?.accuracy !== undefined &&
		locationSnapshot.accuracy <= MAX_LOCATION_ACCURACY_METERS;

	const localFenceText = !locationSnapshot
		? "Pendiente"
		: locationSnapshot.isInsideLocalFence
			? "Dentro de zona"
			: "Fuera de zona";

	const lastCheckedText = locationSnapshot?.checkedAt
		? locationSnapshot.checkedAt.toLocaleTimeString("es-MX", {
				hour: "2-digit",
				minute: "2-digit",
			})
		: "Sin validar";

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={opiniones.container}>
				<ContentHeader title="Check In" />

				<View style={opiniones.contentContainer}>
					{/* <View style={opiniones.card}> */}
						<View style={opiniones.headerBlock}>
							<Text style={opiniones.eyebrow}>Control de asistencia</Text>
							<Text style={opiniones.title}>Registrar entrada</Text>
							<Text style={opiniones.subtitle}>
								Validaremos tu ubicación actual antes de enviar el registro.
							</Text>
						</View>

						<View style={opiniones.statusPill}>
							<View style={opiniones.statusDot} />
							<Text style={opiniones.statusText}>{lastStatus}</Text>
						</View>

						<View style={opiniones.infoPanel}>
							<InfoRow
								label="Precisión"
								value={formatMeters(locationSnapshot?.accuracy)}
								valueStyle={
									locationSnapshot
										? accuracyIsGood
											? opiniones.successText
											: opiniones.warningText
										: null
								}
							/>

							<InfoRow
								label="Zona aproximada"
								value={localFenceText}
								valueStyle={
									locationSnapshot
										? locationSnapshot.isInsideLocalFence
											? opiniones.successText
											: opiniones.warningText
										: null
								}
							/>

							<InfoRow
								label="Distancia"
								value={formatMeters(locationSnapshot?.distance)}
							/>

							<InfoRow label="Última validación" value={lastCheckedText} />
						</View>

						<View style={opiniones.actionArea}>
							<Animated.View
								pointerEvents="none"
								style={[
									opiniones.pulseRing,
									{
										opacity: pulseOpacity,
										transform: [{ scale: pulseScale }],
									},
								]}
							/>

							<TouchableOpacity
								onPress={handleCheckIn}
								disabled={isWorking}
								activeOpacity={0.88}
								style={[
									opiniones.checkButton,
									isWorking && opiniones.checkButtonDisabled,
								]}
							>
								<Text style={opiniones.checkButtonIcon}>✓</Text>
								<Text style={opiniones.checkButtonText}>
									{isWorking ? "Validando..." : "Check In"}
								</Text>
							</TouchableOpacity>
						</View>

						{/* <Text style={opiniones.footerText}>
							La validación final será realizada por el servidor.
						</Text> */}
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