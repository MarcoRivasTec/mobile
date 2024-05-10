import { View, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { handleTextChange } from "./textCheck";
import { layout } from "./styles";
import COLORS from "../../constants/colors";
import Icon from "../Home/icons";

function User() {
	const [inputValue, setInputValue] = useState("");

	return (
		
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[layout.fieldContainer, { marginVertical: "0%" }]}>
			<View style={[layout.iconBox, { backgroundColor: COLORS.primary }]}>
				<Icon name="USER" size={20} style={layout.icon} />
			</View>
			<View style={layout.field}>
				<TextInput
					placeholder="Número de empleado"
					placeholderTextColor={COLORS.placeholder}
					keyboardType="number-pad"
					inputMode="numeric"
					value={inputValue}
					onChangeText={(text) => handleTextChange(text, setInputValue)}
					maxLength={12}
					style={layout.userInput}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

export default User;
