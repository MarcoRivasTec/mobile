import React, { useContext, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import { retiro } from "./styles";
import Confirm from "./Design/Confirm";
import { HomeContext } from "../../HomeContext";
import LoadingContent from "../../Animations/LoadingContent";
import ContentHeader from "./ContentHeader";

function RetiroAhorro() {
	const { sendRequisition } = useContext(HomeContext);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const requestRetiro = async () => {
		setIsLoading(true);
		const response = await sendRequisition({ letter: "RetiroFA" }); // console.log("Response requestGafete: ", response);
		if (response === "Done") {
			confirmationModalHandler();
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto"
			);
		}
		setIsLoading(false);
		onExit();
	};

	return (
		<View style={retiro.container}>
			<ContentHeader title="Retiro de ahorro"></ContentHeader>
			{isLoading ? (
				<View style={retiro.contentContainer}>
					<LoadingContent />
				</View>
			) : (
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
							Al autorizarse tu solicitud se dejará de hacer la retención
							semanal de Fondo de Ahorro así como la aportación patronal
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
				</View>
			)}
		</View>
	);
}

export default RetiroAhorro;
