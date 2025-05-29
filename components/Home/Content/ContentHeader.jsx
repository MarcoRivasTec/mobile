import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { header as headerStyles } from "./styles"; // Rename to avoid conflict

function ContentHeader({ title }) {
	const slideAnim = useRef(new Animated.Value(300)).current; // Start offscreen (300px right)

	useEffect(() => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<View style={headerStyles.container}>
			<Animated.View
				style={[
					headerStyles.titleContainer,
					{ transform: [{ translateX: slideAnim }] },
				]}
			>
				<Text adjustsFontSizeToFit={true} style={headerStyles.title}>
					{title}
				</Text>
			</Animated.View>
		</View>
	);
}

export default ContentHeader;
