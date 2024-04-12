import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { tallas } from "./styles";
import Icon from "../../icons";
import ModifyTallasModal from "./Tallas/ModifyTallasModal";
import ConfirmModal from "./ConfirmModal";

function Tallas({ selectedModal, height, width, openModal, closeModal }) {
	const titleHeight = Math.round(height * 0.036);

	const [tallasPrendas, setTallasPrendas] = useState([
		{
			playera: "S",
			pantalon: "S",
			calzado: "32",
		},
	]);

	return (
		<View style={tallas.container}>
			<View style={tallas.titleContainer}>
				<Text style={tallas.titleText}>Tallas</Text>
				<TouchableOpacity
					onPress={() => openModal("tallas")}
					style={tallas.button}
				>
					<Text style={tallas.buttonText}>Ver Tallas</Text>
				</TouchableOpacity>
				{selectedModal === "tallas" && (
					<TallasModal onCallback={closeModal} onExit={closeModal} />
				)}
			</View>
			<View style={tallas.prendasContainer}>
				<View style={tallas.prendaContainer}>
					<View style={tallas.prendaIconContainer}>
						<Icon name="CAMISA" size={22} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<Text style={tallas.prendaDataText}>{tallasPrendas.playera}</Text>
					</View>
				</View>
				<View style={tallas.prendaContainer}>
					<View style={tallas.prendaIconContainer}>
						<Icon name="PANTALON" size={22} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<Text style={tallas.prendaDataText}>{tallasPrendas.pantalon}</Text>
					</View>
				</View>
				<View style={tallas.prendaContainer}>
					<View style={tallas.prendaIconContainer}>
						<Icon name="ZAPATO" size={14} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<Text style={tallas.prendaDataText}>{tallasPrendas.calzado}</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Tallas;
