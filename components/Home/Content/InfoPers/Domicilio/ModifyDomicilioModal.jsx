import React, { useContext, useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Image,
	Alert,
} from "react-native";
import { modifyDomicilioModal } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { HomeContext } from "../../../../HomeContext";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { File } from "expo-file-system";
import Confirm from "../../Design/Confirm";
import Working from "../../Design/Working";

function ModifyDomicilioModal({ onCallback, onExit, onRegister }) {
	const { sendRequisition } = useContext(HomeContext);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);
	const [base64file, setBase64File] = useState(null);
	const [fileType, setFileType] = useState(null);
	const [fileName, setFileName] = useState(""); // Track the file name for PDF or image
	const [previewUri, setPreviewUri] = useState(null);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const requestChange = async () => {
		if (!base64file || !fileType) {
			Alert.alert("Error", "Debes subir un archivo PDF o imagen.");
			return;
		}
		setIsWorkingModalVisible(true);
		const response = await sendRequisition({
			letter: "Domicilio",
			fileName:
				fileName || (fileType === "image/jpeg" ? "image.jpg" : "document.pdf"),
			file: base64file,
		});
		setIsWorkingModalVisible(false);

		if (response === "Done") {
			confirmationModalHandler();
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, porfavor intenta de nuevo.",
			);
		}
	};

	const resetPick = () => {
		setBase64File(null);
		setFileType(null);
		setPreviewUri(null);
		setFileName("");
	};

	const pickImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				quality: 1,
			});

			if (result.canceled || !result.assets?.length) {
				return;
			}

			const image = result.assets[0];

			const isJpeg =
				image.mimeType === "image/jpeg" ||
				/\.jpe?g$/i.test(image.fileName ?? "");

			if (!isJpeg) {
				Alert.alert(
					"Formato no válido",
					"Por favor selecciona una imagen JPEG o JPG.",
				);
				return;
			}

			const file = new File(image.uri);
			const base64 = await file.base64();

			setBase64File(base64);
			setFileType("image/jpeg");
			setPreviewUri(image.uri);
			setFileName(image.fileName ?? "imagen.jpg");
		} catch (error) {
			console.error("Error selecting image:", error);

			Alert.alert("Error", "No fue posible leer la imagen seleccionada.");
		}
	};

	const pickPdf = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: "application/pdf",
				copyToCacheDirectory: true,
				multiple: false,
			});

			if (result.canceled || !result.assets?.length) {
				return;
			}

			const document = result.assets[0];

			if (document.mimeType !== "application/pdf") {
				Alert.alert(
					"Formato no válido",
					"Por favor selecciona un archivo PDF.",
				);
				return;
			}

			const file = new File(document.uri);
			const base64 = await file.base64();

			setBase64File(base64);
			setFileType("application/pdf");
			setFileName(document.name);
			setPreviewUri(null);
		} catch (error) {
			console.error("Error selecting PDF:", error);

			Alert.alert("Error", "No fue posible leer el documento seleccionado.");
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
								Para actualizar tu dirección deberás subir una imagen o
								documento PDF de un recibo
							</Text>

							{fileType === null && (
								<View>
									<View style={modifyDomicilioModal.uploadButtonsContainer}>
										<View style={modifyDomicilioModal.uploadButtonContainer}>
											<TouchableOpacity
												onPress={pickImage}
												style={modifyDomicilioModal.uploadButton}
											>
												<Ionicons name="image-outline" size={40} color="gray" />
											</TouchableOpacity>
											<Text style={modifyDomicilioModal.uploadText}>
												Imagen
											</Text>
										</View>

										<View style={modifyDomicilioModal.uploadButtonContainer}>
											<TouchableOpacity
												onPress={pickPdf}
												style={modifyDomicilioModal.uploadButton}
											>
												<Ionicons
													name="document-text-outline"
													size={40}
													color="gray"
												/>
											</TouchableOpacity>
											<Text style={modifyDomicilioModal.uploadText}>PDF</Text>
										</View>
									</View>
								</View>
							)}

							{fileType === "image/jpeg" && previewUri && (
								<View style={modifyDomicilioModal.previewContainer}>
									<Image
										resizeMode="contain"
										source={{ uri: previewUri }}
										style={modifyDomicilioModal.imagePreview}
									/>
								</View>
							)}

							{fileType === "application/pdf" && (
								<View style={modifyDomicilioModal.filePreviewContainer}>
									<Text style={modifyDomicilioModal.fileNameText}>
										Archivo seleccionado: {fileName}
									</Text>
								</View>
							)}

							{fileType !== null && (
								<TouchableOpacity
									onPress={resetPick}
									style={modifyDomicilioModal.resetButton}
								>
									<Text style={modifyDomicilioModal.resetButtonText}>
										Cambiar archivo
									</Text>
								</TouchableOpacity>
							)}

							{/* Buttons */}
							<View style={modifyDomicilioModal.buttonsContainer}>
								<TouchableOpacity
									onPress={requestChange}
									style={modifyDomicilioModal.registrarButton}
								>
									<Text style={modifyDomicilioModal.registrarButtonText}>
										Enviar
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onExit}
									style={modifyDomicilioModal.exitButton}
								>
									<Text style={modifyDomicilioModal.exitButtonText}>
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
						{isWorkingModalVisible && (
							<Working isModalVisible={isWorkingModalVisible} />
						)}
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default ModifyDomicilioModal;
