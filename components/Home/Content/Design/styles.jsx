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
		textAlign: "center",
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

const confirmAction = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},

	modalContainer: {
		width: "85%",
		backgroundColor: "white",
		borderRadius: 16,
		padding: 20,
		elevation: 8,
	},

	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
	},

	modalText: {
		fontSize: 14,
		marginBottom: 20,
	},

	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	modalCancel: {
		flex: 1,
		marginRight: 10,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: "#ddd",
		alignItems: "center",
	},

	modalConfirm: {
		flex: 1,
		marginLeft: 10,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: COLORS.naranja,
		alignItems: "center",
	},

	modalCancelText: {
		fontWeight: "bold",
	},

	modalConfirmText: {
		color: "white",
		fontWeight: "bold",
	},
});

export { confirm, working, confirmAction };
