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
import { getEncuestaStyle } from "./styles";
import { AppContext } from "../../../../AppContext";
import LoadingContent from "../../../../Animations/LoadingContent";
import fetchPost from "../../../../fetching";
import { HomeContext } from "../../../../HomeContext";
import Confirm from "../../Design/Confirm";

function Encuesta({ surveyData, onCallback, onExit, isVisible, updateEncuestas }) {
	const { region, platform } = useContext(AppContext);
	const { numEmp } = useContext(HomeContext);
	const statusBarHeight = platform === "ios" ? 20 : StatusBar.currentHeight;
	const encuesta = getEncuestaStyle({ height: statusBarHeight });
	const [isLoading, setIsLoading] = useState(true);
	const [surveyQuestions, setSurveyQuestions] = useState([]);
	const [answers, setAnswers] = useState({}); // Stores answers for all questions
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	useEffect(() => {
		const getSurveyData = async () => {
			const surveyQuery = {
				query: `query Encuesta(
							$encuesta: Int!,
							$region: String!,
						) {
							Encuesta(
								encuesta: $encuesta,
								region: $region,
							) {
								pregunta
                                codigo
                                respuestas
                                notas
							}
						}`,
				variables: {
					encuesta: +surveyData.encuesta,
					region: region,
				},
			};
			try {
				const data = await fetchPost({ query: surveyQuery });
				console.log("Survey data is: ", JSON.stringify(data, null, 1));
				// if (region === "JRZ") {
				if (data.data.Encuesta && data.data.Encuesta.length > 0) {
					// console.log("Correct", region);
					// console.log("Data from encuesta is: ", data.data.Encuesta);
					setSurveyQuestions(data.data.Encuesta);
					// setEncuestas(data.data.Encuestas);
					// setNotifsEncuestas(data.data.Encuestas.length);
				}
			} catch (error) {}
		};

		const loadSurvey = async () => {
			await getSurveyData();
		};
		loadSurvey();
		setIsLoading(false);
	}, []);

	const renderQuestion = ({ item }) => {
		const selectedAnswer = answers[item.codigo] || "";
		const isComentario = selectedAnswer === "Comentario";

		const handleAnswerSelect = (answer) => {
			setAnswers((prev) => ({
				...prev,
				[item.codigo]: answer,
			}));
		};

		return (
			<View style={encuesta.questionContainer}>
				<Text style={encuesta.questionText}>{item.pregunta}</Text>

				{/* Render answers */}
				{item.respuestas.map((respuesta, index) => {
					if (respuesta === "Comentario") {
						// If "Comentario" is selected, directly render the TextInput field
						return (
							<View
								key={index}
								style={[
									encuesta.answerContainer,
									// encuesta.selectedAnswerContainer,
								]}
							>
								<TextInput
									style={encuesta.commentInput}
									placeholder="Escribe tu comentario aquí..."
									maxLength={50}
									value={answers[item.codigo] || ""}
									onChangeText={(text) =>
										setAnswers((prev) => ({
											...prev,
											[item.codigo]: text,
										}))
									}
								/>
							</View>
						);
					} else {
						// Render other answers or "Comentario" when not selected
						return (
							<TouchableOpacity
								key={index}
								style={[
									encuesta.answerContainer,
									selectedAnswer === respuesta &&
										encuesta.selectedAnswerContainer,
								]}
								onPress={() => handleAnswerSelect(respuesta)}
							>
								<Text
									style={[
										encuesta.answerText,
										selectedAnswer === respuesta &&
											encuesta.selectedAnswerText,
									]}
								>
									{respuesta}
								</Text>
							</TouchableOpacity>
						);
					}
				})}
				{item.notas && item.notas.trim() !== "" && (
					<Text style={encuesta.notesText}>Nota: {item.notas}</Text>
				)}
			</View>
		);
	};

	const validateSurveyCompletion = () => {
		// Check if all questions are answered or have a valid comment
		for (const question of surveyQuestions) {
			const answer = answers[question.codigo];

			// If the question is not answered or the comment is empty
			if (!answer || (answer === "Comentario" && answer.trim() === "")) {
				return false; // Incomplete survey
			}
		}
		return true; // Survey is complete
	};

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
						encuesta: +surveyData.encuesta, // Survey ID
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
					confirmationModalHandler();
				} else {
					alert(
						"Error al enviar la encuesta: " +
							response.data.submitSurvey.message
					);
				}
			} catch (error) {
				console.error("Error submitting survey:", error);
				alert(
					"Ocurrió un error al enviar la encuesta. Por favor, inténtalo de nuevo."
				);
			}
		} else {
			Alert.alert("Importante", "Debes responder a todas las preguntas para poder terminar la encuesta.")
		}
	};

	return (
		<View style={encuesta.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isVisible}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<View style={encuesta.backgroundContainer}>
					{isLoading ? (
						<View style={encuesta.modalContainer}>
							<LoadingContent />
						</View>
					) : (
						<View style={encuesta.modalContainer}>
							{/* Title */}
							<Text style={encuesta.titleText}>
								{surveyData.titulo}
							</Text>

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
								contentContainerStyle={
									encuesta.listContentContainer
								}
							/>

							{/* Buttons */}
							<View style={encuesta.buttonsContainer}>
								<TouchableOpacity
									onPress={handleSurveySubmit}
									style={encuesta.confirmButton}
								>
									<Text style={encuesta.confirmButtonText}>
										Terminar encuesta
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onExit}
									style={encuesta.exitButton}
								>
									<Text style={encuesta.exitButtonText}>
										Volver
									</Text>
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

export default Encuesta;
