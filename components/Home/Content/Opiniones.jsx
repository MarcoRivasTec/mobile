import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Keyboard,
	Platform,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
} from "react-native";
import { opiniones } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
// import Button from "./Button";

function Opiniones() {
	// const { width, height } = Dimensions.get("window");

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={opiniones.container}>
				<ContentHeader title="Préstamos" />

				<View style={opiniones.contentContainer}>
					<View style={opiniones.titleBar}>
						<TouchableOpacity style={opiniones.titleContainer}>
							<View style={opiniones.iconContainer}>
								<Icon name="search" size={13} style={opiniones.icon}/>
							</View>
							<Text style={opiniones.titleText}>Departamento</Text>
						</TouchableOpacity>
					</View>
					<View style={opiniones.infoContainer}>
						{/* Opinion */}
						<View style={opiniones.dataContainer}>
							<View style={opiniones.dataTitleContainer}>
								<Text style={opiniones.dataTitleText}>
									Deja tu comentario aquí
								</Text>
							</View>

							<KeyboardAvoidingView
								behavior={Platform.OS === "ios" ? "padding" : "height"}
								style={opiniones.dataFieldContainer}
							>
								<TextInput
									multiline={true}
									placeholder="Tu opinión aquí . . ."
									style={opiniones.dataFieldText}
								></TextInput>
							</KeyboardAvoidingView>
						</View>

						{/* Enviar */}
						<TouchableOpacity style={opiniones.buttonContainer}>
							<Text style={opiniones.buttonText}>Enviar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default Opiniones;
