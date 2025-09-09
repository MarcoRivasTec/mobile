import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

const encuestas = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	contentContainer: {
		flex: 19,
		justifyContent: "center",
		alignItems: "center",
		// height: "95%",
		width: "95%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleContainer: {
		flex: 1,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
	},
	scrollContainer: {
		height: "92%",
		// borderWidth: 1,
		width: "95%",
	},
	scrollContentContainer: {
		flexGrow: 1,
	},
	encuestasTitle: {
		marginTop: 8,
		fontSize: 18,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
		color: COLORS.naranja,
	},
	encuestaContainer: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		// marginHorizontal
		marginBottom: 14,
		backgroundColor: "#f9f9f9",
		borderRadius: 5,
		borderWidth: 2,
		borderColor: COLORS.main,
	},
	encuestaTitle: {
		fontSize: 16,
		fontFamily: "Montserrat-SemiBold",
		color: "#333",
	},
	encuestaDetails: {
		fontSize: 14,
		fontFamily: "Montserrat-Medium",
		color: "#666",
	},
	encuestaButton: {
		marginVertical: 10,
		width: "50%",
		paddingHorizontal: 8,
		backgroundColor: COLORS.naranja,
	},
	encuestaButtonText: {
		fontFamily: "Montserrat-Medium",
		color: "white",
		fontSize: 14,
	},
	registroContainer: {
		width: "100%",
		marginTop: "2%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "red"
	},
});

// const avisos = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		width: "100%",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		// backgroundColor: COLORS.main
// 		// borderWidth: 1,
// 		// borderColor: "purple"
// 	},
// 	contentContainer: {
// 		flex: 19,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		// height: "95%",
// 		width: "95%",
// 		// borderWidth: 1,
// 		// borderColor: "black"
// 	},
// 	titleContainer: {
// 		flex: 1,
// 		width: "90%",
// 		justifyContent: "center",
// 		alignItems: "center",
// 	},
// 	titleText: {
// 		fontSize: 30,
// 		fontFamily: "Montserrat-SemiBold",
// 		textAlign: "center",
// 	},
// });
const avisos = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	titleContainer: { alignItems: "center", marginTop: 24 },
	titleText: { fontSize: 16, color: "#666" },

	listContent: { paddingBottom: 24 },

	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 14,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	cardTitle: { flex: 1, fontSize: 16, fontWeight: "600", marginRight: 10 },
	cardDate: { fontSize: 12, color: "#888" },
	cardMessage: { fontSize: 14, color: "#333" },

	attachRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
	attachEmoji: { marginRight: 6 },
	attachText: { fontSize: 12, color: "#444" },
	// If using vector icons:
	// attachIcon: { marginRight: 6, color: "#444" },

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.35)",
		justifyContent: "flex-end",
	},
	modalCard: {
		maxHeight: "85%",
		backgroundColor: "#fff",
		borderTopLeftRadius: 14,
		borderTopRightRadius: 14,
		paddingHorizontal: 16,
		paddingTop: 14,
		paddingBottom: 20,
	},
	modalHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	modalTitle: { flex: 1, fontSize: 18, fontWeight: "700", marginRight: 12 },
	closeEmoji: { fontSize: 16, color: "#444", padding: 6 },
	modalDate: { fontSize: 12, color: "#777", marginBottom: 10 },
	modalBody: { marginBottom: 12 },
	modalMessage: { fontSize: 14, color: "#222", lineHeight: 20 },

	filesSection: { marginTop: 8 },
	filesTitle: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
	fileRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	fileEmoji: { marginRight: 8 },
	fileName: { flex: 1, fontSize: 14, color: "#2b2b2b" },
	// fileIcon: { marginRight: 8, color: "#444" },
});

const solicitudes = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	contentContainer: {
		flex: 19,
		justifyContent: "center",
		alignItems: "center",
		// height: "95%",
		width: "95%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleContainer: {
		flex: 1,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		fontSize: 30,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
	},
	scrollContainer: {
		height: "92%",
		// borderWidth: 1,
		width: "95%",
	},
	scrollContentContainer: {
		flexGrow: 1,
	},
	encuestasTitle: {
		marginTop: 8,
		fontSize: 18,
		fontFamily: "Montserrat-SemiBold",
		textAlign: "center",
		color: COLORS.naranja,
	},
	encuestaContainer: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		// marginHorizontal
		marginBottom: 14,
		backgroundColor: "#f9f9f9",
		borderRadius: 5,
		borderWidth: 2,
		borderColor: COLORS.main,
	},
	encuestaTitle: {
		fontSize: 16,
		fontFamily: "Montserrat-SemiBold",
		color: "#333",
	},
	encuestaDetails: {
		fontSize: 14,
		fontFamily: "Montserrat-Medium",
		color: "#666",
	},
	encuestaButton: {
		marginVertical: 10,
		width: "50%",
		paddingHorizontal: 8,
		backgroundColor: COLORS.naranja,
	},
	encuestaButtonText: {
		fontFamily: "Montserrat-Medium",
		color: "white",
		fontSize: 14,
	},
	registroContainer: {
		width: "100%",
		marginTop: "2%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "red"
	},
});

export { encuestas, avisos, solicitudes };
