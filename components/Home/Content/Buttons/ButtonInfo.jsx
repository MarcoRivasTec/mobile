import React from "react";
import { View, Text, Image } from "react-native";
import { buttonInfo } from "./styles";

function ButtonInfo({ data, title }) {
	const formatNumber = (number) => {
		return number.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};
	return (
		<View style={buttonInfo.container}>
			<Image
				source={require("../../../../assets/BOTON_INFO.png")}
				resizeMethod="resize"
				resizeMode="contain"
				style={buttonInfo.background}
			/>
			<View style={buttonInfo.textContainer}>
				<View style={buttonInfo.textDataContainer}>
					<Text
						adjustsFontSizeToFit={true}
						allowFontScaling={true}
						maxFontSizeMultiplier={1}
						style={buttonInfo.textData}
					>
						${formatNumber(Number(data))}
					</Text>
				</View>
				<View style={buttonInfo.textTitleContainer}>
					<Text
						adjustsFontSizeToFit={true}
						allowFontScaling={true}
						maxFontSizeMultiplier={1}
						numberOfLines={2}
						style={buttonInfo.textTitle}
					>
						{title}
					</Text>
				</View>
			</View>
		</View>
	);
}

export default ButtonInfo;
