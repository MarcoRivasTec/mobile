import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { linea } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonAction from "./Buttons/ButtonAction";
import Denuncia from "../../Animations/Denuncia";

function LineaDenuncia() {
	const handlePress1 = () => {
		Linking.openURL(link1);
	};
	const handlePress2 = () => {
		Linking.openURL(link2);
	};
	const handlePress3 = () => {
		Linking.openURL(link3);
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
