import React, { useState, useRef, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { banorte } from "./styles";
import Confirm from "./Confirm";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function Banorte({ tarjetasRequisition, onCallback, isModalVisible, onExit }) {
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const checkboxIconSize = 25;

	const [selectedCheckbox, setSelectedCheckbox] = React.useState("");

	const [checkbox1State, setCheckbox1State] = React.useState(false);
	const [checkbox2State, setCheckbox2State] = React.useState(false);
	const [checkbox3State, setCheckbox3State] = React.useState(false);
	const [checkbox4State, setCheckbox4State] = React.useState(false);
	const [checkbox5State, setCheckbox5State] = React.useState(false);
	const [checkbox6State, setCheckbox6State] = React.useState(false);

	const textInputRef = useRef();

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

	// Add event listener for keyboard hide event
	useEffect(() => {
		console.log("Selected checkbox is: ", selectedCheckbox);
	}, [selectedCheckbox]);

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
		banorte.backgroundContainer
	);

	const [modalTopContainer, setModalContainerStyle] = useState(
		banorte.modalContainer
	);

	const handleFocus = () => {
		setBackContainerStyle({
			...banorte.backgroundContainer,
			justifyContent: "flex-start", // Adjust this according to your requirement
		});
		setModalContainerStyle({
			...banorte.modalContainer,
			top: "4%", // Adjust this according to your requirement
		});
	};

	const handleBlur = () => {
		setBackContainerStyle(banorte.backgroundContainer);
		setModalContainerStyle(banorte.modalContainer);
	};

	const handleSend = async () => {
		const data = await tarjetasRequisition("Banorte", selectedCheckbox);
	};

	const handleCheckboxPress = (checkboxNumber) => {
		setCheckbox1State(checkboxNumber === 1);
		setCheckbox2State(checkboxNumber === 2);
		setCheckbox3State(checkboxNumber === 3);
		setCheckbox4State(checkboxNumber === 4);
		setCheckbox5State(checkboxNumber === 5);
		setCheckbox6State(checkboxNumber === 6);
	};

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}
	return (
		<View style={banorte.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View style={backContainer}>
						<View style={modalTopContainer}>
							<View style={banorte.contentContainer}>
								{/* Title */}
								<View style={banorte.titleContainer}>
									<Text style={banorte.titleText}>Solicitud de Reposición</Text>
								</View>

								{/* Text */}
								<View style={banorte.textContainer}>
									<Text style={banorte.text}>
										<Text style={banorte.subtext}>Se enviará la</Text>
										<Text style={[banorte.subtext, { fontWeight: "bold" }]}>
											{" "}
											Solicitud de Reposición de Tarjeta Banorte{" "}
										</Text>
										<Text style={banorte.subtext}>
											a tu representante de RH.{"\n"}
										</Text>
									</Text>

									<Text style={banorte.text}>Porfavor, indica el motivo:</Text>

									<View style={banorte.checkboxGroup}>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="1. Vencimiento"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												banorte.checkboxText,
												{
													textDecorationLine:
														checkbox1State === true ? "underline" : "none",
												},
											]}
											onPress={() => setSelectedCheckbox("Vencimiento")}
											isChecked={selectedCheckbox === "Vencimiento"}
											style={banorte.checkbox}
										></BouncyCheckbox>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="2. Daño"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												banorte.checkboxText,
												{
													textDecorationLine:
														checkbox2State === true ? "underline" : "none",
												},
											]}
											onPress={() => setSelectedCheckbox("Daño")}
											isChecked={selectedCheckbox === "Daño"}
											style={banorte.checkbox}
										></BouncyCheckbox>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="3. Cajeros"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												banorte.checkboxText,
												{
													textDecorationLine:
														checkbox3State === true ? "underline" : "none",
												},
											]}
											onPress={() => setSelectedCheckbox("Cajeros")}
											isChecked={selectedCheckbox === "Cajeros"}
											style={banorte.checkbox}
										></BouncyCheckbox>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="4. Saldos no reconocidos"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												banorte.checkboxText,
												{
													textDecorationLine:
														checkbox4State === true ? "underline" : "none",
												},
											]}
											onPress={() => setSelectedCheckbox("Saldos")}
											isChecked={selectedCheckbox === "Saldos"}
											style={banorte.checkbox}
										></BouncyCheckbox>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="5. Robo"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												banorte.checkboxText,
												{
													textDecorationLine:
														checkbox5State === true ? "underline" : "none",
												},
											]}
											onPress={() => setSelectedCheckbox("Robo")}
											isChecked={selectedCheckbox === "Robo"}
											style={banorte.checkbox}
										></BouncyCheckbox>
										<BouncyCheckbox
											size={checkboxIconSize}
											fillColor="orange"
											unFillColor="#FFFFFF"
											text="6. Extravío"
											iconStyle={{ borderColor: "gray" }}
											textStyle={[
												banorte.checkboxText,
												{
													textDecorationLine:
														checkbox6State === true ? "underline" : "none",
												},
											]}
											onPress={() => setSelectedCheckbox("Extravio")}
											isChecked={selectedCheckbox === "Extravio"}
											style={banorte.checkbox}
										></BouncyCheckbox>
									</View>

									<Text style={banorte.text}>
										Para las opciones 3 a 6 debes primero hablar al 01-800-
										BANORTE, te darán un folio a 11 dígitos y asi podrás recibir
										tu nueva tarjeta.{"\n"}
									</Text>

									{/* <Text style={banorte.text}>
										Por favor, captura el Folio entregado aquí:
									</Text> */}
								</View>

								{/* <KeyboardAvoidingView */}
								{selectedCheckbox === "Cajeros" ||
								selectedCheckbox === "Saldos" ||
								selectedCheckbox === "Robo" ||
								selectedCheckbox === "Extravio" ? (
									<View
										// behavior={Platform.OS === "ios" ? "padding" : "height"}
										style={banorte.inputContainer}
									>
										<View style={banorte.inputTextContainer}>
											<Text style={banorte.inputText}>
												Por favor, captura el Folio entregado aquí:
											</Text>
										</View>

										<TextInput
											placeholder="Folio de 11 dígitos"
											style={banorte.inputField}
											onFocus={handleFocus}
											onBlur={handleBlur}
											ref={textInputRef}
										/>
									</View>
								) : null}
								{/* </KeyboardAvoidingView> */}

								{/* Back button */}
								<View style={banorte.buttonContainer}>
									<TouchableOpacity
										onPress={() => {
											confirmationModalHandler();
											tarjetasRequisition("Banorte");
										}}
										// onPress={confirmationModalHandler}
										style={banorte.button}
									>
										<Text style={banorte.textButton}>Solicitar</Text>
									</TouchableOpacity>
									<View>
										{ConfirmationVisible && (
											<Confirm
												isModalVisible={ConfirmationVisible}
												onCallback={confirmationModalHandler}
												onExit={confirmationModalHandler}
												closeModal={onExit}
											/>
										)}
									</View>
									<TouchableOpacity
										onPress={onExit}
										style={[banorte.button, { backgroundColor: "gray" }]}
									>
										<Text style={banorte.textButton}>Volver</Text>
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

export default Banorte;
