import React from "react";
import { Alert, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { dataModal } from "./styles";

function DataPicker({ onCallback, data, selectedElement, setSelectedElement }) {
	return (
		<Picker
			selectedValue={selectedElement}
			onValueChange={(itemValue) => {
				if (itemValue === "Selecciona un tipo") {
					Alert.alert(
						"Opción inválida",
						"Debes seleccionar un tipo de permiso",
						[{ text: "Entendido" }]
					);
				} else {
					setSelectedElement(itemValue);
				}

				if (onCallback) {
					onCallback();
				}
			}}
			style={{ width: "100%", height: "100%" }}
			itemStyle={dataModal.pickerItemStyle}
		>
			<Picker.Item
				label="Selecciona un tipo"
				style={{ color: "gray" }}
				value="Selecciona un tipo"
			/>
			<Picker.Item
				label="Matrimonio"
				style={dataModal.pickerItem}
				value="M"
			/>
			<Picker.Item
				label="Tramite / Cita"
				style={dataModal.pickerItem}
				value="T"
			/>
			<Picker.Item
				label="Asunto Personal"
				style={dataModal.pickerItem}
				value="P"
			/>
			<Picker.Item
				label="Nacimiento hijo(a)"
				style={dataModal.pickerItem}
				value="N"
			/>
		</Picker>
	);
}

export default DataPicker;
