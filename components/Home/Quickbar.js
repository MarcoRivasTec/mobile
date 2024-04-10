import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { quickbar } from "./styles";
import COLORS from "../../constants/colors";
import Icon from "./icons";
import { Ionicons } from "@expo/vector-icons";

function Quickbar({changeContent}) {
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
						style={{
							fontSize: 18,
							textAlign: "center",
							color: COLORS.primary,
							fontWeight: "bold",
						}}
					>
						Información Personal
					</Text>
				</View>
			</TouchableOpacity>
			{/* Area */}
			<TouchableOpacity
				onPress={() => handlePress("button2")}
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
							name="RECIBO_NOM"
							size={25}
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
						style={{
							fontSize: 18,
							textAlign: "center",
							color: COLORS.primary,
							fontWeight: "bold",
						}}
					>
						Recibo de Nómina
					</Text>
				</View>
			</TouchableOpacity>
			{/* Redes */}
			<TouchableOpacity
				onPress={() => handlePress("button3")}
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
							name="POLIZAS"
							size={25}
							color={
								isQuickbarButtonPressed("button3") ? COLORS.white : COLORS.main
							}
						/>
					</View>
				</View>
				<View style={quickbar.textContainer}>
					<Text
						adjustsFontSizeToFit={true}
						allowFontScaling={true}
						numberOfLines={2}
						style={{
							fontSize: 12,
							textAlign: "center",
							color: COLORS.primary,
							fontWeight: "bold",
						}}
					>
						Pólizas
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
						<Ionicons
							name="chatbox-ellipses-outline"
							size={26}
							color={
								isQuickbarButtonPressed("button4") ? COLORS.white : COLORS.main
							}
						/>
					</View>
				</View>
				<View style={quickbar.textContainer}>
					<Text
						adjustsFontSizeToFit={true}
						allowFontScaling={true}
						numberOfLines={2}
						style={{
							fontSize: 12,
							textAlign: "center",
							color: COLORS.primary,
							fontWeight: "bold",
						}}
					>
						Mensajes
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
							name="PRESTAMOS"
							size={26}
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
						style={{
							textAlign: "center",
							color: COLORS.primary,
							fontWeight: "bold",
						}}
					>
						Préstamos
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

export default Quickbar;
