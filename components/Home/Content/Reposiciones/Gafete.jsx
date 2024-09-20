import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { gafete } from "./styles";
import Confirm from "./Confirm";

function Gafete({ tarjetasRequisition, onCallback, isModalVisible, onExit }) {
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const requestGafete = async () => {
		const response = await tarjetasRequisition("Gafete");
		if (response === "Done") {
			confirmationModalHandler();
		} else {
			Alert.alert(
				"Error",
				"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto"
			);
		}
	};

	return (
		<View style={gafete.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={onCallback}
			>
				<View style={gafete.backgroundContainer}>
					<View style={gafete.modalContainer}>
						<View style={gafete.contentContainer}>
							{/* Title */}
							<View style={gafete.titleContainer}>
								<Text style={gafete.titleText}>Solicitud de Reposición</Text>
							</View>

							{/* Text */}
							<View style={gafete.textContainer}>
								<Text style={gafete.text}>
									<Text style={gafete.text}>Se enviará la</Text>
									<Text style={[gafete.text, { fontWeight: "bold" }]}>
										{" "}
										Solicitud de Reposición de Gafete{" "}
									</Text>
									<Text style={gafete.text}>
										a tu representante de RH.{"\n"}
									</Text>
								</Text>
								<Text style={gafete.text}>
									Recuerda que debes entregar tu gafete dañado, de otra forma
									tendra un costo.{"\n"}
								</Text>
								<Text style={gafete.text}>
									En 24 hrs. puedes pasar al Departamento de RH por el.{"\n"}
								</Text>
								<Text style={gafete.text}>¿Deseas continuar?</Text>
							</View>

							{/* Back button */}
							<View style={gafete.buttonContainer}>
								<TouchableOpacity
									onPress={requestGafete}
									// onPress={confirmationModalHandler}
									style={gafete.button}
								>
									<Text style={gafete.textButton}>Solicitar</Text>
								</TouchableOpacity>
								<View>
									{ConfirmationVisible && (
										<Confirm
											isModalVisible={ConfirmationVisible}
											onCallback={confirmationModalHandler}
											onExit={confirmationModalHandler}
											closeModal={onExit}
										/>
									)}
								</View>
								<TouchableOpacity
									onPress={onExit}
									style={[gafete.button, { backgroundColor: "gray" }]}
								>
									<Text style={gafete.textButton}>Volver</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Gafete;
