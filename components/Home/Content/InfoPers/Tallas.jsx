import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { tallas } from "./styles";
import Icon from "../../icons";
import ModifyTallasModal from "./Tallas/ModifyTallasModal";

function Tallas({
	tallasPrendas,
	list,
	selectedModal,
	height,
	width,
	titleHeight,
	openModal,
	closeModal,
	updateData,
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

	const formatSize = (talla) => {
		switch (talla) {
			case "SIN":
				return "SIN";
			case "Extra Chico":
				return "XS";
			case "Chico":
				return "S";
			case "Mediano":
				return "M";
			case "Grande":
				return "G";
			case "Extra Grande":
				return "XL";
			case "XXL":
				return "XXL";
			case "XXXL":
				return "XXXL";
			default:
				break;
		}
	};
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
						data={tallasPrendas}
						list={list}
						onCallback={closeModal}
						onExit={closeModal}
						updateData={updateData}
					/>
				)}
			</View>

			{/* Contenedor prendas */}
			<View style={[tallas.prendasContainer, { height: contentHeight }]}>
				{/* Playera/Camisa */}
				<View
					style={[
						tallas.prendaContainer,
						{
							flex:
								tallasPrendas.playera === "SIN" &&
								tallasPrendas.pantalon === "SIN" &&
								tallasPrendas.calzado === "SIN"
									? 1
									: 0.4,
							paddingLeft:
								tallasPrendas.playera === "SIN" &&
								tallasPrendas.pantalon === "SIN" &&
								tallasPrendas.calzado === "SIN"
									? 0
									: "2%",
							paddingRight:
								tallasPrendas.playera === "SIN" &&
								tallasPrendas.pantalon === "SIN" &&
								tallasPrendas.calzado === "SIN"
									? 0
									: "3.5%",
						},
					]}
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
						<Icon
							name="CAMISA"
							size={22}
							style={tallas.prendaIcon}
						/>
					</View>
					<View style={tallas.prendaDataContainer}>
						<View
							style={[
								tallas.prendaDataTextContainer,
								{ width: "80%", right: 4 },
							]}
						>
							<Text style={tallas.prendaDataText}>
								{formatSize(tallasPrendas.playera)}
							</Text>
						</View>
					</View>
				</View>

				{/* Pantalon */}
				<View
					style={[
						tallas.prendaContainer,
						{
							marginHorizontal:
								tallasPrendas.playera === "SIN" &&
								tallasPrendas.pantalon === "SIN" &&
								tallasPrendas.calzado === "SIN"
									? "2%"
									: 0,
						},
					]}
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
						<Icon
							name="PANTALON"
							size={23}
							style={tallas.prendaIcon}
						/>
					</View>
					<View style={tallas.prendaDataContainer}>
						<View style={tallas.prendaDataTextContainer}>
							<Text
								adjustsFontSizeToFit={true}
								minimumFontScale={0.5}
								numberOfLines={1}
								style={tallas.prendaDataText}
							>
								{tallasPrendas.pantalon === "SIN"
									? "SIN"
									: `MEX | USA ${tallasPrendas.pantalon}`}
							</Text>
						</View>
					</View>
				</View>

				{/* Calzado */}
				<View style={[tallas.prendaContainer]}>
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
						<Icon
							name="ZAPATO"
							size={14}
							style={tallas.prendaIcon}
						/>
					</View>
					<View style={tallas.prendaDataContainer}>
						<View style={tallas.prendaDataTextContainer}>
							<Text
								adjustsFontSizeToFit={true}
								minimumFontScale={0.6}
								numberOfLines={1}
								style={tallas.prendaDataText}
							>
								{tallasPrendas.calzado === "SIN"
									? "SIN"
									: `MEX ${tallasPrendas.calzado} | USA ${
											+tallasPrendas.calzado + 2
									  }`}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Tallas;
