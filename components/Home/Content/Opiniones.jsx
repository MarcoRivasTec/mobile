import React, { useContext, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Keyboard,
	Platform,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Alert,
} from "react-native";
import { opiniones } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
import Working from "./Design/Working";
import { HomeContext } from "../../HomeContext";
import Confirm from "./Design/Confirm";
import fetchPost from "../../fetching";
import { AppContext } from "../../AppContext";
// import Button from "./Button";

function Opiniones() {
	// const { width, height } = Dimensions.get("window");
	const { numEmp } = useContext(HomeContext);
	const { region } = useContext(AppContext);

	const [opinion, setOpinion] = useState("");
	const [isWorking, setIsWorking] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	function confirmationModalHandler() {
		setIsConfirmVisible(!isConfirmVisible);
	}

	const sendOpinion = async () => {
		if (!opinion.trim()) {
			Alert.alert(
				"Importante",
				"Debes introducir alguna opinión antes de enviarla."
			);
			return;
		}
		setIsWorking(true);
		const opinionQuery = {
			query: `mutation SubmitOpinion($input: OpinionInput!){
						submitOpinion(input: $input) {
							success
							message
						}
					}`,
			variables: {
				input: {
					numEmp: numEmp,
					region: region,
					opinion: opinion,
				},
			},
		};
		try {
			const data = await fetchPost({ query: opinionQuery });
			setIsWorking(false);
			console.log("Response data at opinion:", data);
			if (data.data.submitOpinion.success) {
				confirmationModalHandler();
				// setDiasVacs(data.data.Vacaciones.diasvacs);
			} else {
				Alert.alert(
					"Error",
					"No se pudo enviar la opinión, vuelve a intentarlo."
				);
			}
		} catch (error) {
			console.error("Error at opinion:", error);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={opiniones.container}>
				<ContentHeader title="Opiniones" />

				<View style={opiniones.contentContainer}>
					{/* <View style={opiniones.titleBar}>
						<TouchableOpacity style={opiniones.titleContainer}>
							<View style={opiniones.iconContainer}>
								<Icon name="search" size={13} style={opiniones.icon}/>
							</View>
							<Text style={opiniones.titleText}>Departamento</Text>
						</TouchableOpacity>
					</View> */}
					<View style={opiniones.infoContainer}>
						{/* Opinion */}
						<View style={opiniones.dataContainer}>
							<View style={opiniones.dataTitleContainer}>
								<Text style={opiniones.dataTitleText}>Danos tu opinión</Text>
							</View>

							<KeyboardAvoidingView
								behavior={Platform.OS === "ios" ? "padding" : "height"}
								style={opiniones.dataFieldContainer}
							>
								<TextInput
									multiline={true}
									placeholder="Escríbela aquí . . ."
									maxLength={255}
									value={opinion}
									onChangeText={setOpinion}
									style={opiniones.dataFieldText}
								/>
							</KeyboardAvoidingView>
						</View>

						<Text style={opiniones.remainingChars}>
							({" "}
							<Text style={{ color: opinion.length === 255 ? "red" : "black" }}>
								{255 - opinion.length}{" "}
							</Text>
							/ 255 )
						</Text>

						{/* Enviar */}
						<TouchableOpacity
							onPress={sendOpinion}
							style={opiniones.buttonContainer}
						>
							<Text style={opiniones.buttonText}>Enviar</Text>
						</TouchableOpacity>
					</View>
				</View>
				{isWorking && (
					<Working isModalVisible={isWorking} text="Enviando ..." />
				)}
				{isConfirmVisible && (
					<Confirm
						isModalVisible={isConfirmVisible}
						onCallback={confirmationModalHandler}
						onExit={confirmationModalHandler}
						customTitle={"Envío realizado"}
						customText={"Gracias por tu opinión"}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}

export default Opiniones;
