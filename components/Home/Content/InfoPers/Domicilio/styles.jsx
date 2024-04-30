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
		height: "38%",
		marginVertical: "2%",
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(242, 242, 242, 1)",
		borderRadius: 25,
	},
	contentContainer: {
		flex: 1,
		width: "90%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	titleContainer: {
		flex: 0.6,
		// height: "4%",
		// width: "100%",
		marginTop: "4%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	titleText: {
		fontSize: 22,
		fontWeight: "bold",
		color: COLORS.black,
	},
	sectionContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: "2%",
	},
	sectionPartContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	sectionTitleContainer: {
		flex: 0.7,
		left: 8,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	sectionTitleText: {
		flex: 1,
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.black,
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
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginVertical: "3%",
	},
	registrarButton: {
		width: "40%",
		height: "52%",
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
		width: "40%",
		height: "52%",
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
