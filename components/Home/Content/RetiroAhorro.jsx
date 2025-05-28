import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { retiro } from "./styles";
import Confirm from "./Design/Confirm";
import { HomeContext } from "../../HomeContext";
import ContentHeader from "./ContentHeader";
import Working from "./Design/Working";

function RetiroAhorro() {
	const { sendRequisition } = useContext(HomeContext);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const requestRetiro = async () => {
		setIsWorkingModalVisible(true);
		const response = await sendRequisition({ letter: "RetiroFA" }); // console.log("Response requestGafete: ", response);
		setIsWorkingModalVisible(false);
		if (response === "Done") {
			confirmationModalHandler();
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto"
			);
		}
	};

	return (
		<View style={retiro.container}>
			<ContentHeader title="Retiro de ahorro"></ContentHeader>
			<View style={retiro.contentContainer}>
				{/* Title */}
				<View style={retiro.titleContainer}>
					<Text style={retiro.titleText}>
						Solicitud de Renuncia al Fondo de Ahorro
					</Text>
				</View>

				{/* Text */}
				<View style={retiro.textContainer}>
					<Text style={retiro.text}>
						<Text style={retiro.subtext}>Se enviará la</Text>
						<Text style={[retiro.subtext, { fontWeight: "bold" }]}>
							{" "}
							Solicitud de Renuncia al Fondo de Ahorro{" "}
						</Text>
						<Text style={retiro.subtext}>
							a tu representante de RH.{"\n"}
						</Text>
					</Text>
					<Text style={retiro.subtext}>
						Al autorizarse tu solicitud se dejará de hacer la
						retención semanal de Fondo de Ahorro así como la
						aportación patronal
						{"\n"}
					</Text>
					<Text style={retiro.subtext}>¿Deseas continuar?</Text>
				</View>

				{/* Back button */}
				<TouchableOpacity onPress={requestRetiro} style={retiro.button}>
					<Text style={retiro.textButton}>Solicitar</Text>
				</TouchableOpacity>
				{ConfirmationVisible && (
					<Confirm
						isModalVisible={ConfirmationVisible}
						onCallback={confirmationModalHandler}
						onExit={confirmationModalHandler}
					/>
				)}
				{isWorkingModalVisible && (
					<Working isModalVisible={isWorkingModalVisible} />
				)}
			</View>
		</View>
	);
}

export default RetiroAhorro;
