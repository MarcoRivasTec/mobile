import React, { useContext, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { opiniones } from "./styles";
import ContentHeader from "./ContentHeader";
import Working from "./Design/Working";
import Confirm from "./Design/Confirm";
import * as Location from "expo-location"; // ✅ Using Expo Location
import { HomeContext } from "../../HomeContext";
import { AppContext } from "../../AppContext";

export default function CheckIn() {
	const { numEmp } = useContext(HomeContext);
	const { region } = useContext(AppContext);

	const [isWorking, setIsWorking] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const FENCE_CENTER = { latitude: 31.621117, longitude: -106.448624 };
	const FENCE_RADIUS_METERS = 140; 

	function confirmationModalHandler() {
		setIsConfirmVisible(!isConfirmVisible);
	}

	const haversineDistance = (lat1, lon1, lat2, lon2) => {
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
	};

	const handleCheckIn = async () => {
		try {
			setIsWorking(true);

			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setIsWorking(false);
				return Alert.alert("Error", "Permiso de ubicación denegado.");
			}
			const { coords } = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Highest,
			});

			const distance = haversineDistance(
				coords.latitude,
				coords.longitude,
				FENCE_CENTER.latitude,
				FENCE_CENTER.longitude
			);

			setIsWorking(false);

			if (distance <= FENCE_RADIUS_METERS) {
				setIsConfirmVisible(true);
			} else {
				Alert.alert(
					"Fuera de zona",
					"Debes estar dentro del área para hacer check-in."
				);
			}
		} catch (err) {
			setIsWorking(false);
			Alert.alert("Error", "No se pudo obtener la ubicación.");
			console.error(err);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={opiniones.container}>
				<ContentHeader title="Check In" />

				<View style={opiniones.contentContainer}>
					<TouchableOpacity
						onPress={handleCheckIn}
						style={{
							backgroundColor: "#204389",
							padding: 45,
							borderRadius: 8,
							alignItems: "center",
						}}
					>
						<Text style={{ color: "#fff", fontSize: 16, fontFamily: "Montserrat-Regular" }}>Check In</Text>
					</TouchableOpacity>
				</View>

				{isWorking && (
					<Working isModalVisible={isWorking} text="Verificando ubicación..." />
				)}
				{isConfirmVisible && (
					<Confirm
						isModalVisible={isConfirmVisible}
						onCallback={confirmationModalHandler}
						onExit={confirmationModalHandler}
						customTitle={"Check-in exitoso"}
						customText={"Estás dentro del área permitida."}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}
