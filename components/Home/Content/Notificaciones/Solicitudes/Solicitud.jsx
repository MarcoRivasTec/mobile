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
import { getRequestStyle } from "./styles";
import { AppContext } from "../../../../AppContext";
import LoadingContent from "../../../../Animations/LoadingContent";
import fetchPost from "../../../../fetching";
import Confirm from "../../Design/Confirm";

function Solicitud({
	requestData,
	onCallback,
	onExit,
	isVisible,
	updateRequests,
}) {
	const { numEmp, region, platform } = useContext(AppContext);
	const statusBarHeight = platform === "ios" ? 20 : StatusBar.currentHeight;
	const request = getRequestStyle({ height: statusBarHeight });
	const [isLoading, setIsLoading] = useState(false);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	// const handleSurveySubmit = async () => {
	// 	if (validateSurveyCompletion()) {
	// 		// Build the payload
	// 		const mutationData = surveyQuestions.map((question) => ({
	// 			pregunta: question.codigo, // Question code
	// 			respuesta: answers[question.codigo], // User's answer
	// 		}));

	// 		// Construct the mutation
	// 		const mutation = {
	// 			query: `mutation SubmitSurvey($input: SubmitSurveyInput!) {
	//                         submitSurvey(input: $input) {
	//                             success
	//                             message
	//                         }
	//             }`,
	// 			variables: {
	// 				input: {
	// 					numEmp: numEmp, // Employee number
	// 					region: region,
	// 					request: +surveyData.request, // Survey ID
	// 					data: mutationData, // Questions and answers
	// 				},
	// 			},
	// 		};

	// 		try {
	// 			// Send the mutation
	// 			console.log(
	// 				"Variables for query are: ",
	// 				JSON.stringify(mutation.variables, null, 1)
	// 			);
	// 			const response = await fetchPost({ query: mutation });
	// 			console.log("Survey submission response:", response);

	// 			if (response.data.submitSurvey.success) {
	// 				await updateEncuestas();
	// 				confirmationModalHandler();
	// 			} else {
	// 				alert(
	// 					"Error al enviar la request: " + response.data.submitSurvey.message
	// 				);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error submitting survey:", error);
	// 			alert(
	// 				"Ocurrió un error al enviar la request. Por favor, inténtalo de nuevo."
	// 			);
	// 		}
	// 	} else {
	// 		Alert.alert(
	// 			"Importante",
	// 			"Debes responder a todas las preguntas para poder terminar la request."
	// 		);
	// 	}
	// };

	const handleRequest = async ({ action }) => {
		try {
			const mutation = {
				query: `mutation sendAbsenceRequest($input: HandleAbsenceRequestInput!) {
							handleAbsenceRequest(input: $input) {
								message
								success
							}
						}`,
				variables: {
					input: {
						numEmp: numEmp, // Employee number
						region: region,
						request_id: requestData.id,
						action: action,
						// comment: comment
					},
				},
			};

			// Send the mutation
			console.log(
				"Variables for query are: ",
				JSON.stringify(mutation.variables, null, 1)
			);
			const response = await fetchPost({ query: mutation });
			console.log("Survey submission response:", response);

			if (response.data.handleAbsenceRequest.success) {
				// Alert.alert("")
				// onExit();
				confirmationModalHandler();
			} else {
				Alert.alert(
					"Error",
					`La solicitud presento un error: ${response.data.handleAbsenceRequest.message}`
				);
			}
		} catch (error) {
			console.error("Error handling absence request:", error);
			alert(
				"Ocurrió un error al enviar la solicitud. Por favor, inténtalo de nuevo."
			);
		}
	};

	// const handleSurveySubmit = async () => {
	// 	if (validateSurveyCompletion()) {
	// 		// Build the payload
	// 		const mutationData = surveyQuestions.map((question) => ({
	// 			pregunta: question.codigo, // Question code
	// 			respuesta: answers[question.codigo], // User's answer
	// 		}));

	// 		// Construct the mutation
	// 		const mutation = {
	// 			query: `mutation SubmitSurvey($input: SubmitSurveyInput!) {
	//                         submitSurvey(input: $input) {
	//                             success
	//                             message
	//                         }
	//             }`,
	// 			variables: {
	// 				input: {
	// 					numEmp: numEmp, // Employee number
	// 					region: region,
	// 					encuesta: +surveyData.encuesta, // Survey ID
	// 					data: mutationData, // Questions and answers
	// 				},
	// 			},
	// 		};

	// 		try {
	// 			// Send the mutation
	// 			console.log(
	// 				"Variables for query are: ",
	// 				JSON.stringify(mutation.variables, null, 1)
	// 			);
	// 			const response = await fetchPost({ query: mutation });
	// 			console.log("Survey submission response:", response);

	// 			if (response.data.submitSurvey.success) {
	// 				await updateEncuestas();
	// 				confirmationModalHandler();
	// 			} else {
	// 				alert(
	// 					"Error al enviar la encuesta: " + response.data.submitSurvey.message
	// 				);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error submitting survey:", error);
	// 			alert(
	// 				"Ocurrió un error al enviar la encuesta. Por favor, inténtalo de nuevo."
	// 			);
	// 		}
	// 	} else {
	// 		Alert.alert(
	// 			"Importante",
	// 			"Debes responder a todas las preguntas para poder terminar la encuesta."
	// 		);
	// 	}
	// };

	const formatLongDate = (dateStr) => {
		if (!dateStr) return null;
		const date = new Date(dateStr);

		const dateOptions = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		const hourOptions = {
			hour: "2-digit",
			minute: "2-digit",
		};

		const formattedDate = date.toLocaleDateString("es-MX", dateOptions);
		const formattedHour = date.toLocaleTimeString("es-MX", hourOptions);

		const result = `${formattedDate
			.charAt(0)
			.toUpperCase()}${formattedDate.slice(1)} a las ${formattedHour}`;
		return result;
	};

	const formatShortDate = (dateStr) => {
		if (!dateStr) return null;
		const [day, month, year] = dateStr.split("-");
		const fecha = new Date(`${year}-${month}-${day}`);
		const opciones = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		const formateada = fecha.toLocaleDateString("es-MX", opciones);
		return formateada.charAt(0).toUpperCase() + formateada.slice(1);
	};

	const capitalizeWords = (text) => {
		if (!text) return "";
		return text
			.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	// console.log("Request data is: ", requestData);

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
							{/* Name */}
							<Text style={request.titleText}>
								{requestData.type === "VAC"
									? "Vacaciones"
									: requestData.type === "PER"
									? "Permiso"
									: "Sin tipo"}
							</Text>

							<View style={{ marginVertical: 10, width: "95%" }}>
								{requestData.name && (
									<Text style={request.label}>
										<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
											Nombre:
										</Text>{" "}
										{capitalizeWords(requestData.name)}
									</Text>
								)}
								<Text style={request.label}>
									<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
										Num. Reloj:
									</Text>{" "}
									{requestData.numEmp}
								</Text>

								<Text style={request.label}>
									<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
										Fecha de solicitud:
									</Text>{" "}
									{formatLongDate(requestData.request_date)}
								</Text>

								<Text style={request.label}>
									<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
										Inicio:
									</Text>{" "}
									{formatShortDate(requestData.start_date)}
								</Text>

								{requestData.type !== "PER" && requestData.end_date && (
									<Text style={request.label}>
										<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
											Fin:{" "}
										</Text>
										{formatShortDate(requestData.end_date)}
									</Text>
								)}

								<Text style={request.label}>
									<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
										Días solicitados:
									</Text>{" "}
									{requestData.total_days}
								</Text>

								<Text style={request.label}>
									<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
										Estado actual:
									</Text>{" "}
									{requestData.status}
								</Text>

								{requestData.motive && (
									<Text style={request.label}>
										<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
											Motivo:
										</Text>{" "}
										{requestData.motive}
									</Text>
								)}

								{requestData.comment && (
									<Text style={request.label}>
										<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
											Comentario:{" "}
										</Text>
										{requestData.comment}
									</Text>
								)}

								{/* Pre aprobación */}
								{requestData.pre_approved_by && (
									<Text style={request.label}>
										<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
											Pre aprobado por:
										</Text>{" "}
										{requestData.pre_approved_by} el{" "}
										{formatLongDate(requestData.pre_approval_date)}
									</Text>
								)}

								{/* Aprobación */}
								{requestData.approved_by && (
									<Text style={request.label}>
										<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
											Aprobado por:
										</Text>
										Text {requestData.approved_by} el{" "}
										{formatLongDate(requestData.approval_date)}
									</Text>
								)}

								{/* Rechazo */}
								{requestData.rejected_by && (
									<Text style={request.label}>
										<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
											Rechazado por:
										</Text>{" "}
										{requestData.rejected_by} el{" "}
										{formatLongDate(requestData.rejection_date)}
									</Text>
								)}

								{/* Cancelación */}
								{requestData.cancelled_by && (
									<Text style={request.label}>
										<Text style={{ fontFamily: "Montserrat-SemiBold" }}>
											Cancelado por:
										</Text>{" "}
										{requestData.cancelled_by} el{" "}
										{formatLongDate(requestData.cancellation_date)}
									</Text>
								)}
							</View>

							{/* Buttons */}
							<View style={request.buttonsContainer}>
								{(requestData.status === "Pendiente" ||
									requestData.status === "Pre-Aprobado") && (
									<TouchableOpacity
										onPress={() => handleRequest({ action: "approve" })}
										style={request.confirmButton}
									>
										<Text style={request.confirmButtonText}>
											Aprobar solicitud
										</Text>
									</TouchableOpacity>
								)}

								<TouchableOpacity onPress={onExit} style={request.exitButton}>
									<Text style={request.exitButtonText}>Volver</Text>
								</TouchableOpacity>
							</View>

							{ConfirmationVisible && (
								<Confirm
									isModalVisible={ConfirmationVisible}
									onCallback={confirmationModalHandler}
									onExit={confirmationModalHandler}
									closeModal={async () => {
										await updateRequests();
										onExit();
									}}
									customTitle="Solicitud procesada"
									customText="El usuario podrá revisar el estado de su solicitud"
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
