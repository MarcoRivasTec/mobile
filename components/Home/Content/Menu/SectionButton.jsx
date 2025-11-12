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
	menuHeight,
	delay = 0,
}) {
	const IconComponent =
		iconLibrary === "default" ? Icon : iconLibrary === "AD" ? AD : Ionicons;

	const iconContainerHeight = menuHeight ? menuHeight * 0.24 * 0.33 : 0;

	// Animations
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.95)).current;

	useEffect(() => {
		if (menuHeight > 0) {
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
		}
	}, [menuHeight]);

	return (
		<Animated.View
			style={[
				sectionButton.animatedContainer, // ← controls width/margin/height
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
					disabled={!menuHeight}
				>
					<View style={sectionButton.content}>
						<View
							style={[
								sectionButton.iconContainer,
								{ height: iconContainerHeight },
							]}
						>
							{menuHeight > 0 && (
								<IconComponent
									name={icon}
									size={iconContainerHeight * 0.9}
									color={COLORS.white}
								/>
							)}
						</View>
						<Text numberOfLines={2} style={sectionButton.text}>
							{title}
						</Text>
					</View>
				</TouchableOpacity>
			</ShadowedView>
		</Animated.View>
	);
}

export default SectionButton;
