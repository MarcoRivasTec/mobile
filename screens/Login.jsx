import {
	View,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
	StatusBar
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { defPass, defRegion } from "../defaultValues";

import TecmaMovil from "../components/Animations/TecmaMovil";
import Region from "../components/Login/Region";
import User from "../components/Login/User";
import NIP from "../components/Login/NIP";
import Ingresar from "../components/Login/BtnIngreso";
import Checkbox from "../components/Login/Checkbox";
import ResetPass from "../components/Login/ResetPass";
import RegionModal from "../components/Login/RegionModal";
import { login } from "./styles";

const Login = ({ navigation }) => {
	// const [nip, setNip] = useState(defPass !== "" ? defPass : "");
	const [nip, setNip] = useState("");
	// const [region, setRegion] = useState(
	// 	defRegion !== "" ? defRegion : "Selecciona"
	// );
	const [region, setRegion] = useState("Selecciona");
	const [checkboxState, setCheckboxState] = useState(false);
	// const [region, setRegion] = useState("Selecciona");
	const [isModalVisible, setIsModalVisible] = useState(false);

	function modalHandler() {
		setIsModalVisible(!isModalVisible);
	}

	useEffect(() => {
		StatusBar.setHidden(true);
		const loadCredentials = async () => {
			try {
				const storedRegion = await AsyncStorage.getItem("storedRegion");
				console.log("Stored region is: ", storedRegion);
				if (storedRegion) setRegion(storedRegion);
			} catch (error) {
				console.error("Failed to load stored employee number: ", error);
			}
		};

		loadCredentials();
	}, []);

	return (
		<ImageBackground
			source={require("../assets/backgrounds/FONDOSPLASH.png")}
			style={login.backgroundContainer}
		>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View style={login.contentContainer}>
					{/* Logo */}
					<View style={login.logoContainer}>
						<TecmaMovil />
					</View>

					{/* Content */}
					<User />

					{/* NIP */}
					<NIP nip={nip} setNip={setNip} />

					<Region
						modalHandler={modalHandler}
						region={region}
						setRegion={setRegion}
					/>

					{/* Checkbox */}
					<Checkbox
						checkboxState={checkboxState}
						setCheckboxState={setCheckboxState}
					/>

					{/* Boton ingreso */}
					<Ingresar
						region={region}
						nip={nip}
						checkboxState={checkboxState}
						navigation={navigation}
					/>

					{/* Restablecer */}
					<ResetPass navigation={navigation} />
				</View>
			</TouchableWithoutFeedback>

			{isModalVisible && (
				<RegionModal
					region={region}
					setRegion={setRegion}
					onCallback={modalHandler}
					isModalVisible={isModalVisible}
				/>
			)}
		</ImageBackground>
	);
};

export default Login;
