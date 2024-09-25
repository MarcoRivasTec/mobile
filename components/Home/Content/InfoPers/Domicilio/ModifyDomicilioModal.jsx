import React, { useContext, useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { modifyDomicilioModal } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { HomeContext } from "../../../../HomeContext";
import COLORS from "../../../../../constants/colors";

function ModifyDomicilioModal({ onCallback, onExit, onRegister }) {
	const { sendRequisition } = useContext(HomeContext);

	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const requestChange = async () => {
		const response = await sendRequisition({ type: "Gafete" });
		// console.log("Response requestGafete: ", response);
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
		<View style={modifyDomicilioModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<View style={modifyDomicilioModal.backgroundContainer}>
					<View style={modifyDomicilioModal.modalContainer}>
						<View style={modifyDomicilioModal.contentContainer}>
							{/* Title */}
							<Text style={modifyDomicilioModal.titleText}>
								Modificar dirección
							</Text>

							<Text
								style={[
									modifyDomicilioModal.sectionTitleText,
									{ fontSize: 16, marginTop: 12 },
								]}
							>
								Para actualizar tu dirección deberás subir una
								imagen o documento PDF de un recibo
							</Text>

							<Text style={modifyDomicilioModal.sectionTitleText}>
								Sube un documento PDF
							</Text>

							<TouchableOpacity
								style={modifyDomicilioModal.uploadButton}
							>
								<Ionicons
									name="add-outline"
									size={32}
									color={COLORS.flatlistElement1}
								/>
							</TouchableOpacity>

							<Text style={modifyDomicilioModal.sectionTitleText}>
								Sube una imagen
							</Text>

							<TouchableOpacity
								style={modifyDomicilioModal.uploadButton}
							>
								<Ionicons
									name="add-outline"
									size={32}
									color={COLORS.flatlistElement1}
								/>
							</TouchableOpacity>

							{/* Buttons */}
							<View style={modifyDomicilioModal.buttonsContainer}>
								<TouchableOpacity
									onPress={requestChange}
									style={modifyDomicilioModal.registrarButton}
								>
									<Text
										style={
											modifyDomicilioModal.registrarButtonText
										}
									>
										Enviar
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onExit}
									style={modifyDomicilioModal.exitButton}
								>
									<Text
										style={
											modifyDomicilioModal.exitButtonText
										}
									>
										Volver
									</Text>
								</TouchableOpacity>
							</View>
							{ConfirmationVisible && (
								<Confirm
									isModalVisible={ConfirmationVisible}
									onCallback={confirmationModalHandler}
									onExit={confirmationModalHandler}
									closeModal={onExit}
									style={{ flex: 1, position: "absolute" }}
								/>
							)}
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default ModifyDomicilioModal;
