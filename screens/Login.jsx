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
	Linking,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TecmaMovil from "../components/Animations/TecmaMovil";
import Icon from "../components/Home/icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
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
import DownArrow from "../components/Animations/DownArrow";
import fetchPost from "../components/fetching";
import { showMessage, hideMessage } from "react-native-flash-message";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import { biometricAuthenticate } from "../components/Login/biometricAuth";
import * as SecureStore from "expo-secure-store";

const Login = ({ navigation, route }) => {
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
	const [biometricSet, setBiometricSet] = useState(false);
	const [checkboxState, setCheckboxState] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [versionCheck, setVersionCheck] = useState(false);
	const setNumEmp = createSetInputValue(setInfoFields, "numEmp");
	const inputRef = useRef(null);

	useEffect(() => {
		StatusBar.setHidden(true);
		const loadCredentials = async () => {
			try {
				const storedRegion = await AsyncStorage.getItem("storedRegion");
				console.log("Stored region is: ", storedRegion);
				if (storedRegion) setRegion(storedRegion);

				const biometricFlag = await AsyncStorage.getItem("biometricEnabled");
				console.log("Stored flag is: ", biometricFlag);
				if (biometricFlag === "true") setBiometricSet(true);
			} catch (error) {
				console.error("Failed to load stored employee number: ", error);
			}
		};

		loadCredentials();
		setVersionCheck(true);
		checkStatus();
		setVersionCheck(false);
	}, []);

	const checkStatus = async () => {
		const status = await checkVersion();
		switch (status) {
			case "upToDate":
				console.log("Case was up to date");
				break;
			case "critical":
				console.log("Case was Critical");
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
				break;
			case "nonCritical":
				console.log("Case was nonCritical");
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
				break;
			case "error":
				console.log("Case was error");
				showMessage({
					message: "Error de conexión",
					description:
						"Hubo un problema al contactar nuestros servidores, revisa tu conexión a internet.",
					type: "warning",
					duration: 10000,
					icon: { icon: "warning", position: "right" },
				});
				break;

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

	useEffect(() => {
		// This is implemented due to issue with navigation.replace upon logout inside a modal causing a crash in iOS
		if (route?.params?.clear === true) {
			navigation.reset({
				index: 0,
				routes: [{ name: "Login" }],
			});
		}
	}, [route]);

	const checkVersion = async () => {
		try {
			const data = await fetchPost({ query });
			console.log("Response data at Versions:", data);
			if (data.data.Versions) {
				if (data.data.Versions.upToDate === false) {
					if (data.data.Versions.critical === true) {
						console.log("Returning critical");
						return "critical";
					} else {
						console.log("Returning non critical");
						return "nonCritical";
					}
				} else {
					console.log("Returning up to date");
					return "upToDate";
				}
			} else {
				console.log("Returning error");
				return "error";
				console.warn("Error retrieving app version information");
			}
		} catch (error) {
			console.error("Error at Versions:", error);
			setIsLoading(false);
			setVersionCheck(false);
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

	const handleLogin = async () => {
		// console.log("Prueba");

		setIsLoading(true);
		if (numEmp === "") {
			Alert.alert("Debes introducir tu número de empleado o reloj");
			setIsLoading(false);
			return;
		}
		if (nip === "") {
			Alert.alert("Debes introducir tu NIP");
			setIsLoading(false);
			return;
		}
		if (region === "Selecciona") {
			Alert.alert("Opción incorrecta", "Selecciona una región");
			setIsLoading(false);
			return;
		}

		const status = await checkVersion();
		console.log("Entering switch case with status: ", status);
		switch (status) {
			case "upToDate":
				break;
			case "critical":
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
				setIsLoading(false);
				return;
			case "nonCritical":
				console.log("non Critical case, showing message");
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
				break;
			case "error":
				showMessage({
					message: "Error de conexión",
					description:
						"Hubo un problema al contactar nuestros servidores, revisa tu conexión a internet.",
					type: "warning",
					duration: 10000,
					icon: { icon: "warning", position: "right" },
				});
				setIsLoading(false);
				return;

			default:
				break;
		}

		const loginQuery = {
			query: loginMutation,
			variables: {
				numEmp: numEmp,
				region: region,
				nip: nip,
			},
		};

		const data = await fetchPost({ query: loginQuery });
		try {
			console.log(`Data is: ${JSON.stringify(data, null, 1)}`);
			if (data.data.login.success) {
				if (checkboxState) {
					console.log("Checkbox checked");
					await AsyncStorage.setItem("storedNumEmp", numEmp);
					await AsyncStorage.setItem("storedRegion", region);
					console.log("Set items: ", region, numEmp);
				}
				// console.log(JSON.stringify(data.data.login, null, 1));
				await setInfoFields({ region: region });
				navigation.replace("WelcomeHome", {
					screen: "Welcome",
					params: {
						name: data.data.login.data.name,
						accessToken: data.data.login.data.token,
					},
				});
			} else if (!data.data.login.success) {
				Alert.alert("Error", `${data.data.login.message}`);
				return;
			} else {
				Alert.alert(
					"Error",
					"Ocurrió un error inesperado, vuelve a intentarlo."
				);
				return;
			}
		} catch (error) {
			console.error("Error at ingreso", error);
		} finally {
			setIsLoading(false);
		}
	};

	const loginMutation = `mutation Mutation($numEmp: String!, $nip: String!, $region: String!) {
						login(numEmp: $numEmp, nip: $nip, region: $region) {
							success
							message
							data {
								token
								name
							}
						}
					}`;

	const handleBiometricLogin = async () => {
		try {
			if (biometricSet) {
				console.log("Biometric set, authenticating...");
				const auth = await biometricAuthenticate();
				if (!auth) {
					showMessage({
						message: "Error de autenticación",
						description: "No se pudo autenticar con biometría.",
						type: "danger",
						duration: 5000,
					});
					return;
				}

				console.log(
					"Biometric authentication successful, retrieving credentials..."
				);
				const storedNumEmp = await SecureStore.getItemAsync("numEmp", {
					keychainService: "com.tecma.movilconnect.service.login",
					requireAuthentication: false,
				});
				const storedNip = await SecureStore.getItemAsync("nip", {
					keychainService: "com.tecma.movilconnect.service.login",
					requireAuthentication: false,
				});
				const storedRegion = await SecureStore.getItemAsync("region", {
					keychainService: "com.tecma.movilconnect.service.login",
					requireAuthentication: false,
				});

				console.log(
					"Stored credentials: ",
					storedNumEmp,
					storedNip,
					storedRegion
				);

				if (!storedNumEmp || !storedNip || !storedRegion) {
					showMessage({
						message: "Faltan datos guardados",
						description:
							"Inicia sesión manualmente para configurar biométricos.",
						type: "danger",
						duration: 5000,
					});
					return;
				}

				const loginQuery = {
					query: loginMutation,
					variables: {
						numEmp: storedNumEmp,
						region: storedRegion,
						nip: storedNip,
					},
				};

				console.log("Logging in with stored credentials...");
				const data = await fetchPost({ query: loginQuery });
				try {
					console.log(`Data is: ${JSON.stringify(data, null, 1)}`);
					if (data.data.login.success) {
						console.log("Login successful, setting fields...");
						if (checkboxState) {
							console.log("Checkbox checked");
							await AsyncStorage.setItem("storedNumEmp", numEmp);
							await AsyncStorage.setItem("storedRegion", region);
							console.log("Set items: ", region, numEmp);
						}
						// console.log(JSON.stringify(data.data.login, null, 1));
						console.log("Setting info fields and navigating...");
						await setInfoFields({ region: storedRegion, numEmp: storedNumEmp });
						navigation.replace("WelcomeHome", {
							screen: "Welcome",
							params: {
								name: data.data.login.data.name,
								accessToken: data.data.login.data.token,
							},
						});
					} else if (!data.data.login.success) {
						Alert.alert("Error", `${data.data.login.message}`);
						return;
					} else {
						Alert.alert(
							"Error",
							"Ocurrió un error inesperado, vuelve a intentarlo."
						);
						return;
					}
				} catch (error) {
					Alert.alert(
						"Error",
						"Ocurrió un error al iniciar sesión con biometría."
					);
					console.error("Error at ingreso", error);
				} finally {
					setIsLoading(false);
				}
			} else {
				console.log("Biometric not set, checking credentials");
				if (numEmp !== "" && nip !== "" && region !== "Selecciona") {
					const loginQuery = {
						query: loginMutation,
						variables: {
							numEmp: numEmp,
							region: region,
							nip: nip,
						},
					};
					const data = await fetchPost({ query: loginQuery });
					console.log(`Data is: ${JSON.stringify(data, null, 1)}`);
					if (data.data.login.success) {
						if (checkboxState) {
							console.log("Checkbox checked");
							await AsyncStorage.setItem("storedNumEmp", numEmp);
							await AsyncStorage.setItem("storedRegion", region);
							console.log("Set items: ", region, numEmp);
						}

						console.log("Authenticating with biometrics...");
						const auth = await biometricAuthenticate();
						if (!auth) {
							showMessage({
								message: "Error de autenticación",
								description: "No se pudo autenticar con biometría.",
								type: "danger",
								duration: 5000,
							});
							return;
						}

						await SecureStore.setItemAsync("numEmp", numEmp, {
							keychainService: "com.tecma.movilconnect.service.login",
							requireAuthentication: false,
						});
						await SecureStore.setItemAsync("nip", nip, {
							keychainService: "com.tecma.movilconnect.service.login",
							requireAuthentication: false,
						});
						await SecureStore.setItemAsync("region", region, {
							keychainService: "com.tecma.movilconnect.service.login",
							requireAuthentication: false,
						});

						await AsyncStorage.setItem("biometricEnabled", "true");

						await setInfoFields({ region: region });
						navigation.replace("WelcomeHome", {
							screen: "Welcome",
							params: {
								name: data.data.login.data.name,
								accessToken: data.data.login.data.token,
							},
						});
					} else if (!data.data.login.success) {
						Alert.alert("Error", `${data.data.login.message}`);
						return;
					} else {
						Alert.alert(
							"Error",
							"Ocurrió un error inesperado, vuelve a intentarlo."
						);
						return;
					}
				} else {
					showMessage({
						message: "La autenticación biométrica requiere tus credenciales",
						description:
							"Por favor, ingresa tu número de empleado, NIP y región antes de usar la autenticación biométrica.",
						type: "danger",
						duration: 10000,
					});
					return;
				}
			}
		} catch (error) {
			console.error("Error during biometric login: ", error);
			showMessage({
				message: "Error de autenticación biométrica",
				description: "Hubo un problema al intentar autenticarte.",
				type: "danger",
				duration: 5000,
			});
		}
	};

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
					<View style={{ flex: isInputFocused ? 1 : 6 }} />

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
					<View style={login.buttonsContainer}>
						<TouchableOpacity
							onPress={handleBiometricLogin}
							style={[
								login.buttonContainer,
								{ width: "15%", backgroundColor: COLORS.naranja },
							]}
						>
							<IconMCI name="fingerprint" size={32} color={COLORS.white} />
						</TouchableOpacity>
						<LinearGradient
							colors={[COLORS.naranja, COLORS.rojo]}
							style={[login.buttonContainer, { width: "83%" }]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
						>
							{isLoading || versionCheck ? (
								<TouchableOpacity style={login.button}>
									<Loading />
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={login.button} onPress={handleLogin}>
									<Text style={login.buttonText}>Ingresar</Text>
								</TouchableOpacity>
							)}
						</LinearGradient>
					</View>

					{/* Reset link */}
					<View style={login.resetContainer}>
						<Text style={login.resetText}>No recuerdas tu NIP ?</Text>
						<Pressable onPress={() => navigation.navigate("Restablece")}>
							<Text style={login.resetTextLink}>Restablécelo</Text>
						</Pressable>
					</View>

					{/* Version */}
					<Text style={login.version}>v{appVersion}</Text>
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
