import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../../constants/colors";
import LoadingContent from "../../Animations/LoadingContent";
import { AppContext } from "../../AppContext";
import fetchPost from "../../fetching";
import Icon from "../icons";
import ContentHeader from "./ContentHeader";
import DataModal from "./Prenomina/DataModal";
import { prenomina } from "./styles";
import SolicitarAjuste from "./Prenomina/SolicitarAjuste";

function getWeekNumber(d) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return weekNo;
}

const formatDate = (date) => {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
};

function Prenomina() {
	const today = formatDate(new Date());
	const { numEmp } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);
	const [isVerDetalleSelected, setIsVerDetalleSelected] = useState(false);
	const [prenominas, setPrenominas] = useState([
		{
			nomina: 1,
			horas: 0,
			fecha_inicio: today,
			fecha_fin: today,
			extras: 0,
			incidencia: 0,
		},
	]);

	// const [detalles, setDetalles] = useState([]);
	const [detalles, setDetalles] = useState([
		{
			nomina: 0,
			dia: 1,
			fec_dia: today,
			horas: 0.0,
			extras: 0.0,
			incidencia: 0,
			dia_tipo: 0,
			entrada_1: "00:00",
			salida_1: "00:00",
			entrada_2: "00:00",
			salida_2: "00:00",
			nomina_tipo: 6,
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
	const [selectedDay, setSelectedDay] = useState(0);

	const [isYearModalVisible, setIsYearModalVisible] = useState(false);
	const [isWeekModalVisible, setIsWeekModalVisible] = useState(false);
	const [isAjusteModalVisible, setIsAjusteModalVisible] = useState(false);

	const [allowDetail, setAllowDetail] = useState(true);

	function yearModalHandler() {
		setIsYearModalVisible(!isYearModalVisible);
	}

	function weekModalHandler() {
		setIsWeekModalVisible(!isWeekModalVisible);
	}

	function verDetalleHandler() {
		if (allowDetail) {
			setIsVerDetalleSelected(!isVerDetalleSelected);
		} else {
			Alert.alert(
				"Importante",
				"No tienes información disponible para mostrar"
			);
		}
	}

	// useEffect(() => {
	// 	console.log(
	// 		"Ver detalle has changed: ",
	// 		JSON.stringify(isVerDetalleSelected, null, 2)
	// 	);
	// }, [isVerDetalleSelected]);

	useEffect(() => {
		console.log(`prenominas fecha changed: ${prenominas[0].fecha_inicio}`);
		// console.log(
		// 	`prenominas fecha changed: ${
		// 		prenominas[selectedWeek - 1].fecha_inicio
		// 	}`
	}, [prenominas]);

	useEffect(() => {
		console.log("Detail allowed: ", allowDetail);
	}, [allowDetail]);

	useEffect(() => {
		setIsLoading(true);
		const fetchDataYears = async () => {
			const query = {
				query: `query PrenominaYears($numEmp: String!){
					PrenominaYears(numEmp: $numEmp) {
						year
					}
				}`,
				variables: {
					numEmp: numEmp,
				},
			};
			try {
				const data = await fetchPost({ query });
				// console.log(
				// 	"Response data at prenomina years:",
				// 	JSON.stringify(data, null, 2)
				// );
				if (data.data.PrenominaYears) {
					const yearsCount = data.data.PrenominaYears.map((item) => item.year);
					// console.log("Conteo years: ", yearsCount);
					setYears(yearsCount);
					// console.log(
					// 	"Valid years: ",
					// 	JSON.stringify(data.data.prenominaYears, null, 2)
					// );
				} else {
					console.warn("Error retrieving prenomina years information");
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
				query: `query PrenominaSemanal($numEmp: String!, $year: Int!){
					PrenominaSemanal(numEmp: $numEmp, year: $year) {
						nomina
						fecha_inicio
						fecha_fin
						horas
						extras
						incidencia
					}
				}`,
				variables: {
					numEmp: numEmp,
					year: selectedYear,
				},
			};
			try {
				const data = await fetchPost({ query });
				console.log(
					"Response data at prenomina semanal:",
					JSON.stringify(data, null, 2)
				);
				if (data.data.PrenominaSemanal) {
					if (data.data.PrenominaSemanal.length === 0) {
						Alert.alert(
							"Importante",
							"No tienes información disponible para mostrar"
						);
						setAllowDetail(false);
						return;
					}
					const weeksCount = data.data.PrenominaSemanal.map(
						(item) => item.nomina
					);
					data.data.PrenominaSemanal.sort((a, b) => a.nomina - b.nomina);
					setPrenominas(data.data.PrenominaSemanal);
					setWeeks(weeksCount);
					setSelectedWeek(weeksCount[0]);
					// setWeeks a numero de semanas recibidas en recibos
				} else {
					console.warn("Error retrieving prenomina semanal information");
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

		// console.log(
		// 	`Selected week num is: ${selectedWeek} and nomina week is: ${
		// 		detalles[0].nomina ? detalles[0].nomina : "None"
		// 	}`
		// );

		if (detalles[0].nomina === selectedWeek) return;

		const fetchDataDias = async () => {
			const query = {
				query: `query PrenominaDias($numEmp: String!, $week: Int!, $year: Int!){
					PrenominaDias(numEmp: $numEmp, week: $week, year: $year) {
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
				console.log(
					"Response data at prenomina dias:",
					data.data.PrenominaDias[0]
				);
				if (data.data.PrenominaDias) {
					if (data.data.PrenominaDias.length === 0) {
						Alert.alert(
							"Importante",
							"No tienes información disponible para mostrar"
						);
						return;
					}
					setDetalles(data.data.PrenominaDias);
					setSelectedDay(0);

					// setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving prenomina dias information");
				}
			} catch (error) {
				console.error("Error at prenomina dia:", error);
			}
		};
		fetchDataDias();
		setIsLoading(false); // Set loading to false after data is fetched
	}, [selectedWeek, isVerDetalleSelected]); // Dependency array includes numEmp to refetch data if numEmp changes

	const DayButton = ({ day, dayExt, value }) => {
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
					{selectedDay === value ? dayExt : day}
				</Text>
			</TouchableOpacity>
		);
	};

	const getMontoArray = (array, position, tipo) => {
		// console.log("Selected day is: ", position);
		// console.log("Data monto: ", JSON.stringify(array[position], null, 2));
		// console.log("Data: ", array[position].horas);
		// console.log("Data horas: ", array[position].horas);
		const formatNumber = (number) => {
			return number.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
		};
		// adjustedPosition = position - 1;

		const handleUndefined = () => {
			return "Sin dato";
		};

		if (array[position] === undefined) {
			return handleUndefined();
		}

		switch (tipo) {
			case "horas":
				return array[position].horas === undefined
					? handleUndefined()
					: `${formatNumber(array[position].horas)}`;
			case "extras":
				return array[position].extras === undefined
					? handleUndefined()
					: `${formatNumber(array[position].extras)}`;
			case "incidencia":
				// const today = formatDate(new Date());
				if (array[position].fec_dia > formatDate(new Date())) {
					console.log(
						`Dia array: ${array[position].fec_dia} con type: ${typeof array[
							position
						].fec_dia} y dia hoy: ${formatDate(
							new Date()
						)} con type: ${typeof formatDate(new Date())}`
					);
					return handleUndefined();
				} else {
					return array[position].incidencia === undefined
						? handleUndefined()
						: array[position].incidencia === null
						? "Sin incidencia"
						: `${array[position].incidencia}`;
				}
			default:
				return "";
		}
	};

	const getMonto = (tipo) => {
		const formatNumber = (number) => {
			return number.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
		};
		adjustedWeek = selectedWeek - 1;

		const handleUndefined = () => {
			return "Sin dato";
		};

		if (prenominas[adjustedWeek] === undefined) {
			return handleUndefined();
		}

		switch (tipo) {
			case "horas":
				return prenominas[adjustedWeek].horas === undefined
					? handleUndefined()
					: `${formatNumber(prenominas[adjustedWeek].horas)}`;
			case "extras":
				return prenominas[adjustedWeek].extras === undefined
					? handleUndefined()
					: `${formatNumber(prenominas[adjustedWeek].extras)}`;
			case "incidencia":
				return prenominas[adjustedWeek].incidencia === undefined
					? handleUndefined()
					: `${prenominas[adjustedWeek].incidencia}`;
			default:
				return "";
		}
	};

	const formatDateES = (dateStr) => {
		console.log(dateStr);
		const [day, month, year] = dateStr.split("-").map(Number);
		const date = new Date(year, month - 1, day);
		return new Intl.DateTimeFormat("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric",
		}).format(date);
		// return formattedDate.replace("de ", "de ").replace(", ", " del ");
	};

	const getDay = (dateStr) => {
		const [day, month, year] = dateStr.split("-");
		const date = new Date(`${year}-${month}-${day}T00:00:00`);
		const daysOfWeek = [
			"Domingo",
			"Lunes",
			"Martes",
			"Miércoles",
			"Jueves",
			"Viernes",
			"Sábado",
		];
		return daysOfWeek[date.getDay()];
	};

	const diasNombres = [
		"Sábado",
		"Domingo",
		"Lunes",
		"Martes",
		"Miércoles",
		"Jueves",
		"Viernes",
	];

	const ChecadasDato = ({ name, data, position }) => {
		const formatData = (data) => {
			if (data === null) {
				return;
			}
			return data.slice(0, 2) + ":" + data.slice(2);
		};
		return (
			<View
				style={[
					prenomina.detalleChecadasDatosContainer,
					position === "first" && {
						borderTopLeftRadius: 10,
						borderBottomLeftRadius: 10, // Adjust radius as needed
					},
					position === "last" && {
						borderTopRightRadius: 10,
						borderBottomRightRadius: 10,
						borderRightWidth: 0,
					},
				]}
			>
				<View style={prenomina.detalleChecadasTituloContainer}>
					<Text style={prenomina.detalleChecadasTituloText}>{name}</Text>
				</View>
				<View style={prenomina.detalleChecadasDatoContainer}>
					<Text style={prenomina.detalleChecadasDatoText}>
						{formatData(data)}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={prenomina.container}>
			{isYearModalVisible && (
				<DataModal
					data={years}
					selectedElement={selectedYear}
					setSelectedElement={setSelectedYear}
					onCallback={yearModalHandler}
					isDataModalVisible={isYearModalVisible}
				/>
			)}
			{isWeekModalVisible && (
				<DataModal
					data={weeks}
					selectedElement={selectedWeek}
					setSelectedElement={setSelectedWeek}
					onCallback={weekModalHandler}
					isDataModalVisible={isWeekModalVisible}
				/>
			)}
			<ContentHeader title="Prenómina"></ContentHeader>
			{!isVerDetalleSelected &&
				(isLoading === true ? (
					<View style={prenomina.contentContainer}>
						<LoadingContent />
					</View>
				) : (
					<View style={prenomina.contentContainer}>
						{/* Barra Busqueda */}
						<View style={prenomina.prenominaHeader}>
							{/* Boton Año */}
							<TouchableOpacity
								onPress={yearModalHandler}
								style={prenomina.prenominaYearContainer}
							>
								<View style={prenomina.prenominaSearchIconContainer}>
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
								onPress={weekModalHandler}
								style={prenomina.prenominaWeekContainer}
							>
								<View style={prenomina.prenominaSearchIconContainer}>
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

						<View style={prenomina.prenominaDates}>
							<Text style={prenomina.prenominaDatesText}>
								{prenominas[selectedWeek - 1] &&
								prenominas[selectedWeek - 1].fecha_inicio !== undefined ? (
									`${getDay(
										prenominas[selectedWeek - 1].fecha_inicio
									)} ${formatDateES(
										prenominas[selectedWeek - 1].fecha_inicio
									)} a ${getDay(
										prenominas[selectedWeek - 1].fecha_fin
									)} ${formatDateES(prenominas[selectedWeek - 1].fecha_fin)}`
								) : (
									<LoadingContent />
								)}
								{/* {` ${
										diasNombres[
											prenom[selectedDay].dia - 1
										]
									} `}
									{formatDateES(
										detalles[selectedDay].fec_dia
									)} */}
							</Text>
						</View>

						{/* Cantidades */}
						<View style={prenomina.prenominaContainer}>
							{/* Horas */}
							<TouchableOpacity style={prenomina.prenominaElementContainer}>
								<View style={prenomina.prenominaElementTitleContainer}>
									<Text style={prenomina.prenominaElementTitleText}>Horas</Text>
								</View>
								<View style={prenomina.prenominaElementDataContainer}>
									<Text style={prenomina.prenominaElementDataText}>
										{getMonto("horas")}
									</Text>
								</View>
							</TouchableOpacity>
							{/* Extras */}
							<TouchableOpacity
								style={[
									prenomina.prenominaElementContainer,
									{
										backgroundColor: COLORS.flatlistElement1,
									},
								]}
							>
								<View style={prenomina.prenominaElementTitleContainer}>
									<Text style={prenomina.prenominaElementTitleText}>
										Extras
									</Text>
								</View>
								<View style={prenomina.prenominaElementDataContainer}>
									<Text style={prenomina.prenominaElementDataText}>
										{getMonto("extras")}
									</Text>
								</View>
							</TouchableOpacity>
							{/* Incidencias */}
							<TouchableOpacity style={prenomina.prenominaElementContainer}>
								<View style={prenomina.prenominaElementTitleContainer}>
									<Text style={prenomina.prenominaElementTitleText}>
										Incidencias
									</Text>
								</View>
								<View style={prenomina.prenominaElementDataContainer}>
									<Text style={prenomina.prenominaElementDataText}>
										{getMonto("incidencia")}
									</Text>
								</View>
							</TouchableOpacity>
						</View>

						<TouchableOpacity
							onPress={verDetalleHandler}
							style={prenomina.buttonContainer}
						>
							<LinearGradient
								colors={[COLORS.green, COLORS.primary]}
								style={prenomina.buttonGradient}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
							>
								<Text style={prenomina.buttonText}>Ver detalle</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				))}
			{isVerDetalleSelected && (
				<View style={prenomina.contentContainer}>
					{/* Barra Busqueda */}
					<View style={prenomina.detalleHeader}>
						<View style={prenomina.detalleHeaderWeekYearRow}>
							{/* Boton Año */}
							<TouchableOpacity
								onPress={yearModalHandler}
								style={prenomina.prenominaYearContainer}
							>
								<View style={prenomina.prenominaSearchIconContainer}>
									<Icon
										name="search"
										size={13}
										style={prenomina.prenominaSearchIcon}
									/>
								</View>
								<Text style={prenomina.prenominaSearchText}>
									{selectedYear}
								</Text>
							</TouchableOpacity>
							{/* Boton Semana */}
							<TouchableOpacity
								onPress={weekModalHandler}
								style={prenomina.prenominaWeekContainer}
							>
								<View style={prenomina.prenominaSearchIconContainer}>
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
							<DayButton day="Sab" dayExt="Sábado" value={0} />
							<DayButton day="Dom" dayExt="Domingo" value={1} />
							<DayButton day="Lun" dayExt="Lunes" value={2} />
							<DayButton day="Mar" dayExt="Martes" value={3} />
							<DayButton day="Mie" dayExt="Miercoles" value={4} />
							<DayButton day="Jue" dayExt="Jueves" value={5} />
							<DayButton day="Vie" dayExt="Viernes" value={6} />
						</View>
					</View>

					{isLoading === "true" ? (
						<LoadingContent />
					) : (
						<View style={prenomina.detalleDayContainer}>
							{/* Days */}
							<View style={prenomina.detalleDaysDescContainer}>
								<Text style={prenomina.detalleDaysDescText}>
									Dia:
									{` ${diasNombres[detalles[selectedDay].dia - 1]} `}
									{formatDateES(detalles[selectedDay].fec_dia)}
								</Text>
							</View>

							{/* Habil */}
							<View
								style={[
									prenomina.detalleHabilContainer,
									{
										backgroundColor:
											detalles[selectedDay].dia_tipo === 1 ||
											detalles[selectedDay].dia_tipo === 2
												? COLORS.black
												: COLORS.green,
									},
								]}
							>
								<Text style={[prenomina.detalleHabilText]}>
									{detalles[selectedDay].dia_tipo === 1 ||
									detalles[selectedDay].dia_tipo === 2
										? "Inhábil"
										: "Hábil"}
								</Text>
							</View>

							{/* Checadas */}
							<View style={prenomina.detalleChecadasContainer}>
								<ChecadasDato
									name="Entrada 1"
									data={detalles[selectedDay].entrada_1}
									position="first"
								/>
								<ChecadasDato
									name="Salida 1"
									data={detalles[selectedDay].salida_1}
								/>
								<ChecadasDato
									name="Entrada 2"
									data={detalles[selectedDay].entrada_2}
								/>
								<ChecadasDato
									name="Salida 2"
									data={detalles[selectedDay].salida_2}
									position="last"
								/>
							</View>

							{/* Cantidades */}
							<View style={prenomina.detalleDataContainer}>
								{/* Horas */}
								<TouchableOpacity style={prenomina.prenominaElementContainer}>
									<View style={prenomina.prenominaElementTitleContainer}>
										<Text
											style={[
												prenomina.prenominaElementTitleText,
												{ fontSize: 15 },
											]}
										>
											Horas
										</Text>
									</View>
									<View style={prenomina.prenominaElementDataContainer}>
										<Text style={prenomina.prenominaElementDataText}>
											{getMontoArray(detalles, selectedDay, "horas")}
										</Text>
									</View>
								</TouchableOpacity>
								{/* Extras */}
								<TouchableOpacity
									style={[
										prenomina.prenominaElementContainer,
										{
											backgroundColor: COLORS.flatlistElement1,
										},
									]}
								>
									<View style={prenomina.prenominaElementTitleContainer}>
										<Text
											style={[
												prenomina.prenominaElementTitleText,
												{ fontSize: 15 },
											]}
										>
											Extras
										</Text>
									</View>
									<View style={prenomina.prenominaElementDataContainer}>
										<Text style={prenomina.prenominaElementDataText}>
											{getMontoArray(detalles, selectedDay, "extras")}
										</Text>
									</View>
								</TouchableOpacity>
								{/* Incidencias */}
								<TouchableOpacity style={prenomina.prenominaElementContainer}>
									<View style={prenomina.prenominaElementTitleContainer}>
										<Text
											style={[
												prenomina.prenominaElementTitleText,
												{ fontSize: 15 },
											]}
										>
											Incidencia
										</Text>
									</View>
									<View style={prenomina.prenominaElementDataContainer}>
										<Text
											numberOfLines={2}
											style={[
												prenomina.prenominaElementDataText,
												{ fontSize: 14 },
											]}
										>
											{getMontoArray(detalles, selectedDay, "incidencia")}
										</Text>
									</View>
								</TouchableOpacity>
							</View>

							<TouchableOpacity
								onPress={ajusteHandler}
								style={[
									prenomina.buttonContainer,
									{ height: 0, flex: 0.9, marginTop: 0 },
								]}
							>
								<LinearGradient
									colors={[COLORS.bannerright, COLORS.bannerleft]}
									style={prenomina.buttonGradient}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 1 }}
								>
									<Text style={prenomina.buttonText}>Solicitar ajuste</Text>
								</LinearGradient>
							</TouchableOpacity>
						</View>
					)}
				</View>
			)}
			{isAjusteModalVisible && <SolicitarAjuste />}
		</View>
	);
}

export default Prenomina;
