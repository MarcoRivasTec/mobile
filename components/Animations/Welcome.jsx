import React from "react";
import LottieView from "lottie-react-native";

export default function WelcomeAnim({ onFinish }) {
	return (
		<LottieView
			source={require("../../assets/animations/welcome.json")}
			style={{ width: "100%", height: "100%" }}
			autoPlay
            resizeMode="cover"
            speed={1}
			loop={false}
			onAnimationFinish={onFinish}
		/>
	);
}
