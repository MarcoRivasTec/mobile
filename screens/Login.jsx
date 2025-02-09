import {
	View,
	Text,
	TextInput,
	Pressable,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
	StatusBar,
	KeyboardAvoidingView,
	TouchableOpacity,
	BackHandler,
	Alert,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { defPass, defRegion } from "../defaultValues";

import TecmaMovil from "../components/Animations/TecmaMovil";
import Icon from "../components/Home/icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ResetPass from "../components/Login/ResetPass";
import RegionModal from "../components/Login/RegionModal";
import { login } from "./styles";
import { AppContext } from "../components/AppContext";
import {
	createSetInputValue,
	handleTextChange,
} from "../components/Login/textCheck";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import RegionPicker from "../components/Login/RegionPicker";
import Loading from "../components/Animations/Loading";
import fetchPost from "../components/fetching";
import { showMessage, hideMessage } from "react-native-flash-message";

const Login = ({ navigation }) => {
	const {
		platform,
		numEmp,
		setInfoFields,
		appVersion,
		playStoreURI,
		appStoreURI,
	} = useContext(AppContext);
	const [nip, setNip] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isNipShown, setIsNipShown] = useState(true);
	const [region, setRegion] = useState("Selecciona");
	const [checkboxState, setCheckboxState] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [versionCheck, setVersionCheck] = useState(false);
	const [canContinue, setCanContinue] = useState(false);

	const inputRef = useRef(null);

	const handleLogin = () => {
		// console.log("Prueba");
		if (!canContinue) {
			showMessage({
				message: "La aplicación tiene una actualización importante",
				description: "Deberás actualizar para poder continuar",
				type: "danger",
				// duration: 15000,
				autoHide: false,
				icon: { icon: "warning", position: "right" },
			});
			return;
		}
		if (numEmp === "") {
			Alert.alert("Debes introducir tu número de empleado o reloj");
			return;
		}
		if (nip === "") {
			Alert.alert("Debes introducir tu NIP");
			return;
		}
		if (region === "Selecciona") {
			Alert.alert("Opción incorrecta", "Selecciona una región");
			return;
		}

		hideMessage();
		setIsLoading(true);

		const query = {
			query: `mutation Mutation($numEmp: String!, $nip: String!, $region: String!) {
						login(numEmp: $numEmp, nip: $nip, region: $region) {
							success
							message
							data {
								token
								name
							}
						}
					}`,
			variables: {
				numEmp: numEmp,
				region: region,
				nip: nip,
			},
		};
		fetchPost({ query })
			.then(async (data) => {
				setIsLoading(false);
				// console.log("Response data at ingreso: ", data);
				// return;
				if (data.data.login.success) {
					// setFields({
					// 	name: data.data.login.name,
					// 	accessToken: data.data.login.token,
					// });
					if (checkboxState) {
						console.log("Checkbox checked");
						await AsyncStorage.setItem("storedNumEmp", numEmp);
						await AsyncStorage.setItem("storedRegion", region);
						console.log("Set items: ", region, numEmp);
					}
					// console.log(JSON.stringify(data.data.login, null, 1));
					setInfoFields({ region: region });
					navigation.replace("WelcomeHome", {
						screen: "Welcome",
						params: {
							name: data.data.login.data.name,
							accessToken: data.data.login.data.token,
						},
					});
				} else if (data.data.login.message) {
					Alert.alert(data.data.login.message);
					return;
				} else {
					Alert.alert(
						"Error",
						"Ocurrió un error inesperado, vuelve a intentarlo."
					);
					return;
				}
			})
			.catch((error) => {
				if (error) {
					console.error("Error at ingreso", error);
				}
				// Alert.alert(error.errors[0].message);
				// Handle the error
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const query = {
		query: `query Versions($currVer: String!){
			Versions(currVer: $currVer) {
				upToDate
				critical					
			}
		}`,
		variables: {
			currVer: appVersion,
		},
	};

	const fetchData = async () => {
		try {
			console.log("\n\nTrying fetch versions");
			const data = await fetchPost({ query });
			console.log("Response data at Versions:", data);
			if (data.data.Versions) {
				if (data.data.Versions.upToDate === false) {
					if (data.data.Versions.critical === true) {
						showMessage({
							message: "La aplicación tiene una actualización importante",
							description:
								"Deberás actualizar para poder continuar. Toca aquí para actualizar",
							type: "danger",
							duration: 20000,
							icon: { icon: "warning", position: "right" },
							onPress: () => {
								openStore();
							},
						});
					} else {
						setCanContinue(true);
						showMessage({
							message: "La aplicación tiene una nueva actualización",
							description:
								"Puedes seguir utilizando la aplicación, pero te recomendamos descargarla. Toca aquí para actualizar.",
							type: "warning",
							duration: 20000,
							icon: { icon: "warning", position: "right" },
							onPress: () => {
								openStore();
							},
						});
					}
				} else {
					setCanContinue(true);
				}
			} else {
				showMessage({
					message: "Error de conexión",
					description:
						"Hubo un problema al contactar nuestros servidores, revisa tu conexión a internet.",
					type: "warning",
					duration: 10000,
					icon: { icon: "warning", position: "right" },
				});
				console.warn("Error retrieving app version information");
			}
		} catch (error) {
			console.error("Error at Versions:", error);
		} finally {
			// setIsLoading(false);
		}
	};

	const openStore = async () => {
		try {
			console.log("Platform is");
			await Linking.openURL(platform === "ios" ? appStoreURI : playStoreURI);
		} catch (error) {
			console.error("Failed to open store: ", error);
		}
	};

	const setNumEmp = createSetInputValue(setInfoFields, "numEmp");

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

	function modalHandler() {
		setIsModalVisible(!isModalVisible);
	}

	useEffect(() => {
		StatusBar.setHidden(true);
		const loadCredentials = async () => {
			try {
				const storedRegion = await AsyncStorage.getItem("storedRegion");
				console.log("Stored region is: ", storedRegion);
				if (storedRegion) setRegion(storedRegion);
			} catch (error) {
				console.error("Failed to load stored employee number: ", error);
			}
		};

		loadCredentials();
		setVersionCheck(true);
		// fetchData();
		setVersionCheck(false);
	}, []);

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

	return (
		<ImageBackground
			source={require("../assets/backgrounds/FONDOSPLASH.png")}
			style={login.backgroundContainer}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={login.container}>
					{/* Logo */}
					<View
						style={[login.logoContainer, { flex: isInputFocused ? 40 : 50 }]}
					>
						<TecmaMovil />
					</View>

					{/* Margin */}
					<View style={{ flex: 6 }} />

					<KeyboardAvoidingView
						style={login.credentialsContainer}
						behavior="padding"
						keyboardVerticalOffset={10}
					>
						{/* User */}
						<View style={login.fieldContainer}>
							<View
								style={[login.iconBox, { backgroundColor: COLORS.primary }]}
							>
								<Icon name="USER" size={20} style={login.icon} />
							</View>
							<View style={login.field}>
								<TextInput
									placeholder="Número de empleado"
									placeholderTextColor={COLORS.placeholder}
									keyboardType="number-pad"
									inputMode="numeric"
									value={numEmp}
									onChangeText={(text) => handleTextChange(text, setNumEmp)}
									maxLength={12}
									style={login.userInput}
									onFocus={() => setIsInputFocused(true)}
									onBlur={() => setIsInputFocused(false)}
								/>
							</View>
						</View>

						{/* NIP */}
						<View style={login.fieldContainer}>
							<View
								style={[login.iconBox, { backgroundColor: COLORS.secondary }]}
							>
								<Icon name="PASSWORD" size={26} style={login.icon} />
							</View>
							<View style={login.field}>
								<TextInput
									placeholder="NIP"
									placeholderTextColor={COLORS.placeholder}
									keyboardType="number-pad"
									inputMode="numeric"
									maxLength={6}
									value={nip}
									onChangeText={(text) => handleTextChange(text, setNip)}
									secureTextEntry={isNipShown}
									style={login.userInput}
									onFocus={() => setIsInputFocused(true)}
									onBlur={() => setIsInputFocused(false)}
								/>
								<TouchableOpacity
									onPress={() => setIsNipShown(!isNipShown)}
									style={login.passEye}
								>
									{isNipShown == true ? (
										<Ionicons name="eye-off" size={24} color={COLORS.black} />
									) : (
										<Ionicons name="eye" size={24} color={COLORS.black} />
									)}
								</TouchableOpacity>
							</View>
						</View>

						{/* Region */}
						<View style={login.fieldContainer}>
							<View style={login.iconBox}>
								<Icon name="REGION" size={26} style={login.icon} />
							</View>
							{platform === "ios" ? (
								<TouchableOpacity onPress={modalHandler} style={login.field}>
									<Text style={login.fieldText}>{returnRegion(region)}</Text>
									<View style={login.arrowContainer}>
										<DownArrow />
									</View>
								</TouchableOpacity>
							) : (
								<View style={login.field}>
									<RegionPicker region={region} setRegion={setRegion} />
								</View>
							)}
						</View>
						{/* User */}
						{/* <User setFocus={setIsInputFocused} /> */}

						{/* NIP */}
						{/* <NIP nip={nip} setNip={setNip} setFocus={setIsInputFocused} /> */}
					</KeyboardAvoidingView>

					{/* Margin */}
					<View
						style={{
							flex: isInputFocused ? 10 : 1,
							// 	borderWidth: 1,
							// 	borderColor: "red",
						}}
					/>

					<View style={login.checkboxContainer}>
						<BouncyCheckbox
							fillColor={COLORS.second}
							isChecked={checkboxState}
							text="Recordarme"
							textStyle={login.checkboxText}
							disableBuiltInState
							onPress={() => setCheckboxState(!checkboxState)}
						/>
					</View>

					{/* Login button */}
					<LinearGradient
						colors={[COLORS.naranja, COLORS.rojo]}
						style={login.buttonContainer}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
					>
						{isLoading || versionCheck ? (
							<TouchableOpacity style={login.button}>
								<Loading />
							</TouchableOpacity>
						) : (
							<TouchableOpacity style={login.button} onPress={fetchData}>
								<Text style={login.buttonText}>Ingresar</Text>
							</TouchableOpacity>
						)}
					</LinearGradient>

					{/* Reset link */}
					<View style={login.resetContainer}>
						<Text style={login.resetText}>No recuerdas tu NIP ?</Text>
						<Pressable onPress={() => navigation.navigate("Restablece")}>
							<Text style={login.resetTextLink}>Restablécelo</Text>
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
				/>
			)}
		</ImageBackground>
	);
};

export default Login;
