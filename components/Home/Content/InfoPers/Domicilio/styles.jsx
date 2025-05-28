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
	uploadButtonsContainer: {
		height: 80,
		width: "100%",
		marginTop: 15,
		paddingVertical: 5,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		// borderWidth: 1
	},
	uploadButtonContainer: {
		height: "100%",
		width: "35%",
		marginTop: 30,
		// flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1
	},
	uploadButton: {
		height: "100%",
		width: "100%",
		// marginTop: 15,
		// flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderRadius: 8,
		borderColor: "gray",
		// alignSelf: "center"
	},
	uploadText: {
		marginTop: 6,
		fontSize: 15,
		color: COLORS.black,
	},
	sectionTitleText: {
		marginTop: 18,
		fontSize: 15,
		// fontWeight: "bold",
		color: COLORS.black,
		// borderWidth: 1
	},
	previewContainer: {
		maxHeight: 200,
		width: "80%",
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1
		alignSelf: "center",
	},
	imagePreview: {
		height: "100%",
		width: "100%",
		
	},
	filePreviewContainer: {
		height: 50,
		width: "90%",
		alignSelf: "center",
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
		padding: 4,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 8,
	},
	fileNameText: {
		fontSize: 12,
		color: COLORS.black,
	},
	resetButton: {
		// height: 30,
		paddingVertical: 8,
		paddingHorizontal: 15,
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 12,
		backgroundColor: COLORS.grey,
		alignSelf: "center"
	},
	resetButtonText: {
		fontSize: 14,
		color: COLORS.white,
		
	},
	icon: {
		position: "absolute",
		alignSelf: "flex-end",
		paddingRight: "3%",
	},
	buttonsContainer: {
		// flex: 1,
		marginTop: 40,
		height: 40,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		// marginVertical: "3%",
		// borderWidth: 1
	},
	registrarButton: {
		width: "30%",
		height: "100%",
		backgroundColor: COLORS.naranja,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
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
