import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Linking,
	ActivityIndicator,
} from "react-native";

import { HomeContext } from "../../HomeContext";
import ContentHeader from "./ContentHeader";
import { toka as styles } from "./styles.jsx";
import fetchPost from "../../fetching";

import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

// Keep your existing fetchPost import here
// import fetchPost from "...";

const tokaKLogo = require("../../../assets/images/toka-k.png");
const chatbotIcon = require("../../../assets/images/chatbot.png");

const TOKA_QUERY = `
	query getTOKAData {
		getTOKAData: TOKA {
			success
			message
			data {
				certificate
				phone
				chatbot
			}
		}
	}
`;

export default function Toka() {
	const { accessToken } = useContext(HomeContext);

	const [isLoadingTOKAData, setIsLoadingTOKAData] = useState(false);
	const [tokaError, setTokaError] = useState(null);

	const [tokaData, setTokaData] = useState({
		certificate: null,
		phone: null,
		chatbot: null,
	});

	/**
	 * Executes the GraphQL TOKA request.
	 */
	async function fetchTOKAData() {
		const query = {
			query: TOKA_QUERY,
		};

		const response = await fetchPost({
			query,
			token: accessToken,
		});

		if (response?.errors?.length) {
			console.error("TOKA GraphQL errors:", response.errors);

			throw new Error(response.errors[0]?.message || "TOKA_GRAPHQL_ERROR");
		}

		const result = response?.data?.getTOKAData;

		if (!result) {
			throw new Error("EMPTY_TOKA_RESPONSE");
		}

		if (result.success === false) {
			throw new Error(result.status || "TOKA_REQUEST_REJECTED");
		}

		if (!result.data) {
			throw new Error("EMPTY_TOKA_DATA");
		}

		return result.data;
	}

	/**
	 * Loads TOKA information and stores it in state.
	 */
	async function loadTOKAData() {
		if (!accessToken) return;

		try {
			setIsLoadingTOKAData(true);
			setTokaError(null);

			const data = await fetchTOKAData();

			setTokaData({
				certificate: data?.certificate ?? null,
				phone: data?.phone ?? null,
				chatbot: data?.chatbot ?? null,
			});
		} catch (error) {
			console.error("TOKA data error:", error);

			setTokaError("No se pudo cargar la información de TOKA.");
		} finally {
			setIsLoadingTOKAData(false);
		}
	}

	useEffect(() => {
		if (!accessToken) return;

		loadTOKAData();
	}, [accessToken]);

	/**
	 * Opens the chatbot URL returned by the API.
	 */
	const handleChatbot = async () => {
		if (!tokaData.chatbot) return;

		try {
			// +52 656 620 5188 -> 526566205188
			const whatsappNumber = String(tokaData.chatbot).replace(/\D/g, "");

			const url = `https://wa.me/${whatsappNumber}`;

			await Linking.openURL(url);
		} catch (error) {
			console.error("Error opening WhatsApp:", error);
		}
	};

	/**
	 * Opens the device's telephone dialer.
	 */
	const handlePhoneCall = async () => {
		if (!tokaData.phone) return;

		try {
			// Removes formatting:
			// (656) 620 51 88 -> 6566205188
			const phoneNumber = String(tokaData.phone).replace(/[^\d+]/g, "");

			const url = `tel:${phoneNumber}`;

			await Linking.openURL(url);
		} catch (error) {
			console.error("Error opening phone dialer:", error);
		}
	};

	return (
		<View style={styles.container}>
			<ContentHeader title="TOKA | Información de tarjeta" />

			<View style={styles.contentContainer}>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContentContainer}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					{/* LOADING */}
					{isLoadingTOKAData ? (
						<ActivityIndicator
							size="large"
							color="#2F8588"
							style={{ marginTop: 40 }}
						/>
					) : (
						<>
							{/* ERROR */}
							{tokaError && (
								<Text
									style={{
										color: "#C64755",
										marginBottom: 20,
										textAlign: "center",
									}}
								>
									{tokaError}
								</Text>
							)}

							{/* CERTIFICATE */}
							<View style={styles.certificateContainer}>
								<View style={styles.certificateTitleRow}>
									<View style={styles.certificateLogoContainer}>
										<Image
											source={tokaKLogo}
											style={styles.certificateLogo}
											resizeMode="contain"
										/>
									</View>

									<View style={styles.certificateTitleBackground}>
										<Text style={styles.certificateTitle}>TOKA Cuidarte</Text>
									</View>
								</View>

								<View style={styles.certificateBody}>
									<Text style={styles.certificateNumber}>
										{tokaData.certificate || "Sin información"}
									</Text>
								</View>
							</View>

							{/* CHATBOT */}
							<TouchableOpacity
								style={[
									styles.chatbotButton,
									!tokaData.chatbot && {
										opacity: 0.5,
									},
								]}
								onPress={handleChatbot}
								activeOpacity={0.85}
								disabled={!tokaData.chatbot}
							>
								<Image
									source={chatbotIcon}
									style={styles.chatbotIcon}
									resizeMode="contain"
								/>

								<Text style={styles.chatbotText}>
									Contacta a Beto
									<Text style={styles.chatbotDivider}> | </Text>
									Chatbot directo
								</Text>
							</TouchableOpacity>

							{/* PHONE */}
							<TouchableOpacity
								style={[
									styles.phoneButton,
									!tokaData.phone && {
										opacity: 0.5,
									},
								]}
								onPress={handlePhoneCall}
								activeOpacity={0.8}
								disabled={!tokaData.phone}
							>
								<View style={styles.phoneIconContainer}>
									<IconMCI name="phone" size={24} color="#fff" />
								</View>

								<Text style={styles.phoneText}>
									{tokaData.phone || "Sin información"}
								</Text>
							</TouchableOpacity>
						</>
					)}
				</ScrollView>
			</View>
		</View>
	);
}
