import React from "react";
import LottieView from "lottie-react-native";

export default function Loading() {
	return (
		<LottieView
			source={require("../../assets/animations/loading.json")}
			style={{ height: "100%", width: "100%" }}
			autoPlay
			loop={true}
		/>
	);
	
}
