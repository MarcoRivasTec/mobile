import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { prenomina } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
import COLORS from "../../../constants/colors";
import { AppContext } from "../../AppContext";

function getWeekNumber(d) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return weekNo;
}

function Prenomina() {
	const { numEmp, proyecto } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);
	const [isVerDetalleSelected, setIsVerDetalleSelected] = useState(false);
	const [selectedDay, setSelectedDay] = useState("Lun");
	const [prenominas, setPrenominas] = useState([
		{
			nomina: 1,
			percepciones: 0,
			deducciones: 0,
			neto: 0,
		},
	]);
	const [detalles, setDetalles] = useState([
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

	// Fetch data when component mounts for ahorro
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
						fecha
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
					const normales = data.data.Recibos.filter(
						(item) => item.nomina >= 1 && item.nomina <= 53
					);
					const especiales = data.data.Recibos.filter(
						(item) => item.nomina >= 54 && item.nomina <= 950
					);
					const weeksCount = normales.map((item) => item.nomina);
					const nominasCount = especiales.map((item) => item.nomina);
					normales.sort((a, b) => a.nomina - b.nomina);
					especiales.sort((a, b) => a.nomina - b.nomina);
					const mostRecentNomina = especiales.sort(
						(a, b) =>
							new Date(b.fecha.split("-").reverse().join("-")) -
							new Date(a.fecha.split("-").reverse().join("-"))
					)[0].nomina;

					setSelectedNominaEsp(mostRecentNomina);
					// console.warn(especiales);
					// console.log(
					// 	"Valid nominas: ",
					// 	JSON.stringify(validNominas, null, 2)
					// );
					setRecibos(normales);
					setRecibosEsp(especiales);
					setWeeks(weeksCount);
					setNominasEsp(nominasCount);
					setSelectedWeek(weeksCount[0]);
					setSelectedNominaEsp(mostRecentNomina);
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
							style={[prenomina.buttonContainer, {height: 0, flex: 1}]}
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
