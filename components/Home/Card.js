import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { data } from "./styles";
import Svg, { Circle } from "react-native-svg";
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
					<Svg height="100%" width="100%" style={data.cardSvg}>
						<Circle cx="13%" cy="50%" r="13%" fill="white" />
					</Svg>
					{/* <View style = {{borderRadius: 50, padding: "12.5%", backgroundColor: COLORS.white}}> 
                        </View> */}
					<View style={data.cardTextContainer}>
						<Text style={[data.cardText, { fontSize: 24 }]}>Hello, Rubén!</Text>
						<Text style={[data.cardText, { fontSize: 16, fontWeight: "bold" }]}>
							900338
						</Text>
						<Text style={[data.cardText, { fontSize: 8, marginTop: "0.2%" }]}>
							Supervisor de CSA
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Card;
