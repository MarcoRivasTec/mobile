import React from "react";
import { View, Text, Image } from "react-native";
import { getButtonTagStyle } from "./styles";

function ButtonTag({flex, data, title}) {
	const buttonTag = getButtonTagStyle(flex)

	return (
		<View style={buttonTag.container}>
			<Image
				source={require("../../../../assets/BOTON_TAG.png")}
				resizeMethod="resize"
				resizeMode="contain"
				style={buttonTag.background}
			/>
			<View style={buttonTag.textContainer}>
				<View style={buttonTag.textDataContainer}>
					<View style={buttonTag.textDataBox}>
						<Text adjustsFontSizeToFit={true} style={buttonTag.textData}>{data}</Text>
					</View>
				</View>
				<View style={buttonTag.textTitleContainer}>
					<View style={buttonTag.textTitleBox}>
						<Text adjustsFontSizeToFit={true} numberOfLines={3} style={buttonTag.textTitle}>{title}</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default ButtonTag;
