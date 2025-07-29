import React from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { confirmModal } from "./styles";

export default function ConfirmModal({
	title,
	data,
	onCallback,
	onExit,
	onConfirm,
	image,
}) {
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
							<Text style={confirmModal.titleText}>Confirmar firma</Text>

							{/* Data */}
							<Text style={confirmModal.dataText}>
								¿Es correcta esta firma?
							</Text>

							{image && (
								<Image
									source={{ uri: image }}
									style={{
										width: "50%",
										aspectRatio: 1,
										borderWidth: 1,
										borderColor: "#ccc",
										marginVertical: 24,
										alignSelf: "center",
									}}
									resizeMode="contain"
								/>
							)}

							{/* Buttons */}
							<View style={confirmModal.buttonsContainer}>
								<TouchableOpacity
									onPress={onConfirm}
									style={confirmModal.confirmButton}
								>
									<Text style={confirmModal.confirmButtonText}>
										Es correcta
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
