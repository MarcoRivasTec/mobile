import { Text, TouchableOpacity, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { layout } from "./styles";
import React, { useContext, useEffect, useState } from "react";
import fetchPost from "../fetching";
import Loading from "../Animations/Loading";
import { AppContext } from "../AppContext";
// import { autoLogin } from "../../defaultValues";

import { hideMessage, showMessage } from "react-native-flash-message";

function Ingresar({ nip, checkboxState, navigation, region }) {
	const {
		numEmp,
		setInfoFields,
		appVersion,
		playStoreURI,
		appStoreURI,
		platform,
	} = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const [canContinue, setCanContinue] = useState(false);

	useEffect(() => {
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

		const openStore = async () => {
			try {
				await Linking.openURL(
					platform === "ios" ? appStoreURI : playStoreURI
				);
			} catch (error) {
				console.error("Failed to open store: ", error);
			}
		};

		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				console.log("Response data at Versions:", data);
				if (data.data.Versions) {
					if (data.data.Versions.upToDate === false) {
						if (data.data.Versions.critical === true) {
							showMessage({
								message:
									"La aplicación tiene una actualización importante",
								description:
									"Deberás actualizar para poder continuar. Toca aquí para actualizar",
								type: "danger",
								duration: 20000,
								icon: { icon: "warning", position: "right" },
								onPress: openStore,
							});
						} else {
							setCanContinue(true);
							showMessage({
								message:
									"La aplicación tiene una nueva actualización",
								description:
									"Puedes seguir utilizando la aplicación, pero te recomendamos descargarla. Toca aquí para actualizar.",
								type: "warning",
								duration: 20000,
								icon: { icon: "warning", position: "right" },
								onPress: openStore,
							});
						}
					} else {
						setCanContinue(true);
					}
				} else {
					console.warn("Error retrieving app version information");
				}
			} catch (error) {
				console.error("Error at Versions:", error);
			} finally {
				// setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleLogin = () => {
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
			query: `mutation login($numEmp: String!, $nip: String!, $region: String!){
				login(numEmp: $numEmp, nip: $nip, region: $region) {
					token
					name
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
				// console.log("Response data at ingresoo: ", data);
				if (data.data.login !== null) {
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
							name: data.data.login.name,
							accessToken: data.data.login.token,
						},
					});
				}
				if (data.errors) {
					Alert.alert(data.errors[0].message);
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

	// useEffect(() => {
	// 	if (autoLogin) {
	// 		handleLogin();
	// 	}
	// }, []);

	return (
		<LinearGradient
			colors={[COLORS.naranja, COLORS.rojo]}
			style={layout.buttonContainer}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
		>
			{isLoading === false ? (
				<TouchableOpacity style={layout.button} onPress={handleLogin}>
					<Text style={layout.buttonText}>Ingresar</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity style={layout.button}>
					<Loading />
				</TouchableOpacity>
			)}
		</LinearGradient>
	);
}

export default Ingresar;
