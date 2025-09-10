import React, { useState, useEffect, useContext, useRef } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Platform,
	Button,
	Alert,
	Linking,
} from "react-native";
import { signatureModal } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";
import { AppContext } from "../../../AppContext";
import LoadingContent from "../../../Animations/LoadingContent";
import DownArrow from "../../../Animations/DownArrow";
import SignPad from "./SignPad";
import * as FileSystem from "expo-file-system";
import ConfirmModal from "./ConfirmModal";
import fetchPost from "../../../fetching";

function SignatureModal({ onCallback, isSignatureModalVisible, onExit }) {
	const { numEmp, region } = useContext(AppContext);
	const [signPadHeight, setSignPadHeight] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [signatureImage, setSignatureImage] = useState(null); // base64 with data:image/png
	const signatureRef = useRef(null);

	const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

	function confirmModalHandler() {
		setConfirmModalVisible(!isConfirmModalVisible);
	}

	const handleSave = async (dataUrl) => {
		const fileUri = FileSystem.cacheDirectory + "signature.png";
		const base64 = dataUrl.replace("data:image/png;base64,", "");
		await FileSystem.writeAsStringAsync(fileUri, base64, {
			encoding: FileSystem.EncodingType.Base64,
		});

		setSignatureImage(dataUrl); // <-- full dataURL, used for preview
		setConfirmModalVisible(true); // <-- show modal now
	};

	const onSend = async () => {
		confirmModalHandler();
		await generateVacationCertificate();
	};

	const generateVacationCertificate = async () => {
		setIsLoading(true);
		try {
			const base64Signature = signatureImage.replace(
				"data:image/png;base64,",
				""
			);

			const mutation = {
				query: `mutation GenerateVacationCertificate($input: GenerateVacationCertificateInput!) {
						generateVacationCertificate(input: $input) {
							success
							message
							pdfUrl
						}
					}`,
				variables: {
					input: {
						numEmp: numEmp,
						region: region,
						signature: base64Signature,
					},
				},
			};

			// console.log("Mutation to generate vacation cert:", mutation);

			const result = await fetchPost({ query: mutation });
			const response = result?.data?.generateVacationCertificate;

			if (response?.success) {
				setIsLoading(false);
				Alert.alert("Éxito", `${response.message}`);
				console.log(response.pdfUrl);
				
				Linking.openURL(response.pdfUrl);
			} else if (response?.message && response?.pdfUrl) {
				setIsLoading(false);
				Alert.alert("Aviso", `${response.message}`);
				
				Linking.openURL(response.pdfUrl);
			} else if (response?.message && !response?.pdfUrl) {
				setIsLoading(false);
				Alert.alert("Error", response.message);
			} else {
				setIsLoading(false);
				Alert.alert("Error", "Ocurrió un error al generar el certificado.");
			}
			onExit();
		} catch (err) {
			setIsLoading(false);
			console.error("Error al enviar la firma:", err);
			onExit();
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isSignatureModalVisible}
				onRequestClose={onCallback}
			>
				<View style={signatureModal.backgroundContainer}>
					<View style={signatureModal.modalContainer}>
						{/* {isLoading ? (
							<View style={signatureModal.contentContainer}>
								<LoadingContent />
							</View>
						) : ( */}
						{/* <View style={signatureModal.contentContainer}> */}
						{/* Title */}
						<View style={signatureModal.titleContainer}>
							<Text style={signatureModal.textTitle}>
								Constancia de Vacaciones
							</Text>
						</View>

						<Text
							style={{
								paddingHorizontal: 16,
								paddingVertical: 16,
								textAlign: "center",
							}}
						>
							Para obtener su constancia de vacaciones, solicitamos que firme
							aquí.
						</Text>
						
						<View
							style={{
								// flex: 18,
								width: "100%",
								aspectRatio: 1,
								paddingHorizontal: 16,
								marginBottom: 16,
							}}
						>
							<SignPad signatureRef={signatureRef} onSave={handleSave} />
						</View>

						<View
							style={{
								width: "100%",
								flexDirection: "row",
								justifyContent: "space-evenly",
								marginTop: 8,
								marginBottom: 16,
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor: COLORS.green,
									paddingVertical: 8,
									borderRadius: 0,
									width: "40%",
									justifyContent: "center",
									alignItems: "center",
								}}
								onPress={() => signatureRef.current.clearSignature()}
							>
								<Text style={{ textAlign: "center", color: "white" }}>
									Limpiar
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor: COLORS.green,
									paddingVertical: 8,
									width: "40%",
									justifyContent: "center",
									alignItems: "center",
									borderRadius: 0,
								}}
								onPress={() => signatureRef.current.readSignature()}
							>
								<Text style={{ textAlign: "center", color: "white" }}>
									Guardar
								</Text>
							</TouchableOpacity>
						</View>

						{/* Back button */}
						<TouchableOpacity
							onPress={onExit}
							style={signatureModal.exitButton}
						>
							<Text style={signatureModal.textExitButton}>Volver</Text>
						</TouchableOpacity>
						{/* </View> */}
						{/* )} */}
						{isLoading && (
							<View
								style={{
									position: "absolute",
									zIndex: 100,
									height: "100%",
									width: "100%",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<LoadingContent />
							</View>
						)}
					</View>
					{isConfirmModalVisible && (
						<ConfirmModal
							image={signatureImage}
							onConfirm={onSend}
							onExit={confirmModalHandler}
						/>
					)}
				</View>
			</Modal>
		</View>
	);
}

export default SignatureModal;
