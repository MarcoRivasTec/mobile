import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

const gafete = StyleSheet.create({
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
		height: "40%",
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
		flex: 0.8,
		// height: "6%",
		width: "100%",
		top: "4%",
		// borderWidth: 1,
		// borderRadius: 10,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
		color: COLORS.black,
	},
	textContainer: {
		flex: 4,
		// borderWidth: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	text: {
		fontSize: 16,
		color: COLORS.black,
	},
	buttonContainer: {
		flex: 0.8,
		flexDirection: "row",
		marginBottom: "5%",
        // marginRight: "5%",
        // marginLeft: "5%",
        paddingHorizontal: "5%",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		// borderWidth: 1,
	},
	button: {
		height: "100%",
		backgroundColor: COLORS.naranja,
		width: "30%",
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	textButton: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.white,
	},
});

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
		height: "30%",
		marginVertical: "2%",
		width: "70%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(242, 242, 242, 1)",
		borderRadius: 25,
	},
	contentContainer: {
		flex: 1,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	animContainer: {
		flex: 2.5,
        width: "100%",
		top: "6%",
		// borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
    anim: {
        width: "60%",
        height: "60%",
		// borderWidth: 1,
		// borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
    },
	textContainer: {
		flex: 2,
		// borderWidth: 1,
		width: "100%",
        marginBottom: "2%",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 22,
		color: COLORS.black,
        textAlign: "center"
	},
	button: {
		flex: 1,
        marginBottom: "5%",
		backgroundColor: "gray",
		width: "30%",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	textButton: {
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.white,
	},
});

export { gafete, confirm };
