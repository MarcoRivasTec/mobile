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
			style={[
				dataModal.picker,
				{
					fontSize: 18,
					color: "black",
					// paddingBottom: 10
					// justifyContent: "center",
					// alignContent: "center",
					// borderWidth: 1,
					// zIndex: 1,
				},
			]}
			mode="dropdown"
			// itemStyle={dataModal.pickerItemStyle}
		>
			{Platform.OS === "android" ? (
				<Picker.Item
					label="Selecciona un tipo"
					style={[dataModal.pickerItem, { color: "red" }]}
					value="Selecciona un tipo"
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
