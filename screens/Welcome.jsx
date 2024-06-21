import { Text, Animated, StyleSheet, View, StatusBar } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import COLORS from "../constants/colors";
import WelcomeAnim from "../components/Animations/Welcome";
import getFirstName from "../components/utils";
import fetchPost from "../components/fetching";
import { AppContext } from "../components/AppContext";

const Welcome = ({ navigation }) => {
	const { numEmp, name, setFields } = useContext(AppContext);
	const firstName = getFirstName(name);
	formattedName =
		firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const getUserInfo = () => {
		const query = {
			query: `query UserInfo($numEmp: String!){
				UserInfo(numEmp: $numEmp) {
					razon
					puesto
					proyecto
				}
			}`,
			variables: {
				numEmp: numEmp,
			},
		};
		// setIsLoading(true);
		fetchPost({ query })
			.then((data) => {
				console.log("Response data at welcome:", data);
				if (data.data.UserInfo.puesto) {
					navigation.replace("Home", {
						razon: data.data.UserInfo.razon,
						puesto: data.data.UserInfo.puesto,
					});
					setFields({ proyecto: data.data.UserInfo.proyecto.trim() });
				} else {
					console.warn("Error retrieving user info");
				}
				// setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error at welcome:", error);
				// Handle the error
				// setIsLoading(false);
			});
	};

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000, // Adjust the duration as needed
			useNativeDriver: true, // Enable native driver for better performance
		}).start();
	}, [fadeAnim]);

	// useEffect(() => {
	// 	StatusBar.setHidden(true); // Hide the status bar when the component mounts
	// }, []);

	const handleAnimationFinish = () => {
		getUserInfo();
		// navigation.navigate("Home");
		StatusBar.setHidden(false);
	};
	return (
		<View style={{ width: "100%", height: "100%" }}>
			<WelcomeAnim
				style={{ position: "absolute", width: "100%", height: "100%" }}
				onFinish={() => handleAnimationFinish()}
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
					{name}!{" "}
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
		zIndex: 1,
	},
});

export default Welcome;
