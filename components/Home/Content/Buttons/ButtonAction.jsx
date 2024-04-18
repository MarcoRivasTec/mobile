import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { buttonAction } from "./styles";
import Icon from "../../icons";

function ButtonAction({ icon, size, title, toggleModal}) {
	
	return (
        <View style={buttonAction.container}>
            <TouchableOpacity onPress={toggleModal} style={buttonAction.container}>
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
                        <Text style={buttonAction.text}>{title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
	);
}

export default ButtonAction;
