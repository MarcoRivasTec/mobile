import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export const login = StyleSheet.create({
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
