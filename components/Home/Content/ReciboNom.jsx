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
import DataModal from "./ReciboNom/DataModal";
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
	const [isLoading, setIsLoading] = useState(true);
	const [fondoAhorro, setFondoAhorro] = useState({
		saldo_ca: 0,
		saldo_fa: 0,
		saldo_pr: 0,
	});
	// const [recibos, setRecibos] = useState([]);
	const [recibos, setRecibos] = useState([
		{
			nomina: 1,
			percepciones: 0,
			deducciones: 0,
			neto: 0,
		},
	]);
	const [years, setYears] = useState([]);
	const [selectedYear, setSelectedYear] = useState(
		years.length === 0 ? new Date().getFullYear() : years[0]
	);
	const [weeks, setWeeks] = useState([]);
	const [selectedWeek, setSelectedWeek] = useState(() => {
		if (weeks.length === 0) {
			const currentWeek = getWeekNumber(new Date());
			return currentWeek !== 1 ? currentWeek - 1 : currentWeek;
		} else {
			return weeks[0];
			// return weeks[0] !== 1 ? weeks[0] - 1 : weeks[0];
		}
	});

	const [isDataModalVisible, setIsDataModalVisible] = useState(false);
	const [isYearModalVisible, setIsYearModalVisible] = useState(false);
	const [isWeekModalVisible, setIsWeekModalVisible] = useState(false);

	function yearModalHandler() {
		setIsYearModalVisible(!isYearModalVisible);
	}

	function weekModalHandler() {
		setIsWeekModalVisible(!isWeekModalVisible);
	}

	const getMonto = (tipo) => {
		const formatNumber = (number) => {
			return number.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
		};

		adjustedWeek = selectedWeek - 1;
		// const recibo = recibos.find((item) => item.nomina === adjustedWeek);

		const handleUndefined = () => {
			return "No definido";
		};

		if (recibos[adjustedWeek] === undefined) {
			return handleUndefined();
		}

		switch (tipo) {
			case "per":
				return recibos[adjustedWeek].percepciones === undefined
					? handleUndefined()
					: `$${formatNumber(recibos[adjustedWeek].percepciones)}`;
			case "ded":
				return recibos[adjustedWeek].deducciones === undefined
					? handleUndefined()
					: `$${formatNumber(recibos[adjustedWeek].deducciones)}`;
			case "neto":
				return recibos[adjustedWeek].neto === undefined
					? handleUndefined()
					: `$${formatNumber(recibos[adjustedWeek].neto)}`;
			default:
				return "";
		}
	};
	// New state to manage loading

	// useEffect(() => {
	// 	console.log("Recibos has changed: ", JSON.stringify(recibos, null, 2));
	// }, [recibos]);

	// useEffect(() => {
	// 	console.log("Years changed: ", years);
	// }, [years]);

	// useEffect(() => {
	// 	console.log("Weeks changed: ", weeks);
	// }, [weeks]);

	// useEffect(() => {
	// 	console.log("Selected week changed: ", selectedWeek);
	// }, [selectedWeek]);

	// useEffect(() => {
	// 	console.log("Selected year changed: ", selectedYear);
	// }, [selectedYear]);

	// Fetch data when component mounts
	useEffect(() => {
		const fetchDataAhorro = async () => {
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
				// console.log("Response data at fondo ahorro:", data);
				if (data.data.FondoAhorro) {
					setFondoAhorro(data.data.FondoAhorro);
					// setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving fondo ahorro information");
				}
			} catch (error) {
				console.error("Error at fondo ahorro:", error);
			}
		};
		const fetchDataRecibosYears = async () => {
			const query = {
				query: `query RecibosYears($numEmp: String!){
					RecibosYears(numEmp: $numEmp) {
						year
					}
				}`,
				variables: {
					numEmp: numEmp,
				},
			};
			try {
				const data = await fetchPost({ query });
				// console.log("Response data at fondo ahorro:", data);
				if (data.data.RecibosYears) {
					const yearsCount = data.data.RecibosYears.map(
						(item) => item.year
					);
					setYears(yearsCount);
					// setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving recibos years information");
				}
			} catch (error) {
				console.error("Error at recibos years:", error);
			}
		};
		fetchDataAhorro();
		fetchDataRecibosYears();
		setIsLoading(false); // Set loading to false after data is fetched
	}, []); // Dependency array includes numEmp to refetch data if numEmp changes

	useEffect(() => {
		setIsLoading(true);
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
				// console.log(
				// 	"Response data at recibos:",
				// 	JSON.stringify(data, null, 2)
				// );
				if (data.data.Recibos) {
					const validNominas = data.data.Recibos.filter(
						(item) => item.nomina >= 1 && item.nomina <= 53
					);
					const weeksCount = validNominas.map((item) => item.nomina);
					validNominas.sort((a, b) => a.nomina - b.nomina);
					// console.log(
					// 	"Valid nominas: ",
					// 	JSON.stringify(validNominas, null, 2)
					// );
					setRecibos(validNominas);
					setWeeks(weeksCount);
					setSelectedWeek(weeksCount[0]);
					// setWeeks a numero de semanas recibidas en recibos
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
		setIsLoading(false);
	}, [selectedYear]);

	// Render loading or error state if data is not yet available
	if (isLoading) {
		return <LoadingContent />;
	}

	return (
		<View style={reciboNom.container}>
			{isYearModalVisible && (
				<DataModal
					data={years}
					selectedData={selectedYear}
					setSelectedData={setSelectedYear}
					onCallback={yearModalHandler}
					isDataModalVisible={isYearModalVisible}
				/>
			)}
			{isWeekModalVisible && (
				<DataModal
					data={weeks}
					selectedData={selectedWeek}
					setSelectedData={setSelectedWeek}
					onCallback={weekModalHandler}
					isDataModalVisible={isWeekModalVisible}
				/>
			)}
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
					<TouchableOpacity
						onPress={yearModalHandler}
						style={reciboNom.nominaYearContainer}
					>
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
					<TouchableOpacity
						onPress={weekModalHandler}
						style={reciboNom.nominaWeekContainer}
					>
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
								{/* ${recibos[selectedWeek].percepciones} */}
								{getMonto("per")}
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
								{/* ${recibos[selectedWeek].deducciones} */}
								{getMonto("ded")}
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
								{/* ${recibos[selectedWeek].neto} */}
								{getMonto("neto")}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default ReciboNom;
