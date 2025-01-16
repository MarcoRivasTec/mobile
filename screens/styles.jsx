import { StyleSheet } from "react-native";
import COLORS, { BLACK } from "../constants/colors";

const login = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		resizeMode: "cover",
		borderRadius: 15,
		overflow: "hidden",
		// justifyContent: "center",
		// alignItems: "center",
	},
	contentContainer: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
	},
	logoContainer: {
		flex: 10,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
	},
	dataContainer: {
		flex: 9,
		width: "90%",
		marginBottom: "3%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1
	},
	userInfoContainer: {
		flex: 2.5,
		justifyContent: "center",
		alignItems: "center",
	},
});

const getGafeteStyle = (platform) => {
	return StyleSheet.create({
		container: {
			// height: "100%",
			width: "100%",
			justifyContent: "center",
			alignItems: "center",
			// borderWidth: 2,
			borderColor: "blue",
			backgroundColor: "white",
		},
		backgroundContainer: {
			position: "absolute",
			height: "100%",
			width: "100%",
			overflow: "hidden",
			justifyContent: "center",
			alignItems: "center",
		},
		whiteBackground: {
			// height: "35%",
			// borderWidth: 1,
			borderColor: "red",
			width: "100%",
		},
		arrowBackground: {
			// height: "65%",
			width: "100%",
			// borderWidth: 1,
			borderColor: "green",
			justifyContent: "flex-end",
			alignItems: "center",
		},
		content: {
			height: "100%",
			width: "100%",
		},
		contentContainer: {
			position: "absolute",
			height: "100%",
			width: "100%",
			justifyContent: "flex-start",
			alignItems: "center",
			// paddingTop: statusBarHeight,
		},
		topContainer: {
			position: "absolute",
			width: "100%",
			top: 0,
			// borderWidth: 2,
			borderColor: "purple"
		},
		bottomContainer: {
			position: "absolute",
			width: "100%",
			bottom: 0,
			// borderWidth: 1,
		},
		dataContainer: {
			// flex: 1,
			width: "100%",
			justifyContent: "center",
			alignItems: "center",
			// borderWidth: 1,
			// borderColor: "white",
		},
		logo: {
			height: "70%",
			width: "40%",
		},
		name: { fontSize: 18 },
		imageContainer: {
			height: "100%",
			width: "100%",
			padding: 5,
			// borderRadius: 40,
			justifyContent: "center",
			alignItems: "center",
			// borderWidth: 1,
			borderColor: "white",
			backgroundColor: "white",
			shadowOffset: { width: 2, height: 4 }, // X: 0, Y: 4
			shadowOpacity: 0.4,
			shadowRadius: 5,
		},
		// imageContainer: {
		// 	height: "100%",
		// 	width: "100%",
		// 	padding: 5,
		// 	// borderRadius: 40,
		// 	justifyContent: "center",
		// 	alignItems: "center",
		// 	borderWidth: 1,
		// 	borderColor: "white",
		// 	backgroundColor: "white",
		// 	// iOS Shadow
		// 	shadowColor: "#000",

		// 	// Android Shadow
		// 	elevation: 50,
		// },
		imageContainerShadow: {
			position: "absolute",
			height: "100%",
			width: "100%",
			// borderRadius: 40,
			backgroundColor: "#000",
			top: 4,
			left: 4,
			opacity: 0.1,
		},
		image: {
			height: "100%",
			// height: 150,
			// width: 150,
			width: "100%",
			// borderRadius: 40,
			// borderRadius: 100,
			overflow: "hidden",
		},
		jobDescription: {
			fontFamily: "Montserrat-Regular",
			fontSize: 22,
			color: "white",
		},
		employeeNumberBackground: {
			position: "absolute",
			height: "100%",
			width: "60%",
			borderTopLeftRadius: 50,
			borderBottomRightRadius: 50,
			backgroundColor: "black",
			opacity: 0.4,
		},
		employeeNumber: {
			fontFamily: "Roboto-Medium",
			fontSize: 22,
			color: "white",
			letterSpacing: 3,
			// marginBottom: "2%"
		},
		QR: {
			height: "100%",
			width: "100%",
		},
		categoryTitlesContainer: {
			height: "40%",
			width: "100%",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			opacity: 0.9,
		},
		categoriesContainer: {
			height: "60%",
			width: "100%",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			opacity: 0.8,
			// borderWidth: 1,
			borderColor: "white"
		},
		category: {
			height: "100%",
			fontFamily: "Montserrat-Light",
			fontSize: 17,
			color: "white",
			// borderWidth: 1,
			borderColor: "white",
			textAlign: "center"
		},
		categoryDataContainer:
		{
			width: "100%",
			justifyContent: "center",
			alignItems: "center"
		},
		categoryData: {
			fontFamily: "Roboto-Regular",
			fontSize: 18,
			color: "white",
			// borderWidth: 1,
			borderColor: "white",
		},
		company: {
			fontFamily: "Montserrat-LightItalic",
			fontSize: 10,
			color: "white",
		},
		generadoShadowContainer: {
			height: "100%",
			width: "35%",
			justifyContent: "center",
			alignItems: "flex-start",
			backgroundColor: BLACK.b2,
			borderTopRightRadius: 40,
			borderBottomRightRadius: 40,
			// borderWidth: 1,
		},
		generadoContainer: {
			height: "100%",
			width: "92%",
			paddingLeft: "8%",
			justifyContent: "center",
			alignItems: "flex-start",
			backgroundColor: BLACK.b4,
			borderTopRightRadius: 40,
			borderBottomRightRadius: 40,
		},
		generado: {
			fontFamily: "Montserrat-Bold",
			fontSize: 13,
			color: "white",
		},
		generadoDataContainer: {
			height: "100%",
			width: "65%",
			flexDirection: "row",
			paddingHorizontal: "3%",
			justifyContent: "space-between",
			alignItems: "center",
			// borderWidth: 1,
			borderColor: "white",
		},
		generadoData: {
			fontFamily: "Montserrat-Regular",
			fontSize: 14,
			color: "white",
		},
		backButton: {
			position: "absolute",
			top: 0,
			// top: statusBarHeight,
			left: 0,
			height: platform === "ios" ? 50 : 70,
			width: 70,
			justifyContent: "center",
			alignItems: "center",
			zIndex: 2,
			// borderWidth: 1
		},
	});
};

export { login, getGafeteStyle };
