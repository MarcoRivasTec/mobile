import React from "react";
import LottieView from "lottie-react-native";

export default function TecmaMovil() {
	return (
		<LottieView
			source={require("../../assets/animations/tecmamovil.json")}
			style={{ width: "55%", height: "55%" }}
			autoPlay
			loop={true}
		/>
	);
}
