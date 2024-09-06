import React, { useContext } from "react";
import LottieView from "lottie-react-native";
import { AppContext } from "../AppContext";

export default function WelcomeAnim({ onFinish}) {
	const { width, height } = useContext(AppContext)
	return (
		<LottieView
			source={require("../../assets/animations/welcome.json")}
			style={{
				width: "100%",
				height: "100%",
				// flexGrow: 1,
				// aspectRatio: width*0.5/height*0.9,
				alignSelf: "center",
			}}
			autoPlay
			resizeMode="cover"
			speed={2}
			loop={false}
			onAnimationFinish={onFinish}
		/>
	);
}
