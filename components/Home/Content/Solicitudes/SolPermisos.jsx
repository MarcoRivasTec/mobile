import React, { useContext, useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	Alert,
	InteractionManager,
} from "react-native";
import DatePicker from "react-native-date-picker";

import { solPermisos } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";
import DownArrow from "../../../Animations/DownArrow";
import DataPicker from "./DataPicker";
import DataModal from "./DataModal";
import LoadingContent from "../../../Animations/LoadingContent";
import Confirm from "../Design/Confirm";
import Working from "../Design/Working";
import fetchPost from "../../../fetching";
import { HomeContext } from "../../../HomeContext";

const REQUEST_TYPE = {
	PERMISO: 1,
	VACACIONES: 2,
};

const PERMISSION_MOTIVE = {
	MAT: 1, // Matrimonio
	TRA: 2, // Trámite / Cita
	PER: 3, // Asunto personal
	NAC: 4, // Nacimiento hijo(a)
};

function toDateOnlyString(date) {
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`.padStart(2, "0");
	const day = `${date.getDate()}`.padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function addDays(date, daysToAdd) {
	const result = new Date(date);
	result.setDate(result.getDate() + daysToAdd);

	return result;
}

function formatDateString(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

function SolPermisos({ onCallback, isVacModalVisible, onExit }) {
	const { accessToken } = useContext(HomeContext);

	const [isLoading, setIsLoading] = useState(false);
	const [days, setDays] = useState("1");
	const [comment, setComent] = useState("");

	const today = new Date();

	const [startDate, setStartDate] = useState(today);
	const [openStartDate, setOpenStartDate] = useState(false);

	const [motive, setMotive] = useState("Selecciona un tipo");
	const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);

	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible((current) => !current);
	}

	const typeHandler = () => {
		setIsTypeModalVisible((current) => !current);
	};

	const showTypes = (selectedMotive) => {
		switch (selectedMotive) {
			case "MAT":
				return "Matrimonio";
			case "TRA":
				return "Trámite / Cita";
			case "PER":
				return "Asunto Personal";
			case "NAC":
				return "Nacimiento hijo(a)";
			default:
				return "Selecciona un tipo";
		}
	};

	const daysInput = (input) => {
		if (/^\d*$/.test(input)) {
			setDays(input);
		}
	};

	const requestPermiso = async () => {
		try {
			const parsedDays = parseInt(days, 10);

			if (!parsedDays || parsedDays <= 0) {
				Alert.alert("Error", "El número de días debe ser mayor a 0");
				setIsLoading(false);
				return;
			}

			if (motive === "Selecciona un tipo") {
				Alert.alert("Error", "Debes seleccionar un motivo");
				setIsLoading(false);
				return;
			}

			const motiveId = PERMISSION_MOTIVE[motive];

			if (!motiveId) {
				Alert.alert("Error", "El motivo seleccionado no es válido");
				setIsLoading(false);
				return;
			}

			const endDate = addDays(startDate, parsedDays - 1);

			setIsWorkingModalVisible(true);

			const mutation = {
				query: `mutation SendAbsenceRequest($input: RequestAbsenceInput!) {
					requestAbsence(input: $input) {
						success
						message
					}
				}`,
				variables: {
					input: {
						type: REQUEST_TYPE.PERMISO,
						start_date: toDateOnlyString(startDate),
						end_date: toDateOnlyString(endDate),
						days: parsedDays,
						motive: motiveId,
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
			console.error("Error requesting permission absence:", error);
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
					<View style={solPermisos.backgroundContainer}>
						<View style={solPermisos.modalContainer}>
							{isLoading ? (
								<View style={solPermisos.contentContainer}>
									<LoadingContent />
								</View>
							) : (
								<View style={solPermisos.contentContainer}>
									<View style={solPermisos.titleContainer}>
										<Text style={solPermisos.titleText}>
											Solicitud de Permiso
										</Text>
									</View>

									<View style={solPermisos.fechasContainer}>
										<View style={solPermisos.fechaContainer}>
											<View style={solPermisos.fechaTitleContainer}>
												<Text style={solPermisos.fechaTitle}>Fecha Inicio</Text>
											</View>

											<View style={solPermisos.fechaDateContainer}>
												<TouchableOpacity
													onPress={() => setOpenStartDate(true)}
													style={solPermisos.fechaButton}
												>
													<Text style={solPermisos.fechaText}>
														{formatDateString(startDate)}
													</Text>

													<Icon
														name="calendar"
														size={18}
														color="gray"
														style={solPermisos.icon}
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
													}}
													onCancel={() => {
														setOpenStartDate(false);
													}}
												/>
											</View>
										</View>

										<View style={solPermisos.diasContainer}>
											<View
												style={[
													solPermisos.fechaTitleContainer,
													{ alignItems: "center" },
												]}
											>
												<Text style={solPermisos.fechaTitle}>Días</Text>
											</View>

											<View style={solPermisos.diasBottomContainer}>
												<View style={solPermisos.diasTextContainer}>
													<TextInput
														style={solPermisos.diasTextField}
														placeholder="#"
														keyboardType="number-pad"
														inputMode="numeric"
														value={days.toString()}
														onChangeText={daysInput}
														maxLength={3}
													/>
												</View>
											</View>
										</View>
									</View>

									<View style={solPermisos.tipoContainer}>
										<View style={solPermisos.tipoTitleContainer}>
											<Text style={solPermisos.tipoTitleText}>Motivo</Text>
										</View>

										{Platform.OS === "ios" ? (
											<TouchableOpacity
												onPress={typeHandler}
												style={solPermisos.tipoField}
											>
												<Text style={solPermisos.tipoText}>
													{showTypes(motive)}
												</Text>

												<View style={solPermisos.tipoIconContainer}>
													<DownArrow />
												</View>
											</TouchableOpacity>
										) : (
											<View
												style={[
													solPermisos.tipoField,
													{ width: "100%", zIndex: 10 },
												]}
											>
												<DataPicker
													selectedElement={motive}
													setSelectedElement={setMotive}
												/>
											</View>
										)}
									</View>

									<View style={solPermisos.comentariosContainer}>
										<Text style={solPermisos.comentariosTitle}>
											Comentarios
										</Text>

										<TextInput
											placeholder="Tu comentario aquí ..."
											placeholderTextColor="gray"
											style={solPermisos.comentariosTitleText}
											multiline={true}
											numberOfLines={5}
											maxLength={200}
											value={comment}
											onChangeText={(text) => setComent(text)}
										/>
									</View>

									<View style={solPermisos.buttonsContainer}>
										<TouchableOpacity
											onPress={requestPermiso}
											style={[
												solPermisos.button,
												{
													backgroundColor: COLORS.green,
												},
											]}
										>
											<Text style={solPermisos.buttonText}>Solicitar</Text>
										</TouchableOpacity>

										<TouchableOpacity
											onPress={onExit}
											style={[
												solPermisos.button,
												{
													backgroundColor: COLORS.naranja,
												},
											]}
										>
											<Text style={solPermisos.buttonText}>Volver</Text>
										</TouchableOpacity>
									</View>

									{isWorkingModalVisible && (
										<Working isModalVisible={isWorkingModalVisible} />
									)}

									{isTypeModalVisible && (
										<DataModal
											selectedElement={motive}
											setSelectedElement={setMotive}
											onCallback={typeHandler}
											isModalVisible={isTypeModalVisible}
											style={{
												position: "absolute",
												height: "100%",
												width: "100%",
											}}
										/>
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
								</View>
							)}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}

export default SolPermisos;
