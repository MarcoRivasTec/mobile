import { View, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import React, { useContext } from "react";
import { createSetInputValue, handleTextChange } from "./textCheck";
import { layout } from "./styles";
import COLORS from "../../constants/colors";
import Icon from "../Home/icons";
import { AppContext } from "../AppContext";

function User() {
	const { numEmp, setInfoFields } = useContext(AppContext);

	const setNumEmp = createSetInputValue(setInfoFields, "numEmp");

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "padding"}
			style={[layout.fieldContainer, { marginVertical: "0%" }]}
		>
			<View style={[layout.iconBox, { backgroundColor: COLORS.primary }]}>
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
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

export default User;
