import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

const encuestas = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	contentContainer: {
		flex: 19,
		justifyContent: "center",
		alignItems: "center",
		// height: "95%",
		width: "95%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleContainer: {
		flex: 1,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
	},
	scrollContainer: {
		height: "92%",
		// borderWidth: 1,
		width: "95%",
	},
	scrollContentContainer: {
		flexGrow: 1,
	},
	encuestasTitle: {
		marginTop: 8,
		fontSize: 18,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
		color: COLORS.naranja,
	},
	encuestaContainer: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		// marginHorizontal
		marginBottom: 14,
		backgroundColor: "#f9f9f9",
		borderRadius: 5,
		borderWidth: 2,
		borderColor: COLORS.main,
	},
	encuestaTitle: {
		fontSize: 16,
		fontFamily: "Montserrat-SemiBold",
		color: "#333",
	},
	encuestaDetails: {
		fontSize: 14,
		fontFamily: "Montserrat-Medium",
		color: "#666",
	},
	encuestaButton: {
		marginVertical: 10,
		width: "50%",
		paddingHorizontal: 8,
		backgroundColor: COLORS.naranja,
	},
	encuestaButtonText: {
		fontFamily: "Montserrat-Medium",
		color: "white",
		fontSize: 14,
	},
	registroContainer: {
		width: "100%",
		marginTop: "2%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "red"
	},
});

const avisos = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: COLORS.main
		// borderWidth: 1,
		// borderColor: "purple"
	},
	contentContainer: {
		flex: 19,
		justifyContent: "center",
		alignItems: "center",
		// height: "95%",
		width: "95%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleContainer: {
		flex: 1,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
	},
});

const solicitudes = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	contentContainer: {
		flex: 19,
		justifyContent: "center",
		alignItems: "center",
		// height: "95%",
		width: "95%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleContainer: {
		flex: 1,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
	},
	scrollContainer: {
		height: "92%",
		// borderWidth: 1,
		width: "95%",
	},
	scrollContentContainer: {
		flexGrow: 1,
	},
	encuestasTitle: {
		marginTop: 8,
		fontSize: 18,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
		color: COLORS.naranja,
	},
	encuestaContainer: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		// marginHorizontal
		marginBottom: 14,
		backgroundColor: "#f9f9f9",
		borderRadius: 5,
		borderWidth: 2,
		borderColor: COLORS.main,
	},
	encuestaTitle: {
		fontSize: 16,
		fontFamily: "Montserrat-SemiBold",
		color: "#333",
	},
	encuestaDetails: {
		fontSize: 14,
		fontFamily: "Montserrat-Medium",
		color: "#666",
	},
	encuestaButton: {
		marginVertical: 10,
		width: "50%",
		paddingHorizontal: 8,
		backgroundColor: COLORS.naranja,
	},
	encuestaButtonText: {
		fontFamily: "Montserrat-Medium",
		color: "white",
		fontSize: 14,
	},
	registroContainer: {
		width: "100%",
		marginTop: "2%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "red"
	},
});

export { encuestas, avisos, solicitudes };
