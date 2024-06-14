import React from "react";
import { Alert, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { yearModal } from "./styles";

function YearPicker({ onCallback, years, selectedYear, setSelectedYear }) {
	return (
		<Picker
			selectedValue={selectedYear}
			onValueChange={(itemValue) => {
				{
					itemValue === "Selecciona el año"
						? Alert.alert(
								"Opción inválida",
								"Debes seleccionar un año",
								[{ text: "Entendido" }]
						  )
						: setSelectedYear(itemValue.year);
					onCallback && onCallback();
				}
			}}
			style={{width: "100%", height: "100%"}}
			itemStyle={yearModal.pickerItemStyle}
		>
			{Platform.OS === "android" ? (
				<Picker.Item
					label="Selecciona el año"
					style={{ color: "gray" }}
					value="Selecciona el año"
				/>
			) : null}
			{years.map((year, index) => (
				<Picker.Item
					key={index}
					label={year.year}
					style={yearModal.pickerItem}
					value={year.year}
				/>
			))}
		</Picker>
	);
}

export default YearPicker;
