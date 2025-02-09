import {
	View,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
	StatusBar,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
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
import { AppContext } from "../components/AppContext";

const Login = ({ navigation }) => {
	const { platform } = useContext(AppContext);
	// const [nip, setNip] = useState(defPass !== "" ? defPass : "");
	const [nip, setNip] = useState("");
	// const [region, setRegion] = useState(
	// 	defRegion !== "" ? defRegion : "Selecciona"
	// );
	const [region, setRegion] = useState("Selecciona");
	const [checkboxState, setCheckboxState] = useState(false);
	// const [region, setRegion] = useState("Selecciona");
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);

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
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={login.container}>
					{/* Logo */}
					<View
						style={[login.logoContainer, { flex: isInputFocused ? 7 : 10 }]}
					>
						<TecmaMovil />
					</View>

					{/* Content */}
					<KeyboardAvoidingView
						style={login.contentContainer}
						behavior="padding"
						keyboardVerticalOffset={40}
					>
						{/* User */}
						<View style={[layout.fieldContainer, { marginVertical: "0%" }]}>
							<View
								style={[layout.iconBox, { backgroundColor: COLORS.primary }]}
							>
								<Icon name="USER" size={20} style={layout.icon} />
							</View>
							<View style={layout.field}>
								<TextInput
									placeholder="Número de empleado"
									placeholderTextColor={COLORS.placeholder}
									keyboardType="number-pad"
									inputMode="numeric"
									value={numEmp}
									onChangeText={(text) => handleTextChange(text, setNumEmp)}
									maxLength={12}
									style={layout.userInput}
									onFocus={() => setFocus(true)}
									onBlur={() => setFocus(false)}
								/>
							</View>
						</View>
						{/* <User setFocus={setIsInputFocused} /> */}

						{/* NIP */}
						<NIP nip={nip} setNip={setNip} setFocus={setIsInputFocused} />

						
					</KeyboardAvoidingView>

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
