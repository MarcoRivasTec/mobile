import React, { useState } from "react";
import { View, Text } from "react-native";
import { vacaciones } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonTag from "./Buttons/ButtonTag";
import ButtonInfo from "./Buttons/ButtonInfo";
import ButtonAction from "./Buttons/ButtonAction";
import HistorialModal from "./Vacaciones/HistorialModal";

function Vacaciones() {
	const [isModalVisible, setModalVisible] = useState(false);

	function modalHandler() {
		setModalVisible(!isModalVisible);
	}

	return (
		<View style={vacaciones.container}>
			<ContentHeader title="Vacaciones"></ContentHeader>
			<View style={vacaciones.sectionContainer}>
				<View style={vacaciones.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>Antiguedad</Text>
				</View>
				<View style={vacaciones.sectionButtonContainer}>
					<ButtonInfo data="02/05/2020" title="Fecha de Ingreso" />
					<ButtonTag data="2" title="Años de Antigüedad" />
					<ButtonTag data="333" title="Días para siguiente aniversario" />
				</View>
			</View>
			<View style={vacaciones.sectionContainer}>
				<View style={vacaciones.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>Vacaciones</Text>
				</View>
				<View style={vacaciones.sectionButtonContainer}>
					<ButtonTag data="1" title="Días Tomados" />
					<ButtonTag data="2" title="Días Ganados" />
					<ButtonTag data="3" title="Días Disponibles" />
				</View>
			</View>
			<View style={vacaciones.historialContainer}>
				<ButtonAction
					title="Solicitar vacaciones ó permisos"
					icon="VACACIONES"
					size={25}
				/>
				<ButtonAction
					toggleModal={modalHandler}
					title="Ver historial de vacaciones"
					icon="history"
					size={33}
				></ButtonAction>
			</View>
			<View>
				{isModalVisible && (
					<HistorialModal onCallback={modalHandler} onExit={modalHandler} />
				)}
			</View>
		</View>
	);
}

export default Vacaciones;
