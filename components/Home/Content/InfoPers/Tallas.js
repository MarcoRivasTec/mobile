import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { tallas } from "./styles";
import Icon from "../../icons";
import ModifyTallasModal from "./Tallas/ModifyTallasModal";
import ConfirmModal from "./ConfirmModal";

function Tallas({
	selectedModal,
	height,
	width,
	titleHeight,
	openModal,
	closeModal,
}) {
	const contentHeight = Math.round(height * 0.1);

	const [tallasPrendas, setTallasPrendas] = useState(
		{
			playera: "S",
			pantalon: "26x26",
			calzado: "MEX: 6.5 | USA: 8.5",
		},
	);

	return (
		<View style={tallas.container}>
			<View style={[tallas.titleContainer, { height: titleHeight }]}>
				<Text style={tallas.titleText}>Tallas</Text>
				<TouchableOpacity
					onPress={() => openModal("tallas")}
					style={tallas.button}
				>
					<Text style={tallas.buttonText}>Ver Tallas</Text>
				</TouchableOpacity>
				{selectedModal === "tallas" && (
					<ModifyTallasModal tallasPrendas={tallasPrendas} onCallback={closeModal} onExit={closeModal} />
				)}
			</View>
			<View style={[tallas.prendasContainer, { height: contentHeight }]}>
				<View style={tallas.prendaContainer}>
					<View style={tallas.prendaIconContainer}>
						<Icon name="CAMISA" size={22} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<View style={tallas.prendaDataTextContainer}>
							<Text style={tallas.prendaDataText}>{tallasPrendas.playera}</Text>
						</View>
					</View>
				</View>
				<View style={tallas.prendaContainer}>
					<View style={tallas.prendaIconContainer}>
						<Icon name="PANTALON" size={22} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<View style={tallas.prendaDataTextContainer}>
							<Text style={tallas.prendaDataText}>
								{tallasPrendas.pantalon}
							</Text>
						</View>
					</View>
				</View>
				<View style={tallas.prendaContainer}>
					<View style={tallas.prendaIconContainer}>
						<Icon name="ZAPATO" size={14} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<View style={tallas.prendaDataTextContainer}>
							<Text style={tallas.prendaDataText}>{tallasPrendas.calzado}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Tallas;
