import { StyleSheet } from "react-native";
import COLORS from "../../../../../constants/colors";

const getRequestStyle = ({ height = 20 }) => {
	return StyleSheet.create({
		container: {
			position: "absolute",
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		backgroundContainer: {
			// flex: 1,
			height: "100%",
			width: "100%",
			justifyContent: "center",
			// paddingBottom: 10,
			alignItems: "center",
			// backgroundColor: "rgba(255,255,255, 0.9)",
			backgroundColor: "rgba(0, 0, 0, 0.4)",
			// backgroundColor: "white",
			// borderRadius: 20,
			// borderWidth: 5
		},
		modalContainer: {
			// height: "24%",
			// bottom: 0,
			top: height / 2,
			height: "auto",
			maxHeight: "93%",
			// height: 200,
			// marginVertical: "2%",
			// marginBottom: 4,
			width: "95%",
			paddingVertical: 10,
			paddingHorizontal: 10,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "rgba(242, 242, 242, 1)",
			borderRadius: 25,
			borderWidth: 5,
			borderColor: COLORS.main,
		},
		// contentContainer: {
		// 	// flex: 1,
		// 	height: "auto",
		// 	maxHeight: "95%",
		// 	width: "100%",
		// 	justifyContent: "flex-start",
		// 	alignItems: "center",
		// 	// borderWidth: 1
		// },
		titleText: {
			fontSize: 22,
			marginBottom: 10,
			paddingHorizontal: 5,
			fontFamily: "Montserrat-SemiBold",
			alignSelf: "flex-start",
			color: COLORS.black,
			// borderWidth: 1,
		},
		label: {
			fontFamily: "Montserrat-Regular",
			fontSize: 15,
			color: "#333",
			marginBottom: 4,
		},
		dataText: {
			fontSize: 16,
			marginBottom: 20,
			textAlign: "center",
			color: COLORS.black,
		},

		questionContainer: {
			marginVertical: 10,
			padding: 12,
			backgroundColor: "white",
			borderRadius: 8,
		},
		questionText: {
			fontSize: 16,
			fontWeight: "bold",
			marginBottom: 5,
		},
		notesText: {
			marginTop: 10,
			fontSize: 13,
			color: "#666",
		},
		listContentContainer: {
			paddingHorizontal: 5,
			// paddingBottom: 10,
		},

		answerContainer: {
			padding: 10,
			marginVertical: 5,
			backgroundColor: "#f0f0f0",
			borderRadius: 8,
			// borderWidth: 1,
		},
		selectedAnswerContainer: {
			backgroundColor: "#318388", // Green color for the selected answer
			borderColor: "#318388",
			borderWidth: 1,
			borderRadius: 8,
		},
		selectedAnswerText: {
			fontWeight: "bold",
			color: "#ffffff", // White text for better contrast
		},
		answerText: {
			fontSize: 16,
		},
		commentInput: {
			// marginTop: 10,
			padding: 8,
			borderWidth: 1,
			borderColor: "#ccc",
			borderRadius: 8,
			backgroundColor: "#fff",
			fontSize: 15,
		},

		buttonsContainer: {
			// flex: 0.9,
			height: 35,
			width: "100%",
			marginTop: 20,
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			// borderWidth: 1,
			// marginVertical: "3%",
		},
		confirmButton: {
			width: "60%",
			height: "100%",
			backgroundColor: COLORS.naranja,
			borderRadius: 20,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: COLORS.naranja,
		},
		confirmButtonText: {
			fontSize: 14,
			fontWeight: "bold",
			color: COLORS.white,
		},
		exitButton: {
			width: "25%",
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
};

export { getRequestStyle };
