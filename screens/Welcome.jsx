import { Text, Animated, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import COLORS from "../constants/colors";
import WelcomeAnim from "../components/Animations/Welcome";
import getFirstName from "../components/utils";
import fetchPost from "../components/fetching";
import { Buffer } from "buffer";
import { HomeContext } from "../components/HomeContext";
import { AppContext } from "../components/AppContext";

const Welcome = ({ navigation, route }) => {
	const { name, accessToken } = route.params;
	const { numEmp, region } = useContext(AppContext);
	const { setProfileImg, setDataFields, setIsSupervisor, setMenuButtons } =
		useContext(HomeContext);
	const [animFinish, setAnimFinish] = useState(false);
	const [infoFetched, setInfoFetched] = useState(false);

	const handleAnimationFinish = () => {
		setAnimFinish(!animFinish);
	};
	const firstName = getFirstName(name);
	const formattedName =
		firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const getUserInfo = () => {
		const query = {
			query: `query UserInfo($numEmp: String! $region: String!){
				UserInfo(numEmp: $numEmp, region: $region) {
					apellido_pat
					apellido_mat
					sexo
					razon
					planta
					planta_id
					area
					proyecto
					supervisor
					nomina
					puesto
					puesto_id
					turno
					clasificacion
					restricted_sections
				}
				IsSupervisor(
						numEmp: $numEmp,
						region: $region,
				) {
					success
					message
				}
				
			}`,
			variables: {
				numEmp: numEmp,
				region: region,
			},
		};
		// setIsLoading(true);
		fetchPost({ query })
			.then((data) => {
				// console.log("Response data at welcome:", data);
				if (data.data.UserInfo) {
					setDataFields({
						accessToken: accessToken,
						name: name,
						numEmp: numEmp,
						surname_1: data.data.UserInfo.apellido_pat,
						surname_2: data.data.UserInfo.apellido_mat,
						sexo: data.data.UserInfo.sexo,
						razon: data.data.UserInfo.razon,
						planta: data.data.UserInfo.planta,
						plantaID: data.data.UserInfo.planta_id.trim(),
						area: data.data.UserInfo.area,
						proyecto: data.data.UserInfo.proyecto.trim(),
						supervisor: data.data.UserInfo.supervisor,
						nomina: data.data.UserInfo.nomina,
						puesto: data.data.UserInfo.puesto,
						puestoID: data.data.UserInfo.puesto_id.trim(),
						turno: data.data.UserInfo.turno,
						clasificacion: data.data.UserInfo.clasificacion.trim(),
					});
					setInfoFetched(!infoFetched);
					console.log(
						"Restricted sections:",
						data.data.UserInfo.restricted_sections
					);
					setMenuButtons({
						badge: !data.data.UserInfo.restricted_sections.includes("badge"),
						payroll:
							!data.data.UserInfo.restricted_sections.includes("payroll"),
						prepayroll:
							!data.data.UserInfo.restricted_sections.includes("prepayroll"),
						absenteeism:
							!data.data.UserInfo.restricted_sections.includes("absenteeism"),
						loans: !data.data.UserInfo.restricted_sections.includes("loans"),
						savings:
							!data.data.UserInfo.restricted_sections.includes("savings"),
						letters:
							!data.data.UserInfo.restricted_sections.includes("letters"),
						replacements:
							!data.data.UserInfo.restricted_sections.includes("replacements"),
						vacations:
							!data.data.UserInfo.restricted_sections.includes("vacations"),
						policies:
							!data.data.UserInfo.restricted_sections.includes("policies"),
						denounces:
							!data.data.UserInfo.restricted_sections.includes("denounces"),
						opinion:
							!data.data.UserInfo.restricted_sections.includes("opinion"),
					});
					// navigation.replace("Home");
					// if (data.data.IsSupervisor && data.data.IsSupervisor.success) {
					// 	setIsSupervisor(true);
					// }
				} else {
					navigation.replace("Login");
					Alert.alert(
						"Error",
						"Hubo un error al obtener la información del usuario, si esto persiste, contacta a tu departamento de Recursos Humanos."
					);
					console.warn("Error retrieving user info");
				}
				// if (data.data.IsSupervisor && data.data.IsSupervisor.success) {
				// 	setIsSupervisor(true);
				// }

				// setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error at welcome:", error);
				// Handle the error
				// setIsLoading(false);
			});
	};

	const getUserImg = () => {
		const query = {
			query: `query ImageBlob($numEmp: String!, $region: String!){
				ImageBlob(numEmp: $numEmp, region: $region) {
					image
					}
					}`,
			variables: {
				numEmp: numEmp,
				region: region,
			},
		};
		// setIsLoading(true);
		fetchPost({ query })
			.then((data) => {
				// console.log("Response image data at welcome:", data);
				if (data.data.ImageBlob === null) {
					setProfileImg(null);
				} else {
					setProfileImg(
						Buffer.from(data.data.ImageBlob.image, "base64").toString("base64")
					);
					console.log("Image set properly");
				}
				// setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error at welcome img:", error);
				// Handle the error
				// setIsLoading(false);
			});
	};

	useEffect(() => {
		if (infoFetched === true && animFinish === true) {
			// StatusBar.setHidden(false);
			navigation.replace("Home");
		}
	}, [infoFetched, animFinish]);

	useEffect(() => {
		// StatusBar.setHidden(true);
		getUserImg();
		getUserInfo();
	}, []);

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2000, // Adjust the duration as needed
			useNativeDriver: true, // Enable native driver for better performance
		}).start();
	}, [fadeAnim]);

	// useEffect(() => {
	// 	StatusBar.setHidden(true); // Hide the status bar when the component mounts
	// }, []);

	return (
		<View
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				zIndex: 2,
			}}
		>
			<WelcomeAnim
				style={{ position: "absolute", zIndex: 1 }}
				onFinish={handleAnimationFinish}
			/>
			<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
				<Text
					style={{
						color: COLORS.white,
						fontSize: 140,
						marginBottom: "-8%",
						left: "-4%",
					}}
				>
					{" "}
					Hello{" "}
				</Text>
				<Text
					style={{
						color: COLORS.white,
						fontSize: 80,
						textAlign: "center",
						left: "1%",
					}}
				>
					{" "}
					{formattedName}!{" "}
				</Text>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		position: "absolute",
		bottom: "12%",
		justifyContent: "flex-end",
		alignItems: "center",
		zIndex: 2,
	},
});

export default Welcome;
