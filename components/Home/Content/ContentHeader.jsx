import React from "react";
import { View, Text } from "react-native";
import { header } from "./styles";

function ContentHeader(props) {
	return (
		<View style={header.container}>
			<View style={header.titleContainer}>
					<Text adjustsFontSizeToFit={true} style={header.title}>{props.title}</Text>
			</View>
		</View>
	);
}

export default ContentHeader;
