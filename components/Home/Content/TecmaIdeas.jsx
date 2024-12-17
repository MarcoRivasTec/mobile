import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { ideas } from "./styles";
import ContentHeader from "./ContentHeader";
import TecmaIdeasAnim from "../../Animations/TecmaIdeasAnim";

function TecmaIdeas() {
	const handlePress = () => {
		Linking.openURL("https://www.tecmaideas.com");
	};
	return (
		<TouchableOpacity onPress={handlePress} style={ideas.container}>
			<TecmaIdeasAnim />
		</TouchableOpacity>
	);
}

export default TecmaIdeas;
