import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

const confirm = StyleSheet.create({
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
		height: "auto",
		paddingVertical: "6%",
		width: "70%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(242, 242, 242, 1)",
		borderRadius: 25,
	},
	contentContainer: {
		// flex: 1,
		height: "auto",
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	animContainer: {
		// flex: 2.5,
		height: 80,
        width: "100%",
		marginTop: "4%",
		// borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
    anim: {
        width: "100%",
        height: "100%",
		// borderWidth: 1,
		// borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
    },
	text: {
		marginTop: "4%",
		fontSize: 22,
		fontWeight: "500",
		color: COLORS.black,
        textAlign: "center",
	},
	lowerText: {
		marginTop: "2%",
		fontSize: 14,
		color: COLORS.black,
        textAlign: "center"
	},
});

const working = StyleSheet.create({
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
		height: "auto",
		paddingVertical: "4%",
		width: "60%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(242, 242, 242, 1)",
		borderRadius: 25,
	},
	contentContainer: {
		// flex: 1,
		height: "auto",
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	animContainer: {
		// flex: 2.5,
		height: 100,
        width: "100%",
		// marginTop: "4%",
		// borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
    anim: {
        width: "200%",
        height: "200%",
		// borderWidth: 1,
		// borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
    },
	text: {
		marginTop: "4%",
		fontSize: 22,
		fontWeight: "500",
		color: COLORS.black,
        textAlign: "center",
	},
});

export { confirm, working };
