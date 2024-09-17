import React, { useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { despensa } from "./styles";
import Confirm from "./Confirm";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function Despensa({ tarjetasRequisition, onCallback, isModalVisible, onExit }) {
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const checkboxIconSize = 25;

	const [selectedCheckbox, setSelectedCheckbox] = React.useState("");

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	return (
		<View style={despensa.container}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={onCallback}
				statusBarTranslucent={true}
			>
				<View style={despensa.backgroundContainer}>
					<View style={despensa.modalContainer}>
						<View style={despensa.contentContainer}>
							{/* Title */}
							<View style={despensa.titleContainer}>
								<Text style={despensa.titleText}>
									Solicitud de Reposición
								</Text>
							</View>

							{/* Text */}
							<View style={despensa.textContainer}>
								<Text style={despensa.text}>
									<Text style={despensa.subtext}>
										Se enviará la
									</Text>
									<Text
										style={[
											despensa.subtext,
											{ fontWeight: "bold" },
										]}
									>
										{" "}
										Solicitud de Reposición de Tarjeta
										Despensa{" "}
									</Text>
									<Text style={despensa.subtext}>
										a tu representante de RH.{"\n"}
									</Text>
								</Text>

								<Text style={despensa.text}>
									Porfavor, indica el motivo:
								</Text>

								<View style={despensa.checkboxGroup}>
									<BouncyCheckbox
										size={checkboxIconSize}
										fillColor="orange"
										unFillColor="#FFFFFF"
										text="1. Vencimiento"
										iconStyle={{ borderColor: "gray" }}
										textStyle={[
											despensa.checkboxText,
											{
												textDecorationLine:
													selectedCheckbox ===
													"Vencimiento"
														? "underline"
														: "none",
											},
										]}
										onPress={() =>
											setSelectedCheckbox("Vencimiento")
										}
										isChecked={
											selectedCheckbox === "Vencimiento"
										}
										style={despensa.checkbox}
									></BouncyCheckbox>
									<BouncyCheckbox
										size={checkboxIconSize}
										fillColor="orange"
										unFillColor="#FFFFFF"
										text="2. Daño"
										iconStyle={{ borderColor: "gray" }}
										textStyle={[
											despensa.checkboxText,
											{
												textDecorationLine:
													selectedCheckbox === "Daño"
														? "underline"
														: "none",
											},
										]}
										onPress={() =>
											setSelectedCheckbox("Daño")
										}
										isChecked={selectedCheckbox === "Daño"}
										style={despensa.checkbox}
									></BouncyCheckbox>
									<BouncyCheckbox
										size={checkboxIconSize}
										fillColor="orange"
										unFillColor="#FFFFFF"
										text="3. Robo"
										iconStyle={{ borderColor: "gray" }}
										textStyle={[
											despensa.checkboxText,
											{
												textDecorationLine:
													selectedCheckbox === "Robo"
														? "underline"
														: "none",
											},
										]}
										onPress={() =>
											setSelectedCheckbox("Robo")
										}
										isChecked={selectedCheckbox === "Robo"}
										style={despensa.checkbox}
									></BouncyCheckbox>
									<BouncyCheckbox
										size={checkboxIconSize}
										fillColor="orange"
										unFillColor="#FFFFFF"
										text="4. Extravío"
										iconStyle={{ borderColor: "gray" }}
										textStyle={[
											despensa.checkboxText,
											{
												textDecorationLine:
													selectedCheckbox ===
													"Extravio"
														? "underline"
														: "none",
											},
										]}
										onPress={() =>
											setSelectedCheckbox("Extravio")
										}
										isChecked={
											selectedCheckbox === "Extravio"
										}
										style={despensa.checkbox}
									></BouncyCheckbox>
								</View>

								<Text style={despensa.text}>
									Recuerda que en 24 hrs. deberás pasar al
									Departamento de RH por tu nueva tarjeta.
								</Text>
							</View>

							{/* Back button */}
							<View style={despensa.buttonContainer}>
								<TouchableOpacity
									onPress={() => {
										confirmationModalHandler();
										tarjetasRequisition("Despensa");
									}}
									style={despensa.button}
								>
									<Text style={despensa.textButton}>
										Solicitar
									</Text>
								</TouchableOpacity>
								<View>
									{ConfirmationVisible && (
										<Confirm
											isModalVisible={ConfirmationVisible}
											onCallback={
												confirmationModalHandler
											}
											onExit={confirmationModalHandler}
											closeModal={onExit}
										/>
									)}
								</View>
								<TouchableOpacity
									onPress={onExit}
									style={[
										despensa.button,
										{ backgroundColor: "gray" },
									]}
								>
									<Text style={despensa.textButton}>
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

export default Despensa;
