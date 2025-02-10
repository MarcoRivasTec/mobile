import {
	View,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	TouchableOpacity,
	Platform,
	TextInput,
	Text,
	Pressable,
	Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import TecmaMovil from "../components/Animations/TecmaMovil";
import NIP from "../components/Login/NIP";
import { handleTextChange } from "../components/Login/textCheck";
import { login } from "./styles";
import { layout } from "../components/Login/styles";
import fetchPost from "../components/fetching";
import COLORS from "../constants/colors";
import Icon from "../components/Home/icons";
import Loading from "../components/Animations/Loading";
import { API_ENDPOINT } from "@env";

const Restablece = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [numEmp, setNumEmp] = useState("");
	const [rfc, setRFC] = useState("");
	const [nip, setNip] = useState("");
	const [nip2, setNip2] = useState("");

	const handleReset = () => {
		if (numEmp === "") {
			Alert.alert(
				"Importante",
				"Debes introducir tu número de empleado / reloj"
			);
			return;
		}
		if (rfc === "") {
			Alert.alert("Importante", "Debes introducir tu RFC");
			return;
		}
		if (nip === "") {
			Alert.alert("Importante", "Debes introducir un NIP");
			return;
		}
		if (nip2 === "") {
			Alert.alert("Importante", "Debes reintroducir el NIP");
			return;
		}
		if (nip !== nip2) {
			Alert.alert("Error", "Tus NIPs no coinciden, reintrodúcelo");
			return;
		}

		setIsLoading(true);
		const query = {
			query: `mutation resetNIP($numEmp: Int!, $rfc: String!, $newNIP: Int!){
				resetNIP(numEmp: $numEmp, rfc: $rfc, newNIP: $newNIP)
			}`,
			variables: {
				numEmp: +numEmp,
				newNIP: +nip,
				rfc: rfc,
			},
		};
		fetchPost({ query })
			.then((data) => {
				console.log(JSON.stringify(data.data.resetNIP, null, 1));
				switch (data.data.resetNIP) {
					case "Success": {
						Alert.alert(
							"Cambio exitoso",
							"Podrás utilizar tu nuevo NIP para ingresar a TECMAMóvil Connect."
						);
						navigation.replace("Login");
						setIsLoading(false);
						return;
					}
					case "Not found": {
						Alert.alert(
							"Error",
							"No se encontró un empleado con el número de reloj proporionado."
						);
						setIsLoading(false);
						return;
					}
					case "Invalid RFC": {
						Alert.alert("Error", "El RFC proporcionado es incorrecto.");
						setIsLoading(false);
						return;
					}
					case "Invalid NIP": {
						Alert.alert("Error", "El NIP proporcionado es incorrecto.");
						setIsLoading(false);
						return;
					}

					default:
						break;
				}
			})
			.catch((error) => {
				setIsLoading(false);
				if (error) {
					console.error("Error at restablecer", error);
				}
				// Alert.alert(error.errors[0].message);
				// Handle the error
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<ImageBackground
			source={require("../assets/backgrounds/FONDOSPLASH.png")}
			style={login.backgroundContainer}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={[login.contentContainer, { width: "90%" }]}>
					{/* Logo */}
					<View
						style={[login.logoContainer, { flex: isInputFocused ? 7 : 10 }]}
					>
						<TecmaMovil />
					</View>

					{/* Num Emp */}
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={[layout.fieldContainer, { marginVertical: "0%" }]}
					>
						<View style={[layout.iconBox, { backgroundColor: COLORS.primary }]}>
							<Icon name="USER" size={20} style={layout.icon} />
						</View>
						<View style={layout.field}>
							<TextInput
								placeholder="Número de empleado"
								placeholderTextColor={COLORS.placeholder}
								keyboardType="number-pad"
								inputMode="numeric"
								value={numEmp}
								onChangeText={(text) => handleTextChange(text, setNumEmp)}
								maxLength={12}
								style={layout.userInput}
							/>
						</View>
					</KeyboardAvoidingView>

					{/* RFC */}
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={[layout.fieldContainer, { marginVertical: "0%" }]}
					>
						<View style={[layout.iconBox, { backgroundColor: COLORS.primary }]}>
							<Icon name="USER" size={20} style={layout.icon} />
						</View>
						<View style={layout.field}>
							<TextInput
								placeholder="Introduce tu RFC"
								placeholderTextColor={COLORS.placeholder}
								value={rfc}
								onChangeText={(text) => setRFC(text)}
								maxLength={13}
								onFocus={() => setIsInputFocused(true)}
								onBlur={() => setIsInputFocused(false)}
								style={layout.userInput}
							/>
						</View>
					</KeyboardAvoidingView>

					{/* NIP */}
					<NIP
						nip={nip}
						setNip={setNip}
						placeholder="Nuevo NIP"
						setFocus={setIsInputFocused}
					/>

					<NIP
						nip={nip2}
						setNip={setNip2}
						placeholder="Tu NIP de nuevo"
						setFocus={setIsInputFocused}
					/>

					{/* Restablecer button */}
					<LinearGradient
						colors={[COLORS.naranja, COLORS.rojo]}
						style={layout.buttonContainer}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
					>
						{isLoading === false ? (
							<TouchableOpacity style={layout.button} onPress={handleReset}>
								<Text style={layout.buttonText}>Restablecer</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity style={layout.button}>
								<Loading />
							</TouchableOpacity>
						)}
					</LinearGradient>

					{/* Restablecer */}
					<View style={layout.restablecerContainer}>
						<Text style={layout.restablecerTextIzq}>
							Devolver a inicio de sesión
						</Text>

						<Pressable onPress={() => navigation.navigate("Login")}>
							<Text style={layout.restablecerTextDer}>aquí</Text>
						</Pressable>
					</View>
				</View>
			</TouchableWithoutFeedback>

			{/* {isModalVisible && (
				<RegionModal
					region={region}
					setRegion={setRegion}
					onCallback={modalHandler}
					isModalVisible={isModalVisible}
				/>
			)} */}
		</ImageBackground>
	);
};

export default Restablece;
