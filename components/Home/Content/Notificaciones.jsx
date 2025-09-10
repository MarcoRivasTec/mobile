import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { notificaciones } from "./styles";
import Working from "./Design/Working";
import { AppContext } from "../../AppContext";
import COLORS from "../../../constants/colors";
import { HomeContext } from "../../HomeContext";
import fetchPost from "../../fetching";
import Encuestas from "./Notificaciones/Encuestas";
import Avisos from "./Notificaciones/Avisos";
import Solicitudes from "./Notificaciones/Solicitudes";

function Notificaciones({ section = "Avisos" }) {
	const { height, region } = useContext(AppContext);
	const { numEmp, isSupervisor, accessToken } = useContext(HomeContext);
	// console.log("Access token is (Notificaciones): ", `${accessToken}`);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState(section);
	const [encuestas, setEncuestas] = useState([]);
	const [requests, setRequests] = useState([]);
	const [notifications, setNotifications] = useState([]);

	const [notifsEncuestas, setNotifsEncuestas] = useState(0);
	const [notifsAvisos, setNotifsAvisos] = useState(0);

	const updateNotificationsData = async () => {
		const encuestasQuery = {
			query: `query NotificationsData(
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

		const notificationsQuery = {
			query: `query Notifications {
						Notifications {
							id
							title
							message
							created_at
							files {
								id
								file_name
							}
						}
					}`,
		};

		try {
			const data = await fetchPost({ query: encuestasQuery });
			const notificationsData = await fetchPost({
				query: notificationsQuery,
				token: accessToken,
			});
			// console.log("Notifications data is(encuestas): ", JSON.stringify(data, null, 1));
			console.log(
				"Notifications data is ",
				JSON.stringify(notificationsData, null, 1)
			);

			if (data.data.Encuestas) {
				// console.log("Correct", region);
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
			if (notificationsData.data.Notifications) {
				setNotifsAvisos(notificationsData.data.Notifications.length);
				setNotifications(notificationsData.data.Notifications);
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

	const onFilePress = async (notificationId, fileId) => {
		const fileQuery = {
			query: `query FileUrl($nid: ID!, $fid: ID!) {
				NotificationFileUrl(notificationId: $nid, fileId: $fid) {
					success
					message	
					url
				}
			}`,
			variables: {
				nid: notificationId,
				fid: fileId,
			},
		};
		const data = await fetchPost({
			query: fileQuery,
			token: accessToken,
		});
		console.log("Data is: ", JSON.stringify(data, null, 1));
		if (data.data?.NotificationFileUrl?.success) {
			console.log("Url is: ", data.data.NotificationFileUrl.url);
			await Linking.openURL(data.data.NotificationFileUrl.url);
		}
	};

	// useEffect(() => {
	// 	console.log("Available encuestas: ", encuestas);
	// }, [encuestas]);

	useEffect(() => {
		console.log("Entering notifications");

		updateNotificationsData();
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
						backgroundColor: activeTab === title ? COLORS.main : COLORS.white,
						height: activeTab === title ? "100%" : "75%",
						marginRight: isLast ? 0 : "4%",
					},
				]}
			>
				<Text
					style={[
						notificaciones.tabText,
						{
							color: activeTab === title ? COLORS.white : COLORS.main,
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
					{ title: "Avisos", notificationCount: notifsAvisos },
					{ title: "Encuestas", notificationCount: notifsEncuestas },
					...(isSupervisor
						? [{ title: "Solicitudes", notificationCount: notifsEncuestas }]
						: []),
					// { title: "Eventos", notificationCount: notifsEncuestas },
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
				{activeTab === "Solicitudes" && isSupervisor && (
					<Solicitudes
						isLoading={isLoading}
						requests={requests}
						updateNotificationsData={updateNotificationsData}
					/>
				)}
				{activeTab === "Avisos" && (
					<Avisos
						notifications={notifications}
						onFilePress={onFilePress}
						isLoading={isLoading}
					/>
				)}
				{activeTab === "Encuestas" && (
					<Encuestas
						encuestasDisp={encuestas}
						isLoading={isLoading}
						updateEncuestas={updateNotificationsData}
					/>
				)}
			</View>
		</View>
	);
}

export default Notificaciones;
