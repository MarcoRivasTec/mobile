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
} from "react-native";
import DatePicker from "react-native-date-picker";
import { solPermisos } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";
import DownArrow from "../../../Animations/DownArrow";
import DataPicker from "./DataPicker";
import DataModal from "./DataModal";
import { HomeContext } from "../../../HomeContext";
import LoadingContent from "../../../Animations/LoadingContent";
import Confirm from "../Design/Confirm";

function SolPermisos({ onCallback, isVacModalVisible, onExit }) {
	const { numEmp, sendRequisition } = useContext(HomeContext);
	const [isLoading, setIsLoading] = useState(false);
	const [days, setDays] = useState(1);
	const [coment, setComent] = useState("");

	const today = new Date();
	const [motive, setMotive] = useState("Selecciona un tipo");
	const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const typeHandler = () => {
		setIsTypeModalVisible(!isTypeModalVisible);
	};

	const requestPermiso = async () => {
		setIsLoading(true);
		if (days === 0) {
			Alert.alert("Error", "El número de días no puede ser 0");
			setIsLoading(false);
			return;
		}
		if (motive === "Selecciona un tipo") {
			Alert.alert("Error", "Debes seleccionar un motivo");
			setIsLoading(false);
			return;
		}

		const endDate = new Date(startDate);
		endDate.setDate(endDate.getDate() + parseInt(days, 10));

		const requisitionData = {
			letter: "PermisoDias",
			startDate: startDate,
			endDate: endDate,
			motive: motive,
			days: days,
		};

		if (coment !== "") {
			requisitionData.coment = coment;
		}

		const response = await sendRequisition(requisitionData);
		// const response = await sendRequisition({
		// 	letter: "PermisoDias",
		// 	startDate: startDate,
		// 	motive: motive,
		// 	days: days,
		// 	coment: coment === "" ? null : coment,
		// });
		console.log("Response at solpermisos: ", response);
		if (response === "Done") {
			confirmationModalHandler();
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto"
			);
		}
		setIsLoading(false);
	};

	const showTypes = (motive) => {
		switch (motive) {
			case "MAT":
				return "Matrimonio";
			case "TRA":
				return "Tramite / Cita";
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

	const [startDate, setStartDate] = useState(today);
	const [openStartDate, setOpenStartDate] = useState(false);

	const formatDateString = (date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};

	return (
		<View style={{ flex: 1 }}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isVacModalVisible}
				onRequestClose={onCallback}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
					accessible={false}
				>
					<View style={solPermisos.backgroundContainer}>
						<View style={solPermisos.modalContainer}>
							{isLoading ? (
								<View style={solPermisos.contentContainer}>
									<LoadingContent />
								</View>
							) : (
								<View style={solPermisos.contentContainer}>
									{/* Title */}
									<View style={solPermisos.titleContainer}>
										<Text style={solPermisos.titleText}>
											Solicitud de Permisos
										</Text>
									</View>

									{/* Fechas */}
									<View style={solPermisos.fechasContainer}>
										{/* Fecha inicio */}
										<View
											style={solPermisos.fechaContainer}
										>
											{/* Fecha title */}
											<View
												style={
													solPermisos.fechaTitleContainer
												}
											>
												<Text
													style={
														solPermisos.fechaTitle
													}
												>
													Fecha Inicio
												</Text>
											</View>
											{/* Fecha button */}
											<View
												style={
													solPermisos.fechaDateContainer
												}
											>
												<TouchableOpacity
													onPress={() =>
														setOpenStartDate(true)
													}
													style={
														solPermisos.fechaButton
													}
												>
													<Text
														style={
															solPermisos.fechaText
														}
													>
														{formatDateString(
															startDate
														)}
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
										<View style={solPermisos.diasContainer}>
											<View
												style={[
													solPermisos.fechaTitleContainer,
													{ alignItems: "center" },
												]}
											>
												<Text
													style={
														solPermisos.fechaTitle
													}
												>
													Días
												</Text>
											</View>
											<View
												style={
													solPermisos.diasBottomContainer
												}
											>
												<View
													style={
														solPermisos.diasTextContainer
													}
												>
													<TextInput
														style={
															solPermisos.diasTextField
														}
														placeholder="#"
														keyboardType="number-pad"
														inputMode="numeric"
														value={days.toString()}
														onChangeText={daysInput}
														maxLength={3}
													></TextInput>
												</View>
											</View>
										</View>
									</View>

									{/* Tipo */}
									<View style={solPermisos.tipoContainer}>
										<View
											style={
												solPermisos.tipoTitleContainer
											}
										>
											<Text
												style={
													solPermisos.tipoTitleText
												}
											>
												Tipo
											</Text>
										</View>
										{Platform.OS === "ios" ? (
											<TouchableOpacity
												onPress={typeHandler}
												style={solPermisos.tipoField}
											>
												<Text
													style={solPermisos.tipoText}
												>
													{showTypes(motive)}
												</Text>
												<View
													style={
														solPermisos.tipoIconContainer
													}
												>
													<DownArrow />
												</View>
											</TouchableOpacity>
										) : (
											<View
												style={[
													solPermisos.tipoField,
													{ width: "100%" },
												]}
											>
												<DataPicker
													selectedElement={motive}
													setSelectedElement={
														setMotive
													}
													style={{
														height: "100%",
														width: "100%",
													}}
												/>
											</View>
										)}
									</View>

									{/* Comentarios */}
									<View
										style={solPermisos.comentariosContainer}
									>
										<Text
											style={solPermisos.comentariosTitle}
										>
											Comentarios
										</Text>
										<TextInput
											placeholder="Tu comentario aquí ..."
											style={
												solPermisos.comentariosTitleText
											}
											multiline={true}
											numberOfLines={5}
											maxLength={255}
											value={coment}
											onChangeText={(text) =>
												setComent(text)
											}
										></TextInput>
									</View>

									{/* Back button */}
									<View style={solPermisos.buttonsContainer}>
										<TouchableOpacity
											onPress={requestPermiso}
											style={[
												solPermisos.button,
												{
													backgroundColor:
														COLORS.green,
												},
											]}
										>
											<Text
												style={solPermisos.buttonText}
											>
												Solicitar
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={onExit}
											style={[
												solPermisos.button,
												{
													backgroundColor:
														COLORS.naranja,
												},
											]}
										>
											<Text
												style={solPermisos.buttonText}
											>
												Volver
											</Text>
										</TouchableOpacity>
									</View>
								</View>
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
								/>
							)}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}

export default SolPermisos;
