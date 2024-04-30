import React, { useState } from "react";
import { View, Text } from "react-native";
import { reposiciones } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonAction from "./Buttons/ButtonAction";
import Gafete from "./Reposiciones/Gafete";
import Banorte from "./Reposiciones/Banorte";
import Despensa from "./Reposiciones/Despensa";

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
			<ContentHeader title="Reposiciones" />
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

					<ButtonAction
						toggleModal={banorteModalHandler}
						icon="TARJ_BANORTE"
						size={50}
						title="Tarjeta Banorte"
					></ButtonAction>

					<ButtonAction
						toggleModal={despensaModalHandler}
						icon="TARJ_DESP"
						size={50}
						title="Tarjeta de Despensa"
					></ButtonAction>
				</View>
			</View>
			{isGafModalVisible && (
				<Gafete
					onCallback={gafeteModalHandler}
					onExit={gafeteModalHandler}
					isModalVisible={isGafModalVisible}
				/>
			)}
			{isBanModalVisible && (
				<Banorte
					onCallback={banorteModalHandler}
					onExit={banorteModalHandler}
					isModalVisible={isBanModalVisible}
				/>
			)}
			{isDespModalVisible && (
				<Despensa
					onCallback={despensaModalHandler}
					onExit={despensaModalHandler}
					isModalVisible={isDespModalVisible}
				/>
			)}
		</View>
	);
}

export default Reposiciones;
