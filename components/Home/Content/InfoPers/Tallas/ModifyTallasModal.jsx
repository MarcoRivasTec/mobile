import React, { useContext, useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import { modifyTallasModal } from "./styles";
import { Picker } from "@react-native-picker/picker";
import LoadingContent from "../../../../Animations/LoadingContent";
import fetchPost from "../../../../fetching";
import { AppContext } from "../../../../AppContext";
import Working from "../../Design/Working";

function ModifyTallasModal({ data, list, onCallback, onExit, updateData }) {
	const { numEmp, region } = useContext(AppContext);
	const empNum = parseInt(numEmp, 10);
	const [isLoading, setIsLoading] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);
	const [selectedPlayera, setSelectedPlayera] = useState(data.playera);
	const [selectedPantalon, setSelectedPantalon] = useState(data.pantalon);
	const [selectedCalzado, setSelectedCalzado] = useState(data.calzado);

	// useEffect(() => {
	// 	console.log("Selected playera: ", selectedPlayera);
	// 	console.log("Type: ", typeof selectedPlayera);
	// }, [selectedPlayera]);
	// useEffect(() => {
	// 	console.log("Selected pantalon: ", selectedPantalon);
	// 	console.log("Type: ", typeof selectedPantalon);
	// }, [selectedPantalon]);
	// useEffect(() => {
	// 	console.log("Selected calzado: ", selectedCalzado);
	// 	console.log("Type: ", typeof selectedCalzado);
	// }, [selectedCalzado]);

	const handleSave = async () => {
		setIsWorkingModalVisible(true);

		let count = 0;
		const updateTallasAndFetch = async (tipo, talla) => {
			// console.log(`Tipo: ${tipo}, Talla: ${talla}, Num emp: ${empNum}`);
			const updateTallas = {
				query: `mutation updateMeasurements($numEmp: Int!, $region: String!, $type: String!, $size: String!) {
					updateMeasurements(numEmp: $numEmp, region: $region, type: $type, size: $size)
				}`,
				variables: {
					numEmp: empNum,
					region: region,
					type: tipo,
					size: talla,
				},
			};
			try {
				// console.log("updateTallas before passing: ", updateTallas);
				const data = await fetchPost({ query: updateTallas });
				setIsWorkingModalVisible(false);
				// console.log("Response data at update tallas", data);
				if (data.data.updateMeasurements) {
					// Alert.alert("Informacion actualizada")
				} else {
					console.warn("Error updating measurements");
				}
			} catch (error) {
				console.error("Error at modify tallas", error);
			} finally {
			}
		};

		if (data.playera !== selectedPlayera) {
			count++;
			// console.log("Enters playera");
			await updateTallasAndFetch("1", selectedPlayera);
		}
		if (data.pantalon !== selectedPantalon) {
			count++;
			// console.log("Enters pantalon");
			await updateTallasAndFetch("3", selectedPantalon);
		}
		if (data.calzado !== selectedCalzado) {
			count++;
			// console.log("Enters calzado");
			await updateTallasAndFetch("2", selectedCalzado);
		}

		if (count > 0) {
			Alert.alert("Informacion actualizada");
			updateData();
			onCallback();
		} else {
			Alert.alert("No se modificaron tallas");
		}
	};

	return (
		<View style={modifyTallasModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<View style={modifyTallasModal.backgroundContainer}>
					<View style={modifyTallasModal.modalContainer}>
						{isLoading ? (
							<View
								style={[
									modifyTallasModal.contentContainer,
									{
										justifyContent: "center",
										alignItems: "center",
									},
								]}
							>
								<LoadingContent />
							</View>
						) : (
							<View style={modifyTallasModal.contentContainer}>
								{/* Title */}
								<View style={modifyTallasModal.titleContainer}>
									<Text style={modifyTallasModal.titleText}>
										Registro de tallas
									</Text>
								</View>

								{/* Playera */}
								<View
									style={modifyTallasModal.sectionContainer}
								>
									<View
										style={
											modifyTallasModal.sectionTitleContainer
										}
									>
										<Text
											style={
												modifyTallasModal.sectionTitleText
											}
										>
											Talla Playera
										</Text>
									</View>
									<View
										style={
											modifyTallasModal.tallaDataContainer
										}
									>
										<Picker
											selectedValue={selectedPlayera}
											onValueChange={(itemValue) =>
												setSelectedPlayera(itemValue)
											}
											itemStyle={
												modifyTallasModal.pickerItemStyle
											}
											style={
												modifyTallasModal.pickerTalla
											}
										>
											<Picker.Item
												label="Selecciona"
												style={
													modifyTallasModal.pickerItemTalla
												}
												value="{null}"
											/>
											{list
												.filter(
													(item) => item.tipo === 1
												)
												.map((item, index) => (
													<Picker.Item
														key={index}
														label={`MEX: ${item.medida} | USA: ${item.eu_medida}`}
														style={
															modifyTallasModal.pickerItemTalla
														}
														value={item.medida}
													/>
												))}
										</Picker>
									</View>
								</View>

								{/* Pantalon */}
								<View
									style={modifyTallasModal.sectionContainer}
								>
									<View
										style={
											modifyTallasModal.sectionTitleContainer
										}
									>
										<Text
											style={
												modifyTallasModal.sectionTitleText
											}
										>
											Talla Pantalón
										</Text>
									</View>
									<View
										style={
											modifyTallasModal.tallaDataContainer
										}
									>
										<Picker
											selectedValue={selectedPantalon}
											onValueChange={(itemValue) =>
												setSelectedPantalon(itemValue)
											}
											itemStyle={
												modifyTallasModal.pickerItemStyle
											}
											style={
												modifyTallasModal.pickerTalla
											}
										>
											<Picker.Item
												label="Selecciona"
												style={
													modifyTallasModal.pickerItemTalla
												}
												value="{null}"
											/>
											{list
												.filter(
													(item) => item.tipo === 3
												)
												.map((item, index) => (
													<Picker.Item
														key={index}
														label={`MEX | USA: ${item.medida}`}
														style={
															modifyTallasModal.pickerItemTalla
														}
														value={item.medida}
													/>
												))}
										</Picker>
									</View>
								</View>

								{/* Calzado */}
								<View
									style={modifyTallasModal.sectionContainer}
								>
									<View
										style={
											modifyTallasModal.sectionTitleContainer
										}
									>
										<Text
											style={
												modifyTallasModal.sectionTitleText
											}
										>
											Talla Calzado
										</Text>
									</View>
									<View
										style={
											modifyTallasModal.tallaDataContainer
										}
									>
										<Picker
											selectedValue={selectedCalzado}
											onValueChange={(itemValue) =>
												setSelectedCalzado(itemValue)
											}
											itemStyle={
												modifyTallasModal.pickerItemStyle
											}
											style={
												modifyTallasModal.pickerTalla
											}
										>
											<Picker.Item
												label="Selecciona"
												style={
													modifyTallasModal.pickerItemTalla
												}
												value="{null}"
											/>
											{list
												.filter(
													(item) => item.tipo === 2
												)
												.map((item, index) => (
													<Picker.Item
														key={index}
														label={`MEX: ${item.medida} | USA: ${item.eu_medida}`}
														style={
															modifyTallasModal.pickerItemTalla
														}
														value={item.medida}
													/>
												))}
										</Picker>
									</View>
								</View>

								{/* Buttons */}
								<View
									style={modifyTallasModal.buttonsContainer}
								>
									<TouchableOpacity
										onPress={handleSave}
										style={
											modifyTallasModal.registrarButton
										}
									>
										<Text
											style={
												modifyTallasModal.registrarButtonText
											}
										>
											Registrar
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={onExit}
										style={modifyTallasModal.exitButton}
									>
										<Text
											style={
												modifyTallasModal.exitButtonText
											}
										>
											Volver
										</Text>
									</TouchableOpacity>
								</View>

								{isWorkingModalVisible && (
									<Working
										isModalVisible={isWorkingModalVisible}
									/>
								)}
							</View>
						)}
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default ModifyTallasModal;
