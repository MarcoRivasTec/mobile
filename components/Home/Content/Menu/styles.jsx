import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

const sectionButton = StyleSheet.create({
	// Menu / Buttons properties
	button: {
		flex: 1,
		backgroundColor: COLORS.main,
		borderRadius: 25,
		height: "82%",
		width: "80%",
		marginHorizontal: "1%",
		marginVertical: "2%",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		position: "absolute",
	},
	content: {
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		width: "90%",
	},
	text: {
		marginTop: 58,
		textAlign: "center",
		fontSize: 11,
		color: COLORS.white,
		fontWeight: "bold",
	},
});

export default sectionButton;