import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { handleTextChange } from "../Login/textCheck";
import { login } from "./loginStyle";
import COLORS from "../../constants/colors";
import SVGPass from "../../assets/icons/PASSWORD.svg";
import { Ionicons } from "@expo/vector-icons";

function NIP() {
	const [isPasswordShown, setIsPasswordShown] = useState(true);
	const [inputValue, setInputValue] = useState("");

	return (
		<View style={[login.field]}>
			<View style={[login.iconBox, { backgroundColor: COLORS.secondary }]}>
				<SVGPass width="60%" height="60%" style={login.svg} />
			</View>

			<TextInput
				placeholder="NIP"
				placeholderTextColor={COLORS.placeholder}
				keyboardType="number-pad"
				inputMode="numeric"
				maxLength={6}
				value={inputValue}
				onChangeText={(text) => handleTextChange(text, setInputValue)}
				secureTextEntry={isPasswordShown}
				style={login.userInput}
			/>
			<TouchableOpacity
				onPress={() => setIsPasswordShown(!isPasswordShown)}
				style={login.passEye}
			>
				{isPasswordShown == true ? (
					<Ionicons name="eye-off" size={24} color={COLORS.black} />
				) : (
					<Ionicons name="eye" size={24} color={COLORS.black} />
				)}
			</TouchableOpacity>
		</View>
	);
}

export default NIP;
