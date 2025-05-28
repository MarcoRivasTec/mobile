import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import sectionButton from "./styles";
import Icon from "../../icons";
import { Ionicons } from "@expo/vector-icons";
import AD from "react-native-vector-icons/AntDesign";
import COLORS from "../../../../constants/colors";

function SectionButton({
	onPress,
	icon,
	title,
	size = 35,
	iconLibrary = "default",
	marginTop = "12%",
}) {
	const IconComponent =
		iconLibrary === "default" ? Icon : (iconLibrary = "AD" ? AD : Ionicons);

	return (
		<TouchableOpacity style={sectionButton.button} onPress={onPress}>
			<View style={sectionButton.content}>
				<IconComponent
					name={icon}
					style={[sectionButton.icon, { marginTop: marginTop }]}
					size={size}
					color={COLORS.white}
				/>
				<Text numberOfLines={2} style={sectionButton.text}>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
export default SectionButton;
