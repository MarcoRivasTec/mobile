import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";

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
	/*
	 * Base icon size on the button row, not the complete menu.
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

	const renderIcon = () => {
		if (!rowHeight) {
			return null;
		}

		/*
		 * Image stored in assets.
		 *
		 * icon should be:
		 * require("../../../../assets/images/example.png")
		 */
		if (iconLibrary === "asset") {
			return (
				<Image
					source={icon}
					style={{
						width: iconSize,
						height: iconSize,
					}}
					resizeMode="contain"
				/>
			);
		}

		if (iconLibrary === "AD") {
			return <AD name={icon} size={iconSize} color={COLORS.white} />;
		}

		if (iconLibrary === "Ionicons") {
			return <Ionicons name={icon} size={iconSize} color={COLORS.white} />;
		}

		/*
		 * Default custom TECMA icon library.
		 */
		return <Icon name={icon} size={iconSize} color={COLORS.white} />;
	};

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
							{renderIcon()}
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
