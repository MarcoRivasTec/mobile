import { View, Text, Pressable } from "react-native";
import { layout } from "./styles";
import React, { useState } from "react";

function ResetPass({ navigation }) {
	return (
		<View style={layout.restablecerContainer}>
			<Text style={layout.restablecerTextIzq}>No recuerdas tu NIP ?</Text>
			<Pressable onPress={() => navigation.navigate("Restablece")}>
				<Text style={layout.restablecerTextDer}>Restablécelo</Text>
			</Pressable>
		</View>
	);
}

export default ResetPass;
