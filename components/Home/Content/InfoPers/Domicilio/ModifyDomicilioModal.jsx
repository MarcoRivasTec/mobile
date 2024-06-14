import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { modifyDomicilioModal } from "./styles";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import Icon from "../../../icons";

function ModifyDomicilioModal({
	domicilio,
	setDomicilio,
	onCallback,
	onExit,
	onRegister,
}) {
	const [newCalle, setNewCalle] = useState(domicilio.calle);
	const [newNumero, setNewNumero] = useState(domicilio.numero);
	const [newColonia, setNewColonia] = useState(domicilio.colonia);
	const [newTelefono, setNewTelefono] = useState(domicilio.telefono);

	const handleRegister = () => {
		// Update the playera value in the parent component state
		setDomicilio({
			...domicilio,
			calle: newCalle,
			numero: newNumero,
			colonia: newColonia,
			telefono: newTelefono,
		});
		onCallback();
	};

	return (
		<View style={modifyDomicilioModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<View style={modifyDomicilioModal.backgroundContainer}>
					<View style={modifyDomicilioModal.modalContainer}>
						<View style={modifyDomicilioModal.contentContainer}>
							{/* Title */}
							<View style={modifyDomicilioModal.titleContainer}>
								<Text style={modifyDomicilioModal.titleText}>
									Modificar dirección
								</Text>
							</View>

							{/* Calle */}
							<View style={modifyDomicilioModal.sectionContainer}>
								<View style={[modifyDomicilioModal.sectionPartContainer, {flex: 2.8, marginRight: "2%"}]}>
									<View style={modifyDomicilioModal.sectionTitleContainer}>
										<Text style={modifyDomicilioModal.sectionTitleText}>
											Calle
										</Text>
									</View>
									<View style={modifyDomicilioModal.dataContainer}>
										<TextInput
											inputMode="text"
											onChangeText={setNewCalle}
											value={newCalle}
											autoCapitalize="words"
											placeholder="Tu dirección aquí"
											style={modifyDomicilioModal.dataText}
										></TextInput>
									</View>
								</View>
								<View style={modifyDomicilioModal.sectionPartContainer}>
									<View style={modifyDomicilioModal.sectionTitleContainer}>
										<Text style={modifyDomicilioModal.sectionTitleText}>
											Número
										</Text>
									</View>
									<View style={modifyDomicilioModal.dataContainer}>
										<TextInput
											inputMode="text"
											onChangeText={setNewNumero}
											autoCapitalize="words"
											placeholder="N. casa"
											style={modifyDomicilioModal.dataText}
										>{newNumero}</TextInput>
									</View>
								</View>
							</View>

                            <View style={modifyDomicilioModal.sectionContainer}>
                            <View style={[modifyDomicilioModal.sectionPartContainer, {flex: 1.8, marginRight: "2%"}]}>
									<View style={modifyDomicilioModal.sectionTitleContainer}>
										<Text style={modifyDomicilioModal.sectionTitleText}>
											Colonia
										</Text>
									</View>
									<View style={modifyDomicilioModal.dataContainer}>
										<TextInput
											inputMode="text"
                                            keyboardType="default"
											onChangeText={setNewColonia}
											value={newColonia}
											autoCapitalize="words"
											placeholder="Tu calle aquí"
											style={modifyDomicilioModal.dataText}
										></TextInput>
									</View>
								</View>
								<View style={modifyDomicilioModal.sectionPartContainer}>
									<View style={modifyDomicilioModal.sectionTitleContainer}>
										<Text style={modifyDomicilioModal.sectionTitleText}>
											Teléfono
										</Text>
									</View>
									<View style={modifyDomicilioModal.dataContainer}>
										<TextInput
											inputMode="numeric"
                                            keyboardType="number-pad"
											onChangeText={setNewTelefono}
											autoCapitalize="words"
											placeholder="Teléfono"
											style={modifyDomicilioModal.dataText}
										>{newTelefono}</TextInput>
									</View>
								</View>
							</View>

							{/* Buttons */}
							<View style={modifyDomicilioModal.buttonsContainer}>
								<TouchableOpacity
									onPress={handleRegister}
									style={modifyDomicilioModal.registrarButton}
								>
									<Text style={modifyDomicilioModal.registrarButtonText}>
										Actualizar
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onExit}
									style={modifyDomicilioModal.exitButton}
								>
									<Text style={modifyDomicilioModal.exitButtonText}>
										Volver
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default ModifyDomicilioModal;
