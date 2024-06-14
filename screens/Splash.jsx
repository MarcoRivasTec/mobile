import { StyleSheet, ImageBackground, StatusBar, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import LogoBienvenida from "../components/Animations/LogoSplash";
import { useFonts } from "expo-font";

const Splash = ({ navigation }) => {
	useEffect(() => {
		StatusBar.setHidden(true); // Hide the status bar when the component mounts
	}, []);

	const [fontsLoaded] = useFonts({
		IcoMoon: require("../assets/icons/icomoon/icomoon.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		checkSplashStatus();
	// 	}, 1000);

	// 	return () => clearTimeout(timer);
	// }, []);

	// const checkSplashStatus = async () => {
	// 	try {
	// 		const splashShown = await AsyncStorage.getItem("splashShown");
	// 		if (splashShown !== null) {
	// 			// If splash screen has been shown before, navigate to the next screen
	// 			navigation.replace("Login");
	// 		} else {
	// 			markSplashAsShown();
	// 			navigation.replace("Login");
	// 		}
	// 	} catch (error) {
	// 		console.error("Error checking splash status:", error);
	// 	}
	// };

	// const markSplashAsShown = async () => {
	// 	try {
	// 		// Store in AsyncStorage that the splash screen has been shown
	// 		await AsyncStorage.setItem("splashShown", "true");
	// 	} catch (error) {
	// 		console.error("Error marking splash as shown:", error);
	// 	}
	// };

	const handleFinishAnimation = () => {
		navigation.replace("Login");
	};

	const styles = StyleSheet.create({
		background: {
			flex: 1,
			resizeMode: "cover",
			borderRadius: 15,
			overflow: "hidden",
		},
	});

	return (
		// <ImageBackground
		//   source={require("../assets/backgrounds/FONDOSPLASH.png")}
		//   style={styles.background}
		// >
		//   {/* Logo */}
		//   <Logo></Logo>
		// </ImageBackground>
		<View style={{ flex: 1 }}>
			<LogoBienvenida onFinish={handleFinishAnimation} />
		</View>
	);
};

export default Splash;
