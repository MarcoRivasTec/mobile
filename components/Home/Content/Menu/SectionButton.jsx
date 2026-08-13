import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import sectionButton from "./styles";
import Icon from "../../icons";
import { Ionicons } from "@expo/vector-icons";
import AD from "react-native-vector-icons/AntDesign";
import COLORS from "../../../../constants/colors";
import { ShadowedView } from "react-native-fast-shadow";

function SectionButton({
	onPress,
	icon,
	title,
	iconLibrary = "default",
	rowHeight,
	delay = 0,
}) {
	const IconComponent =
		iconLibrary === "default" ? Icon : iconLibrary === "AD" ? AD : Ionicons;

	/*
	 * Base icon size on the button row, not the complete menu.
	 * Adjust 0.38 if you want larger or smaller icons.
	 */
	const iconSize = rowHeight ? rowHeight * 0.34 : 0;

	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.95)).current;

	useEffect(() => {
		if (!rowHeight) {
			return;
		}

		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				delay,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 300,
				delay,
				useNativeDriver: true,
			}),
		]).start();
	}, [rowHeight, delay, fadeAnim, scaleAnim]);

	return (
		<Animated.View
			style={[
				sectionButton.animatedContainer,
				{
					opacity: fadeAnim,
					transform: [{ scale: scaleAnim }],
				},
			]}
		>
			<ShadowedView style={sectionButton.shadowedView}>
				<TouchableOpacity
					style={sectionButton.button}
					onPress={onPress}
					disabled={!rowHeight}
					activeOpacity={0.8}
				>
					<View style={sectionButton.content}>
						<View
							style={[
								sectionButton.iconContainer,
								{
									height: iconSize,
								},
							]}
						>
							{rowHeight > 0 && (
								<IconComponent
									name={icon}
									size={iconSize}
									color={COLORS.white}
								/>
							)}
						</View>

						<Text
							numberOfLines={2}
							adjustsFontSizeToFit
							minimumFontScale={0.85}
							style={sectionButton.text}
						>
							{title}
						</Text>
					</View>
				</TouchableOpacity>
			</ShadowedView>
		</Animated.View>
	);
}

export default SectionButton;
