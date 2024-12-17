import React from "react";
import LottieView from "lottie-react-native";

export default function TecmaIdeasAnim() {
	return (
		<LottieView
			source={require("../../assets/animations/tecmaideas.json")}
			style={{ width: "100%", height: "100%" }}
			autoPlay
            resizeMode="contain"
            speed={1}
			loop={false}
		/>
	);
}
