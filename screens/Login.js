import { View, Text, Pressable, ImageBackground } from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";
import Logo from "../components/Logo";
import Region from "../components/Login/Region";
import User from "../components/Login/User";
import NIP from "../components/Login/NIP";
import Ingresar from "../components/Login/BtnIngreso";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { login } from "../components/Login/loginStyle";

const Login = ({ navigation }) => {
	const [checkboxState, setCheckboxState] = React.useState(false);

	return (
		<ImageBackground
			source={require("../assets/backgrounds/FONDOSPLASH.png")}
			style={login.backgroundContainer}
		>
			{/* Logo */}
			<Logo></Logo>

			{/* Content */}
			<View style={login.dataContainer}>
				{/* Region */}
				<Region></Region>

				{/* Num emp */}
				<User></User>

				{/* NIP */}
				<NIP></NIP>

				{/* Checkbox */}
				<View style={login.chkBoxContainer}>
					<BouncyCheckbox
						fillColor={COLORS.second}
						isChecked={checkboxState}
						text="Recordarme"
						textStyle={{ textDecorationLine: "none" }}
						disableBuiltInState
						onPress={() => setCheckboxState(!checkboxState)}
					/>
				</View>

				{/* Boton ingreso */}
				<Ingresar navigation={navigation}></Ingresar>

				{/* Restablecer */}
				<View style={login.restablecerContainer}>
					<Text style={login.restablecerTextIzq}>No recuerdas tu NIP ?</Text>
					<Pressable onPress={() => navigation.navigate("Restablece")}>
						<Text style={login.restablecerTextDer}>Restablécelo</Text>
					</Pressable>
				</View>
			</View>
		</ImageBackground>
	);
};

export default Login;
