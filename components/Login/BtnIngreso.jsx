import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { layout } from "./styles";
import React from "react";

function Ingresar({ navigation }) {
	return (
		<LinearGradient
			colors={[COLORS.naranja, COLORS.rojo]}
			style={layout.buttonContainer}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
		>
			<TouchableOpacity
				style={layout.button}
				onPress={() => navigation.replace("Welcome")}
			>
				<Text style={layout.buttonText}>Ingresar</Text>
			</TouchableOpacity>
		</LinearGradient>
	);
}

export default Ingresar;
