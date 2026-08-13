import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const menu = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		position: "relative",
	},

	page: {
		width: "100%",
		paddingHorizontal: "1%",
		justifyContent: "flex-start",
	},

	row: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
	},

	buttonSlot: {
		width: "33.333333%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},

	pagination: {
		position: "absolute",
		bottom: 3,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	paginationDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		marginHorizontal: 3,
		backgroundColor: "#C6C6C6",
	},

	paginationDotActive: {
		width: 16,
		backgroundColor: COLORS.main,
	},
});

const header = StyleSheet.create({
	container: {
		flex: 1,
		width: "95%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	titleContainer: {
		height: "100%",
		// width: "35%",
		paddingRight: 24,
		paddingLeft: 8,
		borderBottomRightRadius: 50,
		backgroundColor: COLORS.main,
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "black"
	},
	title: {
		bottom: "10%",
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 12,
		alignSelf: "center",
		// borderWidth: 1
	},
});

const header1 = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "flex-start",
		width: "95%",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	titleContainer: {
		height: "100%",
		width: "35%",
		borderBottomRightRadius: 50,
		backgroundColor: COLORS.main,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleTextContainer: {
		left: "3%",
		top: "6%",
		height: "80%",
		width: "92%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
		// borderColor: "black"
	},
	title: {
		color: COLORS.white,
		fontWeight: "bold",
		fontSize: 11,
	},
});

const infopers = StyleSheet.create({
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
		width: "100%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	scrollContainer: {
		flex: 1,
		width: "100%",
	},
	scrollContentContainer: {
		flexGrow: 1,
	},
	cardContainer: {
		flex: 1,
		marginTop: "3%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	cardTitleContainer: {
		height: "12%",
		width: "94%",
		marginBottom: "3%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	cardTitleText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
	},
	cardInfoContainer: {
		height: "80%",
		width: "92%",
		padding: "4%",
		// marginBottom: "5%",
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: COLORS.flatlistBackground,
		borderRadius: 20,
	},
	cardInfoRowContainer: {
		flex: 1,
		bottom: "2%",
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		borderBottomWidth: 2,
		// borderWidth: 1,
		// borderColor: "purple"
	},
	cardInfoRowTitleContainer: {
		// flex: 2,
		width: "28%",
		height: "92%",
		marginBottom: "-1.5%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	cardInfoRowTitleText: {
		fontSize: 12,
		fontWeight: "bold",
		color: "black",
	},
	cardInfoRowDataContainer: {
		flex: 8,
		paddingLeft: "1%",
		marginBottom: "-1.5%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
		// borderColor: "green"
	},
	cardInfoRowDataText: {
		fontSize: 12,
		color: "black",
		textAlign: "center",
	},
	cardInfoButton: {
		flex: 0.65,
		width: "33%",
		marginTop: "1.5%",
		backgroundColor: COLORS.naranja,
		justifyContent: "center",
		alignContent: "center",
		borderRadius: 50,
	},
	cardInfoButtonText: {
		fontSize: 9,
		fontWeight: "bold",
		color: COLORS.white,
		alignSelf: "center",
	},
});

const area = StyleSheet.create({
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
		width: "100%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	cardContainer: {
		flex: 1,
		marginTop: "3%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	titleContainer: {
		height: "12%",
		width: "94%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
	},
	cardInfoContainer: {
		height: "80%",
		width: "92%",
		padding: "4%",
		// marginBottom: "5%",
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: COLORS.flatlistBackground,
		borderRadius: 20,
	},
});

const redes = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	contentContainer: {
		flex: 19,
		width: "95%",
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		height: "10%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// paddingLeft: "4%",
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	socialContainer: {
		height: "90%",
		width: "90%",
		justifyContent: "center",
		// borderWidth: 1,
		alignItems: "center",
	},
	stripContainer: {
		flex: 1,
		width: "100%",
		// borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	stripImg: {
		height: "100%",
		width: "107%",
		right: "5.5%",
	},
	iconContainer: {
		position: "absolute",
		height: "60%",
		width: "16%",
		left: "9%",
		top: "24%",
		// borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	linksContainer: {
		position: "absolute",
		flexDirection: "row",
		height: "60%",
		width: "72%",
		left: "28%",
		top: "22%",
		// borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	linkContainer: {
		flex: 1,
		// borderWidth: 1,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
		color: COLORS.white,
	},
});

const ideas = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.main,
		// borderWidth: 2
	},
	contentContainer: {
		flex: 19,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		height: "10%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// paddingLeft: "4%",
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	animContainer: {},
});

const directorio = StyleSheet.create({
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
		height: "8%",
		width: "100%",
		justifyContent: "center",
		// borderWidth: 1,
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	scrollContainer: {
		height: "92%",
		// borderWidth: 1,
		width: "100%",
	},
	scrollContentContainer: {
		flexGrow: 1,
	},
	registroContainer: {
		width: "100%",
		marginTop: "2%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "red"
	},
	registroRow: {
		height: "100%",
		width: "95%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	imgContainer: {
		flex: 1,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginRight: "2%",
		// borderWidth: 1,
		// borderColor: "green"
	},
	img: {
		height: "100%",
		width: "100%",
	},
	infoContainer: {
		flex: 3.2,
		height: "100%",
		// flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// paddingLeft: "2%",
		// borderWidth: 1,
	},
	stripImg: {
		height: "100%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingLeft: "2%",
	},
	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: "2%",
		paddingRight: "2%",
	},
	icon: {
		color: COLORS.white,
	},
	infoText: {
		fontSize: 14,
		fontWeight: "bold",
		color: COLORS.white,
	},
	divider: {
		height: 1,
		width: "100%",
		height: 1,
		backgroundColor: "grey",
		marginTop: "1%",
		marginHorizontal: "1%",
	},
});

const notificaciones = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "purple"
	},
	titleContainer: {
		height: "5%",
		width: "95%",
		// width: "35%",
		// paddingRight: 24,
		// paddingLeft: 8,
		// borderBottomRightRadius: 50,
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
		borderTopWidth: 0,
		borderWidth: 2,
		borderColor: COLORS.main,
		// borderColor: "black"
	},
	title: {
		color: COLORS.main,
		fontFamily: "Montserrat-Medium",
		fontSize: 17,
		bottom: "5%",
	},
	tabsContainer: {
		height: "5%",
		width: "95%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1
	},
	tabContainer: {
		flex: 1,
		// height: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 16,
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: COLORS.main,
	},
	tabText: {
		color: COLORS.white,
		fontFamily: "Montserrat-Medium",
		// fontSize: 12,
	},

	contentContainer: {
		// flex: 19,
		height: "90%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "black"
	},
});

const vacaciones = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	sectionContainer: {
		flex: 5,
		width: "100%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	sectionTitleContainer: {
		// flex: 1,
		height: "20%",
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "4%",
		marginTop: "2%",
		marginBottom: "-1%",
		// borderWidth: 1,
	},
	sectionButtonContainer: {
		// flex: 3,
		height: "80%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		top: "1%",
		// borderWidth: 1,
	},
	buttonsContainer: {
		// flex: 1,
		height: "50%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		// borderWidth: 1,
	},
	buttonContainer: {
		width: "48%",
		justifyContent: "center",
		alignItems: "center",
	},
	historialContainer: {
		flex: 5,
		width: "90%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1
	},
});

const reciboNom = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	contentContainer: {
		flex: 19,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1
	},
	sectionContainer: {
		// flex: 5,
		height: "24%",
		width: "100%",
		// borderWidth: 1,
		// borderColor: "black"
	},
	sectionTitleContainer: {
		flex: 2.5,
		width: "100%",
		top: "3%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "4%",
	},
	sectionButtonContainer: {
		flex: 8,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
	},
	nominaContainer: {
		// flex: 14,
		height: "37.5%",
		marginTop: "1%",
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1
	},
	nominaHeader: {
		width: "100%",
		// height: "15%",
		flex: 1.7,
		borderRadius: 50,
		backgroundColor: COLORS.naranja,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	nominaYearContainer: {
		width: "20%",
		height: "100%",
		right: "4%",
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		borderRadius: 50,
		// borderWidth: 50,
	},
	nominaWeekContainer: {
		width: "30%",
		height: "100%",
		left: "10%",
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		borderRadius: 50,
		// borderWidth: 50,
	},
	nominaSearchIconContainer: {
		// height: "100%",
		paddingVertical: 6,
		paddingHorizontal: 6,
		justifyContent: "center",
		alignContent: "center",
		borderRadius: 50,
		backgroundColor: COLORS.main,
	},
	nominaSearchIcon: {
		color: COLORS.white,
	},
	nominaSearchText: {
		left: "10%",
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
		color: COLORS.white,
	},
	nominaCantidadContainer: {
		flex: 6,
		// height: "55%",
		width: "100%",
		// top: "3%",
		marginTop: "1.5%",
		// borderWidth: 1,
	},
	nominaCantidadElementContainer: {
		flex: 1,
		width: "100%",
		// height: "16%",
		justifyContent: "space-around",
		alignItems: "center",
		marginVertical: "1.0%",
		flexDirection: "row",
		backgroundColor: COLORS.flatlistElement2,
	},
	nominaCantidadBox: {
		width: "30%",
		height: "100%",
		// right: "50%",
		justifyContent: "center",
		alignContent: "center",
	},
	nominaCantidadTitle: {
		fontSize: 17,
		color: COLORS.black,
		textAlign: "center",
	},
	nominaCantidad: {
		fontSize: 17,
		left: "25%",
		fontWeight: "bold",
		color: "black",
		textAlign: "center",
	},
	nominaGenerarContainer: {
		flex: 2.3,
		// height: "30%",
		width: "100%",
		// top: "3%",
		marginVertical: "1.5%",
		// borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	nominaGenerarButton: {
		height: "100%",
		width: "50%",
		backgroundColor: COLORS.main,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	nominaGenerarText: {
		fontSize: 17,
		color: COLORS.white,
		textAlign: "center",
	},
	nominaGenerarIcon: {
		color: COLORS.white,
	},
});

const prenomina = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	contentContainer: {
		flex: 19,
		marginTop: "2%",
		// top: "4%",
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1
	},
	prenominaHeader: {
		width: "100%",
		height: "6%",
		borderRadius: 50,
		backgroundColor: COLORS.naranja,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	prenominaYearContainer: {
		width: "20%",
		height: "100%",
		right: "4%",
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		borderRadius: 50,
		// borderWidth: 50,
	},
	prenominaWeekContainer: {
		width: "30%",
		height: "100%",
		left: "15%",
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		borderRadius: 50,
		// borderWidth: 50,
	},
	prenominaSearchIconContainer: {
		paddingVertical: 6,
		paddingHorizontal: 6,
		justifyContent: "center",
		alignContent: "center",
		borderRadius: 50,
		backgroundColor: COLORS.main,
	},
	prenominaSearchIcon: {
		color: COLORS.white,
	},
	prenominaSearchText: {
		left: "10%",
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
		color: COLORS.white,
	},
	prenominaDates: {
		height: "15%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "3%",
		// borderWidth: 1,
	},
	prenominaDatesText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	prenominaContainer: {
		height: "40%",
		// flex: 3.5,
		width: "100%",
		marginTop: "3%",
		// borderWidth: 1,
	},
	prenominaElementContainer: {
		flex: 1,
		width: "100%",
		// height: "8%",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingLeft: "7%",
		paddingRight: "3%",
		marginVertical: "1.0%",
		flexDirection: "row",
		backgroundColor: COLORS.flatlistElement2,
	},
	prenominaElementTitleContainer: {
		flex: 1,
		// width: "30%",
		height: "100%",
		left: "10%",
		justifyContent: "center",
		alignContent: "center",
		// alignSelf: "flex-end",
		// borderWidth: 1,
	},
	prenominaElementDataContainer: {
		flex: 2,
		// width: "30%",
		height: "100%",
		marginLeft: "5%",
		// right: "50%",
		justifyContent: "center",
		alignContent: "center",
		// alignSelf: "flex-end",
		// borderWidth: 1,
	},
	prenominaElementTitleText: {
		fontSize: 17,
		color: COLORS.black,
		textAlign: "center",
	},
	prenominaElementDataText: {
		fontSize: 17,
		// left: "25%",
		fontWeight: "bold",
		color: "black",
		textAlign: "center",
	},
	buttonText: {
		fontSize: 12,
		color: COLORS.white,
		fontWeight: "bold",
	},
	detalleHeader: {
		width: "100%",
		height: "15%",
		backgroundColor: COLORS.white,
		justifyContent: "center",
		borderRadius: 12,
		// borderRadius: "12%",
		borderWidth: 1,
		borderColor: COLORS.flatlistElement1,
		alignItems: "center",
	},
	detalleHeaderWeekYearRow: {
		flex: 1,
		width: "100%",
		backgroundColor: COLORS.naranja,
		// borderRadius: "10%",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	detalleHeaderDaysRow: {
		flex: 1.5,
		width: "97%",
		// backgroundColor: COLORS.w,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		// borderWidth: 1,
	},
	detalleDayButton: {
		flex: 1,
		paddingVertical: "1.5%",
		paddingHorizontal: "0.5%",
		marginHorizontal: "0.7%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		// borderWidth: 1,
	},
	detalleSelectedDayButton: {
		flex: 1.5,
		paddingVertical: "1.5%",
		paddingHorizontal: "0.5%",
		marginHorizontal: "0.7%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		backgroundColor: COLORS.naranja,
		// borderWidth: 1,
	},
	detalleDayButtonText: {
		fontSize: 13,
		// fontWeight: "bold",
		color: "black",
	},
	detalleSelectedDayButtonText: {
		fontSize: 13,
		// fontWeight: "bold",
		color: COLORS.white,
	},
	detalleDayContainer: {
		height: "72%",
		width: "100%",
		padding: "2%",
		marginTop: "6%",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: COLORS.flatlistElement1,
		borderRadius: 6,
	},
	detalleDaysDescContainer: {
		flex: 1,
		// height: "6%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
	},
	detalleDaysDescText: {
		fontSize: 13,
		color: "black",
		fontWeight: "bold",
	},
	detalleChecadasContainer: {
		flex: 1.2,
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: "3%",
		flexDirection: "row",
		// borderWidth: 1,
	},
	detalleChecadasDatosContainer: {
		flex: 1,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.main,
		borderRightWidth: 1,
		borderColor: COLORS.flatlistBackground,
	},
	detalleChecadasTituloContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: COLORS.flatlistBackground,
	},
	detalleChecadasTituloText: {
		fontSize: 11,
		color: COLORS.white,
		fontWeight: "bold",
	},
	detalleChecadasDatoContainer: {
		flex: 1,
		width: "98%",
		justifyContent: "center",
		alignItems: "center",
	},
	detalleChecadasDatoText: {
		fontSize: 12,
		color: COLORS.white,
	},
	detalleHabilContainer: {
		flex: 0.8,
		// height: "6%",
		width: "20%",
		borderRadius: 12,
		marginVertical: "2%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
	},
	detalleHabilText: {
		fontSize: 14,
		color: COLORS.white,
		fontWeight: "bold",
	},
	detalleDataContainer: {
		// height: "40%",
		flex: 3,
		width: "100%",
		marginTop: "4%",
		marginBottom: "5%",
		// borderWidth: 1,
	},

	buttonContainer: {
		width: "30%",
		// flex: 1,
		height: "9%",
		marginTop: "5%",
		marginBottom: "2%",
		justifyContent: "center",
		alignItems: "center",

		// borderWidth: 1,
	},
	buttonGradient: {
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
	},
	buttonBackground: {
		width: "100%",
		height: "100%",
		borderRadius: 200,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		position: "absolute",
	},
});

const solicitudes = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		backgroundColor: "#F2F2F2",
	},

	contentContainer: {
		width: "100%",
		alignItems: "center",
		paddingBottom: 24,
	},

	sectionContainer: {
		width: "94%",
		backgroundColor: "white",
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 14,
		marginTop: 14,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 2,
	},

	sectionTitleContainer: {
		width: "100%",
		marginBottom: 12,
	},

	sectionTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#222",
	},

	sectionSubtitle: {
		marginTop: 4,
		fontSize: 13,
		color: "#666",
		lineHeight: 18,
	},

	sectionButtonContainer: {
		width: "100%",
		marginBottom: 14,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},

	buttonContainer: {
		width: "48%",
	},

	listHeaderContainer: {
		width: "100%",
		marginTop: 4,
		marginBottom: 8,
	},

	listTitle: {
		fontSize: 17,
		fontWeight: "700",
		color: "#333",
	},

	loadingContainer: {
		width: "100%",
		minHeight: 110,
		justifyContent: "center",
		alignItems: "center",
	},

	emptyContainer: {
		width: "100%",
		paddingVertical: 18,
		paddingHorizontal: 12,
		borderRadius: 10,
		backgroundColor: "#F4F4F4",
		alignItems: "center",
		justifyContent: "center",
	},

	emptyText: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
	},

	requestCard: {
		width: "100%",
		borderRadius: 10,
		backgroundColor: "#F8F8F8",
		padding: 12,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#E8E8E8",
	},

	requestCardHeader: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 10,
	},

	requestTitleContainer: {
		flex: 1,
		paddingRight: 8,
	},

	requestTypeText: {
		fontSize: 16,
		fontWeight: "700",
		color: "#222",
	},

	employeeNameText: {
		marginTop: 2,
		fontSize: 13,
		color: "#555",
	},

	statusPill: {
		borderRadius: 999,
		paddingHorizontal: 10,
		paddingVertical: 5,
		minWidth: 82,
		alignItems: "center",
		justifyContent: "center",
	},

	statusPillText: {
		fontSize: 12,
		fontWeight: "700",
		color: "white",
	},

	requestInfoRow: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 4,
	},

	requestInfoLabel: {
		fontSize: 13,
		color: "#666",
		fontWeight: "600",
	},

	requestInfoValue: {
		flex: 1,
		marginLeft: 10,
		fontSize: 13,
		color: "#222",
		fontWeight: "500",
		textAlign: "right",
	},

	commentContainer: {
		width: "100%",
		marginTop: 10,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: "#E0E0E0",
	},

	commentLabel: {
		fontSize: 12,
		color: "#666",
		fontWeight: "700",
		marginBottom: 2,
	},

	commentText: {
		fontSize: 13,
		color: "#333",
		lineHeight: 18,
	},

	cardActionsContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 12,
		gap: 8,
	},

	cardActionButton: {
		minWidth: 105,
		borderRadius: 8,
		paddingVertical: 9,
		paddingHorizontal: 12,
		alignItems: "center",
		justifyContent: "center",
	},

	cardActionButtonText: {
		fontSize: 13,
		fontWeight: "700",
		color: "white",
	},

	approveButton: {
		backgroundColor: "#22A06B",
	},

	rejectButton: {
		backgroundColor: "#D64545",
	},

	cancelButton: {
		backgroundColor: "#D64545",
	},

	disabledButton: {
		opacity: 0.55,
	},
});

const prestamos = StyleSheet.create({
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
		width: "94%",
		marginTop: "1%",
		// paddingBottom: "3%",
		borderRadius: 10,
		// borderTopLeftRadius: 10,
		// borderTopRightRadius: 10,
		// borderBottomLeftRadius: 10,
		// borderBottomRightRadius: 10,
		backgroundColor: COLORS.flatlistBackground,
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleBar: {
		flex: 1.1,
		width: "100%",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.naranja,
	},
	titleContainer: {
		height: "80%",
		width: "38%",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.2)",
	},
	titleText: {
		fontSize: 12,
		fontWeight: "bold",
		color: "white",
	},
	infoContainer: {
		flex: 18.9,
		width: "95%",
		// paddingTop: "1%",
		paddingBottom: "4%",
		justifyContent: "center",
		alignItems: "center",
	},
	cycleCard: {
		// height: "100%",
		flex: 1.5,
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		// paddingVertical: 14,
		// paddingHorizontal: 16,
		borderRadius: 14,
		backgroundColor: "#ffffff",
		marginTop: "1.5%",
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 8,
		elevation: 3, // Android shadow
		// borderWidth: 1
	},

	cycleInfoContainer: {
		height: "100%",
		width: "68%",
		justifyContent: "space-evenly",
		alignItems: "center",
		// borderWidth: 1,
	},

	cycleDataContainer: {
		height: "100%",
		width: "100%",
		justifyContent: "space-evenly",
		alignItems: "flex-start",
		paddingLeft: "6%",
		// borderWidth: 1,
	},
	cycleHeader: {
		// borderWidth: 1,
		// marginBottom: 6,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},

	cycleTitle: {
		fontSize: 15,
		fontWeight: "700",
		color: COLORS.black,
	},

	cycleDates: {
		fontSize: 14,
		fontWeight: "500",
		color: "#555",
	},

	loanStatusContainer: {
		height: "100%",
		width: "32%",
		paddingHorizontal: "2%",
		justifyContent: "space-evenly",
		alignItems: "center",
		// borderWidth: 1,
	},
	loanStatusTitle: {
		fontSize: 12,
		fontWeight: "600",
		fontStyle: "bold",
		color: COLORS.black,
	},

	statusBadge: {
		// position: "absolute",
		// right: 0,
		// top: 0,
		// marginTop: 10,
		// alignSelf: "flex-start",
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 20,
		borderWidth: 1,
	},

	statusBadgeText: {
		fontSize: 12,
		fontWeight: "600",
	},
	dataContainer: {
		flex: 1.4,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: "2%",

		// borderWidth: 1,
		borderColor: "blue",
	},
	dataRowContainer: {
		flex: 1,
		height: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "3%",

		// borderWidth: 1,
		borderColor: "red",
	},
	dataTextContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
	},
	dataRowTextContainer: {
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
	},
	dataFieldContainer: {
		flex: 2,
		// height: "100%",
		// minHeight: 40,
		// paddingVertical: 6,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "0.5%",
		borderWidth: 1,
		borderColor: COLORS.grey,
		borderRadius: 10,
		paddingLeft: 10,
		backgroundColor: COLORS.white,
	},
	dataInputField: {
		height: "100%",
		width: "100%",
		// paddingLeft: 10,
		justifyContent: "center",
		alignItems: "center",
		fontSize: 13,
		verticalAlign: "center",
		textAlignVertical: "center", // Android fix

		includeFontPadding: false, // Android fix
	},
	dataRowsContainer: {
		flex: 0.9,
		height: "100%",
		flexDirection: "row",
		marginTop: "3%",
		// marginHorizontal: "4%",
		justifyContent: "center",
		alignItems: "center",

		// borderWidth: 1,
		borderColor: "brown",
	},
	dataRowsRowContainer: {
		flex: 1,
		height: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",

		// borderWidth: 1,
		borderColor: "green",
	},
	dataRowFieldContainer: {
		flex: 1,
		height: "100%",
		marginHorizontal: "4%",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: COLORS.grey,
		borderRadius: 10,
		backgroundColor: COLORS.white,
	},
	dataText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "black",
		alignSelf: "center",
	},
	dataFieldText: {
		fontSize: 15,
		color: "black",
	},
	detailsContainer: {
		flex: 1.3,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: "7%",

		// borderWidth: 1,
		borderColor: "purple",
	},
	detailContainer: {
		height: "100%",
		width: "32%",
		justifyContent: "center",
		alignItems: "flex-start",
		// marginTop: "3%",

		// borderWidth: 1,
		borderColor: "blue",
	},
	detailTitle: {
		fontSize: 12,
		paddingLeft: 4,
		fontWeight: "bold",
		color: "black",
	},
	detailFieldContainer: {
		// flex: 1,
		height: "70%",
		// minHeight: 40,
		// paddingVertical: 6,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "1%",
		borderWidth: 1,
		borderColor: COLORS.grey,
		borderRadius: 10,
		// paddingLeft: 10,
		backgroundColor: COLORS.white,
	},
	detailFieldText: {
		fontSize: 15,
		color: "black",
	},
	buttonContainer: {
		flex: 0.7,
		paddingHorizontal: "12%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		// marginTop: "1%",
		// marginBottom: "1%",
		backgroundColor: COLORS.naranja,
	},
	buttonText: {
		fontSize: 13,
		fontWeight: "bold",
		color: "white",
	},
	agreementContainer: {
		flex: 1.4,
		marginTop: "4%",
		marginBottom: "4%",
		flexDirection: "row",
		width: "100%",

		// borderWidth: 1,
		borderColor: "yellow",
	},
	agreementTextContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	agreementText: {
		fontSize: 12,
		color: COLORS.black,
	},
	bouncyCheckbox: {},
	inputValid: {
		borderColor: "#2ecc71", // green
	},

	inputInvalid: {
		borderColor: "#e74c3c", // red
	},

	inputNeutral: {
		borderColor: COLORS.grey,
	},

	buttonDisabled: {
		backgroundColor: "#f5b27a", // lighter naranja
		opacity: 0.6,
	},

	errorText: {
		fontSize: 11,
		color: "#e74c3c",
		marginTop: 4,
		alignSelf: "flex-start",
	},

	successHighlight: {
		backgroundColor: "rgba(46, 204, 113, 0.08)",
		borderColor: "#2ecc71",
	},

	agreementRequired: {
		borderColor: "#e74c3c",
		borderWidth: 1,
		borderRadius: 8,
		padding: 2,
	},
});

const retiro = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	contentContainer: {
		flex: 19,
		width: "92%",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	titleContainer: {
		height: "auto",
		// flex: 0.3,
		// height: "6%",
		width: "100%",
		marginTop: "4%",
		// borderWidth: 1,
		// borderRadius: 10,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		// borderWidth: 1,
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
		color: COLORS.black,
	},
	textContainer: {
		// height: 450,
		// flex: 4,
		// height: "60%",
		// borderWidth: 1,
		paddingTop: 10,
		paddingBottom: 10,
		width: "100%",
		marginTop: "2%",
		// marginBottom: "1%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
	},
	textSubContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	text: {
		// flex: 1,
		fontSize: 16,
		textAlign: "left",
		// borderWidth: 1,
		color: COLORS.black,
	},
	subtext: {
		fontSize: 16,
		color: COLORS.black,
	},
	button: {
		backgroundColor: COLORS.naranja,
		// width: "50%",
		marginTop: 15,
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	textButton: {
		fontSize: 16,
		fontWeight: "bold",
		color: COLORS.white,
	},
});

const cartas = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	sectionContainer: {
		flex: 19,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	sectionTitleContainer: {
		height: "10%",
		// flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "4%",
	},
	sectionButtonContainer: {
		// flex: 1,
		// height: "100%",
		width: "95%",
		// top: "3%",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "3%",
		// marginBottom: "-5%"
		// borderWidth: 1,
	},
	buttonContainer: {
		width: "48%",
		justifyContent: "center",
		alignItems: "center",
	},
});

const reposiciones = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	sectionContainer: {
		flex: 19,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	sectionTitleContainer: {
		height: "10%",
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "4%",
	},
	sectionButtonContainer: {
		flex: 1,
		// height: "100%",
		width: "80%",
		// top: "3%",
		// paddingVertical: "5%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
	},
	buttonContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// marginVertical: "4%",
	},
});

const linea = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	sectionContainer: {
		flex: 19,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
	},
	background: {
		position: "absolute",
		right: "25%",
		height: "100%",
		width: "100%",
	},
	sectionTitleContainer: {
		flex: 1.2,
		// height: "10%",
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "4%",
		// borderWidth: 1,
	},
	sectionAnimation: {
		flex: 7.4,
		// height: "75%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	animationContainer: {
		height: "100%",
		width: "75%",
		right: "9%",
		bottom: "4%",
		alignSelf: "flex-start",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 2,
		// borderWidth: 1,
	},
	textContainer: {
		position: "absolute",
		// flex: 1,
		height: "22%",
		width: "80%",
		bottom: "30%",
		paddingLeft: "6%",
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		// top: "10%",
		alignSelf: "flex-end",
		justifyContent: "center",
		alignItems: "flex-end",
		backgroundColor: COLORS.white,
		// zIndex: 1,
		// borderWidth: 1,
	},
	textBox: {
		width: "65%",
		height: "80%",
		marginRight: "2%",
		justifyContent: "center",
		alignItems: "flex-end",
		// borderWidth: 1,
	},
	text: {
		fontSize: 13,
		color: COLORS.black,
		textAlign: "right",
		fontWeight: "500",
	},
	sectionButtonContainer: {
		flex: 1.4,
		// height: "15%",
		width: "100%",
		// borderWidth: 1,
		// top: "6%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	buttonContainer: {
		width: "31%",
		justifyContent: "center",
		alignItems: "center",
	},
});

const polizas = StyleSheet.create({
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
		width: "100%",
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
		flex: 1,
		width: "100%",
	},
	scrollContentContainer: {
		flexGrow: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},
});

const opiniones = StyleSheet.create({
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
		width: "94%",
		marginTop: "2%",
		borderRadius: 10,
		// borderTopLeftRadius: 10,
		// borderTopRightRadius: 10,
		// borderBottomLeftRadius: 10,
		// borderBottomRightRadius: 10,
		backgroundColor: COLORS.flatlistBackground,
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleBar: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.naranja,
		// borderWidth: 1,
	},
	iconContainer: {
		position: "absolute",
		height: "100%",
		width: "10%",
		alignSelf: "flex-start",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		backgroundColor: COLORS.main,
	},
	icon: {
		color: COLORS.white,
	},
	titleContainer: {
		height: "100%",
		width: "70%",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.2)",
	},
	titleText: {
		fontSize: 12,
		fontWeight: "bold",
		color: "white",
	},
	infoContainer: {
		flex: 16,
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	dataContainer: {
		height: "50%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// marginTop: "2%",
	},
	dataTitleContainer: {
		flex: 2,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		marginVertical: "3%",
	},
	dataTitleText: {
		fontSize: 19,
		fontWeight: "bold",
		color: "black",
	},
	dataFieldContainer: {
		flex: 10,
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 15,
		padding: "3%",
		backgroundColor: COLORS.white,
	},
	dataFieldText: {
		width: "100%",
		height: "100%",
		textAlignVertical: "top",
		fontSize: 14,
		fontWeight: "bold",
		color: COLORS.black,
		textAlign: "left",
	},
	remainingChars: {
		marginTop: "1%",
		alignSelf: "flex-end",
		fontFamily: "Montserrat-Regular",
		fontSize: 12,
	},
	noRemainingChars: {
		fontFamily: "Montserrat-Regular",
		fontSize: 12,
		color: "red",
	},
	buttonContainer: {
		flex: 0.2,
		paddingHorizontal: "12%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,

		marginTop: "5%",
		backgroundColor: COLORS.naranja,
	},
	buttonText: {
		fontSize: 13,
		fontWeight: "bold",
		color: "white",
	},
});

const checkin = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1
	},

	contentContainer: {
		flex: 19,
		width: "94%",
		alignItems: "center",
		justifyContent: "flex-start",
	},

	card: {
		width: "92%",
		minHeight: "78%",
		borderRadius: 26,
		backgroundColor: COLORS.white,
		paddingHorizontal: "6%",
		paddingVertical: "7%",
		justifyContent: "space-between",
		alignItems: "center",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.12,
		shadowRadius: 14,
		elevation: 7,
	},

	headerBlock: {
		width: "100%",
		alignItems: "center",
		// borderWidth: 1,
	},

	eyebrow: {
		fontFamily: "Montserrat-Regular",
		fontSize: 12,
		letterSpacing: 1.2,
		textTransform: "uppercase",
		color: COLORS.naranja,
		marginBottom: 8,
	},

	title: {
		fontFamily: "Montserrat-Regular",
		fontSize: 26,
		fontWeight: "bold",
		color: COLORS.main,
		textAlign: "center",
	},

	subtitle: {
		fontFamily: "Montserrat-Regular",
		fontSize: 13,
		color: "#6B7280",
		textAlign: "center",
		lineHeight: 20,
		marginTop: 10,
		width: "92%",
	},

	statusPill: {
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 16,
		maxWidth: "90%",
		borderRadius: 999,
		backgroundColor: "rgba(32, 67, 137, 0.08)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},

	statusDot: {
		width: 9,
		height: 9,
		borderRadius: 9,
		backgroundColor: COLORS.naranja,
		marginRight: 8,
	},

	statusText: {
		fontFamily: "Montserrat-Regular",
		fontSize: 12,
		fontWeight: "bold",
		color: COLORS.main,
		textAlign: "center",
	},

	punchTable: {
		width: "100%",
		marginTop: 20,
		borderRadius: 20,
		backgroundColor: "#F7F8FB",
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "rgba(0, 0, 0, 0.06)",
	},

	punchHeaderRow: {
		width: "100%",
		minHeight: 40,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(32, 67, 137, 0.08)",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0, 0, 0, 0.06)",
	},

	punchHeaderText: {
		fontFamily: "Montserrat-Regular",
		fontSize: 11,
		fontWeight: "bold",
		color: COLORS.main,
		textAlign: "center",
		textTransform: "uppercase",
	},

	punchRow: {
		width: "100%",
		minHeight: 54,
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0, 0, 0, 0.05)",
	},

	punchRoundCell: {
		width: "22%",
		justifyContent: "center",
		alignItems: "center",
	},

	punchCell: {
		width: "39%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 6,
	},

	punchRoundText: {
		width: 28,
		height: 28,
		borderRadius: 28,
		backgroundColor: COLORS.main,
		color: COLORS.white,
		fontFamily: "Montserrat-Regular",
		fontSize: 13,
		fontWeight: "bold",
		textAlign: "center",
		textAlignVertical: "center",
		lineHeight: 28,
	},

	punchTimeText: {
		fontFamily: "Montserrat-Regular",
		fontSize: 15,
		fontWeight: "bold",
		color: COLORS.black,
		textAlign: "center",
	},

	pendingText: {
		color: "#9CA3AF",
	},

	successText: {
		color: "#15803D",
	},

	warningText: {
		color: "#B45309",
	},

	actionArea: {
		width: 190,
		height: 190,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 25,
	},

	pulseRing: {
		position: "absolute",
		width: 150,
		height: 150,
		borderRadius: 150,
		backgroundColor: COLORS.main,
	},

	checkButton: {
		width: 145,
		height: 145,
		borderRadius: 145,
		backgroundColor: COLORS.main,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.22,
		shadowRadius: 12,
		elevation: 8,
	},

	checkButtonDisabled: {
		opacity: 0.65,
	},

	checkButtonIcon: {
		fontFamily: "Montserrat-Regular",
		fontSize: 34,
		fontWeight: "bold",
		color: COLORS.white,
		marginBottom: 4,
	},

	checkButtonText: {
		fontFamily: "Montserrat-Regular",
		fontSize: 14,
		fontWeight: "bold",
		color: COLORS.white,
		textAlign: "center",
	},

	footerText: {
		fontFamily: "Montserrat-Regular",
		fontSize: 11,
		color: "#9CA3AF",
		textAlign: "center",
		marginTop: 5,
	},

	scrollView: {
		// flex: 1,
		height: "100%",
		width: "100%",
		// borderWidth: 1
	},

	scrollContentContainer: {
		width: "100%",
		alignItems: "center",
		paddingBottom: 170,
	},

	punchActions: {
		width: "100%",
		alignItems: "center",
		marginTop: 12,
		marginBottom: 14,
	},

	refreshPunchButton: {
		paddingVertical: 9,
		paddingHorizontal: 18,
		borderRadius: 18,
		backgroundColor: "#1F6FEB",
	},

	refreshPunchButtonDisabled: {
		opacity: 0.55,
	},

	refreshPunchButtonText: {
		color: "#FFFFFF",
		fontSize: 13,
		fontWeight: "700",
	},
});

export {
	menu,
	header,
	infopers,
	area,
	redes,
	ideas,
	directorio,
	notificaciones,
	vacaciones,
	reciboNom,
	prenomina,
	solicitudes,
	prestamos,
	retiro,
	cartas,
	reposiciones,
	linea,
	polizas,
	opiniones,
	checkin,
};
