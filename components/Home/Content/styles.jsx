import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

const menu = StyleSheet.create({
	// Menu / Buttons properties
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
	},
	row: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

const header = StyleSheet.create({
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
		flex: 2,
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "4%",
	},
	sectionButtonContainer: {
		flex: 4,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		top: "1%",
	},
	historialContainer: {
		flex: 9,
		width: "85%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

const reciboNom = StyleSheet.create({
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
		flex: 2,
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
		top: "1%",
	},
	nominaContainer: {
		flex: 14,
		top: "4%",
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	nominaHeader: {
		width: "100%",
		height: "7%",
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
		paddingVertical: "4%",
		paddingHorizontal: 5,
		justifyContent: "center",
		alignContent: "center",
		borderRadius: 50,
		backgroundColor: COLORS.main,
	},
	nominaSearchIcon: {
		color: COLORS.white,
	},
	nominaSearchText: {
		left: "30%",
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
		color: COLORS.white,
	},
	nominaCantidadContainer: {
		flex: 1,
		width: "100%",
		top: "3%",
	},
	nominaCantidadElementContainer: {
		width: "100%",
		height: "8%",
		justifyContent: "space-around",
		alignItems: "center",
		marginVertical: "1.0%",
		flexDirection: "row",
		backgroundColor: COLORS.flatlistElement2,
	},
	nominaCantidadBox: {
		width: "30%",
		height: "100%",
		right: "50%",
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
});

const prenomina = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	prenominaContainer: {
		flex: 19,
		top: "4%",
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
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
		left: "10%",
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
		left: "30%",
		fontSize: 12,
		fontWeight: "bold",
		textAlign: "center",
		color: COLORS.white,
	},
	prenominaCantidadContainer: {
		flex: 1,
		width: "100%",
		top: "3%",
	},
	prenominaCantidadElementContainer: {
		width: "100%",
		height: "8%",
		justifyContent: "space-around",
		alignItems: "center",
		marginVertical: "1.0%",
		flexDirection: "row",
		backgroundColor: COLORS.flatlistElement2,
	},
	prenominaCantidadBox: {
		width: "30%",
		height: "100%",
		right: "50%",
		justifyContent: "center",
		alignContent: "center",
	},
	prenominaCantidadTitle: {
		fontSize: 17,
		color: COLORS.black,
		textAlign: "center",
	},
	prenominaCantidad: {
		fontSize: 17,
		left: "25%",
		fontWeight: "bold",
		color: "black",
		textAlign: "center",
	},
	buttonContainer: {
		width: "24%",
		height: "8%",
		top: "10%",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
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
	buttonText: {
		fontSize: 12,
		color: COLORS.white,
		fontWeight: "bold",
	},
});

const solicitudes = StyleSheet.create({
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
		height: "15%",
		width: "85%",
		top: "6%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
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
		marginTop: "2%",
		borderRadius: 10,
		// borderTopLeftRadius: 10,
		// borderTopRightRadius: 10,
		// borderBottomLeftRadius: 10,
		// borderBottomRightRadius: 10,
		backgroundColor: COLORS.flatlistBackground
		// borderWidth: 1,
		// borderColor: "black"
	},
	titleBar: {
		flex: 1,
		width: "100%",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.naranja
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
		color: "white"
	},
	infoContainer: {
		flex: 19,
		width: "95%",
		justifyContent: "center",
		alignItems: "center",
	},
	dataContainer: {
		flex: 1,
		width: "100%",	
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
		marginTop: "4%",
	},
	dataRowContainer: {
		flex: 1,
		height: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "1%",
		
		// borderWidth: 1,
	},
	dataTextContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		// borderWidth: 1,
	},
	dataRowTextContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		// borderWidth: 1,
	},
	dataFieldContainer: {
		height: "65%",
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingLeft: "3%",
		marginVertical: "1%",
		borderWidth: 1,
		borderColor: COLORS.grey,
		borderRadius: 10,
		backgroundColor: COLORS.white
	},
	dataRowFieldContainer: {
		flex: 1,
		height: "65%",
		marginHorizontal: "4%",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: COLORS.grey,
		borderRadius: 10,
		backgroundColor: COLORS.white
	},
	dataText: {
		fontSize: 15,
		fontWeight: "bold",
		color: "black",
	},
	dataFieldText: {
		fontSize: 15,
		color: "black",
	},
	buttonContainer:{
		flex: 0.5,
		paddingHorizontal: "12%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		marginTop: "1%",
		marginBottom: "1%",
		backgroundColor: COLORS.naranja
	},
	buttonText: {
		fontSize: 13,
		fontWeight: "bold",
		color: "white",
	},
	agreementContainer: {
		flex: 1.5,
		marginTop: "2%",
		flexDirection: "row",
		width: "100%",
		// borderWidth: 1,
	},
	agreementTextContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	agreementText: {
		fontSize: 12,
		color: COLORS.black
	},
	bouncyCheckbox: {
		
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
		height: "100%",
		// top: "3%",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
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
	scrollContainer: {
		flex: 1,
		width: "100%",
	},
	scrollContentContainer: {
		flexGrow: 1,
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
		backgroundColor: COLORS.flatlistBackground
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
		backgroundColor: COLORS.main
	},
	icon: {
		color: COLORS.white
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
		color: "white"
	},
	infoContainer: {
		flex: 16,
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	dataContainer: {
		height: "80%",
		width: "100%",	
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		marginTop: "2%",
	},
	dataTitleContainer: {
		flex: 1,
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
		backgroundColor: COLORS.white
	},
	dataFieldText: {
		width: "100%",
		height: "100%",
		textAlignVertical: "top",
		fontSize: 14,
		fontWeight: "bold",
		color: COLORS.black,
		textAlign: "left"
	},
	buttonContainer:{
		flex: 0.7,
		paddingHorizontal: "12%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		
		marginTop: "5%",
		backgroundColor: COLORS.naranja
	},
	buttonText: {
		fontSize: 13,
		fontWeight: "bold",
		color: "white",
	},
});

export {
	menu,
	header,
	infopers,
	area,
	vacaciones,
	reciboNom,
	prenomina,
	solicitudes,
	prestamos,
	reposiciones,
	polizas,
	opiniones
};
