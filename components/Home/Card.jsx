import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { data } from "./styles";
// import Svg, { Circle } from "react-native-svg";
import Icon from "./icons";
import COLORS from "../../constants/colors";
import getFirstName from "../utils";
import { AppContext } from "../AppContext";

function Card() {
	const { profileImg, name, numEmp, razon, puesto } = useContext(AppContext);
	const firstName = getFirstName(name);
	const formattedName =
		firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
	// const [photoExists, setPhotoExists] = useState(require("../../assets/social/imagen.png"));

	// useEffect(() => {
	// 	const getImage = async () => {
	// 		const imageUrl = "../../assets/social/imagen.png"; // Image path
	// 		try {
	// 			const resolvedImage = Image.resolveAssetSource(imageUrl);
	// 			if (resolvedImage) {
	// 				setPhotoExists(resolvedImage.uri); // Set image URI to state
	// 			} else {
	// 				setPhotoExists(null); // If image not found, set image URI to null
	// 			}
	// 		} catch (error) {
	// 			console.error("Error resolving image:", error);
	// 		}
	// 	};

	// 	getImage();
	// }, []);

	return (
		<View style={data.container}>
			{/* Flex de 10 */}

			{/* Razon social */}
			<View style={data.razonContainer}>
				<View style={data.razonBox}>
					<Text
						adjustsFontSizeToFit={true}
						numberOfLines={1}
						style={data.razonText}
					>
						{razon}
					</Text>
				</View>
			</View>

			{/* Card */}
			<View style={data.cardContainer}>
				<LinearGradient
					colors={[COLORS.bannerleft, COLORS.bannerright]}
					style={data.cardGradient}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
				></LinearGradient>
				<View style={data.cardDataContainer}>
					<View style={data.cardAvatarContainer}>
						<View style={data.cardAvatarBackground}>
							{profileImg !== null ? (
								<Image
									style={data.image}
									resizeMode="contain"
									// source={require("../../assets/social/imagen.png")}
									source={{
										uri: `data:image/jpeg;base64,${profileImg}`,
									}}
								/>
							) : (
								<Icon name="USER" size={36} color="gray"></Icon>
							)}
						</View>
					</View>

					<View style={data.cardTextContainer}>
						<Text style={[data.cardText, { fontSize: 24 }]}>
							Hello, {formattedName}!
						</Text>
						<Text
							style={[
								data.cardText,
								{ fontSize: 16, fontWeight: "bold" },
							]}
						>
							{numEmp}
						</Text>
						<Text
							style={[
								data.cardText,
								{ fontSize: 8, marginTop: "0.2%" },
							]}
						>
							{puesto}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Card;
