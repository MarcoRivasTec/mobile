import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { notificaciones } from "./styles";
import Working from "./Design/Working";
import { AppContext } from "../../AppContext";
import COLORS from "../../../constants/colors";
import Encuestas from "./Notificaciones/Encuestas";
import { HomeContext } from "../../HomeContext";
import fetchPost from "../../fetching";

function Notificaciones() {
	const { height, region } = useContext(AppContext);
	const { numEmp } = useContext(HomeContext);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("Encuestas");
	const [encuestas, setEncuestas] = useState([]);

	const [notifsEncuestas, setNotifsEncuestas] = useState(0);
	const [notifsAvisos, setNotifsAvisos] = useState(0);

	useEffect(() => {
		console.log("Available encuestas: ", encuestas);
	}, [encuestas]);

	useEffect(() => {
		console.log("Entering notifications");
		const updateNotifications = async () => {
			const encuestasQuery = {
				query: `query Encuestas(
							$numEmp: String!,
							$region: String!,
						) {
							Encuestas(
								numEmp: $numEmp,
								region: $region,
							) {
								encuesta
								titulo
								preguntas
							}
						}`,
				variables: {
					numEmp: numEmp,
					region: region,
				},
			};
			try {
				const data = await fetchPost({ query: encuestasQuery });
				console.log("Data is: ", JSON.stringify(data, null, 1));
				// if (region === "JRZ") {
				if (data.data.Encuestas && data.data.Encuestas.length > 0) {
					console.log("Correct", region);
					// console.log("Data is: ", data.data.Encuestas);
					setEncuestas(data.data.Encuestas);
					setNotifsEncuestas(data.data.Encuestas.length);
					// showMessage({
					// 	message: "Tienes notificaciones !",
					// 	description: `Tienes${
					// 		data.data.Encuestas.length > 1 ? " más de " : " "
					// 	}una encuesta pendiente por responder`,
					// 	type: "info",
					// 	duration: 20000,
					// 	position: "top",
					// 	statusBarHeight: 30,
					// 	style: {
					// 		// backgroundColor: COLORS.second,
					// 		backgroundColor: "white",
					// 		borderBottomLeftRadius: 15,
					// 		borderBottomRightRadius: 15,
					// 		borderWidth: 1,
					// 		borderColor: COLORS.main
					// 	},
					// 	textStyle: { color: COLORS.main },
					// 	titleStyle: { color: COLORS.main },
					// 	icon: () => <Bell />,
					// });
				}
			} catch (error) {
				// showMessage({
				// 	message:
				// 		"Hubo un problema al actualizar tus notificaciones",
				// 	type: "warning",
				// 	duration: 3000,
				// 	position: "top",
				// 	statusBarHeight: 30,
				// 	icon: { icon: "info", position: "right" },
				// 	// statusBarHeight: 40,
				// });
			}
		};

		updateNotifications();
		setIsLoading(false);
	}, []);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const Tab = ({ title, isLast, notificationCount }) => {
		return (
			<TouchableOpacity
				onPress={() => setActiveTab(title)}
				style={[
					notificaciones.tabContainer,
					{
						backgroundColor:
							activeTab === title ? COLORS.main : COLORS.white,
						height: activeTab === title ? "100%" : "75%",
						marginRight: isLast ? 0 : "4%",
					},
				]}
			>
				<Text
					style={[
						notificaciones.tabText,
						{
							color:
								activeTab === title
									? COLORS.white
									: COLORS.main,
							fontSize: activeTab === title ? 14 : 10,
						},
					]}
				>
					{title} {notificationCount > 0 && `(${notificationCount})`}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={notificaciones.container}>
			{/* <ContentHeader title="Directorio" /> */}
			<View style={notificaciones.titleContainer}>
				<Text style={notificaciones.title}>Notificaciones</Text>
			</View>
			<View style={notificaciones.tabsContainer}>
				{[
					{ title: "Encuestas", notificationCount: notifsEncuestas },
					{ title: "Avisos", notificationCount: notifsAvisos },
					{ title: "Eventos", notificationCount: notifsEncuestas },
				].map((tab, index, array) => (
					<Tab
						key={tab.title}
						title={tab.title}
						isLast={index === array.length - 1}
						notificationCount={tab.notificationCount}
					/>
				))}
			</View>

			<View style={notificaciones.contentContainer}>
				{activeTab === "Encuestas" && (
					<Encuestas
						encuestasDisp={encuestas}
						isLoading={isLoading}
					/>
				)}
				{activeTab === "Avisos" && <Avisos />}
			</View>
		</View>
	);
}

export default Notificaciones;
