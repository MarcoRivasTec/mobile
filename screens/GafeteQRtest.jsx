import {
	View,
	ImageBackground,
	Image,
	Text,
	StatusBar,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
// import QRCodeStyled from "react-native-qrcode-styled";
import QRCodeStyled, {
	INNER_EYE_SIZE_IN_BITS,
	isCoordsOfInnerEyes,
	isCoordsOfOuterEyes,
	OUTER_EYE_SIZE_IN_BITS,
	RenderCustomPieceItem,
	SVGGradient,
	SVGQRCodeStyledProps,
} from "react-native-qrcode-styled";
import { Defs, G, Path } from "react-native-svg";

import { getGafeteStyle } from "./styles";
import { HomeContext } from "../components/HomeContext";
import AD from "react-native-vector-icons/AntDesign";
import COLORS, { BLACK } from "../constants/colors";
import { AppContext } from "../components/AppContext";
import LoadingContent from "../components/Animations/LoadingContent";
import fetchPost from "../components/fetching";
import { SafeAreaView } from "react-native-safe-area-context";

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
	const statusBarHeight = platform === "ios" ? 20 : StatusBar.currentHeight;
	console.log(statusBarHeight);
	const gafete = getGafeteStyle(statusBarHeight);
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
					// console.log("Obtained data is: ", JSON.stringify(data.data, null, 1));
					setQRData(data.data.requestQRData.data.qr);
					setEmpInfo({
						ingreso: data.data.requestQRData.data.ingreso,
						imss: data.data.requestQRData.data.imss,
					});
				}
			} catch (error) {
				showMessage({
					message:
						"Hubo un problema al generar el codigo QR, intenta de nuevo",
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

	const renderCustomPieceItem = ({ x, y, pieceSize, bitMatrix }) => {
		if (
			bitMatrix[y]?.[x] === 1
			// !isCoordsOfCornerSquare(x, y, bitMatrix.length) && // <-- add this if you want to exclude corner squares from svg
			// !isCoordsOfCornerDot(x, y, bitMatrix.length) // <-- add this if you want to exclude corner dot from svg
		) {
			const c = Math.round(Math.random() * 120);

			return (
				<Path
					fill={`rgb(${c},${c},${c})`}
					key={`piece_${x}_${y}`}
					d={`
				M${pieceSize * x} ${pieceSize * y} 
				L${pieceSize * (x + 1)} ${pieceSize * y} 
				L${pieceSize * (x + 1)} ${pieceSize * (y + 1)} 
				L${pieceSize * x} ${pieceSize * (y + 1)} z
			  `}
				/>
			);
		}

		return null;
	};

	return (
		<View style={gafete.container}>
			<View style={gafete.contentContainer}>
				{QRData ? (
					<QRCodeStyled
						data={QRData}
						style={gafete.QR}
						// padding={30}
						pieceBorderRadius={13.5}
						outerEyesOptions={{
							topLeft: {
								borderRadius: [80, 80, 0, 80],
								color: COLORS.green,
							},
							topRight: {
								borderRadius: [80, 80, 80],
								color: COLORS.green,
							},
							bottomLeft: {
								borderRadius: [80, 0, 80, 80],
								color: COLORS.green,
							},
						}}
						innerEyesOptions={{
							borderRadius: 40,
							scale: 0.85,
							color: COLORS.primary,
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
								colors: [COLORS.secondary, COLORS.primary],
								locations: [0, 1],
							},
						}}
						pieceSize={26}
						pieceScale={1}
					/>
				) : (
					<LoadingContent />
				)}
			</View>
		</View>
	);
};

export default GafeteQR;
