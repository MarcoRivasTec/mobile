import React from "react";
import LottieView from "lottie-react-native";

export default function Checkmark() {
	return (
		<LottieView
			source={require("../../assets/animations/checkmark.json")}
			style={{ width: "100%", height: "100%" }}
			autoPlay
            loop={false}
		/>
	);
}
