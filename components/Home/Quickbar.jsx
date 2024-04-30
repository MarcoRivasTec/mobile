import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { quickbar } from "./styles";
import COLORS from "../../constants/colors";
import Icon from "./icons";
import { Ionicons } from "@expo/vector-icons";

function Quickbar({ changeContent }) {
	//Loading fonts before setting the state for quickbar buttons results in error: rendering more/less hooks in previous state
	const [pressedQuickbarButton, setQuickBarPressedButton] = useState(null);

	const handlePress = (QuickbarButtonName) => {
		setQuickBarPressedButton(QuickbarButtonName);
	};

	const isQuickbarButtonPressed = (QuickbarButtonName) => {
		return pressedQuickbarButton === QuickbarButtonName;
	};

	return (
		<View style={quickbar.container}>
			{/* Info Personal */}
			<TouchableOpacity
				onPress={() => {
					handlePress("button1");
					changeContent("InfoPers");
				}}
				style={quickbar.buttonContainer}
			>
				<View
					style={[
						quickbar.iconBgContainer,
						{
							backgroundColor: isQuickbarButtonPressed("button1")
								? COLORS.main
								: COLORS.white,
						},
					]}
				>
					<View style={quickbar.iconContainer}>
						<Icon
							name="INFO_PERS"
							size={20}
							color={
								isQuickbarButtonPressed("button1") ? COLORS.white : COLORS.main
							}
						/>
					</View>
				</View>
				<View style={quickbar.textContainer}>
					<Text
						adjustsFontSizeToFit={true}
						numberOfLines={3}
						style={[quickbar.text, { fontSize: 18 }]}
					>
						Información Personal
					</Text>
				</View>
			</TouchableOpacity>
			{/* Area */}
			<TouchableOpacity
				onPress={() => {
					handlePress("button2");
					changeContent("Area");
				}}
				style={quickbar.buttonContainer}
			>
				<View
					style={[
						quickbar.iconBgContainer,
						{
							backgroundColor: isQuickbarButtonPressed("button2")
								? COLORS.main
								: COLORS.white,
						},
					]}
				>
					<View style={quickbar.iconContainer}>
						<Icon
							name="AREA"
							size={18}
							color={
								isQuickbarButtonPressed("button2") ? COLORS.white : COLORS.main
							}
						/>
					</View>
				</View>
				<View style={quickbar.textContainer}>
					<Text
						adjustsFontSizeToFit={true}
						numberOfLines={3}
						style={[quickbar.text, { fontSize: 13 }]}
					>
						Área
					</Text>
				</View>
			</TouchableOpacity>
			{/* Redes */}
			<TouchableOpacity
				onPress={() => {
					handlePress("button3");
					changeContent("Redes");
				}}
				style={quickbar.buttonContainer}
			>
				<View
					style={[
						quickbar.iconBgContainer,
						{
							backgroundColor: isQuickbarButtonPressed("button3")
								? COLORS.main
								: COLORS.white,
						},
					]}
				>
					<View style={quickbar.iconContainer}>
						<Icon
							name="REDES"
							size={25}
							color={
								isQuickbarButtonPressed("button3") ? COLORS.white : COLORS.main
							}
							style={{ top: "4%" }}
						/>
					</View>
				</View>
				<View style={quickbar.textContainer}>
					<Text
						adjustsFontSizeToFit={true}
						allowFontScaling={true}
						numberOfLines={2}
						style={[quickbar.text, { fontSize: 12 }]}
					>
						Redes
					</Text>
				</View>
			</TouchableOpacity>
			{/* Tecma Ideas */}
			<TouchableOpacity
				onPress={() => handlePress("button4")}
				style={quickbar.buttonContainer}
			>
				<View
					style={[
						quickbar.iconBgContainer,
						{
							backgroundColor: isQuickbarButtonPressed("button4")
								? COLORS.main
								: COLORS.white,
						},
					]}
				>
					<View style={quickbar.iconContainer}>
						<Icon
							name="IDEAS"
							size={26}
							color={
								isQuickbarButtonPressed("button4") ? COLORS.white : COLORS.main
							}
							style={{ top: "4%" }}
						/>
					</View>
				</View>
				<View style={quickbar.textContainer}>
					<Text
						adjustsFontSizeToFit={true}
						allowFontScaling={true}
						numberOfLines={2}
						style={[quickbar.text, { fontSize: 15 }]}
					>
						Tecma Ideas
					</Text>
				</View>
			</TouchableOpacity>
			{/* Directorio */}
			<TouchableOpacity
				onPress={() => handlePress("button5")}
				style={quickbar.buttonContainer}
			>
				<View
					style={[
						quickbar.iconBgContainer,
						{
							backgroundColor: isQuickbarButtonPressed("button5")
								? COLORS.main
								: COLORS.white,
						},
					]}
				>
					<View style={quickbar.iconContainer}>
						<Icon
							name="DIRECTORIO"
							size={24}
							color={
								isQuickbarButtonPressed("button5") ? COLORS.white : COLORS.main
							}
						/>
					</View>
				</View>
				<View style={quickbar.textContainer}>
					<Text
						adjustsFontSizeToFit={true}
						allowFontScaling={true}
						numberOfLines={2}
						style={[quickbar.text, { fontSize: 12 }]}
					>
						Directorio
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

export default Quickbar;
