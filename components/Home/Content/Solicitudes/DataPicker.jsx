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
			{Platform.OS === "android" ? (
				<Picker.Item
					label="Selecciona un valor"
					style={{ color: "gray" }}
					value="Selecciona un valor"
				/>
			) : null}
			<Picker.Item
				label="Matrimonio"
				style={dataModal.pickerItem}
				value="MAT"
			/>
			<Picker.Item
				label="Tramite / Cita"
				style={dataModal.pickerItem}
				value="TRA"
			/>
			<Picker.Item
				label="Asunto Personal"
				style={dataModal.pickerItem}
				value="PER"
			/>
			<Picker.Item
				label="Nacimiento hijo(a)"
				style={dataModal.pickerItem}
				value="NAC"
			/>
		</Picker>
	);
}

export default DataPicker;
