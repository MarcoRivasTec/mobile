import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { tallasModal } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";

function TallasModal({ onCallback, selectedModal, onExit }) {
	const tallas = [
		{
			id: "1",
			fecha: "01/15/2024",
			dias: "5.00",
			observaciones: "5 días disfrutados",
		},
		{
			id: "2",
			fecha: "02/10/2024",
			dias: "3.00",
			observaciones: "3 días de descanso",
		},
		{
			id: "3",
			fecha: "03/20/2024",
			dias: "41.00",
			observaciones: "4 días de vacaciones",
		},
		
		// Add more items as needed
	];

	return (
		<View style={ tallasModal.container }>
			<Modal
				animationType="slide"
				transparent={true}
				visible={selectedModal}
				onRequestClose={onCallback}
			>
				<View style={historialModal.backgroundContainer}>
					<View style={historialModal.modalContainer}>
						{/* Title */}
						<View style={historialModal.titleContainer}>
							<Text style={historialModal.textTitle}>
								Historial de vacaciones
							</Text>
						</View>
						
						
						{/* Back button */}
						<TouchableOpacity
							onPress={onExit}
							style={historialModal.exitButton}
						>
							<Text style={historialModal.textExitButton}>Volver</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default TallasModal;
