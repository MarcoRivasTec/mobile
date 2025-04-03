import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { solicitudes } from "./styles";
import Working from "../Design/Working";
import LoadingContent from "../../../Animations/LoadingContent";
import ConfirmModal from "../InfoPers/ConfirmModal";
import Encuesta from "./Encuestas/Encuesta";
import Solicitud from "./Solicitudes/Solicitud";

function Solicitudes({ requests, isLoading, updateNotifications }) {
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [requestVisible, setRequestVisible] = useState(false);
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

	return isLoading ? (
		<View style={solicitudes.container}>
			<LoadingContent />
		</View>
	) : requests || requests.length > 0 ? (
		<View style={solicitudes.container}>
			<Text style={[solicitudes.encuestasTitle, { fontSize: 18 }]}>
				Toca alguna solicitud para revisarla
			</Text>
			<ScrollView
				contentContainerStyle={solicitudes.scrollContentContainer}
				style={solicitudes.scrollContainer}
			>
				{requests.map((request, index) => (
					<TouchableOpacity
						key={index}
						onPress={() => {
							setRequest(request);
							// confirmationModalHandler();
							confirmationModalHandler();
						}}
						style={[
							solicitudes.encuestaContainer,
							{ marginTop: index === 0 ? 10 : 0 },
						]}
					>
						<Text style={solicitudes.encuestaTitle}>{request.numEmp}</Text>
						<Text style={solicitudes.encuestaDetails}>
							Empleado: {request.name}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			{ConfirmationVisible && (
				<ConfirmModal
					onCallback={confirmationModalHandler}
					onExit={confirmationModalHandler}
					title="Solicitud"
					data={`Confirma alta de permiso a la solicitud del usuario : ${request.name}?`}
					onConfirm={handleRequest}
					// style={navbar.modal}
				/>
			)}
			{requestVisible && (
				<Solicitud
					onCallback={requestHandler}
					onExit={requestHandler}
					isVisible={requestVisible}
					surveyData={request}
					updateNotifications={updateNotifications}
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
