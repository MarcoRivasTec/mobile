import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { encuestas } from "./styles";
import Confirm from "../Design/Confirm";
import { HomeContext } from "../../../HomeContext";
import ContentHeader from "../ContentHeader";
import Working from "../Design/Working";
import { AppContext } from "../../../AppContext";
import LoadingContent from "../../../Animations/LoadingContent";
import ConfirmModal from "../InfoPers/ConfirmModal";
import Encuesta from "./Encuestas/Encuesta";

function Encuestas({ encuestasDisp, isLoading }) {
	const { height } = useContext(AppContext);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [encuestaVisible, setEncuestaVisible] = useState(false);
	const [survey, setSurvey] = useState(null);

	const confirmationModalHandler = async () => {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const encuestaHandler = () => {
		setEncuestaVisible(!encuestaVisible);
	}

	const handleEncuesta = async () => {
		await confirmationModalHandler()
		encuestaHandler()
		console.log("ID encuesta es: ", survey.encuesta);
	};

	return isLoading ? (
		<View style={encuestas.container}>
			<LoadingContent />
		</View>
	) : encuestasDisp.length === 0 ? (
		<View style={encuestas.container}>
			<View style={encuestas.titleContainer}>
				<Text style={encuestas.titleText}>
					No tienes ninguna encuesta pendiente por contestar
				</Text>
			</View>
		</View>
	) : (
		<View style={encuestas.container}>
			<Text style={[encuestas.encuestasTitle, { fontSize: 18 }]}>
				Toca alguna encuesta para realizarla
			</Text>
			<ScrollView
				contentContainerStyle={encuestas.scrollContentContainer}
				style={encuestas.scrollContainer}
			>
				{encuestasDisp.map((encuesta, index) => (
					<TouchableOpacity
						key={encuesta.encuesta}
						onPress={() => {
							setSurvey(encuesta);
							confirmationModalHandler();
						}}
						style={[
							encuestas.encuestaContainer,
							{ marginTop: index === 0 ? 10 : 0 },
						]}
					>
						<Text style={encuestas.encuestaTitle}>
							{encuesta.titulo}
						</Text>
						<Text style={encuestas.encuestaDetails}>
							Preguntas: {encuesta.preguntas}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			{ConfirmationVisible && (
				<ConfirmModal
					onCallback={confirmationModalHandler}
					onExit={confirmationModalHandler}
					title="Encuesta"
					data={`¿Estás seguro que quieres contestar la encuesta: ${survey.titulo}?`}
					onConfirm={handleEncuesta}
					// style={navbar.modal}
				/>
			)}
			{encuestaVisible && (
				<Encuesta
					onCallback={encuestaHandler}
					onExit={encuestaHandler}
					isVisible={encuestaVisible}
					surveyData={survey}
					// style={navbar.modal}
				/>
			)}
		</View>
	);
}

export default Encuestas;
