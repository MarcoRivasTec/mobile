import { StatusBar } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { home } from "../components/Home/styles";
import Card from "../components/Home/Card";
import Quickbar from "../components/Home/Quickbar";
import Navbar from "../components/Home/Navbar";
import ContentRenderer from "../components/Home/ContentRenderer";
import { showMessage } from "react-native-flash-message";
import { AppContext } from "../components/AppContext";
import Bell from "../components/Animations/Bell";
import fetchPost from "../components/fetching";
import COLORS from "../constants/colors";
import { HomeContext } from "../components/HomeContext";

const Home = ({ navigation }) => {
	const { numEmp, region } = useContext(AppContext);
	const { updateNotifications } = useContext(HomeContext);

	useEffect(() => {
		StatusBar.setHidden(false);
		StatusBar.setTranslucent(true);
		StatusBar.setBarStyle("dark-content");
		StatusBar.setBackgroundColor("transparent");

		let notifs = 0;
		const init = async () => {
			notifs = await updateNotifications();
			// console.warn("notifs", notifs);
			if (notifs > 0) {
				showMessage({
					message: "Tienes notificaciones !",
					description: `Tienes${
						notifs > 1 ? " más de " : " "
					}una encuesta pendiente por responder`,
					type: "info",
					duration: 20000,
					position: "top",
					statusBarHeight: 30,
					style: {
						// backgroundColor: COLORS.second,
						backgroundColor: "white",
						borderBottomLeftRadius: 15,
						borderBottomRightRadius: 15,
						borderWidth: 1,
						borderColor: COLORS.main,
					},
					textStyle: { color: COLORS.main },
					titleStyle: { color: COLORS.main },
					icon: () => <Bell />,
				});
			}
		};
		init();
	}, []);

	const [currentContent, setCurrentContent] = useState("Menu");

	const changeContent = (content) => {
		setCurrentContent(content);
	};

	const temporarilyDisabled = () => {
		showMessage({
			message: "Esta función está temporalmente deshabilitada",
			type: "info",
			duration: 3000,
			position: "bottom",
			icon: (props) => <Bell />,
			// statusBarHeight: 40,
		});
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
