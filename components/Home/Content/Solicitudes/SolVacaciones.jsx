import React, { useContext, useEffect, useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	InteractionManager,
} from "react-native";
import DatePicker from "react-native-date-picker";

import { solVacaciones } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";
import Confirm from "../Design/Confirm";
import LoadingContent from "../../../Animations/LoadingContent";
import fetchPost from "../../../fetching";
import { HomeContext } from "../../../HomeContext";
import { AppContext } from "../../../AppContext";
import Working from "../Design/Working";

const REQUEST_TYPE = {
	PERMISO: 1,
	VACACIONES: 2,
};

function toDateOnlyString(date) {
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`.padStart(2, "0");
	const day = `${date.getDate()}`.padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function calculateInclusiveDays(startDate, endDate) {
	const start = new Date(startDate);
	const end = new Date(endDate);

	start.setHours(0, 0, 0, 0);
	end.setHours(0, 0, 0, 0);

	const diffMs = end.getTime() - start.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	return diffDays + 1;
}

function formatDateString(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

function SolVacaciones({ onCallback, isVacModalVisible, onExit }) {
	const { numEmp, region } = useContext(AppContext);
	const { accessToken } = useContext(HomeContext);

	const today = new Date();

	const [diasVacs, setDiasVacs] = useState({
		ganados: 0,
		tomados: 0,
		disponibles: 0,
	});

	const [comment, setComment] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [startDate, setStartDate] = useState(today);
	const [openStartDate, setOpenStartDate] = useState(false);

	const [endDate, setEndDate] = useState(today);
	const [openEndDate, setOpenEndDate] = useState(false);

	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);

	useEffect(() => {
		const fetchVacationDays = async () => {
			try {
				setIsLoading(true);

				const query = {
					query: `query Vacaciones($numEmp: String!, $region: String!) {
						Vacaciones(numEmp: $numEmp, region: $region) {
							diasvacs {
								ganados
								tomados
								disponibles
							}
						}
					}`,
					variables: {
						numEmp,
						region,
					},
				};

				const data = await fetchPost({ query, token: accessToken });

				if (data?.data?.Vacaciones?.diasvacs) {
					setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving vacaciones information");
				}
			} catch (error) {
				console.error("Error at vacaciones:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchVacationDays();
	}, [numEmp, region]);

	function confirmationModalHandler() {
		setConfirmationVisible((current) => !current);
	}

	const requestVacaciones = async () => {
		if (endDate < startDate) {
			Alert.alert("Error", "La fecha final no puede ser anterior a la inicial");
			return;
		}

		const totalDays = calculateInclusiveDays(startDate, endDate);

		if (totalDays <= 0) {
			Alert.alert("Error", "El número de días debe ser mayor a 0");
			return;
		}

		// Uncomment this again when you want to enforce vacation balance.
		// if (diasVacs.disponibles <= 0) {
		// 	Alert.alert("Error", "No tienes días disponibles para vacaciones");
		// 	return;
		// }
		//
		// if (totalDays > diasVacs.disponibles) {
		// 	Alert.alert(
		// 		"Error",
		// 		"El periodo seleccionado excede los días disponibles"
		// 	);
		// 	return;
		// }

		setIsWorkingModalVisible(true);

		try {
			const mutation = {
				query: `mutation SendAbsenceRequest($input: RequestAbsenceInput!) {
					requestAbsence(input: $input) {
						success
						message
					}
				}`,
				variables: {
					input: {
						type: REQUEST_TYPE.VACACIONES,
						start_date: toDateOnlyString(startDate),
						end_date: toDateOnlyString(endDate),
						days: totalDays,
						...(comment.trim() !== "" && {
							comment: comment.trim(),
						}),
					},
				},
			};

			console.log(
				"Variables for requestAbsence:",
				JSON.stringify(mutation.variables, null, 1),
			);

			const response = await fetchPost({
				query: mutation,
				token: accessToken,
			});

			setTimeout(() => {
				InteractionManager.runAfterInteractions(() => {
					setIsWorkingModalVisible(false);

					if (response?.data?.requestAbsence?.success) {
						confirmationModalHandler();
					} else {
						Alert.alert(
							"Error",
							response?.data?.requestAbsence?.message ||
								"Ocurrió un error al enviar la solicitud.",
						);
					}
				});
			}, 100);
		} catch (error) {
			console.error("Error requesting vacation absence:", error);
			setIsWorkingModalVisible(false);

			Alert.alert(
				"Error",
				"Ocurrió un error al enviar la solicitud. Por favor, inténtalo de nuevo.",
			);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isVacModalVisible}
				onRequestClose={onCallback}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View style={solVacaciones.backgroundContainer}>
						<View style={solVacaciones.modalContainer}>
							{isLoading ? (
								<View style={solVacaciones.contentContainer}>
									<LoadingContent />
								</View>
							) : (
								<View style={solVacaciones.contentContainer}>
									<View style={solVacaciones.titleContainer}>
										<Text style={solVacaciones.titleText}>
											Solicitud de Vacaciones
										</Text>
									</View>

									<View style={solVacaciones.cantidadContainer}>
										<TouchableOpacity
											style={solVacaciones.cantidadElementContainer}
										>
											<View style={solVacaciones.cantidadBox}>
												<Text style={solVacaciones.cantidadTitle}>
													Días Derecho
												</Text>
											</View>
											<View style={solVacaciones.cantidadBox}>
												<Text style={solVacaciones.cantidad}>
													{Number(diasVacs.ganados || 0).toFixed(2)}
												</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity
											style={[
												solVacaciones.cantidadElementContainer,
												{
													backgroundColor: COLORS.flatlistElement1,
												},
											]}
										>
											<View style={solVacaciones.cantidadBox}>
												<Text style={solVacaciones.cantidadTitle}>
													Días Pagados
												</Text>
											</View>
											<View style={solVacaciones.cantidadBox}>
												<Text style={solVacaciones.cantidad}>
													{Number(diasVacs.tomados || 0).toFixed(2)}
												</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity
											style={solVacaciones.cantidadElementContainer}
										>
											<View style={solVacaciones.cantidadBox}>
												<Text style={solVacaciones.cantidadTitle}>
													Saldo Actual
												</Text>
											</View>
											<View style={solVacaciones.cantidadBox}>
												<Text style={solVacaciones.cantidad}>
													{Number(diasVacs.disponibles || 0).toFixed(2)}
												</Text>
											</View>
										</TouchableOpacity>
									</View>

									<View style={solVacaciones.fechasContainer}>
										<View style={solVacaciones.fechaContainer}>
											<View style={solVacaciones.fechaTitleContainer}>
												<Text style={solVacaciones.fechaTitle}>
													Fecha Inicio
												</Text>
											</View>

											<View style={solVacaciones.fechaDateContainer}>
												<TouchableOpacity
													onPress={() => setOpenStartDate(true)}
													style={solVacaciones.fechaButton}
												>
													<Text style={solVacaciones.fechaText}>
														{formatDateString(startDate)}
													</Text>
													<Icon
														name="calendar"
														size={16}
														color="gray"
														style={solVacaciones.icon}
													/>
												</TouchableOpacity>

												<DatePicker
													modal
													title="Selecciona fecha inicial"
													confirmText="Seleccionar"
													cancelText="Cancelar"
													mode="date"
													locale="es"
													open={openStartDate}
													date={startDate}
													onConfirm={(selectedStartDate) => {
														setOpenStartDate(false);
														setStartDate(selectedStartDate);

														if (endDate < selectedStartDate) {
															setEndDate(selectedStartDate);
														}
													}}
													onCancel={() => {
														setOpenStartDate(false);
													}}
												/>
											</View>
										</View>

										<View style={solVacaciones.diasContainer}>
											<View style={solVacaciones.fechaTitleContainer}>
												<Text style={solVacaciones.fechaTitle}>Días</Text>
											</View>

											<View style={solVacaciones.diasBottomContainer}>
												<View style={solVacaciones.diasSeparatorContainer}>
													<Text style={solVacaciones.diasSeparator}>→</Text>
												</View>

												<View style={solVacaciones.diasTextContainer}>
													<Text style={solVacaciones.diasText}>
														{calculateInclusiveDays(startDate, endDate)}
													</Text>
												</View>

												<View style={solVacaciones.diasSeparatorContainer}>
													<Text style={solVacaciones.diasSeparator}>→</Text>
												</View>
											</View>
										</View>

										<View style={solVacaciones.fechaContainer}>
											<View style={solVacaciones.fechaTitleContainer}>
												<Text style={solVacaciones.fechaTitle}>
													Fecha Final
												</Text>
											</View>

											<View style={solVacaciones.fechaDateContainer}>
												<TouchableOpacity
													onPress={() => setOpenEndDate(true)}
													style={solVacaciones.fechaButton}
												>
													<Text style={solVacaciones.fechaText}>
														{formatDateString(endDate)}
													</Text>
													<Icon
														name="calendar"
														size={16}
														color="gray"
														style={solVacaciones.icon}
													/>
												</TouchableOpacity>

												<DatePicker
													modal
													title="Selecciona fecha final"
													confirmText="Seleccionar"
													cancelText="Cancelar"
													mode="date"
													locale="es"
													open={openEndDate}
													date={endDate}
													minimumDate={startDate}
													onConfirm={(selectedEndDate) => {
														setOpenEndDate(false);
														setEndDate(selectedEndDate);
													}}
													onCancel={() => {
														setOpenEndDate(false);
													}}
												/>
											</View>
										</View>
									</View>

									<View style={solVacaciones.comentariosContainer}>
										<Text style={solVacaciones.comentariosTitle}>
											Comentario
										</Text>

										<TextInput
											placeholder="Tu comentario aquí ..."
											placeholderTextColor="gray"
											style={solVacaciones.comentariosText}
											maxLength={200}
											multiline={true}
											value={comment}
											onChangeText={(text) => setComment(text)}
										/>
									</View>

									<View style={solVacaciones.buttonsContainer}>
										<TouchableOpacity
											onPress={requestVacaciones}
											style={[
												solVacaciones.button,
												{
													backgroundColor:
														diasVacs.disponibles <= 0
															? COLORS.flatlistElement1
															: COLORS.green,
												},
											]}
										>
											<Text style={solVacaciones.buttonText}>
												{diasVacs.disponibles <= 0 ? "Sin días" : "Solicitar"}
											</Text>
										</TouchableOpacity>

										<TouchableOpacity
											onPress={onExit}
											style={[
												solVacaciones.button,
												{
													backgroundColor: COLORS.naranja,
												},
											]}
										>
											<Text style={solVacaciones.buttonText}>Volver</Text>
										</TouchableOpacity>
									</View>
								</View>
							)}

							{ConfirmationVisible && (
								<Confirm
									isModalVisible={ConfirmationVisible}
									onCallback={confirmationModalHandler}
									onExit={confirmationModalHandler}
									closeModal={onExit}
									customTitle="Tu solicitud se ha registrado correctamente"
									customText="Contacta con tu departamento de RH para confirmarla."
								/>
							)}

							{isWorkingModalVisible && (
								<Working isModalVisible={isWorkingModalVisible} />
							)}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}

export default SolVacaciones;
