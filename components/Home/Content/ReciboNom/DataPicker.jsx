import React from "react";
import { Alert, Platform, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { yearModal } from "./styles";
import COLORS from "../../../../constants/colors";

function DataPicker({ onCallback, data, selectedData, setSelectedData }) {
	const scheme = useColorScheme();
	const isDark = scheme === "dark";

	return (
		<Picker
			selectedValue={selectedData}
			onValueChange={(itemValue) => {
				if (itemValue === "Selecciona un valor") {
					Alert.alert("Opción inválida", "Debes seleccionar un un valor", [
						{ text: "Entendido" },
					]);
				} else {
					setSelectedData(itemValue);
				}

				if (onCallback) {
					onCallback();
				}
			}}
			style={{
				width: "100%",
				height: 220,
				backgroundColor: isDark ? COLORS.flatlistElement1 : "#ffffff",
				color: isDark ? "#ffffff" : "#000000",
			}}
			dropdownIconColor={isDark ? "#ffffff" : COLORS.flatlistElement1}
		>
			{Platform.OS === "android" ? (
				<Picker.Item
					label="Selecciona un valor"
					style={{ color: "gray" }}
					value="Selecciona un valor"
				/>
			) : null}
			{data.map((dataUnit, index) => (
				<Picker.Item
					key={dataUnit}
					label={String(dataUnit)}
					value={dataUnit}
					style={{ fontSize: 20 }}
					color={isDark ? "#ffffff" : "#000000"}
				/>
			))}
		</Picker>
	);
}

export default DataPicker;
