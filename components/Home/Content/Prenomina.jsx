import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { prenomina } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
import COLORS from "../../../constants/colors";
import { AppContext } from "../../AppContext";
import fetchPost from "../../fetching";

function getWeekNumber(d) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return weekNo;
}

function Prenomina() {
	const { numEmp } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);
	const [isVerDetalleSelected, setIsVerDetalleSelected] = useState(false);
	const [prenominas, setPrenominas] = useState([
		{
			nomina: 1,
			percepciones: 0,
			deducciones: 0,
			neto: 0,
		},
	]);
	const [detalles, setDetalles] = useState([]);
	// const [detalles, setDetalles] = useState([
	// 	{
	// 		dia: 1,
	// 		fec_dia: "",
	// 		horas: 0.0,
	// 		extras: 0.0,
	// 		incidencia: 0,
	// 		dia_tipo: 0,
	// 		entrada_1: "00:00",
	// 		salida_1: "00:00",
	// 		entrada_2: "00:00",
	// 		salida_2: "00:00",
	// 		nomina_tipo: 1,
	// 	},
	// ]);
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
	const [selectedDay, setSelectedDay] = useState("Lun");

	const [isYearModalVisible, setIsYearModalVisible] = useState(false);
	const [isWeekModalVisible, setIsWeekModalVisible] = useState(false);

	function yearModalHandler() {
		setIsYearModalVisible(!isYearModalVisible);
	}

	function weekModalHandler() {
		setIsWeekModalVisible(!isWeekModalVisible);
	}

	function verDetalleHandler() {
		setIsVerDetalleSelected(!isVerDetalleSelected);
	}

	useEffect(() => {
		console.log(
			"Ver detalle has changed: ",
			JSON.stringify(isVerDetalleSelected, null, 2)
		);
	}, [isVerDetalleSelected]);

	// useEffect(() => {
	// 	console.log("Selected nomina especial changed: ", selectedNominaEsp);
	// }, [selectedNominaEsp]);

	// useEffect(() => {
	// 	console.log("Nominas especiales changed: ", nominasEsp);
	// }, [nominasEsp]);

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

	useEffect(() => {
		setIsLoading(true);
		const fetchDataYears = async () => {
			const query = {
				query: `query prenominaYears($numEmp: String!){
					prenominaYears(numEmp: $numEmp) {
						year
					}
				}`,
				variables: {
					numEmp: numEmp,
				},
			};
			try {
				const data = await fetchPost({ query });
				console.log(
					"Response data at prenomina years:",
					JSON.stringify(data, null, 2)
				);l
				if (data.data.prenominaYears) {
					const yearsCount = data.data.prenominaYears.map(
						(item) => item.year
					);
					setYears(yearsCount);
					// console.log(
					// 	"Valid years: ",
					// 	JSON.stringify(data.data.prenominaYears, null, 2)
					// );
				} else {
					console.warn(
						"Error retrieving prenomina years information"
					);
				}
			} catch (error) {
				console.error("Error at prenomina years:", error);
			} finally {
				// console.log(diasVacs.disponibles);
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchDataYears();
		setIsLoading(false);
	}, []);
	// Fetch data when component mounts for ahorro

	useEffect(() => {
		setIsLoading(true);
		const fetchDataSemana = async () => {
			const query = {
				query: `query prenominaSemanal($numEmp: String!, $year: String!){
					prenominaSemanal(numEmp: $numEmp, year: $year) {
						nomina
						horas
						extras
						inc
					}
				}`,
				variables: {
					numEmp: numEmp,
					year: selectedYear,
				},
			};
			try {
				const data = await fetchPost({ query });
				// console.log(
				// 	"Response data at recibos:",
				// 	JSON.stringify(data, null, 2)
				// );
				if (data.data.prenominaSemanal) {
					console.log(
						"Response data at prenomina semanal:",
						JSON.stringify(data, null, 2)
					);
					// const normales = data.data.Recibos.filter(
					// 	(item) => item.nomina >= 1 && item.nomina <= 53
					// );
					// const especiales = data.data.Recibos.filter(
					// 	(item) => item.nomina >= 54 && item.nomina <= 950
					// );
					const weeksCount = normales.map((item) => item.nomina);
					// const nominasCount = especiales.map((item) => item.nomina);
					data.data.prenominaSemanal.sort(
						(a, b) => a.nomina - b.nomina
					);
					// especiales.sort((a, b) => a.nomina - b.nomina);
					// const mostRecentNomina = especiales.sort(
					// 	(a, b) =>
					// 		new Date(b.fecha.split("-").reverse().join("-")) -
					// 		new Date(a.fecha.split("-").reverse().join("-"))
					// )[0].nomina;

					setSelectedNominaEsp(mostRecentNomina);
					// console.warn(especiales);
					// console.log(
					// 	"Valid nominas: ",
					// 	JSON.stringify(validNominas, null, 2)
					// );
					setPrenominas(data.data.prenominaSemanal);
					setWeeks(weeksCount);
					setSelectedWeek(weeksCount[0]);
					// setWeeks a numero de semanas recibidas en recibos
				} else {
					console.warn(
						"Error retrieving prenomina semanal information"
					);
				}
			} catch (error) {
				console.error("Error at prenomina semanal:", error);
			} finally {
				// console.log(diasVacs.disponibles);
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchDataSemana();
		setIsLoading(false);
	}, [selectedYear]);

	useEffect(() => {
		// if (detalles.length !== 0) return;

		if (isVerDetalleSelected === false) return;

		if (detalles.nomina === selectedWeek) return;

		const fetchDataDias = async () => {
			const query = {
				query: `query prenominaDias($numEmp: String!, $week: Int!, $year: Int!){
					prenominaDias(numEmp: $numEmp) {
						nomina
						dia
						fec_dia
						horas
						extras
						incidencia
						dia_tipo
						entrada_1
						salida_1
						entrada_2
						salida_2
						nomina_tipo
					}
				}`,
				variables: {
					numEmp: numEmp,
					week: selectedWeek,
					year: selectedYear,
				},
			};
			try {
				const data = await fetchPost({ query });
				// console.log("Response data at fondo ahorro:", data);
				if (data.data.prenominaDias) {
					console.log(
						"Response data at prenomina dias:",
						JSON.stringify(data, null, 2)
					);
					setDetalles(data.data.prenominaDias);
					setSelectedDay(1);

					// setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving prenomia dias information");
				}
			} catch (error) {
				console.error("Error at prenomia dia ahorro:", error);
			}
		};
		fetchDataDias();
		setIsLoading(false); // Set loading to false after data is fetched
	}, [selectedWeek, isVerDetalleSelected]); // Dependency array includes numEmp to refetch data if numEmp changes

	const DayButton = ({ day, value }) => {
		return (
			<TouchableOpacity
				onPress={() => setSelectedDay(value)}
				style={
					selectedDay === value
						? prenomina.detalleSelectedDayButton
						: prenomina.detalleDayButton
				}
			>
				<Text
					numberOfLines={1}
					style={
						selectedDay === value
							? prenomina.detalleSelectedDayButtonText
							: prenomina.detalleDayButtonText
					}
				>
					{selectedDay === value ? day : value}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={prenomina.container}>
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
			<ContentHeader title="Prenómina"></ContentHeader>
			{!isVerDetalleSelected && (
				<View style={prenomina.contentContainer}>
					{/* Barra Busqueda */}
					<View style={prenomina.prenominaHeader}>
						{/* Boton Año */}
						<TouchableOpacity
							style={prenomina.prenominaYearContainer}
						>
							<View
								style={prenomina.prenominaSearchIconContainer}
							>
								<Icon
									name="search"
									size={13}
									style={prenomina.prenominaSearchIcon}
								></Icon>
							</View>
							<Text style={prenomina.prenominaSearchText}>
								{selectedYear}
							</Text>
						</TouchableOpacity>
						{/* Boton Semana */}
						<TouchableOpacity
							style={prenomina.prenominaWeekContainer}
						>
							<View
								style={prenomina.prenominaSearchIconContainer}
							>
								<Icon
									name="search"
									size={13}
									style={prenomina.prenominaSearchIcon}
								></Icon>
							</View>
							<Text style={prenomina.prenominaSearchText}>
								Semana {selectedWeek}
							</Text>
						</TouchableOpacity>
					</View>

					{/* Cantidades */}
					<View style={prenomina.prenominaContainer}>
						{/* Horas */}
						<TouchableOpacity
							style={prenomina.prenominaCantidadElementContainer}
						>
							<View style={prenomina.prenominaCantidadBox}>
								<Text style={prenomina.prenominaCantidadTitle}>
									Horas
								</Text>
							</View>
							<View style={prenomina.prenominaCantidadBox}>
								<Text style={prenomina.prenominaCantidad}>
									47.50
								</Text>
							</View>
						</TouchableOpacity>
						{/* Extras */}
						<TouchableOpacity
							style={[
								prenomina.prenominaCantidadElementContainer,
								{ backgroundColor: COLORS.flatlistElement1 },
							]}
						>
							<View style={prenomina.prenominaCantidadBox}>
								<Text style={prenomina.prenominaCantidadTitle}>
									Extras
								</Text>
							</View>
							<View style={prenomina.prenominaCantidadBox}>
								<Text style={prenomina.prenominaCantidad}>
									0.00
								</Text>
							</View>
						</TouchableOpacity>
						{/* Incidencias */}
						<TouchableOpacity
							style={prenomina.prenominaCantidadElementContainer}
						>
							<View style={prenomina.prenominaCantidadBox}>
								<Text style={prenomina.prenominaCantidadTitle}>
									Incidencias
								</Text>
							</View>
							<View style={prenomina.prenominaCantidadBox}>
								<Text style={prenomina.prenominaCantidad}>
									0
								</Text>
							</View>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						onPress={verDetalleHandler}
						style={prenomina.buttonContainer}
					>
						<ImageBackground
							source={require("../../../assets/BOTON_SELECCION.png")}
							style={prenomina.buttonBackground}
							resizeMode={"stretch"}
						>
							<Text style={prenomina.buttonText}>
								Ver detalle
							</Text>
						</ImageBackground>
					</TouchableOpacity>
				</View>
			)}
			{isVerDetalleSelected && (
				<View style={prenomina.contentContainer}>
					{/* Barra Busqueda */}
					<View style={prenomina.detalleHeader}>
						<View style={prenomina.detalleHeaderWeekYearRow}>
							{/* Boton Año */}
							<TouchableOpacity
								style={prenomina.prenominaYearContainer}
							>
								<View
									style={
										prenomina.prenominaSearchIconContainer
									}
								>
									<Icon
										name="search"
										size={13}
										style={prenomina.prenominaSearchIcon}
									></Icon>
								</View>
								<Text style={prenomina.prenominaSearchText}>
									{selectedYear}
								</Text>
							</TouchableOpacity>
							{/* Boton Semana */}
							<TouchableOpacity
								style={prenomina.prenominaWeekContainer}
							>
								<View
									style={
										prenomina.prenominaSearchIconContainer
									}
								>
									<Icon
										name="search"
										size={13}
										style={prenomina.prenominaSearchIcon}
									></Icon>
								</View>
								<Text style={prenomina.prenominaSearchText}>
									Semana {selectedWeek}
								</Text>
							</TouchableOpacity>
						</View>
						<View style={prenomina.detalleHeaderDaysRow}>
							{/* Botones dias */}
							<DayButton day="Lunes" value="Lun" />
							<DayButton day="Martes" value="Mar" />
							<DayButton day="Miercoles" value="Mie" />
							<DayButton day="Jueves" value="Jue" />
							<DayButton day="Viernes" value="Vie" />
							<DayButton day="Sábado" value="Sab" />
							<DayButton day="Domingo" value="Dom" />
						</View>
					</View>

					<View style={prenomina.detalleDayContainer}>
						{/* Days */}
						<View style={prenomina.detalleDaysDescContainer}>
							<Text style={prenomina.detalleDaysDescText}>
								Dias: Lunes etc etc
							</Text>
						</View>

						{/* Habil */}
						<View style={prenomina.detalleHabilContainer}>
							<Text style={[prenomina.detalleHabilText]}>
								Hábil
							</Text>
						</View>

						{/* Cantidades */}
						<View style={prenomina.detalleDataContainer}>
							{/* Horas */}
							<TouchableOpacity
								style={
									prenomina.prenominaCantidadElementContainer
								}
							>
								<View style={prenomina.prenominaCantidadBox}>
									<Text
										style={prenomina.prenominaCantidadTitle}
									>
										Horas
									</Text>
								</View>
								<View style={prenomina.prenominaCantidadBox}>
									<Text style={prenomina.prenominaCantidad}>
										47.50
									</Text>
								</View>
							</TouchableOpacity>
							{/* Extras */}
							<TouchableOpacity
								style={[
									prenomina.prenominaCantidadElementContainer,
									{
										backgroundColor:
											COLORS.flatlistElement1,
									},
								]}
							>
								<View style={prenomina.prenominaCantidadBox}>
									<Text
										style={prenomina.prenominaCantidadTitle}
									>
										Extras
									</Text>
								</View>
								<View style={prenomina.prenominaCantidadBox}>
									<Text style={prenomina.prenominaCantidad}>
										0.00
									</Text>
								</View>
							</TouchableOpacity>
							{/* Incidencias */}
							<TouchableOpacity
								style={
									prenomina.prenominaCantidadElementContainer
								}
							>
								<View style={prenomina.prenominaCantidadBox}>
									<Text
										style={prenomina.prenominaCantidadTitle}
									>
										Incidencias
									</Text>
								</View>
								<View style={prenomina.prenominaCantidadBox}>
									<Text style={prenomina.prenominaCantidad}>
										0
									</Text>
								</View>
							</TouchableOpacity>
						</View>

						<TouchableOpacity
							onPress={verDetalleHandler}
							style={[
								prenomina.buttonContainer,
								{ height: 0, flex: 1 },
							]}
						>
							<ImageBackground
								source={require("../../../assets/BOTON_SELECCION.png")}
								style={prenomina.buttonBackground}
								resizeMode={"stretch"}
							>
								<Text style={prenomina.buttonText}>
									Solicitar ajuste
								</Text>
							</ImageBackground>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
}

export default Prenomina;
