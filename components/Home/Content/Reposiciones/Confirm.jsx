import React, { useEffect } from "react";
import { Modal, View, Text } from "react-native";
import { confirm } from "./styles";
import Checkmark from "../../../Animations/Checkmark";

function Confirm({ isModalVisible, onCallback, onExit, closeModal }) {
	useEffect(() => {
		let timeoutId;

		if (isModalVisible) {
			// Set a timeout to execute onExit after 3 seconds
			timeoutId = setTimeout(() => {
				onExit();
                closeModal();
			}, 3000);
		}

		return () => clearTimeout(timeoutId);
	}, [isModalVisible, onExit]);

	return (
		<View style={confirm.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={onCallback}
			>
				<View style={confirm.backgroundContainer}>
					<View style={confirm.modalContainer}>
						<View style={confirm.contentContainer}>
							{/* Title */}
							<View style={confirm.animContainer}>
								<View style={confirm.anim}>
									<Checkmark />
								</View>
							</View>

							{/* Text */}
							<View style={confirm.textContainer}>
								<Text style={confirm.text}>
									Tu solicitud ha sido enviada exitosamente.
								</Text>
								<Text style={confirm.lowerText}>
									Recibirás una notificación cuando tu solicitud haya sido procesada.
								</Text>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Confirm;
