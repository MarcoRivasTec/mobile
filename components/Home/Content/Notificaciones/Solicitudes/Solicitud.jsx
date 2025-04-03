import React, { useContext, useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	TextInput,
	StatusBar,
	Alert,
} from "react-native";
import { getReq, getRequestStyleuestStyle } from "./styles";
import { AppContext } from "../../../../AppContext";
import LoadingContent from "../../../../Animations/LoadingContent";
import fetchPost from "../../../../fetching";
import { HomeContext } from "../../../../HomeContext";
import Confirm from "../../Design/Confirm";

function Solicitud({
	requestData,
	onCallback,
	onExit,
	isVisible,
	updateRequests,
}) {
	const { region, platform } = useContext(AppContext);
	const { numEmp } = useContext(HomeContext);
	const statusBarHeight = platform === "ios" ? 20 : StatusBar.currentHeight;
	const request = getRequestStyle({ height: statusBarHeight });
	const [isLoading, setIsLoading] = useState(true);
	const [surveyQuestions, setSurveyQuestions] = useState([]);
	const [answers, setAnswers] = useState({}); // Stores answers for all questions
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const handleSurveySubmit = async () => {
		if (validateSurveyCompletion()) {
			// Build the payload
			const mutationData = surveyQuestions.map((question) => ({
				pregunta: question.codigo, // Question code
				respuesta: answers[question.codigo], // User's answer
			}));

			// Construct the mutation
			const mutation = {
				query: `mutation SubmitSurvey($input: SubmitSurveyInput!) {
                            submitSurvey(input: $input) {
                                success
                                message
                            }
                }`,
				variables: {
					input: {
						numEmp: numEmp, // Employee number
						region: region,
						request: +surveyData.request, // Survey ID
						data: mutationData, // Questions and answers
					},
				},
			};

			try {
				// Send the mutation
				console.log(
					"Variables for query are: ",
					JSON.stringify(mutation.variables, null, 1)
				);
				const response = await fetchPost({ query: mutation });
				console.log("Survey submission response:", response);

				if (response.data.submitSurvey.success) {
					await updateEncuestas();
					confirmationModalHandler();
				} else {
					alert(
						"Error al enviar la request: " + response.data.submitSurvey.message
					);
				}
			} catch (error) {
				console.error("Error submitting survey:", error);
				alert(
					"Ocurrió un error al enviar la request. Por favor, inténtalo de nuevo."
				);
			}
		} else {
			Alert.alert(
				"Importante",
				"Debes responder a todas las preguntas para poder terminar la request."
			);
		}
	};

	return (
		<View style={request.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isVisible}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<View style={request.backgroundContainer}>
					{isLoading ? (
						<View style={request.modalContainer}>
							<LoadingContent />
						</View>
					) : (
						<View style={request.modalContainer}>
							{/* Title */}
							<Text style={request.titleText}>{surveyData.titulo}</Text>

							<FlatList
								data={surveyQuestions}
								renderItem={renderQuestion}
								keyExtractor={(item) => item.codigo.toString()}
								style={{
									// marginTop: 10,
									width: "100%",
									maxHeight: "100%",
									// borderWidth: 1,
								}}
								contentContainerStyle={request.listContentContainer}
							/>

							{/* Buttons */}
							<View style={request.buttonsContainer}>
								<TouchableOpacity
									onPress={handleSurveySubmit}
									style={request.confirmButton}
								>
									<Text style={request.confirmButtonText}>
										Terminar request
									</Text>
								</TouchableOpacity>

								<TouchableOpacity onPress={onExit} style={request.exitButton}>
									<Text style={request.exitButtonText}>Volver</Text>
								</TouchableOpacity>
							</View>
							{ConfirmationVisible && (
								<Confirm
									isModalVisible={ConfirmationVisible}
									onCallback={confirmationModalHandler}
									onExit={confirmationModalHandler}
									closeModal={() => {
										onExit();
										updateEncuestas();
									}}
									customTitle="Encuesta enviada"
									customText="Gracias por tu participación!"
								/>
							)}
						</View>
					)}
				</View>
			</Modal>
		</View>
	);
}

export default Solicitud;
