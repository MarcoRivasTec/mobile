import React, { useState, useEffect, useContext } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { addMemberModal } from "./styles";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import Icon from "../../../icons";
import { AppContext } from "../../../../AppContext";
import LoadingContent from "../../../../Animations/LoadingContent";
import fetchPost from "../../../../fetching";

function AddMemberModal({ onCallback, onExit, updateData }) {
	const { numEmp } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
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

	// useEffect(() => {
	// 	console.log("Birth date is: ", birthDate);
	// }, [birthDate]);

	// useEffect(() => {
	// 	console.log("Parentesco is: ", typeof parentesco);
	// }, [parentesco]);

	// useEffect(() => {
	// 	console.log("Sexo is: ", sexo);
	// }, [sexo]);

	const handleRegister = () => {
		setIsLoading(true);

		if (nombre.trim() === "") {
			Alert.alert("Error", "El campo de nombre no puede estar vacío");
			setIsLoading(false);
			return;
		}
		if (apellidoMaterno.trim() === "") {
			Alert.alert(
				"Error",
				"El campo de apellido paterno no puede estar vacío"
			);
			setIsLoading(false);
			return;
		}
		if (apellidoPaterno.trim() === "") {
			Alert.alert(
				"Error",
				"El campo de apellido materno no puede estar vacío"
			);
			setIsLoading(false);
			return;
		}
		if (parentesco === "null") {
			Alert.alert("Error", "Se debe seleccionar un parentesco");
			setIsLoading(false);
			return;
		}
		if (sexo === "null") {
			Alert.alert("Error", "Se debe seleccionar un sexo");
			setIsLoading(false);
			return;
		}

		// console.log(
		// 	`Name is: ${nombre} ${apellidoPaterno} ${apellidoMaterno}, numEmp: ${+numEmp}`
		// );
		const addFamilyMemberCall = async () => {
			const fullName = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
			// console.log(
			// 	`Nombre: ${fullName}, numEmp: ${talla}, Num emp: ${empNum}`
			// );
			const addFamilyQuery = {
				query: `mutation addFamilyMember($numEmp: Int!, $name: String!, $kin: Int!, $sex: String!, $birth: String!) {
					addFamilyMember(numEmp: $numEmp, name: $name, kin: $kin, sex: $sex, birth: $birth)
				}`,
				variables: {
					numEmp: +numEmp,
					name: fullName,
					kin: +parentesco,
					sex: sexo,
					birth: birthDate,
				},
			};
			try {
				// console.log("updateTallas before passing: ", updateTallas);
				const data = await fetchPost({ query: addFamilyQuery });
				// console.log("Response data at add family member", data, typeof data.data.addFamilyMember);
				if (data.data.addFamilyMember) {
					Alert.alert("Informacion actualizada");
					updateData();
					onCallback();
				} else {
					Alert.alert("Error al añadir familiar");
				}
			} catch (error) {
				console.error("Error at add family member", error);
			} finally {
				setIsLoading(false); // Set loading to false after data is fetched
			}
			// setIsLoading(false); // Set loading to false after data is fetched
		};

		addFamilyMemberCall();
		setIsLoading(false); // Set loading to false after data is fetched
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
						{isLoading ? (
							<View
								style={[
									addMemberModal.contentContainer,
									{
										justifyContent: "center",
										alignItems: "center",
									},
								]}
							>
								<LoadingContent />
							</View>
						) : (
							<View style={addMemberModal.contentContainer}>
								{/* Title */}
								<View style={addMemberModal.titleContainer}>
									<Text style={addMemberModal.titleText}>
										Registrar pariente
									</Text>
								</View>

								{/* Nombres */}
								<View style={addMemberModal.nombresContainer}>
									<View
										style={
											addMemberModal.sectionTitleContainer
										}
									>
										<Text
											style={
												addMemberModal.sectionTitleText
											}
										>
											Nombre(s)
										</Text>
									</View>
									<View
										style={
											addMemberModal.nombreDataContainer
										}
									>
										<TextInput
											inputMode="text"
											onChangeText={setNombre}
											value={nombre}
											autoCapitalize="words"
											placeholder="Nombre (o nombres) aquí ..."
											style={
												addMemberModal.nombreDataText
											}
										></TextInput>
									</View>
								</View>

								{/* Apellidos */}
								<View style={addMemberModal.sectionContainer}>
									<View
										style={[
											addMemberModal.nombresContainer,
											{
												marginVertical: "0%",
												marginRight: "2%",
											},
										]}
									>
										<View
											style={[
												addMemberModal.sectionTitleContainer,
												{ left: 8 },
											]}
										>
											<Text
												style={
													addMemberModal.sectionTitleText
												}
											>
												Apellido Paterno
											</Text>
										</View>
										<View
											style={
												addMemberModal.nombreDataContainer
											}
										>
											<TextInput
												onChangeText={
													setApellidoPaterno
												}
												value={apellidoPaterno}
												autoCapitalize="words"
												style={
													addMemberModal.nombreDataText
												}
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
											style={[
												addMemberModal.sectionTitleContainer,
												{ left: 8 },
											]}
										>
											<Text
												style={
													addMemberModal.sectionTitleText
												}
											>
												Apellido Materno
											</Text>
										</View>
										<View
											style={
												addMemberModal.nombreDataContainer
											}
										>
											<TextInput
												onChangeText={
													setApellidoMaterno
												}
												value={apellidoMaterno}
												autoCapitalize="words"
												style={
													addMemberModal.nombreDataText
												}
												placeholder="Apellido materno aquí ..."
											></TextInput>
										</View>
									</View>
								</View>

								{/* Parentesco y Sexo */}
								<View style={addMemberModal.sectionContainer}>
									<View
										style={
											addMemberModal.parentescoContainer
										}
									>
										<View
											style={[
												addMemberModal.sectionTitleContainer,
												{ left: 8 },
											]}
										>
											<Text
												style={
													addMemberModal.sectionTitleText
												}
											>
												Parentesco
											</Text>
										</View>
										<View
											style={
												addMemberModal.parentescoDataContainer
											}
										>
											<Picker
												selectedValue={parentesco}
												onValueChange={(itemValue) =>
													setParentesco(itemValue)
												}
												itemStyle={
													addMemberModal.pickerItemStyle
												}
												style={
													addMemberModal.pickerParentesco
												}
											>
												<Picker.Item
													label="Selecciona"
													style={
														addMemberModal.pickerItemParentesco
													}
													value="{null}"
												/>
												<Picker.Item
													label="Hijo / Hija"
													style={
														addMemberModal.pickerItemParentesco
													}
													value={2}
												/>
												<Picker.Item
													label="Padre / Madre"
													style={
														addMemberModal.pickerItemParentesco
													}
													value={3}
												/>
												<Picker.Item
													label="Cónyuge"
													style={
														addMemberModal.pickerItemParentesco
													}
													value={1}
												/>
											</Picker>
										</View>
									</View>
									<View style={addMemberModal.sexoContainer}>
										<View
											style={[
												addMemberModal.sectionTitleContainer,
												{ left: 8 },
											]}
										>
											<Text
												style={
													addMemberModal.sectionTitleText
												}
											>
												Sexo
											</Text>
										</View>
										<View
											style={
												addMemberModal.sexoDataContainer
											}
										>
											<Picker
												selectedValue={sexo}
												onValueChange={(itemValue) =>
													setSexo(itemValue)
												}
												itemStyle={
													addMemberModal.pickerItemStyle
												}
												style={
													addMemberModal.pickerSexo
												}
											>
												<Picker.Item
													label="Selecciona"
													style={
														addMemberModal.pickerItemSexo
													}
													value="{null}"
												/>
												<Picker.Item
													label="Mujer"
													style={
														addMemberModal.pickerItemSexo
													}
													value="F"
												/>
												<Picker.Item
													label="Hombre"
													style={
														addMemberModal.pickerItemSexo
													}
													value="M"
												/>
											</Picker>
										</View>
									</View>
								</View>

								{/* Fecha Nacimiento */}
								<View
									style={addMemberModal.nacimientoContainer}
								>
									<View
										style={
											addMemberModal.sectionTitleContainer
										}
									>
										<Text
											style={
												addMemberModal.sectionTitleText
											}
										>
											Fecha de Nacimiento
										</Text>
									</View>
									<View
										style={
											addMemberModal.nacimientoDataContainer
										}
									>
										<TouchableOpacity
											onPress={() =>
												setOpenBirthDate(true)
											}
											style={addMemberModal.fechaButton}
										>
											<Text
												style={addMemberModal.fechaText}
											>
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
										<Text
											style={
												addMemberModal.registrarButtonText
											}
										>
											Registrar
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={onExit}
										style={addMemberModal.exitButton}
									>
										<Text
											style={
												addMemberModal.exitButtonText
											}
										>
											Volver
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default AddMemberModal;
