import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { vacaciones } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonTag from "./Buttons/ButtonTag";
import ButtonInfo from "./Buttons/ButtonInfo";
import ButtonAction from "./Buttons/ButtonAction";
import HistorialModal from "./Vacaciones/HistorialModal";
import LoadingContent from "../../Animations/LoadingContent";
import fetchPost from "../../fetching";
import { AppContext } from "../../AppContext";

function Vacaciones({ changeContent }) {
	const { numEmp, region } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);

	const [antiguedad, setAntiguedad] = useState({
		ingreso: "No definido",
		antiguedad: "",
		diasaniv: "",
	});

	const [diasVacs, setDiasVacs] = useState({
		ganados: 0,
		tomados: 0,
		disponibles: 0,
	});

	const [isModalVisible, setModalVisible] = useState(false);

	function modalHandler() {
		setModalVisible(!isModalVisible);
	}

	// Fetch data when component mounts
	useEffect(() => {
		const query = {
			query: `query Vacaciones($numEmp: String!, $region: String!){
				Vacaciones(numEmp: $numEmp, region: $region) {
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
				region: region,
			},
		};
		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				console.log(
					"Response data at vacaciones:",
					data.data.Vacaciones.diasvacs
				);
				console.log(
					"Response data at antiguedad:",
					data.data.Vacaciones.antiguedad
				);
				if (data.data.Vacaciones) {
					// setAntiguedad(data.data.Vacaciones.antiguedad);
					antiguedad.antiguedad =
						data.data.Vacaciones.antiguedad.antiguedad;
					antiguedad.ingreso =
						data.data.Vacaciones.antiguedad.ingreso;
					antiguedad.diasaniv = Math.abs(
						data.data.Vacaciones.antiguedad.diasaniv
					);
					setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving vacaciones information");
				}
			} catch (error) {
				console.error("Error at vacaciones:", error);
			} finally {
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchData();
		console.log(diasVacs);
		console.log(antiguedad);
	}, []); // Dependency array includes numEmp to refetch data if numEmp changes

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
						type="date"
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
					<ButtonTag data={diasVacs.tomados} title="Días Tomados" />
					<ButtonTag data={diasVacs.ganados} title="Días Ganados" />
					<ButtonTag
						data={diasVacs.disponibles}
						title="Días Disponibles"
					/>
				</View>
			</View>
			<View style={vacaciones.historialContainer}>
				<ButtonAction
					toggleModal={() => changeContent("Solicitudes")}
					title="Solicitar vacaciones ó permisos"
					icon="VACACIONES"
					size={25}
				/>
				<ButtonAction
					toggleModal={modalHandler}
					title="Ver historial de vacaciones"
					icon="history"
					size={33}
				/>
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
