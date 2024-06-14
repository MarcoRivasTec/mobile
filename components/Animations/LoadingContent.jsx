import React from "react";
import LottieView from "lottie-react-native";

export default function LogoBienvenida() {
	return (
		<LottieView
			source={require("../../assets/animations/loadingcontent.json")}
			style={{ width: "100%", height: "100%" }}
			autoPlay
			speed={1}
			loop={true}
		/>
	);
}
