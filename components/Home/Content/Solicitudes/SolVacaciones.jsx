import React, { useState, useEffect, useContext } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
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

function SolVacaciones({ onCallback, isVacModalVisible, onExit }) {
	const { numEmp, region } = useContext(AppContext);
	const { sendRequisition } = useContext(HomeContext);
	const today = new Date();
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const [diasVacs, setDiasVacs] = useState({
		ganados: 0,
		tomados: 0,
		disponibles: 0,
	});

	const [coment, setComent] = useState("");
	const [isLoading, setIsLoading] = useState("false");
	const [startDate, setStartDate] = useState(today);
	const [openStartDate, setOpenStartDate] = useState(false);

	const [endDate, setEndDate] = useState(tomorrow);
	const [openEndDate, setOpenEndDate] = useState(false);

	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const query = {
			query: `query Vacaciones($numEmp: String!, $region: String!){
				Vacaciones(numEmp: $numEmp, region: $region) {
					diasvacs {
						ganados
						tomados
						disponibles
					}
				}
			}`,
			variables: {
				numEmp: numEmp,
				region: region,
			},
		};
		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				console.log(
					"Response data at vacaciones:",
					data.data.Vacaciones.diasvacs
				);
				if (data.data.Vacaciones) {
					setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving vacaciones information");
				}
			} catch (error) {
				console.error("Error at vacaciones:", error);
			}
		};
		fetchData();
		setIsLoading(false); // Set loading to false after data is fetched
		console.log(diasVacs);
	}, []);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	function formatDateString(date) {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}

	const requestVacaciones = async () => {
		// if (diasVacs.disponibles <= 0) {
		// 	Alert.alert("Error", "No tienes días disponibles para vacaciones");
		// 	return;
		// }
		if (endDate < startDate) {
			Alert.alert("Error", "La fecha final no puede ser anterior a la inicial");
			return;
		}
		// if (endDate + 1 - startDate > diasVacs.disponibles) {
		// 	Alert.alert(
		// 		"Error",
		// 		"El periodo seleccionado excede los días disponibles"
		// 	);
		// 	return;
		// }
		setIsWorkingModalVisible(true);
		const requisitionData = {
			letter: "Vacaciones",
			startDate: startDate,
			endDate: endDate,
			days: endDate.getDate() - startDate.getDate(),
		};

		if (coment !== "") {
			requisitionData.coment = coment;
		}
		const response = await sendRequisition(requisitionData);
		// console.log("Response requestGafete: ", response);
		setIsWorkingModalVisible(false);
		if (response === "Done") {
			confirmationModalHandler();
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto"
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
									{/* Title */}
									<View style={solVacaciones.titleContainer}>
										<Text style={solVacaciones.titleText}>
											Solicitud de Vacaciones
										</Text>
									</View>

									{/* Cantidades */}
									<View style={solVacaciones.cantidadContainer}>
										{/* Dias derecho */}
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
													{diasVacs.ganados.toFixed(2)}
												</Text>
											</View>
										</TouchableOpacity>
										{/* Dias pagados */}
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
													{diasVacs.tomados.toFixed(2)}
												</Text>
											</View>
										</TouchableOpacity>
										{/* Saldo actual */}
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
													{diasVacs.disponibles.toFixed(2)}
												</Text>
											</View>
										</TouchableOpacity>
									</View>

									{/* Fechas */}
									<View style={solVacaciones.fechasContainer}>
										{/* Fecha inicio */}
										<View style={solVacaciones.fechaContainer}>
											{/* Fecha title */}
											<View style={solVacaciones.fechaTitleContainer}>
												<Text style={solVacaciones.fechaTitle}>
													Fecha Inicio
												</Text>
											</View>
											{/* Fecha button */}
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
													// minimumDate={today}
													onConfirm={(startDate) => {
														setOpenStartDate(false);
														setStartDate(startDate);
													}}
													onCancel={() => {
														setOpenStartDate(false);
													}}
												/>
											</View>
										</View>
										{/* Dias Container */}
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
														{endDate.getDate() - startDate.getDate()}
													</Text>
												</View>
												<View style={solVacaciones.diasSeparatorContainer}>
													<Text style={solVacaciones.diasSeparator}>→</Text>
												</View>
											</View>
										</View>
										{/* Fecha Regreso */}
										<View style={solVacaciones.fechaContainer}>
											<View style={solVacaciones.fechaTitleContainer}>
												<Text style={solVacaciones.fechaTitle}>
													Fecha Regreso
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
													// minimumDate={tomorrow}
													onConfirm={(endDate) => {
														setOpenEndDate(false);
														setEndDate(endDate);
													}}
													onCancel={() => {
														setOpenEndDate(false);
													}}
												/>
											</View>
										</View>
									</View>

									{/* Comentarios */}
									<View style={solVacaciones.comentariosContainer}>
										<Text style={solVacaciones.comentariosTitle}>
											Comentarios
										</Text>
										<TextInput
											placeholder="Tu comentario aquí ..."
											style={solVacaciones.comentariosText}
											maxLength={255}
											multiline={true}
											value={coment}
											onChangeText={(text) => setComent(text)}
										></TextInput>
									</View>

									{/* Back button */}
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
