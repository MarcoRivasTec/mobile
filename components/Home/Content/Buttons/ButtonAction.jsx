import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { buttonAction } from "./styles";
import Icon from "../../icons";

function ButtonAction({ icon, size, title, toggleModal, fontSize = 12 }) {
	return (
		<View style={buttonAction.container}>
			<TouchableOpacity onPress={toggleModal} style={buttonAction.button}>
				<Image
					source={require("../../../../assets/BOTON_SELECCION.png")}
					resizeMethod="resize"
					resizeMode="contain"
					style={buttonAction.background}
				/>
				<View style={buttonAction.backgroundContainer}>
					<View style={buttonAction.iconContainer}>
						<Icon name={icon} size={size} style={buttonAction.icon} />
					</View>
					<View style={buttonAction.textContainer}>
						<Text
							minimumFontScale={0.6}
							maxFontSizeMultiplier={1.5}
							adjustsFontSizeToFit={true}
							numberOfLines={2}
							style={[buttonAction.text, { fontSize: fontSize }]}
						>
							{title}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
}

export default ButtonAction;
