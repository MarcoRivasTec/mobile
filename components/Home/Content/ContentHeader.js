import React from "react";
import { View, Text } from "react-native";
import { header } from "./styles";

function ContentHeader(props) {
	return (
		<View style={header.container}>
			<View style={header.titleContainer}>
				<View style={header.titleTextContainer}>
					<Text adjustsFontSizeToFit={true} style={header.title}>{props.title}</Text>
				</View>
			</View>
		</View>
	);
}

export default ContentHeader;
