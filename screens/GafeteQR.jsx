import {
	View,
	ImageBackground,
	Image,
	Text,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
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
	} = useContext(HomeContext);
	const { region, platform, height, width } = useContext(AppContext);
	// console.log("Platform is: ", platform);
	const insets = platform === "ios" ? useSafeAreaInsets() : null;
	const statusBarHeight =
		platform === "ios" ? insets?.top : StatusBar.currentHeight;
	console.log("Status bar height is: ", statusBarHeight);
	const [arrowHeight, setArrowHeight] = useState(
		platform === "ios" ? height * 0.65 : 0
	);
	const [whiteHeight, setWhiteHeight] = useState(
		platform === "ios" ? height * 0.35 : 0
	);
	console.log("arrowHeight and whiteHeight: ", arrowHeight, whiteHeight);
	const pictureSize = width * 0.45;
	const pictureRadius = pictureSize * 0.33;
	// console.log(statusBarHeight);
	const gafete = getGafeteStyle(platform);
	const today = new Date();
	const date = formatDate(today);
	const time = formatTime(today);
	const [QRData, setQRData] = useState(null);
	const [empInfo, setEmpInfo] = useState(null);

	useEffect(() => {
		StatusBar.setHidden(false);
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
						numEmp: +numEmp,
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

		getQRData();
	}, []);

	useEffect(() => {
		// console.log("QR Data is: ", QRData);
	}, [QRData]);

	return QRData ? (
		<View
			style={[
				gafete.container,
				{ height: platform === "ios" ? height : "100%" },
			]}
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
			></View>

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
				<ImageBackground
					source={require("../assets/backgrounds/GAFETEFONDO.png")}
					resizeMode="cover"
					style={gafete.backgroundContainer}
				/>
			</View>

			{/* Picture */}
			{arrowHeight != 0 && (
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
					onPress={() => navigation.goBack()}
					style={gafete.backButton}
				>
					<AD name="arrowleft" size={25} />
				</TouchableOpacity>

				{/* Logo */}
				<View style={[gafete.dataContainer, { height: "40%" }]}>
					<Image
						source={require("../assets/adaptive-icon.png")}
						style={gafete.logo}
					/>
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
					{ height: arrowHeight - pictureSize / 2 },
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

				{/* QR Code */}
				<View style={[gafete.dataContainer, { height: "40%" }]}>
					{QRData ? (
						<QRCodeStyled
							data={QRData}
							style={gafete.QR}
							pieceBorderRadius={2.5}
							outerEyesOptions={{
								topLeft: {
									borderRadius: [15, 15, 0, 15],
									color: "#30565E",
								},
								topRight: {
									borderRadius: [15, 15, 15],
									color: "#30565E",
								},
								bottomLeft: {
									borderRadius: [15, 0, 15, 15],
									color: "#30565E",
								},
							}}
							innerEyesOptions={{
								borderRadius: 7,
								scale: 0.85,
								color: "#30565E",
								// color: "blue"
							}}
							logo={{
								href: require("../assets/LOGO TECMAMOVILCONNECT.png"),
							}}
							gradient={{
								type: "radial",
								options: {
									center: [0.5, 0.5],
									radius: [1, 1],
									colors: ["#467479", "#30565E"],
									locations: [0, 1],
								},
							}}
							pieceSize={4.8}
							pieceScale={1}
						/>
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
								<Text style={gafete.categoryData}>20-09-20</Text>
							</View>
						) : (
							<LoadingContent style={{ flex: 1 }} />
						)}
						{empInfo ? (
							<View style={[gafete.categoryDataContainer, { flex: 1.5 }]}>
								<Text style={gafete.categoryData}>3002515612045</Text>
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
				<View style={[gafete.dataContainer, { flex: 1 }]} />
			</View>
		</View>
	) : (
		<View style={[gafete.container, { height: "100%" }]}>
			<LoadingContent />
		</View>
	);
};

export default GafeteQR;
