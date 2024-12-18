import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

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

const gafete = StyleSheet.create({
	backgroundContainer: {
		position: "absolute",
		height: "100%",
		width: "100%",
		resizeMode: "cover",
		overflow: "hidden",
	},
	content: {
		height: "100%",
		width: "100%",
	},
	contentContainer: {
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	dataContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		
	},
	logo: {
		height: "50%",
		width: "50%",
	},
	name: { fontSize: 18 },
	imageContainer: {
		height: "65%",
		width: "34%",
		// width: "auto",
		// borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "1%"
		// borderWidth: 1,
		// borderColor: "white",
		// backgroundColor: "white",
		// iOS Shadow
		// shadowColor: "#000",
		// shadowOffset: { width: 0, height: 4 }, // X: 0, Y: 4
		// shadowOpacity: 0.3,
		// shadowRadius: 5,
		// // Android Shadow
		// elevation: 1,
	},
	imageContainerShadow: {
		position: "absolute",
		height: "100%",
		width: "50%",
		borderRadius: 55,
		backgroundColor: "#000",
		top: 2,
		left: 98,
		opacity: 0.1,
	},
	image: {
		height: "100%",
		width: "100%",
		borderRadius: 20,
		// borderRadius: 100,
		overflow: "hidden",
	},
	jobDescription: {
		fontFamily: "Montserrat-Regular",
		fontSize: 22,
		color: "white",
	},
	employeeNumber: {
		fontFamily: "Roboto-Regular",
		fontSize: 22,
		color: "white",
		letterSpacing: 3,
		bottom: 1
		// marginBottom: "2%"
	},
	QR: {
		height: "50%",
		width: "100%",
	},
	categoryTitlesContainer: {
		height: "40%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	categoriesContainer: {
		height: "60%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	category: {
		height: "100%",
		fontFamily: "Montserrat-Light",
		fontSize: 17,
		color: "white",
		// borderWidth: 1,
		borderColor: "white",
		textAlign: "center",
	},
	categoryData: {
		height: "100%",
		fontFamily: "Roboto-Regular",
		fontSize: 18,
		color: "white",
		// borderWidth: 1,
		borderColor: "white",
		textAlign: "center",
		verticalAlign: "middle",
	},
	company: {
		fontFamily: "Montserrat-LightItalic",
		fontSize: 10,
		color: "white",
		top: 3,
	},
	generadoContainer: {
		height: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		borderColor: "white",
	},
	generado: {
		fontFamily: "Montserrat-Bold",
		fontSize: 13,
		color: "white",
	},
	generadoDataContainer: {
		height: "100%",
		flex: 1.7,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		// borderWidth: 1,
		borderColor: "white",
	},
	generadoData: {
		fontFamily: "Montserrat-Regular",
		fontSize: 12,
		color: "white",
	},
	backButton: {
		position: "absolute",
		top: 0,
		left: 0,
		height: 70,
		width: 70,
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1
	},
});

export { login, gafete };
