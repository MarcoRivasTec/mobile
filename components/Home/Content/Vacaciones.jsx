import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { vacaciones } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonTag from "./Buttons/ButtonTag";
import ButtonInfo from "./Buttons/ButtonInfo";
import ButtonAction from "./Buttons/ButtonAction";
import HistorialModal from "./Vacaciones/HistorialModal";
import LoadingContent from "../../Animations/LoadingContent";
import fetchPost from "../../fetching";

function Vacaciones({ numEmp }) {
	const [isModalVisible, setModalVisible] = useState(false);

	function modalHandler() {
		setModalVisible(!isModalVisible);
	}

	const [antiguedad, setAntiguedad] = useState({
		ingreso: "No definido",
		antiguedad: 0,
		diasaniv: 0,
	});

	const [diasVacs, setDiasVacs] = useState({
		ganados: 0,
		tomados: 0,
		disponibles: 0,
	});

	const query = {
		query: `query Vacaciones($numEmp: String!){
			Vacaciones(numEmp: $numEmp) {
				antiguedad {
					ingreso
					antiguedad
					diasaniv
				}
				diasvacs {
					ganados
					tomados
					disponibles
				}
			}
		}`,
		variables: {
			numEmp: numEmp,
		},
	};

	// New state to manage loading
	const [isLoading, setIsLoading] = useState(true);

	// Fetch data when component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				console.log("Response data at vacaciones:", data);
				if (data.data.Vacaciones) {
					setAntiguedad(data.data.Vacaciones.antiguedad);
					setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving vacaciones information");
				}
			} catch (error) {
				console.error("Error at vacaciones:", error);
			} finally {
				console.log(diasVacs.disponibles);
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};

		diasVacs.disponibles = diasVacs.ganados - diasVacs
		fetchData();
	}, [numEmp]); // Dependency array includes numEmp to refetch data if numEmp changes

	useEffect(() => {
		console.log("Dias update: ", diasVacs.disponibles);
	}, [diasVacs.disponibles]);

	// Render loading or error state if data is not yet available
	if (isLoading) {
		return <LoadingContent />;
	}

	return (
		<View style={vacaciones.container}>
			<ContentHeader title="Vacaciones"></ContentHeader>
			<View style={vacaciones.sectionContainer}>
				<View style={vacaciones.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Antiguedad
					</Text>
				</View>
				<View style={vacaciones.sectionButtonContainer}>
					<ButtonInfo
						data={antiguedad.ingreso}
						title="Fecha de Ingreso"
					/>
					<ButtonTag
						data={antiguedad.antiguedad}
						title="Años de Antigüedad"
					/>
					<ButtonTag
						data={antiguedad.diasaniv}
						title="Días para siguiente aniversario"
					/>
				</View>
			</View>
			<View style={vacaciones.sectionContainer}>
				<View style={vacaciones.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Vacaciones
					</Text>
				</View>
				<View style={vacaciones.sectionButtonContainer}>
					<ButtonTag data={diasVacs.ganados} title="Días Tomados" />
					<ButtonTag data={diasVacs.tomados} title="Días Ganados" />
					<ButtonTag
						data={diasVacs.disponibles}
						title="Días Disponibles"
					/>
				</View>
			</View>
			<View style={vacaciones.historialContainer}>
				<ButtonAction
					title="Solicitar vacaciones ó permisos"
					icon="VACACIONES"
					size={25}
				/>
				<ButtonAction
					toggleModal={modalHandler}
					title="Ver historial de vacaciones"
					icon="history"
					size={33}
				></ButtonAction>
			</View>
			<View>
				{isModalVisible && (
					<HistorialModal
						onCallback={modalHandler}
						onExit={modalHandler}
					/>
				)}
			</View>
		</View>
	);
}

export default Vacaciones;
