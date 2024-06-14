import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { modifyTallasModal } from "./styles";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import Icon from "../../../icons";

function ModifyTallasModal({
	onCallback,
	onExit,
	tallasPrendas,
	setTallasPrendas,
}) {
	const [selectedPlayera, setSelectedPlayera] = useState(tallasPrendas.playera);
	const [selectedPantalon, setSelectedPantalon] = useState(
		tallasPrendas.pantalon
	);
	const [selectedCalzado, setSelectedCalzado] = useState(tallasPrendas.calzado);

	const handleRegister = () => {
		// Update the playera value in the parent component state
		setTallasPrendas({
			...tallasPrendas,
			playera: selectedPlayera,
			pantalon: selectedPantalon,
			calzado: selectedCalzado,
		});
		onCallback();
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
						<View style={modifyTallasModal.contentContainer}>
							{/* Title */}
							<View style={modifyTallasModal.titleContainer}>
								<Text style={modifyTallasModal.titleText}>
									Registro de tallas
								</Text>
							</View>

							{/* Playera */}
							<View style={modifyTallasModal.sectionContainer}>
								<View style={modifyTallasModal.sectionTitleContainer}>
									<Text style={modifyTallasModal.sectionTitleText}>
										Talla Playera
									</Text>
								</View>
								<View style={modifyTallasModal.tallaDataContainer}>
									<Picker
										selectedValue={selectedPlayera}
										onValueChange={(itemValue) => setSelectedPlayera(itemValue)}
										itemStyle={modifyTallasModal.pickerItemStyle}
										style={modifyTallasModal.pickerTalla}
									>
										<Picker.Item
											label="Selecciona"
											style={modifyTallasModal.pickerItemTalla}
											value="{null}"
										/>
										<Picker.Item
											label="MEX: Extra Chico | USA: XS"
											style={modifyTallasModal.pickerItemTalla}
											value="XS"
										/>
										<Picker.Item
											label="MEX: Chico | USA: S"
											style={modifyTallasModal.pickerItemTalla}
											value="S"
										/>
										<Picker.Item
											label="MEX: Mediano | USA: M"
											style={modifyTallasModal.pickerItemTalla}
											value="M"
										/>
										<Picker.Item
											label="MEX: Grande | USA: L"
											style={modifyTallasModal.pickerItemTalla}
											value="L"
										/>
										<Picker.Item
											label="MEX: Extra Grande | USA: XL"
											style={modifyTallasModal.pickerItemTalla}
											value="XL"
										/>
										<Picker.Item
											label="MEX | USA: XXL"
											style={modifyTallasModal.pickerItemTalla}
											value="XXL"
										/>
										<Picker.Item
											label="MEX | USA: XXXL"
											style={modifyTallasModal.pickerItemTalla}
											value="XXXL"
										/>
									</Picker>
								</View>
							</View>

							{/* Pantalon */}
							<View style={modifyTallasModal.sectionContainer}>
								<View style={modifyTallasModal.sectionTitleContainer}>
									<Text style={modifyTallasModal.sectionTitleText}>
										Talla Pantalón
									</Text>
								</View>
								<View style={modifyTallasModal.tallaDataContainer}>
									<Picker
										selectedValue={selectedPantalon}
										onValueChange={(itemValue) =>
											setSelectedPantalon(itemValue)
										}
										itemStyle={modifyTallasModal.pickerItemStyle}
										style={modifyTallasModal.pickerTalla}
									>
										<Picker.Item
											label="Selecciona"
											style={modifyTallasModal.pickerItemTalla}
											value="{null}"
										/>
										<Picker.Item
											label="MEX | USA: 26x26"
											style={modifyTallasModal.pickerItemTalla}
											value="26x26"
										/>
										<Picker.Item
											label="MEX | USA: 26x28"
											style={modifyTallasModal.pickerItemTalla}
											value="26x28"
										/>
										<Picker.Item
											label="MEX | USA: 26x30"
											style={modifyTallasModal.pickerItemTalla}
											value="26x30"
										/>
										<Picker.Item
											label="MEX | USA: 26x32"
											style={modifyTallasModal.pickerItemTalla}
											value="26x32"
										/>
										<Picker.Item
											label="MEX | USA: 26x34"
											style={modifyTallasModal.pickerItemTalla}
											value="26x34"
										/>
										<Picker.Item
											label="MEX | USA: 28x26"
											style={modifyTallasModal.pickerItemTalla}
											value="28x26"
										/>
										<Picker.Item
											label="MEX | USA: 28x26"
											style={modifyTallasModal.pickerItemTalla}
											value="28x26"
										/>
										<Picker.Item
											label="MEX | USA: 28x28"
											style={modifyTallasModal.pickerItemTalla}
											value="28x28"
										/>
										<Picker.Item
											label="MEX | USA: 28x30"
											style={modifyTallasModal.pickerItemTalla}
											value="28x30"
										/>
										<Picker.Item
											label="MEX | USA: 28x32"
											style={modifyTallasModal.pickerItemTalla}
											value="28x32"
										/>
										<Picker.Item
											label="MEX | USA: 28x34"
											style={modifyTallasModal.pickerItemTalla}
											value="28x34"
										/>
										<Picker.Item
											label="MEX | USA: 30x26"
											style={modifyTallasModal.pickerItemTalla}
											value="30x26"
										/>
										<Picker.Item
											label="MEX | USA: 30x28"
											style={modifyTallasModal.pickerItemTalla}
											value="30x28"
										/>
										<Picker.Item
											label="MEX | USA: 30x30"
											style={modifyTallasModal.pickerItemTalla}
											value="30x30"
										/>
										<Picker.Item
											label="MEX | USA: 30x32"
											style={modifyTallasModal.pickerItemTalla}
											value="30x32"
										/>
										<Picker.Item
											label="MEX | USA: 30x34"
											style={modifyTallasModal.pickerItemTalla}
											value="30x34"
										/>
										<Picker.Item
											label="MEX | USA: 30x36"
											style={modifyTallasModal.pickerItemTalla}
											value="30x36"
										/>
										<Picker.Item
											label="MEX | USA: 32x26"
											style={modifyTallasModal.pickerItemTalla}
											value="32x26"
										/>
										<Picker.Item
											label="MEX | USA: 32x28"
											style={modifyTallasModal.pickerItemTalla}
											value="32x28"
										/>
										<Picker.Item
											label="MEX | USA: 32x30"
											style={modifyTallasModal.pickerItemTalla}
											value="32x30"
										/>
										<Picker.Item
											label="MEX | USA: 32x32"
											style={modifyTallasModal.pickerItemTalla}
											value="32x32"
										/>
										<Picker.Item
											label="MEX | USA: 32x34"
											style={modifyTallasModal.pickerItemTalla}
											value="32x34"
										/>
										<Picker.Item
											label="MEX | USA: 32x36"
											style={modifyTallasModal.pickerItemTalla}
											value="32x36"
										/>
										<Picker.Item
											label="MEX | USA: 34x26"
											style={modifyTallasModal.pickerItemTalla}
											value="34x26"
										/>
										<Picker.Item
											label="MEX | USA: 34x28"
											style={modifyTallasModal.pickerItemTalla}
											value="34x28"
										/>
										<Picker.Item
											label="MEX | USA: 34x30"
											style={modifyTallasModal.pickerItemTalla}
											value="34x30"
										/>
										<Picker.Item
											label="MEX | USA: 34x32"
											style={modifyTallasModal.pickerItemTalla}
											value="34x32"
										/>
										<Picker.Item
											label="MEX | USA: 34x34"
											style={modifyTallasModal.pickerItemTalla}
											value="34x34"
										/>
										<Picker.Item
											label="MEX | USA: 34x36"
											style={modifyTallasModal.pickerItemTalla}
											value="34x36"
										/>
										<Picker.Item
											label="MEX | USA: 36x26"
											style={modifyTallasModal.pickerItemTalla}
											value="36x26"
										/>
										<Picker.Item
											label="MEX | USA: 36x28"
											style={modifyTallasModal.pickerItemTalla}
											value="36x28"
										/>
										<Picker.Item
											label="MEX | USA: 36x30"
											style={modifyTallasModal.pickerItemTalla}
											value="36x30"
										/>
										<Picker.Item
											label="MEX | USA: 36x32"
											style={modifyTallasModal.pickerItemTalla}
											value="36x32"
										/>
										<Picker.Item
											label="MEX | USA: 36x34"
											style={modifyTallasModal.pickerItemTalla}
											value="36x34"
										/>
										<Picker.Item
											label="MEX | USA: 36x36"
											style={modifyTallasModal.pickerItemTalla}
											value="36x36"
										/>
										<Picker.Item
											label="MEX | USA: 38x26"
											style={modifyTallasModal.pickerItemTalla}
											value="38x26"
										/>
										<Picker.Item
											label="MEX | USA: 38x28"
											style={modifyTallasModal.pickerItemTalla}
											value="38x28"
										/>
										<Picker.Item
											label="MEX | USA: 38x30"
											style={modifyTallasModal.pickerItemTalla}
											value="38x30"
										/>
										<Picker.Item
											label="MEX | USA: 38x32"
											style={modifyTallasModal.pickerItemTalla}
											value="38x32"
										/>
										<Picker.Item
											label="MEX | USA: 38x34"
											style={modifyTallasModal.pickerItemTalla}
											value="38x34"
										/>
										<Picker.Item
											label="MEX | USA: 38x36"
											style={modifyTallasModal.pickerItemTalla}
											value="38x36"
										/>
										<Picker.Item
											label="MEX | USA: 40x26"
											style={modifyTallasModal.pickerItemTalla}
											value="40x26"
										/>
										<Picker.Item
											label="MEX | USA: 40x28"
											style={modifyTallasModal.pickerItemTalla}
											value="40x28"
										/>
										<Picker.Item
											label="MEX | USA: 40x30"
											style={modifyTallasModal.pickerItemTalla}
											value="40x30"
										/>
										<Picker.Item
											label="MEX | USA: 40x32"
											style={modifyTallasModal.pickerItemTalla}
											value="40x32"
										/>
										<Picker.Item
											label="MEX | USA: 40x34"
											style={modifyTallasModal.pickerItemTalla}
											value="40x34"
										/>
										<Picker.Item
											label="MEX | USA: 40x36"
											style={modifyTallasModal.pickerItemTalla}
											value="40x36"
										/>
										<Picker.Item
											label="MEX | USA: 42x26"
											style={modifyTallasModal.pickerItemTalla}
											value="42x26"
										/>
										<Picker.Item
											label="MEX | USA: 42x28"
											style={modifyTallasModal.pickerItemTalla}
											value="42x28"
										/>
										<Picker.Item
											label="MEX | USA: 42x30"
											style={modifyTallasModal.pickerItemTalla}
											value="42x30"
										/>
										<Picker.Item
											label="MEX | USA: 42x32"
											style={modifyTallasModal.pickerItemTalla}
											value="42x32"
										/>
										<Picker.Item
											label="MEX | USA: 42x34"
											style={modifyTallasModal.pickerItemTalla}
											value="42x34"
										/>
										<Picker.Item
											label="MEX | USA: 42x36"
											style={modifyTallasModal.pickerItemTalla}
											value="42x36"
										/>
										<Picker.Item
											label="MEX | USA: 44x26"
											style={modifyTallasModal.pickerItemTalla}
											value="44x26"
										/>
										<Picker.Item
											label="MEX | USA: 44x28"
											style={modifyTallasModal.pickerItemTalla}
											value="44x28"
										/>
										<Picker.Item
											label="MEX | USA: 44x30"
											style={modifyTallasModal.pickerItemTalla}
											value="44x30"
										/>
										<Picker.Item
											label="MEX | USA: 44x32"
											style={modifyTallasModal.pickerItemTalla}
											value="44x32"
										/>
										<Picker.Item
											label="MEX | USA: 44x34"
											style={modifyTallasModal.pickerItemTalla}
											value="44x34"
										/>
										<Picker.Item
											label="MEX | USA: 44x36"
											style={modifyTallasModal.pickerItemTalla}
											value="44x36"
										/>
										<Picker.Item
											label="MEX | USA: 46x26"
											style={modifyTallasModal.pickerItemTalla}
											value="46x26"
										/>
										<Picker.Item
											label="MEX | USA: 46x28"
											style={modifyTallasModal.pickerItemTalla}
											value="46x28"
										/>
										<Picker.Item
											label="MEX | USA: 46x30"
											style={modifyTallasModal.pickerItemTalla}
											value="46x30"
										/>
										<Picker.Item
											label="MEX | USA: 46x32"
											style={modifyTallasModal.pickerItemTalla}
											value="46x32"
										/>
										<Picker.Item
											label="MEX | USA: 46x34"
											style={modifyTallasModal.pickerItemTalla}
											value="46x34"
										/>
										<Picker.Item
											label="MEX | USA: 46x36"
											style={modifyTallasModal.pickerItemTalla}
											value="46x36"
										/>
									</Picker>
								</View>
							</View>

							{/* Calzado */}
							<View style={modifyTallasModal.sectionContainer}>
								<View style={modifyTallasModal.sectionTitleContainer}>
									<Text style={modifyTallasModal.sectionTitleText}>
										Talla Calzado
									</Text>
								</View>
								<View style={modifyTallasModal.tallaDataContainer}>
									<Picker
										selectedValue={selectedCalzado}
										onValueChange={(itemValue) => setSelectedCalzado(itemValue)}
										itemStyle={modifyTallasModal.pickerItemStyle}
										style={modifyTallasModal.pickerTalla}
									>
										<Picker.Item
											label="MEX: 5 | USA: 7"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 5 | USA: 7"
										/>
										<Picker.Item
											label="MEX: 5.5 | USA: 7.5"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 5.5 | USA: 7.5"
										/>
										<Picker.Item
											label="MEX: 6 | USA: 8"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 6 | USA: 8"
										/>
										<Picker.Item
											label="MEX: 6.5 | USA: 8.5"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 6.5 | USA: 8.5"
										/>
										<Picker.Item
											label="MEX: 7 | USA: 9"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 7 | USA: 9"
										/>
										<Picker.Item
											label="MEX: 7.5 | USA: 9.5"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 7.5 | USA: 9.5"
										/>
										<Picker.Item
											label="MEX: 8 | USA: 10"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 8 | USA: 10"
										/>
										<Picker.Item
											label="MEX: 8.5 | USA: 10.5"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 8.5 | USA: 10.5"
										/>
										<Picker.Item
											label="MEX: 9 | USA: 11"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 9 | USA: 11"
										/>
										<Picker.Item
											label="MEX: 9.5 | USA: 11.5"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 9.5 | USA: 11.5"
										/>
										<Picker.Item
											label="MEX: 10 | USA: 12"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 10 | USA: 12"
										/>
										<Picker.Item
											label="MEX: 10.5 | USA: 12.5"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 10.5 | USA: 12.5"
										/>
										<Picker.Item
											label="MEX: 11 | USA: 13"
											style={modifyTallasModal.pickerItemTalla}
											value="MEX: 11 | USA: 13"
										/>
									</Picker>
								</View>
							</View>

							{/* Buttons */}
							<View style={modifyTallasModal.buttonsContainer}>
								<TouchableOpacity
									onPress={handleRegister}
									style={modifyTallasModal.registrarButton}
								>
									<Text style={modifyTallasModal.registrarButtonText}>
										Registrar
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onExit}
									style={modifyTallasModal.exitButton}
								>
									<Text style={modifyTallasModal.exitButtonText}>Volver</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default ModifyTallasModal;
