import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { reciboNom } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonInfo from "./Buttons/ButtonInfo";
import Icon from "../icons";
import COLORS from "../../../constants/colors";
import fetchPost from "../../fetching";
import { AppContext } from "../../AppContext";
import LoadingContent from "../../Animations/LoadingContent";
//import HistorialModal from "./Vacaciones/HistorialModal";

function getWeekNumber(d) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return weekNo;
}

function ReciboNom() {
	const { numEmp, proyecto } = useContext(AppContext);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(new Date()));
	const [years, setYears] = useState([]);
	const [weeks, setWeeks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [fondoAhorro, setFondoAhorro] = useState({
		saldo_ca: 0,
		saldo_fa: 0,
		saldo_pr: 0,
	});
	// const [recibos, setRecibos] = useState([]);
	const [recibos, setRecibos] = useState([
		{
			nomina: 0,
			percepciones: 0,
			deducciones: 0,
			neto: 0,
		},
	]);

	// New state to manage loading

	useEffect(() => {
		console.log("Recibos changed: ", recibos);
	}, [recibos]);
	// Fetch data when component mounts
	useEffect(() => {
		const fetchData = async () => {
			const query = {
				query: `query FondoAhorro($numEmp: String!){
					FondoAhorro(numEmp: $numEmp) {
						saldo_fa
						saldo_ca
						saldo_pr
					}
				}`,
				variables: {
					numEmp: numEmp,
				},
			};
			try {
				const data = await fetchPost({ query });
				console.log("Response data at fondo ahorro:", data);
				if (data.data.FondoAhorro) {
					setFondoAhorro(data.data.FondoAhorro);
					// setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving fondo ahorro information");
				}
			} catch (error) {
				console.error("Error at fondo ahorro:", error);
			} finally {
				// console.log(diasVacs.disponibles);
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchData();
	}, []); // Dependency array includes numEmp to refetch data if numEmp changes

	useEffect(() => {
		const fetchData = async () => {
			const query = {
				query: `query Recibos($numEmp: String!, $year: String!, $proy: String!){
					Recibos(numEmp: $numEmp, year: $year, proy: $proy) {
						nomina
						percepciones
						deducciones
						neto
					}
				}`,
				variables: {
					numEmp: numEmp,
					year: selectedYear.toString(),
					proy: proyecto,
				},
			};
			try {
				const data = await fetchPost({ query });
				console.log("Response data at recibos:", data);
				if (data.data.Recibos) {
					setRecibos(data.data.Recibos);
					// setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving recibos information");
				}
			} catch (error) {
				console.error("Error at recibos:", error);
			} finally {
				// console.log(diasVacs.disponibles);
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchData();
	}, [selectedYear]); // Dependency array includes numEmp to refetch data if numEmp changes

	// Render loading or error state if data is not yet available
	if (isLoading) {
		return <LoadingContent />;
	}

	return (
		<View style={reciboNom.container}>
			<ContentHeader title="Recibo de Nómina"></ContentHeader>
			<View style={reciboNom.sectionContainer}>
				<View style={reciboNom.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Fondo de Ahorro
					</Text>
				</View>
				<View style={reciboNom.sectionButtonContainer}>
					<ButtonInfo data={fondoAhorro.saldo_fa} title="Acumulado" />
					<ButtonInfo
						data={fondoAhorro.saldo_pr}
						title="Saldo préstamo ahorro"
					/>
					{fondoAhorro.saldo_ca != 0 ? (
						<ButtonInfo
							data={fondoAhorro.saldo_ca}
							title="Caja de Ahorro"
						/>
					) : (
						<View style={{ flex: 1 }} />
					)}
				</View>
			</View>
			<View style={reciboNom.nominaContainer}>
				{/* Barra Busqueda */}
				<View style={reciboNom.nominaHeader}>
					<TouchableOpacity style={reciboNom.nominaYearContainer}>
						<View style={reciboNom.nominaSearchIconContainer}>
							<Icon
								name="search"
								size={13}
								style={reciboNom.nominaSearchIcon}
							></Icon>
						</View>
						<Text style={reciboNom.nominaSearchText}>
							{selectedYear}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={reciboNom.nominaWeekContainer}>
						<View style={reciboNom.nominaSearchIconContainer}>
							<Icon
								name="search"
								size={13}
								style={reciboNom.nominaSearchIcon}
							></Icon>
						</View>
						<Text style={reciboNom.nominaSearchText}>
							Semana {selectedWeek}
						</Text>
					</TouchableOpacity>
				</View>

				{/* Cantidades */}
				<View style={reciboNom.nominaCantidadContainer}>
					<TouchableOpacity
						style={reciboNom.nominaCantidadElementContainer}
					>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>
								Percepciones
							</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>
								${recibos[0].percepciones}
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							reciboNom.nominaCantidadElementContainer,
							{ backgroundColor: COLORS.flatlistElement1 },
						]}
					>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>
								Deducciones
							</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>
								${recibos[0].deducciones}
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={reciboNom.nominaCantidadElementContainer}
					>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>
								Neto
							</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>
								${recibos[0].neto}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default ReciboNom;
