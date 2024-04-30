import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { confirmModal } from "./styles";

function ConfirmModal({ title, data, onCallback, onExit, onConfirm }) {
	return (
		<View style={confirmModal.container}>
			<Modal
				animationType="fade"
				transparent={true}
				onRequestClose={onCallback}
                statusBarTranslucent={true}
			>
				<View style={confirmModal.backgroundContainer}>
					<View style={confirmModal.modalContainer}>
						<View style={confirmModal.contentContainer}>
							{/* Title */}
							<View style={confirmModal.titleContainer}>
								<Text style={confirmModal.titleText}>{title}</Text>
							</View>

							{/* Data */}
							<View style={confirmModal.dataContainer}>
								<Text style={confirmModal.dataText}>
                                    {data}
                                </Text>
							</View>		

							{/* Buttons */}
							<View style={confirmModal.buttonsContainer}>
								<TouchableOpacity
									onPress={onConfirm}
									style={confirmModal.confirmButton}
								>
									<Text style={confirmModal.confirmButtonText}>
										Confirmar
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onExit}
									style={confirmModal.exitButton}
								>
									<Text style={confirmModal.exitButtonText}>Volver</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default ConfirmModal;
