import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { solicitudes } from "./styles";
import Working from "../Design/Working";
import LoadingContent from "../../../Animations/LoadingContent";
import ConfirmModal from "../InfoPers/ConfirmModal";
import Encuesta from "./Encuestas/Encuesta";
import Solicitud from "./Solicitudes/Solicitud";
import { AppContext } from "../../../AppContext";
import fetchPost from "../../../fetching";
import { HomeContext } from "../../../HomeContext";

function Solicitudes({ updateNotificationsData }) {
	const { numEmp, region } = useContext(AppContext);
	// const { numEmp } = useState(HomeContext);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [requestVisible, setRequestVisible] = useState(false);
	const [requests, setRequests] = useState([]);
	const [request, setRequest] = useState(null);

	const confirmationModalHandler = async () => {
		setConfirmationVisible(!ConfirmationVisible);
	};

	const requestHandler = () => {
		setRequestVisible(!requestVisible);
	};

	const handleRequest = () => {
		confirmationModalHandler();
		setTimeout(() => {
			requestHandler();
		});
	};

	const getRequests = async () => {
		setIsLoading(true);
		const requestsQuery = {
			query: `query SuperiorRequests($numEmp: String!, $region: String!) {
						SuperiorRequests(numEmp: $numEmp, region: $region) {
							success
							message
							data {
								id
								numEmp
								type
								name
								status
								start_date
								end_date
								request_date
								total_days
								motive
								comment
								pre_approved_by
								pre_approval_date
								approved_by
								approval_date
								approver_comment
								rejected_by
								rejection_date
								cancelled_by
								cancellation_date
							}
						}
					}`,
			variables: {
				numEmp: numEmp,
				region: region,
			},
		};
		try {
			const data = await fetchPost({ query: requestsQuery });
			console.log("Requests data is: ", JSON.stringify(data, null, 1));
			// if (region === "JRZ") {
			if (data.data.SuperiorRequests && data.data.SuperiorRequests.success) {
				if (
					data.data.SuperiorRequests.data &&
					data.data.SuperiorRequests.data.length > 0
				) {
					setRequests(data.data.SuperiorRequests.data);
				}
			}
		} catch (error) {
			console.error("Error getting requests: ", error);
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
		setIsLoading(false);
	};

	useEffect(() => {
		getRequests();
	}, []);

	const groupByStatus = (requestsArray) => {
		const grouped = {};
		requestsArray.forEach((req) => {
			if (!grouped[req.status]) {
				grouped[req.status] = [];
			}
			grouped[req.status].push(req);
		});
		return grouped;
	};

	const formatLongDate = (dateString) => {
		const date = new Date(dateString);
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return date.toLocaleDateString("es-MX", options);
	};

	const statusOrder = [
		"Pendiente",
		"Pre-Aprobado",
		"Aprobado",
		"Rechazado",
		"Cancelado",
	];

	const statusColors = {
		Pendiente: "#F39C12", // naranja
		"Pre-Aprobado": "#5DADE2", // azul
		Aprobado: "#27AE60", // verde
		Rechazado: "#E74C3C", // rojo
		Cancelado: "#95A5A6", // gris
	};

	return isLoading ? (
		<View style={solicitudes.container}>
			<LoadingContent />
		</View>
	) : requests && requests.length > 0 ? (
		<View style={solicitudes.container}>
			<Text style={[solicitudes.encuestasTitle, { fontSize: 18 }]}>
				Toca alguna solicitud para revisarla
			</Text>
			<ScrollView
				contentContainerStyle={solicitudes.scrollContentContainer}
				style={solicitudes.scrollContainer}
			>
				{statusOrder.map((status) => {
					const statusRequests = groupByStatus(requests)[status];
					if (!statusRequests) return null;

					return (
						<View key={status} style={{ marginBottom: 20 }}>
							<Text
								style={[
									solicitudes.encuestasTitle,
									{
										fontSize: 16,
										marginBottom: 5,
										color: statusColors[status] || "#000", // fallback negro
									},
								]}
							>
								{status}
							</Text>
							{statusRequests.map((request, index) => (
								<TouchableOpacity
									key={request.id}
									onPress={() => {
										setRequest(request);
										requestHandler();
									}}
									style={[
										solicitudes.encuestaContainer,
										{ marginTop: index === 0 ? 5 : 0 },
									]}
								>
									<Text style={solicitudes.encuestaTitle}>
										{request.name &&
											request.name
												.toLowerCase()
												.split(" ")
												.map(
													(word) => word.charAt(0).toUpperCase() + word.slice(1)
												)
												.join(" ")}
									</Text>
									<Text style={solicitudes.encuestaDetails}>
										{request.type === "VAC"
											? "Vacaciones"
											: request.type === "PER"
											? "Permiso"
											: "Sin tipo"}
									</Text>
									<Text style={solicitudes.encuestaDetails}>
										Fecha de solicitud: {formatLongDate(request.request_date)}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					);
				})}
			</ScrollView>
			{/* {ConfirmationVisible && (
				<ConfirmModal
					onCallback={confirmationModalHandler}
					onExit={confirmationModalHandler}
					title="Solicitud"
					data={`Confirma alta de permiso a la solicitud del usuario : ${request.name}?`}
					onConfirm={handleRequest}
					// style={navbar.modal}
				/>
			)} */}
			{requestVisible && (
				<Solicitud
					onCallback={requestHandler}
					onExit={requestHandler}
					isVisible={requestVisible}
					requestData={request}
					updateRequests={getRequests}
					// style={navbar.modal}
				/>
			)}
		</View>
	) : (
		<View style={solicitudes.container}>
			<View style={solicitudes.titleContainer}>
				<Text style={solicitudes.titleText}>
					No tienes ninguna solicitud pendiente por revisar
				</Text>
			</View>
		</View>
	);
}

export default Solicitudes;
