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
import { BLACK } from "../constants/colors";

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
		plantaID,
	} = useContext(HomeContext);
	const today = new Date();
	const date = formatDate(today);
	const time = formatTime(today);

	// function modalHandler() {
	// 	setIsModalVisible(!isModalVisible);
	// }

	// useEffect(() => {
	// }, []);

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
					<QRCodeStyled
						data={"https://www.tecmamovil.com/"}
						style={{ backgroundColor: "white" }}
						padding={20}
						pieceSize={8}
					/>
				</View>

				{/* Info */}
				<View style={[gafete.dataContainer, { height: "7.6%" }]}>
					<View style={gafete.categoryTitlesContainer}>
						<Text style={[gafete.category, { flex: 1 }]}>Planta</Text>
						<Text style={[gafete.category, { flex: 1.5 }]}>Ingreso</Text>
						<Text style={[gafete.category, { flex: 2 }]}>No. IMSS</Text>
					</View>
					<View style={gafete.categoriesContainer}>
						<Text style={[gafete.categoryData, { flex: 1 }]}>{plantaID}</Text>
						<Text style={[gafete.categoryData, { flex: 1.5 }]}>20-09-20</Text>
						<Text style={[gafete.categoryData, { flex: 2 }]}>
							3002515612045
						</Text>
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
