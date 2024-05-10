import React from "react";
import { View, Text } from "react-native";
import { area } from "./styles";
import ContentHeader from "./ContentHeader";
import CardRow from "./Design/CardRow";

function Area() {
	const info = {
		puesto: "Técnico De Producción",
		turno: "03-1EP",
		ingreso: "14 de Agosto del 2008",
		nomina: "EXPPOINT",
		supervisor: "Miguel Reyes",
		area: "Printer",
		planta: "Planta 14",
		clasificacion: "Indirecto",
	};

	return (
		<View style={area.container}>
			<ContentHeader title="Área" />
			<View style={area.contentContainer}>
				{/* Title */}
				<View style={area.titleContainer}>
					<Text style={area.titleText}>Información Área</Text>
				</View>
				{/* Identificacion */}
				<View style={area.cardContainer}>
					{/* Card */}
					<View style={area.cardInfoContainer}>
						<CardRow title="Puesto" data={info.puesto} />
						<CardRow title="Turno" data={info.turno} />
						<CardRow title="Ingreso" data={info.ingreso} />
						<CardRow title="Nomina" data={info.nomina} />
						<CardRow title="Supervisor" data={info.supervisor} />
						<CardRow title="Área" data={info.area} />
						<CardRow title="Planta" data={info.planta} />
						<CardRow title="Clasificación" data={info.clasificacion} />
					</View>
				</View>
			</View>
		</View>
	);
}

export default Area;
