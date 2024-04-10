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
						size={21}
						title="Solicitar vacaciones"
					></ButtonAction>
					<View>
						{isVacModalVisible && (
							<SolVacaciones
								onCallback={vacacionesModalHandler}
								onExit={vacacionesModalHandler}
							/>
						)}
					</View>
					<ButtonAction
						toggleModal={permisosModalHandler}
						icon="VACACIONES"
						size={21}
						title="Solicitar permisos"
					></ButtonAction>
					<View>
						{isPermModalVisible && (
							<SolPermisos
								onCallback={permisosModalHandler}
								onExit={permisosModalHandler}
							/>
						)}
					</View>
				</View>
			</View>
		</View>
	);
}

export default Solicitudes;
