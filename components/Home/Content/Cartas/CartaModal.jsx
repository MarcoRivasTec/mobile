import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import { cartaModal } from "./styles";
import Confirm from "../Design/Confirm";

function CartaModal({
	text,
	cartasRequisition,
	onCallback,
	isModalVisible,
	onExit,
}) {
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	const requestCarta = async () => {
		const response = await cartasRequisition(); // console.log("Response requestGafete: ", response);
		if (response === "Done") {
			confirmationModalHandler();
		} else if (response === "Existing requisition") {
			Alert.alert(
				"Importante",
				"Ya existe una solicitud en espera a ser procesada. Danos tiempo para atenderte."
			);
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto"
			);
		}
	};

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	return (
		<View style={cartaModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<View style={cartaModal.backgroundContainer}>
					<View style={cartaModal.modalContainer}>
						<View style={cartaModal.contentContainer}>
							{/* Title */}
							<View style={cartaModal.titleContainer}>
								<Text style={cartaModal.titleText}>
									Solicitud de Reposición
								</Text>
							</View>

							{/* Text */}
							<View style={cartaModal.textContainer}>
								<Text style={cartaModal.text}>
									<Text style={cartaModal.subtext}>
										Se enviará la
									</Text>
									<Text
										style={[
											cartaModal.subtext,
											{ fontWeight: "bold" },
										]}
									>
										{" "}
										Solicitud de {text}{" "}
									</Text>
									<Text style={cartaModal.subtext}>
										a tu representante de RH.{"\n"}
									</Text>
								</Text>
								<Text style={cartaModal.subtext}>
									¿Deseas continuar?
								</Text>
							</View>

							{/* Back button */}
							<View style={cartaModal.buttonContainer}>
								<TouchableOpacity
									onPress={requestCarta}
									style={cartaModal.button}
								>
									<Text style={cartaModal.textButton}>
										Solicitar
									</Text>
								</TouchableOpacity>
								<View>
									{ConfirmationVisible && (
										<Confirm
											isModalVisible={ConfirmationVisible}
											onCallback={
												confirmationModalHandler
											}
											onExit={confirmationModalHandler}
											closeModal={onExit}
										/>
									)}
								</View>
								<TouchableOpacity
									onPress={onExit}
									style={[
										cartaModal.button,
										{ backgroundColor: "gray" },
									]}
								>
									<Text style={cartaModal.textButton}>
										Volver
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default CartaModal;
