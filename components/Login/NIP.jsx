import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { handleTextChange } from "./textCheck";
import { layout } from "./styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Icon from "../Home/icons";

function NIP({nip, setNip, placeholder = null}) {
	const [isNipShown, setIsNipShown] = useState(true);

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={layout.fieldContainer}>
			<View style={[layout.iconBox, { backgroundColor: COLORS.secondary }]}>
				<Icon name="PASSWORD" size={26} style={layout.icon} />
			</View>
			<View style={layout.field}>
				<TextInput
					placeholder={placeholder ? placeholder : "NIP"}
					placeholderTextColor={COLORS.placeholder}
					keyboardType="number-pad"
					inputMode="numeric"
					maxLength={6}
					value={nip}
					onChangeText={(text) => handleTextChange(text, setNip)}
					secureTextEntry={isNipShown}
					style={layout.userInput}
				/>
				<TouchableOpacity
					onPress={() => setIsNipShown(!isNipShown)}
					style={layout.passEye}
				>
					{isNipShown == true ? (
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
