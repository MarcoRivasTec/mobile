import React from "react";
import { View, Text, Image } from "react-native";
import { buttonInfo } from "./styles";

function ButtonInfo({data, title}) {
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
                    <Text adjustsFontSizeToFit={true} style={buttonInfo.textData}>
                        {data}
                    </Text>
                </View>
                <View style={buttonInfo.textTitleContainer}>
                    <Text adjustsFontSizeToFit={true} style={buttonInfo.textTitle}>
                        {title}
                    </Text>
                </View>

            </View>
		</View>
	);
}

export default ButtonInfo;
