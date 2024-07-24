import React, { useState } from "react";
import { View, Text } from "react-native";
import { solicitudes } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonAction from "./Buttons/ButtonAction";
import SolVacaciones from "./Solicitudes/SolVacaciones";
import SolPermisos from "./Solicitudes/SolPermisos";

function Solicitudes() {
	const [isPermModalVisible, setPermModalVisible] = useState(false);
	const [isVacModalVisible, setVacModalVisible] = useState(false);

	function permisosModalHandler() {
		setPermModalVisible(!isPermModalVisible);
	}

	function vacacionesModalHandler() {
		setVacModalVisible(!isVacModalVisible);
	}

	return (
		<View style={solicitudes.container}>
			<ContentHeader title="Solicitudes"></ContentHeader>
			<View style={solicitudes.sectionContainer}>
				<View style={solicitudes.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Vacaciones / Permisos
					</Text>
				</View>
				<View style={solicitudes.sectionButtonContainer}>
					<ButtonAction
						toggleModal={vacacionesModalHandler}
						icon="VACACIONES"
						size={40}
						fontSize={18}
						title="Solicitar vacaciones"
					></ButtonAction>
					<View></View>
					<ButtonAction
						toggleModal={permisosModalHandler}
						icon="VACACIONES"
						size={40}
						fontSize={18}
						title="Solicitar permisos"
					></ButtonAction>
					<View></View>
				</View>
				{isVacModalVisible && (
					<SolVacaciones
						onCallback={vacacionesModalHandler}
						onExit={vacacionesModalHandler}
						isModalVisible={isVacModalVisible}
					/>
				)}
				{isPermModalVisible && (
					<SolPermisos
						onCallback={permisosModalHandler}
						onExit={permisosModalHandler}
						isModalVisible={isPermModalVisible}
					/>
				)}
			</View>
		</View>
	);
}

export default Solicitudes;
