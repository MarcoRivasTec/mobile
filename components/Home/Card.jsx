import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { data } from "./styles";
// import Svg, { Circle } from "react-native-svg";
import Icon from "./icons";
import COLORS from "../../constants/colors";

function Card() {
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
						INTERNATIONAL MANUFACTURING SOLUTIONS OPERACIONES
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
							{/* {photoExists ? ( */}
								<Image
									style={data.image}
									resizeMode="contain"
									source={require("../../assets/social/imagen.png")}
								/>
							{/* ) : ( */}
								{/* <Icon name="USER" size={36} color="gray"></Icon> */}
							{/* )} */}
						</View>
					</View>

					<View style={data.cardTextContainer}>
						<Text style={[data.cardText, { fontSize: 24 }]}>
							Hello, Marcos!
						</Text>
						<Text style={[data.cardText, { fontSize: 16, fontWeight: "bold" }]}>
							94327
						</Text>
						<Text style={[data.cardText, { fontSize: 8, marginTop: "0.2%" }]}>
							Técnico de Producción
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Card;
