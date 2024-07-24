import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

function getButtonTagStyle(flexValue) {
	flexValue = flexValue || 1;
	return StyleSheet.create({
		container: {
			flex: flexValue,
			height: "80%",
			width: "30%",
			padding: "1.5%",
			// borderWidth: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		background: {
			width: "100%",
			height: "100%",
			position: "absolute",
		},
		textContainer: {
			height: "93%",
			width: "92%",
			right: "2.5%",
			bottom: "1%",
			// borderWidth: 1,
			flexDirection: "row",
		},
		textDataContainer: {
			flex: 36,
			// borderWidth: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		textTitleContainer: {
			flex: 64,
			// borderWidth: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		textDataBox: {
			// borderWidth: 0,
			left: "4%",
			// padding: "4%",
			// bottom: "4%",
			width: "95%",
			height: "60%",
			justifyContent: "center",
			alignItems: "center",
		},
		textTitleBox: {
			// position: "absolute",
			left: "2%",
			// top: "1%",
			width: "90%",
			height: "80%",
			// borderWidth: 1,
			justifyContent: "center",
			alignItems: "center",
			// padding: "4%",
		},
		textTitle: {
			fontSize: 10,
			textAlign: "left",
			fontWeight: "bold",
			color: COLORS.white,
		},
		textData: {
			fontSize: 24,
			fontWeight: "bold",
			color: COLORS.main,
		},
	});
}

const buttonInfo = StyleSheet.create({
	container: {
		flex: 1,
		// height: "80%",
		// width: "30%",
		margin: "0.5%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1
	},
	background: {
		width: "100%",
		height: "100%",
		position: "absolute",
	},
	textContainer: {
		height: "60%",
		bottom: "2%",
		right: "1%",
		width: "92%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,

	},
	textDataContainer: {
		width: "100%",
		height: "45%",
		justifyContent: "flex-end",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"	
	},
	textTitleContainer: {
		width: "90%",
		height: "45%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1
	},
	textTitle: {
		fontSize: 12.5,
		fontWeight: "bold",
		textAlign: "center",
		color: COLORS.white,
	},
	textData: {
		right: "1.5%",
		fontSize: 18,
		fontWeight: "bold",
		color: COLORS.white,
	},
});

const buttonAction = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	background: {
		width: "100%",
		height: "100%",
		position: "absolute",
	},
	backgroundContainer: {
		top: "-1.3%",
		left: "-1.2%",
		flexDirection: "row",
		width: "79%",
		height: "88%",
	},
	iconContainer: {
		flex: 3,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		color: COLORS.white,
	},
	textContainer: {
		flex: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		width: "100%",
		paddingHorizontal: "6%",
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "left",
		fontWeight: "bold",
		color: COLORS.white,
	},
});

export { getButtonTagStyle, buttonInfo, buttonAction };
