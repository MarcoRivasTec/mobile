import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import Icon from "../../icons";
import { poliza } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

function Poliza({
	height,
	width,
	title,
	icon,
	line_1,
	line_2 = null,
	line_3 = null,
	ref_1,
	icon_ref_1,
	ref_2 = null,
	icon_ref_2 = null,
	ref_3 = null,
	icon_ref_3 = null,
	ref_4 = null,
	icon_ref_4 = null,
}) {
	// console.log(
	// 	"Passed policy data is: ",
	// 	title,
	// 	icon,
	// 	line_1,
	// 	line_2,
	// 	line_3,
	// 	ref_1,
	// 	icon_ref_1,
	// 	ref_2,
	// 	icon_ref_2
	// );
	const iconSize = 22;
	const refIconSize = 14;
	const cardHeader = { height: 0.05 * height, width: 0.1 * width };
	const refHeight = height * 0.03;
	const cardHeight = Math.round(height * 0.3);
	const titleHeight = Math.round(height * 0.04);
	const cardHeaderHeight = Math.round(height * 0.064);

	const handlePress = async (phoneNumber) => {
		// Copy the phone number to the clipboard
		await Clipboard.setStringAsync(phoneNumber);

		// Open the phone's dialer application with the copied number
		Linking.openURL(`tel:${phoneNumber}`);
	};

	return (
		<View style={poliza.container}>
			{/* Title */}
			<Text style={poliza.titleText}>{title}</Text>

			<View style={poliza.contentContainer}>
				{/* Member */}
				<View
					style={[poliza.cardHeaderContainer, { height: cardHeader.height }]}
				>
					<View
						style={[
							poliza.cardIconContainer,
							{ height: cardHeader.height, width: cardHeader.height },
						]}
					>
						<IconMCI name={icon} size={iconSize} style={poliza.cardIcon} />
					</View>
					<View style={poliza.cardTitleContainer}>
						<Text
							adjustsFontSizeToFit={true}
							numberOfLines={1}
							style={poliza.cardTitleText}
						>
							Contacto
						</Text>
					</View>
				</View>

				{/* Card Content */}
				<View
					style={[poliza.cardContainer, { marginTop: cardHeader.height / 2 }]}
				>
					<Text
						style={[
							poliza.dataText,
							{ marginTop: (cardHeader.height / 2) * 1.2 },
						]}
					>
						{line_1}
					</Text>
					{line_2 ? <Text style={poliza.dataText}>{line_2}</Text> : null}
					{line_3 ? <Text style={poliza.dataText}>{line_3}</Text> : null}

					<View style={[poliza.dataContactsContainer, { height: refHeight }]}>
						<TouchableOpacity
							onPress={() => handlePress(ref_1)}
							style={[
								poliza.dataContactContainer,
								{ width: ref_2 ? "48%" : "100%" },
							]}
						>
							<View
								style={[poliza.dataContactIconContainer, { width: refHeight }]}
							>
								<IconMCI
									name={icon_ref_1}
									size={refIconSize}
									style={poliza.dataContactIcon}
								/>
							</View>
							<View
								style={[
									poliza.dataContactTextContainer,
									{ paddingHorizontal: "1%" },
								]}
							>
								<Text
									adjustsFontSizeToFit={true}
									numberOfLines={1}
									style={poliza.dataContactText}
								>
									{ref_1}
								</Text>
							</View>
						</TouchableOpacity>
						{ref_2 && (
							<TouchableOpacity
								onPress={() => handlePress(ref_2)}
								style={[poliza.dataContactContainer, { width: "48%" }]}
							>
								<View
									style={[
										poliza.dataContactIconContainer,
										{ width: refHeight },
									]}
								>
									<IconMCI
										name={icon_ref_2}
										size={refIconSize}
										style={poliza.dataContactIcon}
									/>
								</View>
								<View
									style={[
										poliza.dataContactTextContainer,
										{ paddingHorizontal: "1%" },
									]}
								>
									<Text
										adjustsFontSizeToFit={true}
										numberOfLines={1}
										style={poliza.dataContactText}
									>
										{ref_2}
									</Text>
								</View>
							</TouchableOpacity>
						)}
					</View>

					{ref_3 && (
						<View style={[poliza.dataContactsContainer, { height: refHeight }]}>
							<TouchableOpacity
								onPress={() => handlePress(ref_3)}
								style={[
									poliza.dataContactContainer,
									{ width: ref_4 ? "48%" : "100%" },
								]}
							>
								<View
									style={[
										poliza.dataContactIconContainer,
										{ width: refHeight },
									]}
								>
									<IconMCI
										name={icon_ref_3}
										size={refIconSize}
										style={poliza.dataContactIcon}
									/>
								</View>
								<View
									style={[
										poliza.dataContactTextContainer,
										{ paddingHorizontal: "1%" },
									]}
								>
									<Text
										adjustsFontSizeToFit={true}
										numberOfLines={1}
										style={poliza.dataContactText}
									>
										{ref_3}
									</Text>
								</View>
							</TouchableOpacity>
							{ref_4 && (
								<TouchableOpacity
									onPress={() => handlePress(ref_4)}
									style={[poliza.dataContactContainer, { width: "48%" }]}
								>
									<View
										style={[
											poliza.dataContactIconContainer,
											{ width: refHeight },
										]}
									>
										<IconMCI
											name={icon_ref_4}
											size={refIconSize}
											style={poliza.dataContactIcon}
										/>
									</View>
									<View
										style={[
											poliza.dataContactTextContainer,
											{ paddingHorizontal: "1%" },
										]}
									>
										<Text
											adjustsFontSizeToFit={true}
											numberOfLines={1}
											style={poliza.dataContactText}
										>
											{ref_4}
										</Text>
									</View>
								</TouchableOpacity>
							)}
						</View>
					)}
				</View>
			</View>
		</View>
	);
}

export default Poliza;
