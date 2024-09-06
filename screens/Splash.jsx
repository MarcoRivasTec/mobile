import { StyleSheet, ImageBackground, StatusBar, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import LogoBienvenida from "../components/Animations/LogoSplash";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

const Splash = ({ navigation }) => {
	useEffect(() => {
		StatusBar.setHidden(true); // Hide the status bar when the component mounts
	}, []);

	// useEffect(() => {
	// 	if (fontsLoaded || error) {
	// 		SplashScreen.hideAsync()
	// 			.then(() => {
	// 				console.log("Splash screen hidden");
	// 			})
	// 			.catch((err) => {
	// 				console.log("Error hiding splash screen: ", err);
	// 			});
	// 	}
	// }, [fontsLoaded, error]);

	const [fontsLoaded, error] = useFonts({
		IcoMoon: require("../assets/icons/icomoon/icomoon.ttf"),
		"Montserrat-BlackItalic": require("../assets/fonts/Montserrat/Montserrat-BlackItalic.ttf"),
		"Montserrat-Medium": require("../assets/fonts/Montserrat/Montserrat-Medium.ttf"),
		"Roboto-Black": require("../assets/fonts/Roboto/Roboto-Black.ttf"),
		"Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
		"Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
	});

	if (!fontsLoaded && !error) {
		// return <LogoBienvenida onFinish={handleFinishAnimation} />;
		return null
		// return (
		// 	<ImageBackground
		// 		source={require("../assets/splash.png")} // Replace with your splash art image
		// 		style={{ flex: 1, resizeMode: "cover" }}
		// 	/>
		// );
	}

	const handleFinishAnimation = () => {
		navigation.replace("Login");
	};

	const styles = StyleSheet.create({
		background: {
			flex: 1,
			resizeMode: "contain",
			// borderRadius: 15,
			// overflow: "hidden",
		},
	});

	return (
		<View style={{ flex: 1 }}>
			<LogoBienvenida onFinish={handleFinishAnimation} />
		</View>
	);
};

export default Splash;
