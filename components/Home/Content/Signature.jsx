import React, { useContext, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Keyboard,
	Platform,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Alert,
} from "react-native";
import { opiniones } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
import Working from "./Design/Working";
import { HomeContext } from "../../HomeContext";
import Confirm from "./Design/Confirm";
import fetchPost from "../../fetching";
import { AppContext } from "../../AppContext";
import SignPad from "./Signature/SignPad";
import * as FileSystem from "expo-file-system";
// import Button from "./Button";

function Opiniones() {
	// const { width, height } = Dimensions.get("window");
	const { numEmp } = useContext(HomeContext);
	const { region } = useContext(AppContext);
	const [isWorking, setIsWorking] = useState(false);

	const handleSave = async (dataUrl) => {
		const base64 = dataUrl.replace("data:image/png;base64,", "");
		const fileUri = FileSystem.cacheDirectory + "signature.png";
		await FileSystem.writeAsStringAsync(fileUri, base64, {
			encoding: FileSystem.EncodingType.Base64,
		});

		// Do something with the file (e.g., upload or preview)
		console.log("Saved signature at:", fileUri);
		// navigation.navigate("PreviewScreen", { uri: fileUri });
	};
	// const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	// function confirmationModalHandler() {
	// 	setIsConfirmVisible(!isConfirmVisible);
	// }

	return (
		// <TouchableWithoutFeedback
		// 	onPress={Keyboard.dismiss}
		// 	accessible={false}
		// 	pointerEvents="box-none"
		// >
			<View style={opiniones.container}>
				<ContentHeader title="Firma" />

				<View style={opiniones.contentContainer}>
					<View style={{ flex: 1, width: "100%", padding: 20 }}>
						<SignPad onSave={handleSave}  />
					</View>
				</View>
				{isWorking && (
					<Working isModalVisible={isWorking} text="Enviando ..." />
				)}
				{/* {isConfirmVisible && (
					<Confirm
						isModalVisible={isConfirmVisible}
						onCallback={confirmationModalHandler}
						onExit={confirmationModalHandler}
						customTitle={"Envío realizado"}
						customText={"Gracias por tu opinión"}
					/>
				)} */}
			</View>
		// </TouchableWithoutFeedback>
	);
}

export default Opiniones;
