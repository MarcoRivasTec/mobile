import React from "react";
import { Alert, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { yearModal } from "./styles";

function DataPicker({ onCallback, data, selectedData, setSelectedData }) {
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
			style={{ width: "100%", height: "100%" }}
			itemStyle={yearModal.pickerItemStyle}
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
					label={dataUnit}
					style={yearModal.pickerItem}
					value={dataUnit}
				/>
			))}
		</Picker>
	);
}

export default DataPicker;
