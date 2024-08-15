import React, { useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { solPermisos } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";
import DownArrow from "../../../Animations/DownArrow";
import DataPicker from "./DataPicker";
import DataModal from "./DataModal";

function SolPermisos({ onCallback, isVacModalVisible, onExit }) {
	const today = new Date();
	const [type, setType] = useState("Selecciona un tipo");
	const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
	const typeHandler = () => {
		setIsTypeModalVisible(!isTypeModalVisible);
	};

	const showTypes = (type) => {
		switch (type) {
			case "M":
				return "Matrimonio";
			case "T":
				return "Tramite / Cita";
			case "P":
				return "Asunto Personal";
			case "N":
				return "Nacimiento hijo(a)";
			default:
				return "Selecciona un tipo";
		}
	};

	const [days, setDays] = useState(1);

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
									<View style={solPermisos.fechaContainer}>
										{/* Fecha title */}
										<View
											style={
												solPermisos.fechaTitleContainer
											}
										>
											<Text
												style={solPermisos.fechaTitle}
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
												style={solPermisos.fechaButton}
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
												style={solPermisos.fechaTitle}
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
										style={solPermisos.tipoTitleContainer}
									>
										<Text style={solPermisos.tipoTitleText}>
											Tipo
										</Text>
									</View>
									{Platform.OS === "ios" ? (
										<TouchableOpacity
											onPress={typeHandler}
											style={solPermisos.tipoField}
										>
											<Text style={solPermisos.tipoText}>
												{showTypes(type)}
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
												selectedElement={type}
												setSelectedElement={setType}
												style={{
													height: "100%",
													width: "100%",
												}}
											/>
										</View>
									)}
								</View>

								{/* Comentarios */}
								<View style={solPermisos.comentariosContainer}>
									<Text style={solPermisos.comentariosTitle}>
										Comentarios
									</Text>
									<TextInput
										placeholder="Tu comentario aquí ..."
										style={solPermisos.comentariosTitleText}
										multiline={true}
										numberOfLines={5}
									></TextInput>
								</View>

								{/* Back button */}
								<TouchableOpacity
									onPress={onExit}
									style={solPermisos.exitButton}
								>
									<Text style={solPermisos.textExitButton}>
										Volver
									</Text>
								</TouchableOpacity>
							</View>
							{isTypeModalVisible && (
								<DataModal
									selectedElement={type}
									setSelectedElement={setType}
									onCallback={typeHandler}
									isModalVisible={isTypeModalVisible}
									style={{
										position: "absolute",
										height: "100%",
										width: "100%",
									}}
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
