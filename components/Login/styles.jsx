import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const layout = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	fieldContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// marginVertical: "2%",
		flexDirection: "row",
		marginBottom: "4%",
	},
	fieldText: {
		left: "5%",
		fontWeight: "500",
		fontSize: 16,
		color: COLORS.black,
	},
	iconBox: {
		flex: 1,
		height: "100%",
		borderBottomLeftRadius: 24,
		borderTopLeftRadius: 24,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.naranja,
	},
	icon: {
		left: "4%",
		color: COLORS.white,
	},
	field: {
		flex: 7,
		height: "100%",
		backgroundColor: "white",
		// backgroundColor: COLORS.white,
		alignItems: "flex-start",
		justifyContent: "center",
		borderTopRightRadius: 24,
		borderBottomRightRadius: 24,
	},
	picker: {
		// marginLeft: "-2.5%",
		// flex: 7,
		width: "100%",
		height: "100%",
		// borderWidth: 1
		paddingBottom: 2,
	},
	pickerItemStyle: {
		color: "red",
	},
	pickerItem: { color: "red" },
	userInput: {
		paddingHorizontal: "5%",
		flex: 7,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "500",
		fontSize: 14,
		color: COLORS.black,
		textTransform: "uppercase",
	},
	passEye: {
		position: "absolute",
		right: 12,
		flex: 1,
	},
	arrowContainer: {
		position: "absolute",
		top: "7%",
		right: "1%",
		justifyContent: "center",
		alignItems: "center",
		// alignSelf: "flex-end",
		height: "100%",
		width: "15%",
		// backgroundColor: "white"
		// flex: 1,
	},
	checkboxContainer: {
		flex: 0.6,
		width: "90%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
		paddingLeft: "3%",
		marginBottom: "4%",
	},
	buttonContainer: {
		flex: 1,
		width: "90%",
		// marginTop: "%",
		marginBottom: "3%",
		borderRadius: 24,
		// borderWidth: 1,
	},
	button: {
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 15,
		color: "white",
	},
	restablecerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		paddingBottom: "7%",
	},
	restablecerTextIzq: {
		fontSize: 14,
		color: COLORS.black,
	},
	restablecerTextDer: {
		fontSize: 14,
		color: COLORS.primary,
		fontWeight: "bold",
		marginLeft: 6,
	},
});

const modal = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "rgba(255,255,255, 0.9)",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	modalContainer: {
		top: "40%",
		alignSelf: "center",
		position: "absolute",
		height: "25%",
		// marginVertical: "2%",
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(242, 242, 242, 1)",
		borderRadius: 25,
	},
	contentContainer: {
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	picker: {
		width: "100%",
		height: "100%",
		backgroundColor: "red",
		borderWidth: 1,
	},
	pickerItem: {
		// flex: 1,
		fontFamily: "Montserrat-Light",
		fontSize: 17,
		// paddingBottom: 10,
	},
	pickerItemStyle: {
		height: "100%",
		fontSize: 28,
		fontFamily: "Montserrat-Bold",
	},
});

export { layout, modal };
