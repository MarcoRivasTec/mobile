import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { addMemberModal } from "./styles";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import Icon from "../../../icons";

function AddMemberModal({ onCallback, onExit, onRegister }) {
	const [nombre, setNombre] = useState("");
	const [apellidoPaterno, setApellidoPaterno] = useState("");
	const [apellidoMaterno, setApellidoMaterno] = useState("");
	const [parentesco, setParentesco] = useState("null");
	const [sexo, setSexo] = useState("null");

	const today = new Date();
	const [birthDate, setBirthDate] = useState(today);
	const [openBirthDate, setOpenBirthDate] = useState(false);

	function formatDateString(date) {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	}

	const handleRegister = () => {
		const newPariente = {
			nombre,
			apellidoPaterno,
			apellidoMaterno,
			parentesco,
			sexo,
			fecha_nac: formatDateString(birthDate)
		};
		if (onRegister) {
			onRegister(newPariente);
			onCallback();
		}
		// Here you can call a prop function to update state in the parent component
		// For example: props.onRegister(newPariente);
	};

	return (
		<View style={addMemberModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<View style={addMemberModal.backgroundContainer}>
					<View style={addMemberModal.modalContainer}>
						<View style={addMemberModal.contentContainer}>
							{/* Title */}
							<View style={addMemberModal.titleContainer}>
								<Text style={addMemberModal.titleText}>Registrar pariente</Text>
							</View>

							{/* Nombres */}
							<View style={addMemberModal.nombresContainer}>
								<View style={addMemberModal.sectionTitleContainer}>
									<Text style={addMemberModal.sectionTitleText}>Nombre(s)</Text>
								</View>
								<View style={addMemberModal.nombreDataContainer}>
									<TextInput
										inputMode="text"
										onChangeText={setNombre}
										value={nombre}
										autoCapitalize="words"
										placeholder="Nombre (o nombres) aquí ..."
										style={addMemberModal.nombreDataText}
									></TextInput>
								</View>
							</View>

							{/* Apellidos */}
							<View style={addMemberModal.sectionContainer}>
								<View
									style={[
										addMemberModal.nombresContainer,
										{ marginVertical: "0%", marginRight: "2%" },
									]}
								>
									<View
										style={[addMemberModal.sectionTitleContainer, { left: 8 }]}
									>
										<Text style={addMemberModal.sectionTitleText}>
											Apellido Paterno
										</Text>
									</View>
									<View style={addMemberModal.nombreDataContainer}>
										<TextInput
											onChangeText={setApellidoPaterno}
											value={apellidoPaterno}
											autoCapitalize="words"
											style={addMemberModal.nombreDataText}
											placeholder="Apellido paterno aquí ..."
										></TextInput>
									</View>
								</View>
								<View
									style={[
										addMemberModal.nombresContainer,
										{ marginVertical: "0%" },
									]}
								>
									<View
										style={[addMemberModal.sectionTitleContainer, { left: 8 }]}
									>
										<Text style={addMemberModal.sectionTitleText}>
											Apellido Materno
										</Text>
									</View>
									<View style={addMemberModal.nombreDataContainer}>
										<TextInput
											onChangeText={setApellidoMaterno}
											value={apellidoMaterno}
											autoCapitalize="words"
											style={addMemberModal.nombreDataText}
											placeholder="Apellido materno aquí ..."
										></TextInput>
									</View>
								</View>
							</View>

							{/* Parentesco y Sexo */}
							<View style={addMemberModal.sectionContainer}>
								<View style={addMemberModal.parentescoContainer}>
									<View
										style={[addMemberModal.sectionTitleContainer, { left: 8 }]}
									>
										<Text style={addMemberModal.sectionTitleText}>
											Parentesco
										</Text>
									</View>
									<View style={addMemberModal.parentescoDataContainer}>
										<Picker
											selectedValue={parentesco}
											onValueChange={(itemValue) => setParentesco(itemValue)}
											itemStyle={addMemberModal.pickerItemStyle}
											style={addMemberModal.pickerParentesco}
										>
											<Picker.Item
												label="Selecciona"
												style={addMemberModal.pickerItemParentesco}
												value="{null}"
											/>
											<Picker.Item
												label="Hijo / Hija"
												style={addMemberModal.pickerItemParentesco}
												value="Hijo / Hija"
											/>
											<Picker.Item
												label="Padre / Madre"
												style={addMemberModal.pickerItemParentesco}
												value="Padre / Madre"
											/>
											<Picker.Item
												label="Cónyuge"
												style={addMemberModal.pickerItemParentesco}
												value="Cónyuge"
											/>
										</Picker>
									</View>
								</View>
								<View style={addMemberModal.sexoContainer}>
									<View
										style={[addMemberModal.sectionTitleContainer, { left: 8 }]}
									>
										<Text style={addMemberModal.sectionTitleText}>Sexo</Text>
									</View>
									<View style={addMemberModal.sexoDataContainer}>
										<Picker
											selectedValue={sexo}
											onValueChange={(itemValue) => setSexo(itemValue)}
											itemStyle={addMemberModal.pickerItemStyle}
											style={addMemberModal.pickerSexo}
										>
											<Picker.Item
												label="Selecciona"
												style={addMemberModal.pickerItemSexo}
												value="{null}"
											/>
											<Picker.Item
												label="Mujer"
												style={addMemberModal.pickerItemSexo}
												value="Mujer"
											/>
											<Picker.Item
												label="Hombre"
												style={addMemberModal.pickerItemSexo}
												value="Hombre"
											/>
										</Picker>
									</View>
								</View>
							</View>

							{/* Fecha Nacimiento */}
							<View style={addMemberModal.nacimientoContainer}>
								<View style={addMemberModal.sectionTitleContainer}>
									<Text style={addMemberModal.sectionTitleText}>
										Fecha de Nacimiento
									</Text>
								</View>
								<View style={addMemberModal.nacimientoDataContainer}>
									<TouchableOpacity
										onPress={() => setOpenBirthDate(true)}
										style={addMemberModal.fechaButton}
									>
										<Text style={addMemberModal.fechaText}>
											{formatDateString(birthDate)}
										</Text>
										<Icon
											name="calendar"
											size={16}
											color="gray"
											style={addMemberModal.icon}
										/>
									</TouchableOpacity>
									<DatePicker
										modal
										title="Selecciona el nacimiento"
										confirmText="Seleccionar"
										cancelText="Cancelar"
										mode="date"
										locale="es"
										open={openBirthDate}
										date={birthDate}
										maximumDate={today}
										onConfirm={(birthDate) => {
											setOpenBirthDate(false);
											setBirthDate(birthDate);
										}}
										onCancel={() => {
											setOpenBirthDate(false);
										}}
									/>
								</View>
							</View>

							{/* Buttons */}
							<View style={addMemberModal.buttonsContainer}>
								<TouchableOpacity
									onPress={handleRegister}
									style={addMemberModal.registrarButton}
								>
									<Text style={addMemberModal.registrarButtonText}>
										Registrar
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onExit}
									style={addMemberModal.exitButton}
								>
									<Text style={addMemberModal.exitButtonText}>Volver</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default AddMemberModal;
