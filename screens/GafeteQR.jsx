import {
	View,
	ImageBackground,
	Image,
	Text,
	StatusBar,
	TouchableOpacity,
	Animated,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import QRCodeStyled from "react-native-qrcode-styled";
import { getGafeteStyle } from "./styles";
import { HomeContext } from "../components/HomeContext";
import AD from "react-native-vector-icons/AntDesign";
import COLORS, { BLACK } from "../constants/colors";
import { AppContext } from "../components/AppContext";
import LoadingContent from "../components/Animations/LoadingContent";
import fetchPost from "../components/fetching";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ShadowedView } from "react-native-fast-shadow";
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/TECMAMOVILCONNECT.svg";
import {
	BarcodeCreatorView,
	BarcodeFormat,
} from "react-native-barcode-creator";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { InteractionManager } from "react-native";
// import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const formatDate = (date) => {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
};

const formatTime = (date) => {
	let hours = date.getHours();
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12 || 12; // Convert hours to 12-hour format and handle midnight (0 => 12)
	hours = String(hours).padStart(2, "0");

	return `${hours}:${minutes}:${seconds} ${ampm}`;
};

const GafeteQR = ({ navigation }) => {
	const {
		profileImg,
		razon,
		name,
		surname_1,
		surname_2,
		puesto,
		numEmp,
		planta,
		accessToken,
	} = useContext(HomeContext);
	const { region, platform, height, width } = useContext(AppContext);
	const badgeRef = useRef(null);
	const [isCapturing, setIsCapturing] = useState(false);

	const waitNextFrame = () =>
		new Promise((resolve) => requestAnimationFrame(() => resolve()));

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));
	const waitFrames = async (n = 2) => {
		for (let i = 0; i < n; i++) await nextFrame();
	};

	const settleUI = async () => {
		// Wait for any gestures/animations/JS work to finish
		await InteractionManager.runAfterInteractions();
		// Give the UI a couple of frames to render the final state
		await waitFrames(5);
		// Extra buffer for low-end devices
		await sleep(200);
	};

	const insets = useSafeAreaInsets();
	console.log("Insets are: ", insets);

	const statusBarHeight =
		platform === "ios" ? insets?.top : StatusBar.currentHeight;
	const [arrowHeight, setArrowHeight] = useState(
		platform === "ios" ? height * 0.65 : 0
	);
	const [whiteHeight, setWhiteHeight] = useState(
		platform === "ios" ? height * 0.35 : 0
	);

	const [layoutReady, setLayoutReady] = useState(platform === "ios");
	const [fadeAnim] = useState(new Animated.Value(0));

	const pictureSize = width * 0.45;
	const pictureRadius = pictureSize * 0.33;
	const gafete = getGafeteStyle(platform);
	const today = new Date();
	const date = formatDate(today);
	const time = formatTime(today);
	const [QRData, setQRData] = useState(null);
	const [badgeData, setBadgeData] = useState(null);
	const [empInfo, setEmpInfo] = useState(null);

	useEffect(() => {
		StatusBar.setHidden(true);

		const getBadgeData = async () => {
			// console.log("Requesting data");
			const badgeQuery = {
				query: `query BadgeData {
							BadgeData {
								data {
									format
								}
								message
								success
							}
						}`,
			};
			// console.log("Query is: ", qrQuery);
			try {
				const data = await fetchPost({
					query: badgeQuery,
					token: accessToken,
				});
				// console.log("Data is: ", data);
				// if (region === "JRZ") {
				if (data.data.BadgeData.success) {
					// console.log("Obtained data is: ", JSON.stringify(data.data, null, 1));
					setBadgeData({ format: data.data.BadgeData.data.format });
				} else {
					setBadgeData({ format: data.data.BadgeData.data.format });
				}
			} catch (error) {
				showMessage({
					message:
						"Hubo un problema al obtener los datos del gafete, intenta de nuevo",
					type: "warning",
					duration: 3000,
					position: "top",
					statusBarHeight: 30,
					icon: { icon: "info", position: "right" },
					// statusBarHeight: 40,
				});
			}
		};

		const getQRData = async () => {
			// console.log("Requesting data");
			const qrQuery = {
				query: `mutation RequestQRData($input: QRInput!) {
							requestQRData(input: $input) {
								data {
									qr
									ingreso
									imss
								}
								message
								success
							}
						}`,
				variables: {
					input: {
						numEmp: numEmp,
						region: region,
					},
				},
			};
			// console.log("Query is: ", qrQuery);
			try {
				const data = await fetchPost({ query: qrQuery });
				// console.log("Data is: ", data);
				// if (region === "JRZ") {
				if (data.data.requestQRData.success) {
					// console.log("Obtained data is: ", JSON.stringify(data.data, null, 1));
					setQRData(data.data.requestQRData.data.qr);
					setEmpInfo({
						ingreso: data.data.requestQRData.data.ingreso,
						imss: data.data.requestQRData.data.imss,
					});
				}
			} catch (error) {
				showMessage({
					message: "Hubo un problema al generar el codigo QR, intenta de nuevo",
					type: "warning",
					duration: 3000,
					position: "top",
					statusBarHeight: 30,
					icon: { icon: "info", position: "right" },
					// statusBarHeight: 40,
				});
			}
		};

		getBadgeData();
		getQRData();
	}, []);

	useEffect(() => {
		if (arrowHeight !== 0 && whiteHeight !== 0 && QRData !== null) {
			setLayoutReady(true);
		}
	}, [arrowHeight, whiteHeight, QRData]);

	useEffect(() => {
		if (layoutReady) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start();
		}
	}, [layoutReady]);

	const handleSaveBadge = async () => {
		try {
			setIsCapturing(true);
			// allow UI to update (buttons hidden) before snapshot
			// await waitNextFrame();
			await settleUI();
			// 1) Capture the referenced view as a PNG into a temp file
			const uri = await captureRef(badgeRef, {
				format: "png",
				quality: 1,
				result: "tmpfile", // returns a file:// URI
			});

			// 2) Ask for permission and save to gallery
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status !== "granted") {
				showMessage({
					message:
						"Permiso de galería denegado. Ajusta los permisos e intenta de nuevo.",
					type: "warning",
					duration: 3000,
					position: "top",
					icon: { icon: "info", position: "right" },
					statusBarHeight: 30,
				});
				return;
			}

			const asset = await MediaLibrary.createAssetAsync(uri);
			// Put it in a custom album (optional). If the album exists, it will just add the asset.
			await MediaLibrary.createAlbumAsync("Gafetes TECMA", asset, false);

			showMessage({
				message: "Gafete guardado en tu galería.",
				type: "success",
				duration: 2500,
				position: "top",
				icon: { icon: "success", position: "right" },
				statusBarHeight: 30,
			});
		} catch (error) {
			showMessage({
				message: "No se pudo guardar el gafete. Intenta de nuevo.",
				type: "danger",
				duration: 3000,
				position: "top",
				icon: { icon: "danger", position: "right" },
				statusBarHeight: 30,
			});
		} finally {
			setIsCapturing(false);
		}
	};

	return QRData ? (
		<View
			style={[
				gafete.container,
				{ height: platform === "ios" ? height : "100%" },
			]}
			ref={badgeRef}
			collapsable={false}
		>
			{/* White Background */}
			<View
				style={[
					gafete.whiteBackground,
					{ height: platform === "ios" ? whiteHeight : "35%" },
				]}
				onLayout={
					platform === "android"
						? (event) => {
								const { height } = event.nativeEvent.layout;
								setWhiteHeight(height);
								console.log("White height is: ", height);
						  }
						: undefined
				}
			/>

			{/* Arrow Background */}
			<View
				style={[
					gafete.arrowBackground,
					{ height: platform === "ios" ? arrowHeight : "65%" },
				]}
				onLayout={(event) => {
					const { height } = event.nativeEvent.layout;
					setArrowHeight(height);
					console.log("Arrow height is: ", height);
				}}
			>
				{QRData && layoutReady && (
					<Animated.View
						style={[gafete.backgroundContainer, { opacity: fadeAnim }]}
					>
						<ImageBackground
							source={require("../assets/backgrounds/GAFETEFONDO.png")}
							resizeMode="cover"
							style={gafete.backgroundContainer}
						/>
					</Animated.View>
				)}
			</View>

			<Animated.View
				style={{
					opacity: fadeAnim,
					position: "absolute",
					top: insets?.top,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			>
				{/* Picture */}
				{QRData && layoutReady && (
					<View
						style={{
							position: "absolute",
							height: pictureSize,
							width: pictureSize,
							bottom: arrowHeight - pictureSize / 2,
							// borderWidth: 2,
							// borderRadius: 150,
							alignSelf: "center",
						}}
					>
						<ShadowedView
							style={[
								gafete.imageContainer,
								{
									borderRadius: pictureRadius,
									overflow: "hidden",
								},
							]}
						>
							<Image
								style={[
									gafete.image,
									{
										borderRadius: pictureRadius,
										// transform: [{ translateY: pictureSize * 0.15 }],
										// top: 20
									},
								]}
								resizeMode="contain"
								// source={require("../../assets/social/imagen.png")}
								source={{
									uri: `data:image/jpeg;base64,${profileImg}`,
								}}
							/>
						</ShadowedView>
					</View>
				)}

				<View
					style={[
						gafete.topContainer,
						{
							height:
								platform === "ios"
									? whiteHeight - statusBarHeight - pictureSize / 2
									: whiteHeight - pictureSize / 2,
							...(platform === "ios" && { top: statusBarHeight }),
						},
					]}
				>
					{/* Back button */}
					<TouchableOpacity
						onPress={() => {
							StatusBar.setHidden(false);
							navigation.goBack();
						}}
						style={[gafete.backButton, { opacity: isCapturing ? 0 : 1 }]}
						pointerEvents={isCapturing ? "none" : "auto"}
					>
						<AD name="arrowleft" size={25} />
					</TouchableOpacity>

					{/* Generate badge button */}
					<TouchableOpacity
						onPress={handleSaveBadge}
						style={[gafete.generateButton, { opacity: isCapturing ? 0 : 1 }]}
						pointerEvents={isCapturing ? "none" : "auto"}
					>
						{/* <AD name="arrowleft" size={25} /> */}
						<Text style={gafete.generateButtonText}>Descargar gafete</Text>
					</TouchableOpacity>

					{/* Logo */}
					<View style={[gafete.dataContainer, { height: "40%" }]}>
						{/* <Image
						source={require("../assets/adaptive-icon.png")}
						style={gafete.logo}
						resizeMethod="resize"
					/> */}
						<Logo style={gafete.logo} />
					</View>

					{/* Name */}
					<View style={[gafete.dataContainer, { height: "60%", bottom: "2%" }]}>
						<Text
							style={{
								fontFamily: "Montserrat-ExtraBold",
								fontSize: 28,
								color: BLACK.b2,
							}}
						>
							{name}
						</Text>
						<Text
							style={{
								fontFamily: "Montserrat-Light",
								fontSize: 22,
								color: BLACK.b2,
							}}
						>
							{surname_1} {surname_2}
						</Text>
					</View>
				</View>

				<View
					style={[
						gafete.bottomContainer,
						{
							height: arrowHeight - pictureSize / 2,
							paddingBottom: insets?.bottom,
						},
					]}
				>
					{/* Job Description */}
					<View
						style={[gafete.dataContainer, { height: "17%", marginTop: "3%" }]}
					>
						<Text style={gafete.jobDescription}>{puesto}</Text>
					</View>

					{/* Employee Number */}
					<View style={[gafete.dataContainer, { height: "8%" }]}>
						<View style={gafete.employeeNumberBackground} />
						<Text style={gafete.employeeNumber}>{numEmp}</Text>
					</View>

					{/* Barcode */}
					<View style={[gafete.dataContainer, { height: "40%" }]}>
						{QRData && badgeData ? ( // keep your existing loading/ready flow
							<View
								style={{
									height: "100%",
									width: "100%",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{/* Optional: your logo */}
								{/* <Logo style={gafete.logoQR} /> */}

								<BarcodeCreatorView
									value={String(numEmp)} // <- employee number
									format={
										badgeData.format === "CODE128"
											? BarcodeFormat.CODE128
											: badgeData.format === "UPCA"
											? BarcodeFormat.UPCA
											: badgeData.format === "QR"
											? BarcodeFormat.QR
											: badgeData.format === "EAN13"
											? BarcodeFormat.EAN13
											: badgeData.format === "AZTEC"
											? BarcodeFormat.AZTEC
											: badgeData.format === "PDF417"
											? BarcodeFormat.PDF417
											: BarcodeFormat.CODE128
									} // supported format enum
									foregroundColor={"#30565E"} // your palette
									style={{ width: 280, height: 120 }} // tune to fit layout
								/>

								{/* Human-readable text under the bars */}
								{/* <Text
									style={{ marginTop: 8, fontWeight: "600", letterSpacing: 1 }}
								>
									{String(numEmp)}
								</Text> */}
							</View>
						) : (
							<LoadingContent />
						)}
					</View>

					{/* Info */}
					<View style={[gafete.dataContainer, { height: "14%" }]}>
						<LinearGradient
							colors={["#01121C", "#18343F"]}
							style={gafete.categoryTitlesContainer}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
						>
							<Text style={[gafete.category, { flex: 1 }]}>Planta</Text>
							<Text style={[gafete.category, { flex: 1 }]}>Ingreso</Text>
							<Text style={[gafete.category, { flex: 1.5 }]}>No. IMSS</Text>
						</LinearGradient>
						{/* <View style={gafete.categoryTitlesContainer}></View> */}
						<LinearGradient
							colors={["#2B4954", "#4A6D76"]}
							style={gafete.categoriesContainer}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 1 }}
						>
							<View style={[gafete.categoryDataContainer, { flex: 1 }]}>
								<Text style={gafete.categoryData}>{planta}</Text>
							</View>
							{empInfo ? (
								<View style={[gafete.categoryDataContainer, { flex: 1 }]}>
									<Text style={gafete.categoryData}>{empInfo.ingreso}</Text>
								</View>
							) : (
								<LoadingContent style={{ flex: 1 }} />
							)}
							{empInfo ? (
								<View style={[gafete.categoryDataContainer, { flex: 1.5 }]}>
									<Text style={gafete.categoryData}>{empInfo.imss}</Text>
								</View>
							) : (
								<LoadingContent style={{ flex: 1.5 }} />
							)}
						</LinearGradient>
					</View>

					{/* Company */}
					<View style={[gafete.dataContainer, { height: "6%" }]}>
						<Text style={gafete.company}>{razon}</Text>
					</View>

					{/* QR info */}
					<View
						style={[
							gafete.dataContainer,
							{
								height: "6%",
								flexDirection: "row",
								backgroundColor: COLORS.flatlistElement1,
							},
						]}
					>
						<View style={gafete.generadoShadowContainer}>
							<View style={gafete.generadoContainer}>
								<Text style={gafete.generado}>GENERADO</Text>
							</View>
						</View>
						<View style={gafete.generadoDataContainer}>
							<Text style={gafete.generadoData}>{date}</Text>
							<Text style={gafete.generadoData}>{time}</Text>
						</View>
					</View>

					{/* Etc */}
					<View style={[gafete.dataContainer, { flex: 1 }]}>
						<Text style={gafete.company}>Validez de 1 semana</Text>
					</View>
				</View>
			</Animated.View>
		</View>
	) : (
		<View style={[gafete.container, { height: "100%" }]}>
			<LoadingContent />
		</View>
	);
};

export default GafeteQR;
