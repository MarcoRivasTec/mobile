import React, { useState } from "react";
import { View, Text } from "react-native";
import { reposiciones } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonAction from "./Buttons/ButtonAction";
import Gafete from "./Reposiciones/Gafete";

function Reposiciones() {
	const [isGafModalVisible, setGafModalVisible] = useState(false);
	const [isBanModalVisible, setBanModalVisible] = useState(false);
	const [isDespModalVisible, setDespModalVisible] = useState(false);

	function gafeteModalHandler() {
		setGafModalVisible(!isGafModalVisible);
	}

	function banorteModalHandler() {
		setBanModalVisible(!isBanModalVisible);
	}

	function despensaModalHandler() {
		setDespModalVisible(!isDespModalVisible);
	}

	return (
		<View style={reposiciones.container}>
			<ContentHeader title="Reposiciones"></ContentHeader>
			<View style={reposiciones.sectionContainer}>
				<View style={reposiciones.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Reposición de Gafete / Tarjetas
					</Text>
				</View>
				<View style={reposiciones.sectionButtonContainer}>
					<ButtonAction
						toggleModal={gafeteModalHandler}
						icon="GAFETE"
						size={50}
						title="Solicitar gafete"
					></ButtonAction>
					<View>
						{isGafModalVisible && (
							<Gafete
								onCallback={gafeteModalHandler}
								onExit={gafeteModalHandler}
							/>
						)}
					</View>
					<ButtonAction
						toggleModal={banorteModalHandler}
						icon="TARJ_BANORTE"
						size={50}
						title="Tarjeta Banorte"
					></ButtonAction>
					{/* <View>
						{isPermModalVisible && (
							<SolPermisos
								onCallback={permisosModalHandler}
								onExit={permisosModalHandler}
							/>
						)}
					</View> */}
                    <ButtonAction
						toggleModal={despensaModalHandler}
						icon="TARJ_DESP"
						size={50}
						title="Tarjeta de Despensa"
					></ButtonAction>
					{/* <View>
						{isPermModalVisible && (
							<SolPermisos
								onCallback={permisosModalHandler}
								onExit={permisosModalHandler}
							/>
						)}
					</View> */}
				</View>
			</View>
		</View>
	);
}

export default Reposiciones;
