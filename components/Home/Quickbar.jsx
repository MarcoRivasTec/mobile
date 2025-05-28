import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { quickbar } from "./styles";
import COLORS from "../../constants/colors";
import Icon from "./icons";
import { Ionicons } from "@expo/vector-icons";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";
import Bell from "../Animations/Bell";
import { HomeContext } from "../HomeContext";

function Quickbar({ changeContent }) {
	//Loading fonts before setting the state for quickbar buttons results in error: rendering more/less hooks in previous state
	const { notifications } = useContext(HomeContext);
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
						numberOfLines={1}
						style={[quickbar.text, { fontSize: 12 }]}
					>
						Redes
					</Text>
				</View>
			</TouchableOpacity>
			{/* Tecma Ideas */}
			<TouchableOpacity
				onPress={() => {
					handlePress("button4");
					changeContent("Ideas");
				}}
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
			{notifications > 0 ? (
				<TouchableOpacity
					onPress={() => {
						handlePress("button5");
						changeContent("Notificaciones");
					}}
					style={quickbar.buttonContainer}
				>
					<View
						style={{
							position: "absolute",
							top: "1%",
							right: 15,
							// marginLeft: 50,
							height: "30%",
							// width: "50%",
							paddingHorizontal: "5%",
							// borderWidth: 1,
							borderRadius: 6,
							backgroundColor: COLORS.familiaRemove,
							zIndex: 5,
							justifyContent: "center",
							alignItems: "center",
							alignSelf: "center",
						}}
					>
						<Text
							style={{
								color: "white",
								fontSize: 12,
								fontFamily: "Montserrat-Medium",
							}}
						>
							{notifications}
						</Text>
					</View>
					<View
						style={[
							quickbar.iconBgContainer,
							{
								backgroundColor: isQuickbarButtonPressed("button5")
									? COLORS.main
									: COLORS.white,
								height: "55%",
							},
						]}
					>
						<View
							style={[
								quickbar.iconContainer,
								{
									height: "100%",
									paddingLeft: 0,
									paddingRight: "2%",
									paddingTop: "5%",
								},
							]}
						>
							<Bell />
						</View>
					</View>
					<View style={[quickbar.textContainer, { width: "90%", top: 0 }]}>
						<Text
							adjustsFontSizeToFit={true}
							// allowFontScaling={true}
							numberOfLines={1}
							style={[quickbar.text, { fontSize: 10 }]}
						>
							Notificaciones
						</Text>
					</View>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					onPress={() => {
						handlePress("button5");
						changeContent("Notificaciones");
					}}
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
						<View
							style={[
								quickbar.iconContainer,
								{ height: "100%", paddingLeft: 0 },
							]}
						>
							<MCI
								name="bell-outline"
								size={27}
								color={
									isQuickbarButtonPressed("button5")
										? COLORS.white
										: COLORS.main
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
							Notificaciones
						</Text>
					</View>
				</TouchableOpacity>
			)}
			{/* <TouchableOpacity
				onPress={() => {
					handlePress("button5");
					changeContent("Directorio");
				}}
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
								isQuickbarButtonPressed("button5")
									? COLORS.white
									: COLORS.main
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
			</TouchableOpacity> */}
		</View>
	);
}

export default Quickbar;
