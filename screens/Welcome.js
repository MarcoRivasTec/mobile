import {
	Text,
	Animated,
	ImageBackground,
	StyleSheet,
	View,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef } from "react";
import COLORS from "../constants/colors";
import Logo from "../components/Logo";
import WelcomeAnim from "../components/Animations/Welcome";

const Welcome = ({ navigation }) => {
	// useEffect(() => {
	//   const timer = setTimeout(() => {
	//     navigation.replace("Home");
	//   }, 3000); // 3 seconds to automatically change to the next screen

	//   return () => clearTimeout(timer); // Clears the timer
	// }, []);

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
    navigation.navigate("Home");
    StatusBar.setHidden(false);
  }
	return (
		<View style={{ width: "100%", height: "100%" }}>
			<WelcomeAnim
				style={{ position: "absolute", width: "100%", height: "100%" }}
				onFinish={handleAnimationFinish}
			></WelcomeAnim>
			<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
				<Text
					style={{ color: COLORS.white, fontSize: 140, marginBottom: "-8%", left: "-4%" }}
				>
					{" "}
					Hello{" "}
				</Text>
				<Text
					style={{ color: COLORS.white, fontSize: 80, textAlign: "center", left: "1%" }}
				>
					{" "}
					Marcos!{" "}
				</Text>
			</Animated.View>
		</View>
		// <ImageBackground
		//   source={require("../assets/backgrounds/FONDOBIENVENIDA.png")}
		//   style={{ flex: 1 }}
		// >
		//   {/* Logo */}
		//   <Logo></Logo>

		//   <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
		//     <Text
		//       style={{ color: COLORS.white, fontSize: 140, marginBottom: "-10%" }}
		//     >
		//       {" "}
		//       Hello{" "}
		//     </Text>
		//     <Text
		//       style={{ color: COLORS.white, fontSize: 80, textAlign: "center" }}
		//     >
		//       {" "}
		//       Marcos!{" "}
		//     </Text>
		//   </Animated.View>
		// </ImageBackground>
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
