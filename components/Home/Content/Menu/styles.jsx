import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

const sectionButton = StyleSheet.create({
	// Menu / Buttons properties
	animatedContainer: {
		// borderRadius: 25,
		height: "100%",
		width: "32%",
		marginHorizontal: "1%",
	},
	shadowedView: {
		backgroundColor: COLORS.main,
		borderRadius: 25,
		marginHorizontal: "1%",
		// marginVertical: "2%",
		// borderRadius: 10,
		overflow: "hidden",
		shadowOffset: { width: 2, height: 4 }, // X: 0, Y: 4
		shadowOpacity: 0.4,
		shadowRadius: 5,
	},
	// button: {
	// 	// flex: 1,
	// 	backgroundColor: COLORS.main,
	// 	borderRadius: 25,
	// 	height: "100%",
	// 	width: "32%",
	// 	marginHorizontal: "1%",
	// 	marginVertical: "2%",
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	button: {
		// flex: 1,
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		height: "100%",
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		// borderWidth: 1,
	},
	iconContainer: {
		marginTop: "10%",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		marginTop: "5%",
		textAlign: "center",
		fontSize: 11,
		color: COLORS.white,
		fontWeight: "bold",
	},
});

export default sectionButton;
