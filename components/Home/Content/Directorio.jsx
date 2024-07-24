import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
	Image,
	Linking,
} from "react-native";
import { Dimensions } from "react-native";
import * as Clipboard from "expo-clipboard";
import { directorio } from "./styles";
import ContentHeader from "./ContentHeader";
import { Ionicons } from "@expo/vector-icons";

function Directorio() {
	const { width, height } = Dimensions.get("window");
	const registroHeight = Math.round(height * 0.08);

	const sos = require("../../../assets/social/911.jpg");
	const angeles = require("../../../assets/social/ANGELES_VERDES.jpg");
	const cfe = require("../../../assets/social/CFE.png");
	const cns = require("../../../assets/social/CNS.jpg");
	const conafor = require("../../../assets/social/CONAFOR.png");
	const cruz = require("../../../assets/social/CRUZ_ROJA.jpg");
	const csa = require("../../../assets/social/CSA.jpg");

	const handlePress = async (phoneNumber) => {
		// Copy the phone number to the clipboard
		await Clipboard.setStringAsync(phoneNumber);

		// Open the phone's dialer application with the copied number
		Linking.openURL(`tel:${phoneNumber}`);
	};

	function Registro({ img, number }) {
		return (
			<View style={[directorio.registroContainer, { height: registroHeight }]}>
				<View style={directorio.registroRow}>
					<View style={directorio.imgContainer}>
						<Image resizeMode="contain" source={img} style={directorio.img} />
					</View>
					<TouchableOpacity
						onPress={() => handlePress(number)}
						style={directorio.infoContainer}
					>
						<ImageBackground
							source={require("../../../assets/ORANGE_STRIP.png")}
							resizeMode="contain"
							style={directorio.stripImg}
						>
							<View style={directorio.iconContainer}>
								<Ionicons
									name="call-outline"
									size={20}
									style={directorio.icon}
								/>
							</View>
							<Text style={directorio.infoText}> Llamar | {number}</Text>
						</ImageBackground>
					</TouchableOpacity>
				</View>
				<View style={directorio.divider} />
			</View>
		);
	}

	return (
		<View style={directorio.container}>
			<ContentHeader title="Directorio" />
			<View style={directorio.contentContainer}>
				<View style={directorio.titleContainer}>
					<Text style={directorio.titleText}>Números de Emergencia</Text>
				</View>

				<ScrollView
					contentContainerStyle={directorio.scrollContentContainer}
					style={directorio.scrollContainer}
				>
					{/* Identificacion */}
					<View style={[directorio.divider, {marginBottom: "-1%"}]}/>
					<Registro img={sos} number="911" />
					<Registro img={csa} number="(656) 649-1010" />
					<Registro img={cruz} number="065" />
					<Registro img={cfe} number="071" />
					<Registro img={angeles} number="078" />
					<Registro img={cns} number="088" />
					<Registro img={conafor} number="01 800 46236346" />
				</ScrollView>
			</View>
		</View>
	);
}

export default Directorio;
