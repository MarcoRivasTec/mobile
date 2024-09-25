import { StyleSheet } from "react-native";
import COLORS from "../../../../../constants/colors";

const modifyDomicilioModal = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	backgroundContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "rgba(255,255,255, 0.9)",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		// borderRadius: 20,
	},
	modalContainer: {
		// height: "38%",
		marginVertical: "2%",
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(242, 242, 242, 1)",
		borderRadius: 25,
	},
	contentContainer: {
		// flex: 1,
		height: "auto",
		width: "90%",
		paddingTop: 16,
		paddingBottom: 18,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	titleText: {
		fontSize: 22,
		fontWeight: "bold",
		color: COLORS.black,
		// borderWidth: 1
	},
	uploadButton: {
		height: 80,
		width: "50%",
		marginTop: 15,
		// flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderRadius: 8,
		borderColor: "gray",
		alignSelf: "center"

	},
	sectionTitleText: {
		marginTop: 18,
		fontSize: 15,
		// fontWeight: "bold",
		color: COLORS.black,
		// borderWidth: 1
	},
	dataContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingHorizontal: 5,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: COLORS.flatlistElement1
	},
	dataText: {
		height: "100%",
		width: "100%",
		fontSize: 12,
		color: "black",
	},
	icon: {
		position: "absolute",
		alignSelf: "flex-end",
		paddingRight: "3%",
	},
	buttonsContainer: {
		// flex: 1,
		marginTop: 30,
		height: 40,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		// marginVertical: "3%",
	},
	registrarButton: {
		width: "30%",
		height: "100%",
		backgroundColor: COLORS.naranja,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.naranja,
	},
	registrarButtonText: {
		fontSize: 13,
		fontWeight: "bold",
		color: COLORS.white,
	},
	exitButton: {
		width: "30%",
		height: "100%",
		backgroundColor: COLORS.naranja,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.flatlistBackground,
	},
	exitButtonText: {
		fontSize: 13,
		fontWeight: "bold",
		color: COLORS.gray,
	},
});

export { modifyDomicilioModal };
