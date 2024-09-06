import React from "react";
import { Alert, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { modal, layout } from "./styles";

function RegionPicker({ onCallback, region, setRegion }) {
	// const regionHandler = () => {
	//     return region
	// }
	return (
		<Picker
			selectedValue={region}
			onValueChange={(itemValue) => {
				{
					itemValue === "Selecciona"
						? Alert.alert("Opción inválida", "Debes seleccionar una región", [{text: "Entendido"}])
						: setRegion(itemValue);
					onCallback && onCallback();
				}
			}}
			style={layout.picker}
			itemStyle={modal.pickerItemStyle}
		>
			{/* {Platform.OS === "android" ? (
				<Picker.Item
					label="Selecciona la región"
					style={{ color: "gray" }}
					value="Selecciona"
				/>
			) : null} */}
			<Picker.Item
				label="Selecciona la región"
				style={{ color: "gray" }}
				value="Selecciona"
			/>
			<Picker.Item label="Amamex" style={modal.pickerItem} value="AMX" />
			<Picker.Item
				label="Cd. Juárez"
				style={modal.pickerItem}
				value="JRZ"
			/>
			<Picker.Item
				label="Monterrey"
				style={modal.pickerItem}
				value="MTY"
			/>
			<Picker.Item
				label="Monterrey Living Spaces"
				style={modal.pickerItem}
				value="MTYLS"
			/>
			<Picker.Item label="Saltillo" style={modal.pickerItem} value="SALT" />
			<Picker.Item label="Tijuana" style={modal.pickerItem} value="TIJ" />
		</Picker>
	);
}

export default RegionPicker;
