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
		<View style={ideas.container}>
			{/* <ContentHeader title="Redes" /> */}
			<TouchableOpacity onPress={handlePress} style={ideas.contentContainer}>
				{/* <View style={redes.titleContainer}>
					<Text style={redes.titleText}>
						Síguenos en nuestras Redes Sociales
					</Text>
				</View>
				 */}
				<TecmaIdeasAnim />
			</TouchableOpacity>
		</View>
	);
}

export default TecmaIdeas;
