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
			justifyContent: "center",
			alignItems: "center",
		},
		background: {
			width: "100%",
			height: "100%",
			position: "absolute",
		},
		textContainer: {
			flex: 1,
			flexDirection: "row",
		},
		textDataContainer: {
			flex: 36,
			justifyContent: "center",
			alignItems: "center",
		},
		textTitleContainer: {
			flex: 64,
			justifyContent: "center",
			alignItems: "center",
		},
		textDataBox: {
			left: "11%",
			bottom: "4%",
			width: "85%",
			height: "60%",
			justifyContent: "center",
			alignItems: "center",
		},
		textTitleBox: {
			position: "absolute",
			left: "9%",
			top: "1%",
			width: "78%",
			height: "92%",
			justifyContent: "center",
			alignItems: "flex-start",
			padding: "4%",
		},
		textTitle: {
			fontSize: 10,
			textAlign: "left",
			fontWeight: "bold",
			color: COLORS.white,
		},
		textData: {
			fontSize: 25,
			textAlign: "center",
			fontWeight: "bold",
			color: COLORS.main,
		},
	});
}

const buttonInfo = StyleSheet.create({
	container: {
		flex: 1,
		height: "80%",
		width: "30%",
		padding: "1.5%",
		justifyContent: "center",
		alignItems: "center",
	},
	background: {
		width: "100%",
		height: "100%",
		position: "absolute",
	},
	textContainer: {
		height: "92%",
		bottom: "2%",
		right: "1%",
		width: "87%",
		justifyContent: "center",
		alignItems: "center"
	},
	textDataContainer: {
		width: "90%",
		height: "40%",
		justifyContent: "flex-end",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"	
	},
	textTitleContainer: {
		width: "90%",
		height: "38%",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	textTitle: {
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "justify",
		color: COLORS.white,
	},
	textData: {
		right: "2%",
		fontSize: 20,
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
