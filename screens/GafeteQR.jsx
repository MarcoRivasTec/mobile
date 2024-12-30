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
import { gafete } from "./styles";
import { HomeContext } from "../components/HomeContext";
import AD from "react-native-vector-icons/AntDesign";
import COLORS, { BLACK } from "../constants/colors";
import { AppContext } from "../components/AppContext";
import LoadingContent from "../components/Animations/LoadingContent";
import fetchPost from "../components/fetching";

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
	const { region, platform } = useContext(AppContext);
	const today = new Date();
	const date = formatDate(today);
	const time = formatTime(today);
	const [QRData, setQRData] = useState(null);
	const [empInfo, setEmpInfo] = useState(null);

	// function modalHandler() {
	// 	setIsModalVisible(!isModalVisible);
	// }

	useEffect(() => {
		if (platform === "ios") StatusBar.setHidden(false);
		const getQRData = async () => {
			console.log("Requesting data");
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
				console.log("Data is: ", data);
				// if (region === "JRZ") {
				if (data.data.requestQRData.success) {
					console.log("Obtained data is: ", JSON.stringify(data.data, null, 1));
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

	return (
		<View style={gafete.container}>
			<ImageBackground
				source={require("../assets/backgrounds/GAFETEFULL.jpg")}
				style={gafete.backgroundContainer}
			/>

			<View style={gafete.contentContainer}>
				{/* Logos */}
				<View style={[gafete.dataContainer, { height: "13%" }]}>
					<Image
						source={require("../assets/adaptive-icon.png")}
						style={gafete.logo}
					/>
				</View>

				{/* Name */}
				<View style={[gafete.dataContainer, { height: "8%" }]}>
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

				{/* Picture */}
				<View style={[gafete.dataContainer, { height: "28%" }]}>
					{/* <View style={gafete.imageContainerShadow} /> */}
					<View style={gafete.imageContainer}>
						<Image
							style={gafete.image}
							resizeMode="contain"
							// source={require("../../assets/social/imagen.png")}
							source={{
								uri: `data:image/jpeg;base64,${profileImg}`,
							}}
						/>
					</View>
				</View>

				{/* Job Description */}
				<View style={[gafete.dataContainer, { height: "9.5%" }]}>
					<Text style={gafete.jobDescription}>{puesto}</Text>
				</View>

				{/* Employee Number */}
				<View style={[gafete.dataContainer, { height: "3.5%" }]}>
					<Text style={gafete.employeeNumber}>{numEmp}</Text>
				</View>

				{/* QR Code */}
				<View style={[gafete.dataContainer, { height: "20.6%" }]}>
					{QRData ? (
						<QRCodeStyled
							data={QRData}
							style={gafete.QR}
							// padding={30}
							// innerEyesOptions={{
							// 	color: COLORS.naranja,
							// }}
							gradient={{
								type: "linear",
								options: {
									start: [0, 0],
									end: [1, 1],
									// colors: ["#da0c8b", "#00bfff"],
									colors: ["#da0c8b", "#00bfff"],
									locations: [0, 1],
								},
							}}
							// outerEyesOptions={{
							// 	borderTopLeftRadius: 50,
							// 	// border: 12,
							// 	// color: COLORS.naranja,
							// }}
							logo={{ href: require("../assets/LOGO TECMAMOVILCONNECT.png") }}
							pieceSize={5}
							pieceScale={1.04}
						/>
					) : (
						<LoadingContent />
					)}
				</View>

				{/* Info */}
				<View style={[gafete.dataContainer, { height: "7.6%" }]}>
					<View style={gafete.categoryTitlesContainer}>
						<Text style={[gafete.category, { flex: 1 }]}>Planta</Text>
						<Text style={[gafete.category, { flex: 1 }]}>Ingreso</Text>
						<Text style={[gafete.category, { flex: 1.5 }]}>No. IMSS</Text>
					</View>
					<View style={gafete.categoriesContainer}>
						<Text style={[gafete.categoryData, { flex: 1 }]}>{planta}</Text>
						{empInfo ? (
							<Text style={[gafete.categoryData, { flex: 1 }]}>20-09-20</Text>
						) : (
							<LoadingContent style={{ flex: 1 }} />
						)}
						{empInfo ? (
							<Text style={[gafete.categoryData, { flex: 1.5 }]}>
								3002515612045
							</Text>
						) : (
							<LoadingContent style={{ flex: 1.5 }} />
						)}
					</View>
				</View>

				{/* Company */}
				<View style={[gafete.dataContainer, { height: "2.9%" }]}>
					<Text style={gafete.company}>{razon}</Text>
				</View>

				{/* QR info */}
				<View
					style={[
						gafete.dataContainer,
						{ height: "2.9%", flexDirection: "row" },
					]}
				>
					<View style={gafete.generadoContainer}>
						<Text style={gafete.generado}>GENERADO</Text>
					</View>
					<View style={gafete.generadoDataContainer}>
						<Text style={gafete.generadoData}>{date}</Text>
						<Text style={gafete.generadoData}>{time}</Text>
					</View>
				</View>

				{/* Etc */}
				<View style={[gafete.dataContainer, { height: "4%" }]}>
					{/* <Text style={{ color: "white" }}>Lorem Ipsum</Text> */}
				</View>
			</View>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={gafete.backButton}
			>
				<AD name="arrowleft" size={25} />
			</TouchableOpacity>
		</View>
	);
};

export default GafeteQR;
