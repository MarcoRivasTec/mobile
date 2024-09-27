import React, { useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { solVacaciones } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";
import Confirm from "../Design/Confirm";

function SolVacaciones({ onCallback, isVacModalVisible, onExit }) {
	const today = new Date();
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	const [startDate, setStartDate] = useState(tomorrow);
	const [openStartDate, setOpenStartDate] = useState(false);

	const [endDate, setEndDate] = useState(tomorrow);
	const [openEndDate, setOpenEndDate] = useState(false);

	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

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
		if (selectedCheckbox === "") {
			Alert.alert("Error", "Debes seleccionar un motivo");
			return;
		}
		if (
			selectedCheckbox !== "Vencimiento" &&
			selectedCheckbox !== "Daño" &&
			folio === ""
		) {
			Alert.alert("Error", "Debes introducir un folio");
			return;
		}
		let response;
		switch (selectedCheckbox) {
			case "Vencimiento":
			case "Daño":
				response = await tarjetasRequisition({
					type: "Banorte",
					repMotive: selectedCheckbox,
				});
				break;
			case "Cajeros":
			case "Saldos":
			case "Robo":
			case "Extravio":
				response = await tarjetasRequisition({
					type: "Banorte",
					repMotive: selectedCheckbox,
					folio: folio,
				});
				break;

			default:
				break;
		}
		// console.log("Response requestGafete: ", response);
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
											<Text style={solVacaciones.cantidad}>18.00</Text>
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
											<Text style={solVacaciones.cantidad}>29.00</Text>
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
											<Text style={solVacaciones.cantidad}>-11.00</Text>
										</View>
									</TouchableOpacity>
								</View>

								{/* Fechas */}
								<View style={solVacaciones.fechasContainer}>
									{/* Fecha inicio */}
									<View style={solVacaciones.fechaContainer}>
										{/* Fecha title */}
										<View style={solVacaciones.fechaTitleContainer}>
											<Text style={solVacaciones.fechaTitle}>Fecha Inicio</Text>
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
												minimumDate={today}
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
													{endDate.getDate() - startDate.getDate() + 1}
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
												minimumDate={tomorrow}
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
									{/* <View style={solVacaciones.fechaTitlesContainer}>
									<View style={solVacaciones.fechaTitleContainer}>
										<Text style={solVacaciones.fechaTitle}>Fecha Inicio</Text>
									</View>
									<View
										style={[solVacaciones.fechaTitleContainer, { flex: 1 }]}
									>
										<Text style={solVacaciones.fechaTitle}>Días</Text>
									</View>
									<View style={solVacaciones.fechaTitleContainer}>
										<Text style={solVacaciones.fechaTitle}>Fecha Regreso</Text>
									</View>
								</View>
								<View style={solVacaciones.fechaRowContainer}>
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
											minimumDate={today}
											onConfirm={(startDate) => {
												setOpenStartDate(false);
												setStartDate(startDate);
											}}
											onCancel={() => {
												setOpenStartDate(false);
											}}
										/>
									</View>
									<Text>•</Text>
									<View style={solVacaciones.diasContainer}>
										<Text style={solVacaciones.diasText}>
											{endDate.getDate() - startDate.getDate() + 1}
										</Text>
									</View>
									<Text>•</Text>
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
											minimumDate={tomorrow}
											onConfirm={(endDate) => {
												setOpenEndDate(false);
												setEndDate(endDate);
											}}
											onCancel={() => {
												setOpenEndDate(false);
											}}
										/>
									</View>
								</View> */}
								</View>

								{/* Comentarios */}
								<View style={solVacaciones.comentariosContainer}>
									<Text style={solVacaciones.comentariosTitle}>
										Comentarios
									</Text>
									<TextInput
										placeholder="Tu comentario aquí ..."
										style={solVacaciones.comentariosTitleText}
										multiline={true}
										numberOfLines={5}
									></TextInput>
								</View>

								{/* Back button */}
								<TouchableOpacity
									onPress={onExit}
									style={solVacaciones.exitButton}
								>
									<Text style={solVacaciones.textExitButton}>Volver</Text>
								</TouchableOpacity>
							</View>
							{ConfirmationVisible && (
								<Confirm
									isModalVisible={ConfirmationVisible}
									onCallback={confirmationModalHandler}
									onExit={confirmationModalHandler}
									closeModal={onExit}
								/>
							)}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}

export default SolVacaciones;
