import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

export default function DownArrow() {
	return (
		<LottieView
			source={require("../../assets/animations/downarrow.json")}
			style={{ height: "100%", width: "100%" }}
			autoPlay
			loop={true}
		/>
	);
	
}
