import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import Icon from "../../icons";
import { poliza } from "./styles";
import { Ionicons } from "@expo/vector-icons";

function Poliza({
	height,
	width,
	title,
	icon,
	size = 18,
	info1,
	info2,
	info3,
	contact1,
	contactIcon1 = "call",
	contact2,
	contactIcon2 = "call",
	contact3,
	contactIcon3 = "call",
}) {
	const titleHeight = Math.round(height * 0.036);
	const cardHeaderHeight = Math.round(height * 0.064);

	const handlePress = async (phoneNumber) => {
		// Copy the phone number to the clipboard
		await Clipboard.setStringAsync(phoneNumber);

		// Open the phone's dialer application with the copied number
		Linking.openURL(`tel:${phoneNumber}`);
	};

	return (
		<View style={[poliza.container]}>
			{/* Title */}
			<View style={[poliza.titleContainer, { height: titleHeight }]}>
				<Text style={poliza.titleText}>{title}</Text>
			</View>

			<View style={poliza.contentContainer}>
				<View style={poliza.polizaContainer}>
					{/* Member */}
					<View style={poliza.cardHeaderContainer}>
						<View
							style={[
								poliza.cardIconContainer,
								{ height: height * 0.05, width: width * 0.1 },
							]}
						>
							<Icon name={icon} size={size} style={poliza.cardIcon} />
						</View>
						<View style={poliza.cardTitleContainer}>
							<View style={poliza.cardTitleTextContainer}>
								<Text
									adjustsFontSizeToFit={true}
									numberOfLines={1}
									style={poliza.cardTitleText}
								>
									Contacto
								</Text>
							</View>
						</View>
					</View>

					{/* Card Content */}
					<View style={poliza.cardContainer}>
						<View style={poliza.dataContainer}>
							{info1 ? (
								<View style={poliza.dataTextContainer}>
									<Text style={poliza.dataText}>{info1}</Text>
								</View>
							) : null}
							{info2 ? (
								<View style={poliza.dataTextContainer}>
									<Text style={poliza.dataText}>{info2}</Text>
								</View>
							) : null}
							{info3 ? (
								<View style={poliza.dataTextContainer}>
									<Text style={poliza.dataText}>{info3}</Text>
								</View>
							) : null}
						</View>
						{contact1 ? (
							<View style={poliza.dataContactsContainer}>
								<TouchableOpacity
									onPress={() => handlePress(contact1)}
									style={[poliza.dataContactContainer, { marginRight: "3%" }]}
								>
									<View style={poliza.dataContactIconContainer}>
										<Ionicons
											name={contactIcon1}
											size={12}
											style={poliza.dataContactIcon}
										/>
									</View>
									<View style={poliza.dataContactTextContainer}>
										<Text
											adjustsFontSizeToFit={true}
											style={poliza.dataContactText}
										>
											{contact1}
										</Text>
									</View>
								</TouchableOpacity>
								{contact2 ? (
									<TouchableOpacity
										onPress={() => handlePress(contact2)}
										style={poliza.dataContactContainer}
									>
										<View style={poliza.dataContactIconContainer}>
											<Ionicons
												name={contactIcon2}
												size={12}
												style={poliza.dataContactIcon}
											/>
										</View>
										<View style={poliza.dataContactTextContainer}>
											<Text
												adjustsFontSizeToFit={true}
												style={poliza.dataContactText}
											>
												{contact2}
											</Text>
										</View>
									</TouchableOpacity>
								) : null}
								{contact3 ? (
									<TouchableOpacity
										onPress={() => handlePress(contact3)}
										style={[poliza.dataContactContainer, { marginLeft: "3%" }]}
									>
										<View style={poliza.dataContactIconContainer}>
											<Ionicons
												name={contactIcon3}
												size={12}
												style={poliza.dataContactIcon}
											/>
										</View>
										<View style={poliza.dataContactTextContainer}>
											<Text
												adjustsFontSizeToFit={true}
												style={poliza.dataContactText}
											>
												{contact3}
											</Text>
										</View>
									</TouchableOpacity>
								) : null}
							</View>
						) : null}
					</View>
				</View>
			</View>
		</View>
	);
}

export default Poliza;
