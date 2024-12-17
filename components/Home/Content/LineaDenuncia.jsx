import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, Linking, Alert } from "react-native";
import { linea } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonAction from "./Buttons/ButtonAction";
import Denuncia from "../../Animations/Denuncia";
import { HomeContext } from "../../HomeContext";

function LineaDenuncia() {
	const { region } = useContext(HomeContext);
	const phoneNumber =
		region === "TIJ"
			? "8116010519"
			: region === "MTY" || region === "SAL"
			? "6647983328"
			: "6563755037"; // Telefono central

	const handlePress1 = () => {
		const email = "t.escuchamos@tecma.com"; // Replace with the recipient's email
		const subject = "Necesito hacer una denuncia"; // Subject of the email
		const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

		Linking.canOpenURL(url)
			.then((supported) => {
				if (supported) {
					return Linking.openURL(url);
				} else {
					Alert.alert(
						"Error",
						"No existe algun servicio o programa para enviar correo"
					);
				}
			})
			.catch((err) => console.error("An error occurred", err));
	};
	const handlePress2 = () => {
		// const phoneNumber = "6561011010"; // Telefono west?

		const url = `whatsapp://send?phone=${phoneNumber}`;

		Linking.canOpenURL(url)
			.then((supported) => {
				if (supported) {
					return Linking.openURL(url);
				} else {
					Alert.alert(
						"Error",
						"WhatsApp no está instalado en este dispositivo"
					);
				}
			})
			.catch((err) => console.error("An error occurred", err));
	};
	const handlePress3 = () => {
		// const phoneNumber = "6563755037"; // Telefono central
		// const phoneNumber = "6561011010"; // Telefono west?

		const url = `whatsapp://send?phone=${phoneNumber}`;

		Linking.canOpenURL(url)
			.then((supported) => {
				if (supported) {
					return Linking.openURL(url);
				} else {
					Alert.alert(
						"Error",
						"WhatsApp no está instalado en este dispositivo"
					);
				}
			})
			.catch((err) => console.error("An error occurred", err));
	};

	return (
		<View style={linea.container}>
			<ContentHeader title="Linea Denuncia"></ContentHeader>
			<View style={linea.sectionContainer}>
				<ImageBackground
					source={require("../../../assets/backgrounds/FONDO_LINEA_DENUNCIA.png")}
					style={linea.background}
				/>
				<View style={linea.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Línea de Denuncias
					</Text>
				</View>
				<View style={linea.sectionAnimation}>
					<View style={linea.animationContainer}>
						<Denuncia />
					</View>
					<View style={linea.textContainer}>
						<View style={linea.textBox}>
							<Text
								adjustsFontSizeToFit={true}
								minimumFontScale={0.8}
								numberOfLines={4}
								style={linea.text}
							>
								Reporta de manera confidencial cualquier situación que esté en
								contra de los valores y códigos de conducta de Tecma.
							</Text>
						</View>
					</View>
				</View>
				<View style={linea.sectionButtonContainer}>
					<ButtonAction
						toggleModal={handlePress1}
						icon="VACACIONES"
						size={20}
						title="Enviar correo"
					></ButtonAction>
					<ButtonAction
						toggleModal={handlePress2}
						icon="WHATSAPP"
						size={24}
						title="Mensaje WhatsApp"
					></ButtonAction>
					<ButtonAction
						toggleModal={handlePress3}
						icon="WHATSAPP"
						size={24}
						title="Hacer llamada"
					></ButtonAction>
				</View>
			</View>
		</View>
	);
}

export default LineaDenuncia;
