import { Text, Animated, StyleSheet, View, StatusBar } from "react-native";
import React, { useEffect, useRef } from "react";
import COLORS from "../constants/colors";
import WelcomeAnim from "../components/Animations/Welcome";
import getFirstName from "../components/utils";
import fetchPost from "../components/fetching";

const Welcome = ({ navigation, route }) => {
	const { name, numEmp } = route.params;
	const firstName = getFirstName(name);
	formattedName =
		firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

	const query = {
		query: `query getCardInfo($numEmp: String!){
			CardInfo(numEmp: $numEmp) {
				razon
				puesto
			}
		}`,
		variables: {
			numEmp: numEmp,
		},
	};

	const getCardInfo = () => {
		// setIsLoading(true);
		fetchPost({ query })
			.then((data) => {
				console.log("Response data at welcome:", data);
				if (data.data.CardInfo.puesto) {
					navigation.navigate("Home", {
						name: name,
						numEmp: numEmp,
						razon: data.data.CardInfo.razon,
						puesto: data.data.CardInfo.puesto,
					});
					console.log(data.data.CardInfo.puesto);
				} else {
					console.warn("Error retrieving card info");
				}
				// setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error at welcome:", error);
				// Handle the error
				// setIsLoading(false);
			});
	};

	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2000, // Adjust the duration as needed
			useNativeDriver: true, // Enable native driver for better performance
		}).start();
	}, [fadeAnim]);

	useEffect(() => {
		StatusBar.setHidden(true); // Hide the status bar when the component mounts
	}, []);

	const handleAnimationFinish = () => {
		getCardInfo();
		// navigation.navigate("Home");
		StatusBar.setHidden(false);
	};
	return (
		<View style={{ width: "100%", height: "100%" }}>
			<WelcomeAnim
				style={{ position: "absolute", width: "100%", height: "100%" }}
				onFinish={handleAnimationFinish}
			></WelcomeAnim>
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
		zIndex: 1,
	},
});

export default Welcome;
