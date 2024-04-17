import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const home = StyleSheet.create({
	//Main Container
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
	},
});

const data = StyleSheet.create({
	//Data properties
	container: {
		flex: 7,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	razonContainer: {
		flex: 2,
		justifyContent: "flex-end",
		backgroundColor: COLORS.grey,
		width: "72%",
		marginTop: "3%",
		marginBottom: "-0.5%",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	razonBox: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		width: "92%",
		borderWidth: 1,
		borderColor: "black"
	},
	razonText: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 15,
	},
	cardContainer: {
		flex: 7,
		width: "90%",
		height: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	cardGradient: {
		width: "100%",
		height: "100%",
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		borderBottomRightRadius: 50,
	},
	cardDataContainer: {
		height: "100%",
		width: "100%",
		position: "absolute",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	cardAvatarContainer: {
		flex: 0.34,
		left: "5%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	cardAvatarBackground: {
		justifyContent: "center",
		alignItems: "center",
		height: "92%",
		width: "80%",
		backgroundColor: COLORS.flatlistBackground,
		borderRadius: 100,
	},
	cardTextContainer: {
		flex: 1,
		height: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	cardText: {
		color: COLORS.white,
		marginVertical: "-0.8%",
	},
});

const quickbar = StyleSheet.create({
	//Quickbar Properties
	container: {
		flex: 4,
		borderBottomWidth: 2.5,
		//borderRadius: 4,
		borderColor: COLORS.main,
		width: "95%",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	buttonContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		top: "0.3%",
		width: "100%",
		height: "100%",
	},
	iconBgContainer: {
		justifyContent: "center",
		alignItems: "center",
		height: "50%",
		width: "70%",
		borderRadius: 10,
		marginBottom: "-1%",
	},
	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: "2%",
		height: "90%",
		width: "90%",
	},
	textContainer: {
		height: "44%",
		width: "86%",
		justifyContent: "center",
		alignItems: "center",
		top: "1.5%",
	},
	text: {
		textAlign: "center",
		color: COLORS.primary,
		fontWeight: "bold",
	},
});

const contentRenderer = StyleSheet.create({
	container: {
		flex: 34,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
	},
	svg: {
		position: "absolute",
		opacity: 0.4,
	},
});

const navbar = StyleSheet.create({
	// Navigation bar properties
	container: {
		flex: 5,
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
	},
	home: {
		position: "absolute",
		marginHorizontal: "auto",
		top: "10%",
		padding: "3.4%",
		backgroundColor: COLORS.white,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	homeBackground: {
		height: "90%",
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		backgroundColor: COLORS.main,
	},
	box: {
		height: "70%",
		width: "75%",
		backgroundColor: COLORS.grey,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	boxLeft: {
		height: "100%",
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginLeft: "1.5%",
	},
	boxRight: {
		position: "absolute",
		height: "100%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-start",
		marginRight: "15%",
	},
	button: {
		backgroundColor: COLORS.primary,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		height: "45%",
		width: "8%",
		marginTop: "4%",
		marginHorizontal: "2.5%",
	},
});

export { home, data, quickbar, contentRenderer, navbar };
