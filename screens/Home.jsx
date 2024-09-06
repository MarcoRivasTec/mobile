import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { home } from "../components/Home/styles";
import Card from "../components/Home/Card";
import Quickbar from "../components/Home/Quickbar";
import Navbar from "../components/Home/Navbar";
import ContentRenderer from "../components/Home/ContentRenderer";

const Home = ({ navigation }) => {

	// useEffect(() => {
	// 	StatusBar.setHidden(false); // Hide the status bar when the component mounts
	// }, []);

	const [currentContent, setCurrentContent] = useState("Menu");

	const changeContent = (content) => {
		setCurrentContent(content);
	};

	return (
		<SafeAreaView style={home.container}>
			{/* Flex de 50 */}

			{/* Contenedor de Card(incluye ) */}
			<Card />

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
