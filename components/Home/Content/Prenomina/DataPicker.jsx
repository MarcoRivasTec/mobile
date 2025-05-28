import React from "react";
import { Alert, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { dataModal } from "./styles";

function DataPicker({ onCallback, data, selectedElement, setSelectedElement }) {
	return (
		<Picker
			selectedValue={selectedElement}
			onValueChange={(itemValue) => {
				if (itemValue === "Selecciona un valor") {
					Alert.alert(
						"Opción inválida",
						"Debes seleccionar un un valor",
						[{ text: "Entendido" }]
					);
				} else {
					itemValue = parseInt(itemValue, 10);
					setSelectedElement(itemValue);
				}

				if (onCallback) {
					onCallback();
				}
			}}
			style={{ width: "100%", height: "100%" }}
			itemStyle={dataModal.pickerItemStyle}
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
					style={dataModal.pickerItem}
					value={dataUnit}
				/>
			))}
		</Picker>
	);
}

export default DataPicker;
