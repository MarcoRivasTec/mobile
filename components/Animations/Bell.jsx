import React from "react";
import LottieView from "lottie-react-native";

export default function Bell() {
	return (
		<LottieView
			source={require("../../assets/animations/bell.json")}
			style={{ height: 32, width: 32 }}
			autoPlay
			loop={true}
		/>
	);
}
