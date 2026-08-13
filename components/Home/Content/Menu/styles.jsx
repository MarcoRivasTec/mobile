import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

const sectionButton = StyleSheet.create({
	/*
	 * The parent buttonSlot controls the column width.
	 * SectionButton fills that slot completely.
	 */
	animatedContainer: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},

	/*
	 * 92% leaves an equal space between columns.
	 * Increase to 94% for slightly wider buttons.
	 */
	shadowedView: {
		width: "92%",
		height: "100%",
		alignSelf: "center",
		backgroundColor: COLORS.main,
		borderRadius: 25,
		shadowOffset: {
			width: 2,
			height: 4,
		},
		shadowOpacity: 0.4,
		shadowRadius: 5,
	},

	button: {
		flex: 1,
		width: "100%",
		backgroundColor: COLORS.main,
		borderRadius: 25,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},

	content: {
		flex: 1,
		width: "90%",
		paddingVertical: 8,
		justifyContent: "center",
		alignItems: "center",
	},

	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	text: {
		marginTop: 7,
		textAlign: "center",
		fontSize: 11,
		lineHeight: 14,
		color: COLORS.white,
		fontWeight: "bold",
	},
});

export default sectionButton;
