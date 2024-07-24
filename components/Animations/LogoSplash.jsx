import React from "react";
import LottieView from "lottie-react-native";

export default function LogoBienvenida({ onFinish }) {
	return (
		<LottieView
			source={require("../../assets/animations/logo_tecmamovil.json")}
			style={{ width: "100%", height: "100%" }}
			autoPlay
			speed={2}
			loop={false}
			onAnimationFinish={onFinish}
		/>
	);
}
