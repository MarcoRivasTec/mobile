import { StatusBar } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { home } from "../components/Home/styles";
import Card from "../components/Home/Card";
import Quickbar from "../components/Home/Quickbar";
import Navbar from "../components/Home/Navbar";
import ContentRenderer from "../components/Home/ContentRenderer";
import { AppContext } from "../components/AppContext";

const Home = ({ navigation, route }) => {
	const { numEmp, name } = useContext(AppContext);
	// const { razon, puesto } = route.params;
	const cardInfo = {
		name: name,
		numEmp: numEmp,
		razon: "INTERNATIONAL MANUFACTURING SOLUTIONS OPERACIONES",
		puesto: "TECNICO DE PRODUCCION",
	};
	// const cardInfo = {
	// 	name: name,
	// 	numEmp: numEmp,
	// 	razon: razon,
	// 	puesto: puesto,
	// };
	useEffect(() => {
		StatusBar.setHidden(false); // Hide the status bar when the component mounts
	}, []);

	const [currentContent, setCurrentContent] = useState("Menu");

	const changeContent = (content) => {
		setCurrentContent(content);
	};

	return (
		<SafeAreaView style={home.container}>
			{/* Flex de 50 */}

			{/* Contenedor de Card(incluye ) */}
			<Card cardInfo={cardInfo} />

			{/* Contenedor acceso rapido */}
			<Quickbar changeContent={changeContent} />

			{/* Contenedor modulos/apartados */}
			<ContentRenderer
				content={currentContent}
				changeContent={changeContent}
				navigation={navigation}
			/>

			{/* Contenedor barra navegacion */}
			<Navbar changeContent={changeContent} navigation={navigation} />
		</SafeAreaView>
	);
};

export default Home;
