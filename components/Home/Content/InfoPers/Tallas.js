import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { tallas } from "./styles";
import Icon from "../../icons";
import ModifyTallasModal from "./Tallas/ModifyTallasModal";

function Tallas({
	selectedModal,
	height,
	width,
	titleHeight,
	openModal,
	closeModal,
}) {
	const contentHeight = Math.round(height * 0.1);

	const [iconContainerSize, setIconContainerSize] = useState(0);

	useEffect(() => {
		const calculateIconContainerSize = () => {
			const size = Math.min(width, height) * 0.105; // You can adjust this factor as needed
			setIconContainerSize(size);
		};

		calculateIconContainerSize();

		// Subscribe to dimension changes
		const subscription = Dimensions.addEventListener(
			"change",
			calculateIconContainerSize
		);

		// Return a clean-up function
		return () => {
			// Remove the event listener
			subscription.remove();
		};
	}, [width, height]); // Dependencies for the effect

	const [tallasPrendas, setTallasPrendas] = useState({
		playera: "S",
		pantalon: "26x26",
		calzado: "MEX: 6.5 | USA: 8.5",
	});

	return (
		<View style={tallas.container}>
			{/* Title */}
			<View style={[tallas.titleContainer, { height: titleHeight }]}>
				<Text style={tallas.titleText}>Tallas</Text>
				<TouchableOpacity
					onPress={() => openModal("tallas")}
					style={tallas.button}
				>
					<Text style={tallas.buttonText}>Ver Tallas</Text>
				</TouchableOpacity>
				{selectedModal === "tallas" && (
					<ModifyTallasModal
						tallasPrendas={tallasPrendas}
						setTallasPrendas={setTallasPrendas}
						onCallback={closeModal}
						onExit={closeModal}
					/>
				)}
			</View>

			{/* Contenedor prendas */}
			<View style={[tallas.prendasContainer, { height: contentHeight }]}>

				{/* Playera/Camisa */}
				<View
					style={[tallas.prendaContainer, { flex: 0.32, paddingRight: "2%" }]}
				>
					<View
						style={[
							tallas.prendaIconContainer,
							{
								width: iconContainerSize,
								height: iconContainerSize,
								borderRadius: iconContainerSize / 2,
							},
						]}
					>
						<Icon name="CAMISA" size={22} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<View style={tallas.prendaDataTextContainer}>
							<Text style={tallas.prendaDataText}>{tallasPrendas.playera}</Text>
						</View>
					</View>
				</View>

				{/* Pantalon */}
				<View style={[tallas.prendaContainer, { flex: 0.8 }]}>
					<View
						style={[
							tallas.prendaIconContainer,
							{
								width: iconContainerSize,
								height: iconContainerSize,
								borderRadius: iconContainerSize / 2,
							},
						]}
					>
						<Icon name="PANTALON" size={23} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<View style={tallas.prendaDataTextContainer}>
							<Text 
							adjustsFontSizeToFit={true}
							numberOfLines={1}
							style={[tallas.prendaDataText, {fontSize: 9.5}]}>
								MEX | USA {tallasPrendas.pantalon}
							</Text>
						</View>
					</View>
				</View>

				{/* Calzado */}
				<View style={[tallas.prendaContainer, {paddingLeft: "0%",}]}>
					<View
						style={[
							tallas.prendaIconContainer,
							{
								width: iconContainerSize,
								height: iconContainerSize,
								borderRadius: iconContainerSize / 2,
							},
						]}
					>
						<Icon name="ZAPATO" size={14} style={tallas.prendaIcon} />
					</View>
					<View style={tallas.prendaDataContainer}>
						<View style={tallas.prendaDataTextContainer}>
							<Text
								adjustsFontSizeToFit={true}
								numberOfLines={1}
								style={tallas.prendaDataText}
							>
								{tallasPrendas.calzado}
							</Text>
						</View>
					</View>
				</View>

			</View>
		</View>
	);
}

export default Tallas;
