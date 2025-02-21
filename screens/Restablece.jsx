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
	BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import TecmaMovil from "../components/Animations/TecmaMovil";
import NIP from "../components/Login/NIP";
import { handleTextChange } from "../components/Login/textCheck";
import { layout } from "../components/Login/styles";
import fetchPost from "../components/fetching";
import COLORS from "../constants/colors";
import Icon from "../components/Home/icons";
import Loading from "../components/Animations/Loading";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../components/AppContext";
import RegionPicker from "../components/Login/RegionPicker";
import DownArrow from "../components/Animations/DownArrow";
import { reset } from "./styles";
import RegionModal from "../components/Login/RegionModal";

const Restablece = ({ navigation }) => {
	const { platform } = useContext(AppContext);
	console.log("Platform is: ", platform);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [region, setRegion] = useState("Selecciona");
	const [numEmp, setNumEmp] = useState("");
	const [rfc, setRFC] = useState("");
	const [nip, setNip] = useState("");
	const [nip2, setNip2] = useState("");
	const [isNipShown, setIsNipShown] = useState(true);

	const returnRegion = (region) => {
		switch (region) {
			case "Selecciona":
				return "Selecciona una opción";
			case "JRZ":
				return "Cd. Juárez";
			case "MTY":
				return "Monterrey";
			case "AMX":
				return "Amamamex";
			case "TIJ":
				return "Tijuana";
			case "SAL":
				return "Saltillo";
			default:
				break;
		}
	};

	useEffect(() => {
		const backAction = () => {
			if (isInputFocused) {
				if (inputRef.current) {
					inputRef.current.blur(); // Force blur on input
				}
				Keyboard.dismiss();
				setIsInputFocused(false);
				return true; // Prevent default back action
			}
			return false; // Allows normal back behavior when input is not focused
		};

		const keyboardListener = Keyboard.addListener("keyboardDidHide", () => {
			setIsInputFocused(false);
		});

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => {
			backHandler.remove();
			keyboardListener.remove();
		};
	}, [isInputFocused]);

	function modalHandler() {
		setIsModalVisible(!isModalVisible);
	}

	const handleReset = () => {
		setIsLoading(true);
		if (numEmp === "") {
			Alert.alert(
				"Importante",
				"Debes introducir tu número de empleado / reloj"
			);
			setIsLoading(false);
			return;
		}
		if (rfc === "") {
			Alert.alert("Importante", "Debes introducir tu RFC");
			return;
		}
		if (nip.length !== 6) {
			Alert.alert("Importante", "Debes introducir un NIP de 6 dígitos");
			setIsLoading(false);
			return;
		}
		if (nip === "") {
			Alert.alert("Importante", "Debes introducir un NIP");
			setIsLoading(false);
			return;
		}
		if (nip2 === "") {
			Alert.alert("Importante", "Debes reintroducir el NIP");
			return;
		}
		if (nip !== nip2) {
			Alert.alert("Error", "Tus NIPs no coinciden, reintrodúcelo");
			setIsLoading(false);
			return;
		}
		if (region === "Selecciona") {
			Alert.alert("Opción incorrecta", "Selecciona una región");
			setIsLoading(false);
			return;
		}

		const query = {
			query: `mutation resetNIP($numEmp: Int!, $rfc: String!, $newNIP: String!, $region: String!){
				resetNIP(numEmp: $numEmp, rfc: $rfc, newNIP: $newNIP, region: $region)
			}`,
			variables: {
				numEmp: +numEmp,
				newNIP: nip,
				rfc: rfc,
				region: region,
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
						Alert.alert(
							"Error",
							"El RFC proporcionado es incorrecto."
						);
						setIsLoading(false);
						return;
					}
					case "Invalid NIP": {
						Alert.alert(
							"Error",
							"El NIP proporcionado es incorrecto."
						);
						setIsLoading(false);
						return;
					}
					case "Same NIP": {
						Alert.alert(
							"Error",
							"El NIP debe ser diferente del anterior."
						);
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

	useEffect(() => {
		console.log("Modal visibility: ", isModalVisible);
	}, [isModalVisible]);

	return (
		<ImageBackground
			source={require("../assets/backgrounds/FONDOSPLASH.png")}
			style={reset.backgroundContainer}
		>
			<TouchableWithoutFeedback
				onPress={Keyboard.dismiss}
				accessible={false}
			>
				<View style={reset.container}>
					{/* Logo */}
					<View
						style={[
							reset.logoContainer,
							{ flex: isInputFocused ? 40 : 49 },
						]}
					>
						<TecmaMovil />
					</View>

					{/* Margin */}
					<View style={{ flex: isInputFocused ? 1 : 1 }} />

					<KeyboardAvoidingView
						style={reset.credentialsContainer}
						behavior="padding"
						keyboardVerticalOffset={10}
					>
						{/* User */}
						<View style={reset.fieldContainer}>
							<View
								style={[
									reset.iconBox,
									{ backgroundColor: COLORS.primary },
								]}
							>
								<Icon
									name="USER"
									size={20}
									style={reset.icon}
								/>
							</View>
							<View style={reset.field}>
								<TextInput
									placeholder="Número de empleado"
									placeholderTextColor={COLORS.placeholder}
									keyboardType="number-pad"
									inputMode="numeric"
									value={numEmp}
									onChangeText={(text) =>
										handleTextChange(text, setNumEmp)
									}
									maxLength={12}
									style={reset.userInput}
									onFocus={() => setIsInputFocused(true)}
									onBlur={() => setIsInputFocused(false)}
								/>
							</View>
						</View>

						{/* RFC */}
						<View style={reset.fieldContainer}>
							<View
								style={[
									reset.iconBox,
									{ backgroundColor: COLORS.primary },
								]}
							>
								<Icon
									name="USER"
									size={20}
									style={reset.icon}
								/>
							</View>
							<View style={reset.field}>
								<TextInput
									placeholder="Introduce tu RFC"
									placeholderTextColor={COLORS.placeholder}
									value={rfc}
									onChangeText={(text) => setRFC(text.toUpperCase())}
									maxLength={13}
									onFocus={() => setIsInputFocused(true)}
									onBlur={() => setIsInputFocused(false)}
									style={reset.userInput}
								/>
							</View>
						</View>

						{/* NIP */}
						<View style={reset.fieldContainer}>
							<View
								style={[
									reset.iconBox,
									{ backgroundColor: COLORS.secondary },
								]}
							>
								<Icon
									name="PASSWORD"
									size={26}
									style={reset.icon}
								/>
							</View>
							<View style={reset.field}>
								<TextInput
									placeholder="Tu nuevo NIP (6 dígitos)"
									placeholderTextColor={COLORS.placeholder}
									keyboardType="number-pad"
									inputMode="numeric"
									minLength={6}
									maxLength={6}
									value={nip}
									onChangeText={(text) =>
										handleTextChange(text, setNip)
									}
									secureTextEntry={!isNipShown}
									style={reset.userInput}
									onFocus={() => setIsInputFocused(true)}
									onBlur={() => setIsInputFocused(false)}
								/>
								{/* <TouchableOpacity
									onPress={() => setIsNipShown(!isNipShown)}
									style={reset.passEye}
								>
									{isNipShown == true ? (
										<Ionicons
											name="eye-off"
											size={24}
											color={COLORS.black}
										/>
									) : (
										<Ionicons
											name="eye"
											size={24}
											color={COLORS.black}
										/>
									)}
								</TouchableOpacity> */}
							</View>
						</View>

						{/* NIP 2 */}
						<View style={reset.fieldContainer}>
							<View
								style={[
									reset.iconBox,
									{ backgroundColor: COLORS.secondary },
								]}
							>
								<Icon
									name="PASSWORD"
									size={26}
									style={reset.icon}
								/>
							</View>
							<View style={reset.field}>
								<TextInput
									placeholder="Reintroduce el NIP (6 dígitos)"
									placeholderTextColor={COLORS.placeholder}
									keyboardType="number-pad"
									inputMode="numeric"
									minLength={6}
									maxLength={6}
									value={nip2}
									onChangeText={(text) =>
										handleTextChange(text, setNip2)
									}
									secureTextEntry={!isNipShown}
									style={reset.userInput}
									onFocus={() => setIsInputFocused(true)}
									onBlur={() => setIsInputFocused(false)}
								/>
								{/* <TouchableOpacity
										onPress={() => setIsNipShown(!isNipShown)}
										style={reset.passEye}
									>
									{isNipShown == true ? (
										<Ionicons name="eye-off" size={24} color={COLORS.black} />
									) : (
										<Ionicons name="eye" size={24} color={COLORS.black} />
									)}
								</TouchableOpacity> */}
							</View>
						</View>
					</KeyboardAvoidingView>

					{/* Margin */}
					{isInputFocused && <View style={{ flex: 7 }} />}

					{/* Region */}
					<View style={reset.regionContainer}>
						<View style={reset.iconBox}>
							<Icon name="REGION" size={26} style={reset.icon} />
						</View>
						{platform === "ios" ? (
							<TouchableOpacity
								onPress={modalHandler}
								style={reset.field}
							>
								<Text style={reset.fieldText}>
									{returnRegion(region)}
								</Text>
								<View style={reset.arrowContainer}>
									<DownArrow />
								</View>
							</TouchableOpacity>
						) : (
							<View style={reset.field}>
								<RegionPicker
									region={region}
									setRegion={setRegion}
								/>
							</View>
						)}
					</View>

					{/* Login button */}
					<LinearGradient
						colors={[COLORS.naranja, COLORS.rojo]}
						style={reset.buttonContainer}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
					>
						{isLoading ? (
							<TouchableOpacity style={reset.button}>
								<Loading />
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								style={reset.button}
								onPress={handleReset}
							>
								<Text style={reset.buttonText}>
									Restablecer
								</Text>
							</TouchableOpacity>
						)}
					</LinearGradient>

					{/* Reset link */}
					<View style={reset.resetContainer}>
						<Text style={reset.resetText}>
							Devolver a inicio de sesión
						</Text>
						<Pressable onPress={() => navigation.navigate("Login")}>
							<Text style={reset.resetTextLink}>aquí</Text>
						</Pressable>
					</View>
				</View>
			</TouchableWithoutFeedback>
			{isModalVisible && (
				<RegionModal
					region={region}
					setRegion={setRegion}
					onCallback={modalHandler}
					isModalVisible={isModalVisible}
					style={reset.modal}
				/>
			)}
		</ImageBackground>
	);
};

export default Restablece;
