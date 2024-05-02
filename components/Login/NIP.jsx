import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { handleTextChange } from "./textCheck";
import { layout } from "./styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Icon from "../Home/icons";

function NIP() {
	const [isPasswordShown, setIsPasswordShown] = useState(true);
	const [inputValue, setInputValue] = useState("");

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={layout.fieldContainer}>
			<View style={[layout.iconBox, { backgroundColor: COLORS.secondary }]}>
				<Icon name="PASSWORD" size={26} style={layout.icon} />
			</View>
			<View style={layout.field}>
				<TextInput
					placeholder="NIP"
					placeholderTextColor={COLORS.placeholder}
					keyboardType="number-pad"
					inputMode="numeric"
					maxLength={6}
					value={inputValue}
					onChangeText={(text) => handleTextChange(text, setInputValue)}
					secureTextEntry={isPasswordShown}
					style={layout.userInput}
				/>
				<TouchableOpacity
					onPress={() => setIsPasswordShown(!isPasswordShown)}
					style={layout.passEye}
				>
					{isPasswordShown == true ? (
						<Ionicons name="eye-off" size={24} color={COLORS.black} />
					) : (
						<Ionicons name="eye" size={24} color={COLORS.black} />
					)}
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

export default NIP;
