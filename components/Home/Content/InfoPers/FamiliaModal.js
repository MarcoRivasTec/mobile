import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { familiaModal } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";

function FamiliaModal({ onCallback, selectedModal, onExit, onRegister }) {
	const [nombre, setNombre] = useState("");
	const [apellidoPaterno, setApellidoPaterno] = useState("");
	const [apellidoMaterno, setApellidoMaterno] = useState("");
	const [parentesco, setParentesco] = useState("");
	const [sexo, setSexo] = useState("");

    const handleRegister = () => {
        const newPariente = { nombre, apellidoPaterno, apellidoMaterno, parentesco, sexo };
        // Here you can call a prop function to update state in the parent component
        // For example: props.onRegister(newPariente);
    };

	return (
		<View style={familiaModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={selectedModal}
				onRequestClose={onCallback}
			>
				<View style={familiaModal.backgroundContainer}>
					<View style={familiaModal.modalContainer}>
						<View style={familiaModal.contentContainer}>
							{/* Title */}
							<View style={familiaModal.titleContainer}>
								<Text style={familiaModal.titleText}>Registrar pariente</Text>
							</View>

							{/* Nombres */}
							<View style={familiaModal.nombresContainer}>
								<View style={familiaModal.sectionTitleContainer}>
									<Text style={familiaModal.sectionTitleText}>Nombre(s)</Text>
								</View>
								<View style={familiaModal.nombreDataContainer}>
									<TextInput
                                        inputMode="text"
                                        onChangeText={setNombre}
                                        value={nombre}
										placeholder="Tu nombre (o nombres) aquí ..."
										style={familiaModal.nombreDataText}
									></TextInput>
								</View>
							</View>

							{/* Apellidos */}
							<View style={familiaModal.sectionContainer}>
								<View
									style={[
										familiaModal.nombresContainer,
										{ marginVertical: "0%", marginRight: "2%" },
									]}
								>
									<View style={familiaModal.sectionTitleContainer}>
										<Text style={familiaModal.sectionTitleText}>
											Apellido Paterno
										</Text>
									</View>
									<View style={familiaModal.nombreDataContainer}>
										<TextInput 
                                        onChangeText={setApellidoPaterno}
                                        value={apellidoPaterno}
                                        style={familiaModal.nombreDataText}></TextInput>
									</View>
								</View>
								<View
									style={[
										familiaModal.nombresContainer,
										{ marginVertical: "0%" },
									]}
								>
									<View style={familiaModal.sectionTitleContainer}>
										<Text style={familiaModal.sectionTitleText}>
											Apellido Materno
										</Text>
									</View>
									<View style={familiaModal.nombreDataContainer}>
										<TextInput 
                                        onChangeText={setApellidoMaterno}
                                        value={apellidoMaterno}
                                        style={familiaModal.nombreDataText}></TextInput>
									</View>
								</View>
							</View>

							{/* Parentesco y Sexo */}
							<View style={familiaModal.sectionContainer}>
								<View style={familiaModal.parentescoContainer}>
									<View style={familiaModal.sectionTitleContainer}>
										<Text style={familiaModal.sectionTitleText}>
											Parentesco
										</Text>
									</View>
									<View style={familiaModal.parentescoDataContainer}>
										<TextInput style={familiaModal.dataText}></TextInput>
									</View>
								</View>
								<View style={familiaModal.sexoContainer}>
									<View style={familiaModal.sectionTitleContainer}>
										<Text style={familiaModal.sectionTitleText}>Sexo</Text>
									</View>
									<View style={familiaModal.sexoDataContainer}>
										<TextInput style={familiaModal.dataText}></TextInput>
									</View>
								</View>
							</View>

							{/* Fecha Nacimiento */}
							<View style={familiaModal.nacimientoContainer}>
								<View style={familiaModal.sectionTitleContainer}>
									<Text style={familiaModal.sectionTitleText}>Nacimiento</Text>
								</View>
								<View style={familiaModal.nacimientoDataContainer}></View>
							</View>

							{/* Buttons */}
							<View style={familiaModal.buttonsContainer}>
								<TouchableOpacity
									onPress={onRegister}
									style={familiaModal.registrarButton}
								>
									<Text style={familiaModal.registrarButtonText}>
										Registrar
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onExit}
									style={familiaModal.exitButton}
								>
									<Text style={familiaModal.exitButtonText}>Volver</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default FamiliaModal;
