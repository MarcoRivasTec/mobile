import React from "react";
import LottieView from "lottie-react-native";

export default function Denuncia() {
	return (
		<LottieView
			source={require("../../assets/animations/denuncia.json")}
			style={{ width: "120%", height: "120%",  }}
			autoPlay
            loop={true}
		/>
	);
}
