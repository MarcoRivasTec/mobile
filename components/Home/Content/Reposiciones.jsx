import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { reposiciones } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonAction from "./Buttons/ButtonAction";
import Gafete from "./Reposiciones/Gafete";
import Banorte from "./Reposiciones/Banorte";
import Despensa from "./Reposiciones/Despensa";
import { HomeContext } from "../../HomeContext";

function Reposiciones() {
	const { sendRequisition } = useContext(HomeContext);
	const [isGafModalVisible, setGafModalVisible] = useState(false);
	const [isBanModalVisible, setBanModalVisible] = useState(false);
	const [isDespModalVisible, setDespModalVisible] = useState(false);

	const tarjetasRequisition = ({ type, repMotive = null, folio = null }) => {
		return sendRequisition({
			letter: type,
			repMotive: repMotive,
			fileName: folio,
		});
	};

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
					<View style={reposiciones.buttonContainer}>
						<ButtonAction
							toggleModal={gafeteModalHandler}
							icon="GAFETE"
							size={50}
							title="Solicitar gafete"
							fontSize={14}
						/>
					</View>

					<View style={reposiciones.buttonContainer}>
						<ButtonAction
							toggleModal={banorteModalHandler}
							icon="TARJ_BANORTE"
							size={50}
							title="Tarjeta Banorte"
							fontSize={14}
						/>
					</View>

					<View style={reposiciones.buttonContainer}>
						<ButtonAction
							toggleModal={despensaModalHandler}
							icon="TARJ_DESP"
							size={50}
							title="Tarjeta de Despensa"
							fontSize={14}
						/>
					</View>
				</View>
			</View>
			{isGafModalVisible && (
				<Gafete
					tarjetasRequisition={tarjetasRequisition}
					onCallback={gafeteModalHandler}
					onExit={gafeteModalHandler}
					isModalVisible={isGafModalVisible}
				/>
			)}
			{isBanModalVisible && (
				<Banorte
					tarjetasRequisition={tarjetasRequisition}
					onCallback={banorteModalHandler}
					onExit={banorteModalHandler}
					isModalVisible={isBanModalVisible}
				/>
			)}
			{isDespModalVisible && (
				<Despensa
					tarjetasRequisition={tarjetasRequisition}
					onCallback={despensaModalHandler}
					onExit={despensaModalHandler}
					isModalVisible={isDespModalVisible}
				/>
			)}
		</View>
	);
}

export default Reposiciones;
