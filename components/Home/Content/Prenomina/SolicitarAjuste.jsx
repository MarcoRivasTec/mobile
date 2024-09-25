import React, { useState, useRef, useEffect, useContext } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { solicitarAjuste } from "./styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Confirm from "../Design/Confirm";
import { HomeContext } from "../../../HomeContext";

function SolicitarAjuste({
	onCallback,
	isModalVisible,
	onExit,
	dayToAdjust,
	period,
}) {
	const { sendRequisition } = useContext(HomeContext);
	const [coment, setComent] = useState("");
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const checkboxIconSize = 25;

	const [selectedCheckbox, setSelectedCheckbox] = React.useState("");

	const textInputRef = useRef();

	const requestAjuste = async () => {
		// console.log(`Day: ${dayToAdjust}, period: ${period}`);
		// return
		if (selectedCheckbox === "") {
			Alert.alert("Error", "Debes seleccionar una opción");
			return;
		}
		const response = await sendRequisition({
			letter: "AjustePrenom",
			repMotive: selectedCheckbox,
			coment: coment,
			dayToAdjust: dayToAdjust,
			period: period,
		});
		if (response === "Done") {
			confirmationModalHandler();
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto"
			);
			return
		}
	};

	// Function to blur the keyboard
	const blurKeyboard = () => {
		if (textInputRef.current) {
			textInputRef.current.blur();
		}
	};

	// Function to handle keyboard visibility changes
	const handleKeyboardDidHide = () => {
		blurKeyboard();
	};

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			handleKeyboardDidHide
		);

		// Clean up the event listener when component unmounts
		return () => {
			keyboardDidHideListener.remove();
		};
	}, []);

	const [backContainer, setBackContainerStyle] = useState(
		solicitarAjuste.backgroundContainer
	);

	const [modalTopContainer, setModalContainerStyle] = useState(
		solicitarAjuste.modalContainer
	);

	const handleFocus = () => {
		setBackContainerStyle({
			...solicitarAjuste.backgroundContainer,
			justifyContent: "flex-start", // Adjust this according to your requirement
		});
		setModalContainerStyle({
			...solicitarAjuste.modalContainer,
			top: "4%", // Adjust this according to your requirement
		});
	};

	const handleBlur = () => {
		setBackContainerStyle(solicitarAjuste.backgroundContainer);
		setModalContainerStyle(solicitarAjuste.modalContainer);
	};

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	return (
		<View style={solicitarAjuste.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
					accessible={false}
				>
					<View style={backContainer}>
						<View style={modalTopContainer}>
							<View style={solicitarAjuste.contentContainer}>
								{/* Title */}
								<View style={solicitarAjuste.titleContainer}>
									<Text style={solicitarAjuste.titleText}>
										Solicitud de Ajuste
									</Text>
								</View>

								{/* Checkboxes */}
								<View style={solicitarAjuste.textContainer}>
									<Text style={solicitarAjuste.text}>
										<Text style={solicitarAjuste.subtext}>
											Favor de seleccionar el tipo de
											ajuste:
										</Text>
										{/* <Text
											style={[
												solicitarAjuste.subtext,
												{ fontWeight: "bold" },
											]}
										>
											{" "}
											Solicitud de Reposición de Tarjeta
											Banorte{" "}
										</Text>
										<Text style={solicitarAjuste.subtext}>
											a tu representante de RH.{"\n"}
										</Text> */}
									</Text>

									<View style={solicitarAjuste.checkboxGroup}>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="1. Checada"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												solicitarAjuste.checkboxText,
												{
													textDecorationLine:
														selectedCheckbox ===
														"Checada"
															? "underline"
															: "none",
												},
											]}
											onPress={() =>
												setSelectedCheckbox("Checada")
											}
											isChecked={
												selectedCheckbox === "Checada"
											}
											style={solicitarAjuste.checkbox}
										></BouncyCheckbox>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="2. Tiempo Extra"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												solicitarAjuste.checkboxText,
												{
													textDecorationLine:
														selectedCheckbox ===
														"TiempoExt"
															? "underline"
															: "none",
												},
											]}
											onPress={() =>
												setSelectedCheckbox(
													"TiempoExt"
												)
											}
											isChecked={
												selectedCheckbox ===
												"TiempoExt"
											}
											style={solicitarAjuste.checkbox}
										></BouncyCheckbox>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="3. Falta"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												solicitarAjuste.checkboxText,
												{
													textDecorationLine:
														selectedCheckbox ===
														"Falta"
															? "underline"
															: "none",
												},
											]}
											onPress={() =>
												setSelectedCheckbox("Falta")
											}
											isChecked={
												selectedCheckbox === "Falta"
											}
											style={solicitarAjuste.checkbox}
										></BouncyCheckbox>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="4. Otra incidencia (Vacaciones, permiso)"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												solicitarAjuste.checkboxText,
												{
													textDecorationLine:
														selectedCheckbox ===
														"Otra"
															? "underline"
															: "none",
												},
											]}
											onPress={() =>
												setSelectedCheckbox("Otra")
											}
											isChecked={
												selectedCheckbox === "Otra"
											}
											style={solicitarAjuste.checkbox}
										></BouncyCheckbox>
									</View>
								</View>

								<View style={solicitarAjuste.inputContainer}>
									<TextInput
										placeholder="Tu comentario aquí.."
										style={solicitarAjuste.inputField}
										maxLength={255}
										multiline={true}
										value={coment}
										onChangeText={(text) => setComent(text)}
										onFocus={handleFocus}
										onBlur={handleBlur}
										ref={textInputRef}
									/>
								</View>

								{/* Back button */}
								<View style={solicitarAjuste.buttonContainer}>
									<TouchableOpacity
										onPress={requestAjuste}
										// onPress={confirmationModalHandler}
										style={solicitarAjuste.button}
									>
										<Text
											style={solicitarAjuste.textButton}
										>
											Solicitar
										</Text>
									</TouchableOpacity>
									<View>
										{ConfirmationVisible && (
											<Confirm
												isModalVisible={
													ConfirmationVisible
												}
												onCallback={
													confirmationModalHandler
												}
												onExit={
													confirmationModalHandler
												}
												closeModal={onExit}
											/>
										)}
									</View>
									<TouchableOpacity
										onPress={onExit}
										style={[
											solicitarAjuste.button,
											{ backgroundColor: "gray" },
										]}
									>
										<Text
											style={solicitarAjuste.textButton}
										>
											Volver
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}

export default SolicitarAjuste;
