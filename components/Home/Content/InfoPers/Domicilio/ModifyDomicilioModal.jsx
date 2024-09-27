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
import * as FileSystem from "expo-file-system";
import Confirm from "../../Design/Confirm";

function ModifyDomicilioModal({ onCallback, onExit, onRegister }) {
	const { sendRequisition } = useContext(HomeContext);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
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

		const response = await sendRequisition({
			letter: "Domicilio",
			fileName: fileType === "image/jpeg" ? "image.jpg" : "document.pdf",
			file: base64file,
		});

		if (response === "Done") {
			confirmationModalHandler();
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, porfavor intenta de nuevo."
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
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			const image = result.assets[0];

			if (image.uri.endsWith(".jpg") || image.uri.endsWith(".jpeg")) {
				const base64 = await FileSystem.readAsStringAsync(image.uri, {
					encoding: FileSystem.EncodingType.Base64,
				});
				setBase64File(base64);
				setFileType("image/jpeg");
				setPreviewUri(image.uri); // Set image URI for preview
				setFileName(""); // Clear file name since it's an image
			} else {
				alert("Porfavor selecciona una imagen de formato JPEG/JPG.");
			}
		}
	};

	const pickPdf = async () => {
		let result = await DocumentPicker.getDocumentAsync({
			type: "application/pdf",
		});

		console.log("Result is: ", JSON.stringify(result, null, 1));

		if (result.assets[0].mimeType === "application/pdf") {
			const base64 = await FileSystem.readAsStringAsync(
				result.assets[0].uri,
				{
					encoding: FileSystem.EncodingType.Base64,
				}
			);
			setBase64File(base64);
			setFileType("application/pdf");
			setFileName(result.assets[0].name); // Set file name for display
			setPreviewUri(null); // Clear image preview since it's a PDF
			console.log("PDF file set");
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

							{fileType === null && (
								<View>
									<View
										style={
											modifyDomicilioModal.uploadButtonsContainer
										}
									>
										<View
											style={
												modifyDomicilioModal.uploadButtonContainer
											}
										>
											<TouchableOpacity
												onPress={pickImage}
												style={
													modifyDomicilioModal.uploadButton
												}
											>
												<Ionicons
													name="image-outline"
													size={40}
													color="gray"
												/>
											</TouchableOpacity>
											<Text
												style={
													modifyDomicilioModal.uploadText
												}
											>
												Imagen
											</Text>
										</View>

										<View
											style={
												modifyDomicilioModal.uploadButtonContainer
											}
										>
											<TouchableOpacity
												onPress={pickPdf}
												style={
													modifyDomicilioModal.uploadButton
												}
											>
												<Ionicons
													name="document-text-outline"
													size={40}
													color="gray"
												/>
											</TouchableOpacity>
											<Text
												style={
													modifyDomicilioModal.uploadText
												}
											>
												PDF
											</Text>
										</View>
									</View>
								</View>
							)}

							{fileType === "image/jpeg" && previewUri && (
								<View
									style={
										modifyDomicilioModal.previewContainer
									}
								>
									<Image
										resizeMode="contain"
										source={{ uri: previewUri }}
										style={
											modifyDomicilioModal.imagePreview
										}
									/>
								</View>
							)}

							{fileType === "application/pdf" && (
								<View
									style={
										modifyDomicilioModal.filePreviewContainer
									}
								>
									<Text
										style={
											modifyDomicilioModal.fileNameText
										}
									>
										Archivo seleccionado: {fileName}
									</Text>
								</View>
							)}

							{fileType !== null && (
								<TouchableOpacity
									onPress={resetPick}
									style={modifyDomicilioModal.resetButton}
								>
									<Text
										style={
											modifyDomicilioModal.resetButtonText
										}
									>
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
