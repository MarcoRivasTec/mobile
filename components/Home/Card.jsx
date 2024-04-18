import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { data } from "./styles";
import Svg, { Circle } from "react-native-svg";
import Icon from "./icons";
import COLORS from "../../constants/colors";

function Card() {
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
				{/* <SVGBanner style = {{flex: 1}}>
                    </SVGBanner> */}
				<View style={data.cardDataContainer}>
					<View style={data.cardAvatarContainer}>
						<View style={data.cardAvatarBackground}>
							<Icon
								name="USER"
								size={36}
								color="gray"
							></Icon>
						</View>
					</View>

					{/* <View style = {{borderRadius: 50, padding: "12.5%", backgroundColor: COLORS.white}}> 
                        </View> */}
					<View style={data.cardTextContainer}>
						<Text style={[data.cardText, { fontSize: 24 }]}>Hello, Marcos!</Text>
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
