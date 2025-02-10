import React, { useContext, useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Alert,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { prestamos } from "./styles";
import fetchPost from "../../fetching";
import ContentHeader from "./ContentHeader";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AppContext } from "../../AppContext";
import LoadingContent from "../../Animations/LoadingContent";
import COLORS from "../../../constants/colors";
import { positionStyle } from "react-native-flash-message";
import Confirm from "./Design/Confirm";
import Working from "./Design/Working";
import { HomeContext } from "../../HomeContext";

const getWeekDates = (year, weekNumber) => {
	// Get the first day of the year
	const firstDayOfYear = new Date(year, 0, 1);
	const firstSaturdayOfYear = new Date(firstDayOfYear);

	// Find the first Saturday of the year
	while (firstSaturdayOfYear.getDay() !== 6) {
		firstSaturdayOfYear.setDate(firstSaturdayOfYear.getDate() + 1);
	}

	// Calculate the offset for the desired week number
	const daysOffset = (weekNumber - 1) * 7;
	const startOfWeek = new Date(
		firstSaturdayOfYear.setDate(firstSaturdayOfYear.getDate() + daysOffset)
	);
	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6); // Last day of the week

	return {
		firstDay: startOfWeek,
		lastDay: endOfWeek,
	};
};

function Prestamos() {
	const { numEmp, region } = useContext(AppContext);
	const { sendRequisition } = useContext(HomeContext);
	const [isLoading, setIsLoading] = useState(true);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);

	const currentYear = new Date().getFullYear();

	// Define objects for the 5th and 42nd weeks
	const startDate = getWeekDates(currentYear, 5);
	const endDate = getWeekDates(currentYear, 34);
	const interes = 0.159;
	const [prestamoData, setPrestamoData] = useState({
		saldo_fa: 0,
		prestamo: false,
	});

	const [prestamoSendData, setPrestamoSendData] = useState({
		solicita: 0,
		semanas: 0,
		intTotal: 0,
		totPago: 0,
		dtoSem: 0,
	});
	const [availableWeeksCount, setAvailableWeeksCount] = useState();
	const [isAllowed, setIsAllowed] = useState();
	const [isCalculated, setIsCalculated] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const setPrestamoSendDataFields = (fields) => {
		setPrestamoSendData((prevState) => ({ ...prevState, ...fields }));
	};

	const fetchDataPrestamo = async () => {
		const query = {
			query: `query Prestamo($numEmp: String!, $region: String!){
				Prestamo(numEmp: $numEmp, region: $region) {
					saldo_fa,
					prestamo
				}
			}`,
			variables: {
				numEmp: numEmp,
				region: region,
			},
		};
		try {
			const data = await fetchPost({ query });
			console.log("Response data at prestamo:", JSON.stringify(data, null, 2));
			if (data.data.Prestamo) {
				setPrestamoData(data.data.Prestamo);
				data.data.Prestamo.prestamo === true &&
					Alert.alert(
						"Aviso",
						"Existe registro de un prestamo este año por lo que no se pueden solicitar más."
					);
				// console.log(
				// 	"Valid years: ",
				// 	JSON.stringify(data.data.prenominaYears, null, 2)
				// );
			} else {
				console.warn("Error retrieving prestamo information");
			}
		} catch (error) {
			console.error("Error at prestamo fetch:", error);
		}
	};

	const getData = async () => {
		setIsLoading(true);
		await fetchDataPrestamo();
		setIsLoading(false);
	};

	useEffect(() => {
		getData();

		const today = new Date();

		if (today >= startDate.firstDay && today <= endDate.lastDay) {
			setIsAllowed(true);
			const diffInTime = endDate.lastDay - today;
			const diffInWeeks = Math.ceil(diffInTime / (1000 * 60 * 60 * 24 * 7));

			setAvailableWeeksCount(diffInWeeks);
		} else {
			setIsAllowed(false);
			Alert.alert(
				"Fecha fuera de periodo",
				"No se puede pedir un prestamo en este momento"
			);
		}
	}, []);

	const calculateData = () => {
		if (prestamoData.prestamo) {
			Alert.alert("Préstamo existente", "No se puede pedir otro préstamo");
			return;
		}

		if (isAllowed === false) {
			Alert.alert(
				"Fecha fuera de periodo",
				"No se puede pedir un prestamo en este momento"
			);
			return;
		}

		if (prestamoSendData.solicita === 0) {
			Alert.alert("Error", "La cantidad a solicitar debe ser diferente de 0.");
			return;
		}

		if (prestamoSendData.solicita < prestamoData.saldo_fa * 0.1) {
			Alert.alert(
				"Error",
				"La cantidad a solicitar debe ser minimo 10% del ahorro disponible."
			);
			return;
		}
		if (prestamoSendData.solicita > prestamoData.saldo_fa * 0.9) {
			Alert.alert(
				"Error",
				"La cantidad a solicitar no puede ser mayor al 90% del ahorro disponible."
			);
			return;
		}
		if (prestamoSendData.semanas < 2) {
			Alert.alert("Error", "La cantidad de semanas a pagar debe ser mínimo 2.");
			return;
		}
		if (prestamoSendData.semanas > availableWeeksCount) {
			Alert.alert(
				"Error",
				"La cantidad de semanas a pagar excede el limite del periodo."
			);
			return;
		}
		setPrestamoSendData((prevState) => {
			const intTotal = parseFloat(
				((interes * prevState.semanas * prevState.solicita) / 100).toFixed(2)
			);

			const totPago = parseFloat((prevState.solicita + intTotal).toFixed(2));

			const dtoSem = parseFloat((totPago / prevState.semanas).toFixed(2));

			return {
				...prevState,
				intTotal,
				totPago,
				dtoSem,
			};
		});
		setIsCalculated(true);
	};

	const requestLoan = async () => {
		if (!isCalculated) {
			Alert.alert("Error", "Debes calcular primero tu solicitud de préstamo");
			return;
		}
		try {
			setIsWorkingModalVisible(true);

			// console.log(
			// 	`Requested loan and type: ${
			// 		prestamoSendData.solicita
			// 	} type: ${typeof prestamoSendData.solicita}, weeks: ${
			// 		prestamoSendData.semanas
			// 	} type: ${typeof prestamoSendData.semanas}`
			// );
			const requestRetiro = async () => {
				setIsWorkingModalVisible(true);
				const response = await sendRequisition({
					letter: "PtmoFA",
					requestedLoan: prestamoSendData.solicita,
					loanWeeks: prestamoSendData.semanas,
				});
				console.log("Response loan: ", JSON.stringify(response, null, 1));
				setIsWorkingModalVisible(false);
				if (response === "Done") {
					confirmationModalHandler();
				} else {
					Alert.alert(
						"Error",
						"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto."
					);
				}
			};

			await requestRetiro();
		} catch (error) {
			Alert.alert(
				"Error",
				"Ocurrió un problema al solicitar tu préstamo, inténtalo de nuevo."
			);
		}
	};

	useEffect(() => {
		console.log(JSON.stringify(prestamoSendData, null, 2));
	}, [prestamoSendData]);

	const formatCurrency = (amount) => {
		return amount.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	return (
		<View style={prestamos.container}>
			<ContentHeader title="Préstamos" />
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				{isLoading ? (
					<View style={prestamos.contentContainer}>
						<LoadingContent />
					</View>
				) : (
					<View style={prestamos.contentContainer}>
						<View style={prestamos.titleBar}>
							<View style={prestamos.titleContainer}>
								<Text style={prestamos.titleText}>Fondo de Ahorro</Text>
							</View>
						</View>
						<View style={prestamos.infoContainer}>
							{/* Saldo atual */}
							<View style={prestamos.dataRowContainer}>
								<View style={prestamos.dataRowTextContainer}>
									<Text style={prestamos.dataText}>Saldo actual: </Text>
								</View>
								<View
									style={[
										prestamos.dataRowFieldContainer,
										{ alignItems: "flex-start" },
									]}
								>
									<Text style={[prestamos.dataFieldText, { left: "4%" }]}>
										$ {formatCurrency(prestamoData.saldo_fa)}
									</Text>
								</View>
							</View>
							{/* Solicitud */}
							<View style={[prestamos.dataContainer, { marginTop: "1%" }]}>
								<View
									style={[
										prestamos.dataTextContainer,
										{
											flexDirection: "row",
											justifyContent: "flex-start",
										},
									]}
								>
									<Text style={prestamos.dataText}>
										¿Cuánto te gustaría solicitar?
									</Text>
									<Text
										style={[
											prestamos.dataText,
											{
												fontSize: 12,
												fontWeight: "200",
												marginLeft: 4,
											},
										]}
									>
										(Máximo 90%)
									</Text>
								</View>
								<View
									style={[prestamos.dataFieldContainer, { paddingLeft: 0 }]}
								>
									<TextInput
										placeholderTextColor={"gray"}
										placeholder={`Mínimo de $${formatCurrency(
											prestamoData.saldo_fa * 0.1
										)} y máximo de $${formatCurrency(
											prestamoData.saldo_fa * 0.9
										)}`}
										style={prestamos.dataInputField}
										keyboardType="numeric"
										value={prestamoSendData.solicita}
										onChangeText={(text) =>
											setPrestamoSendDataFields({
												solicita: +text,
											})
										}
									/>
								</View>
							</View>

							{/* Semanas */}
							<View style={prestamos.dataRowContainer}>
								<View style={prestamos.dataRowContainer}>
									<View style={prestamos.dataRowTextContainer}>
										<Text style={prestamos.dataText}># Semanas</Text>
									</View>
									<View style={prestamos.dataRowFieldContainer}>
										<TextInput
											placeholderTextColor={"gray"}
											placeholder={
												availableWeeksCount
													? `Máx ${availableWeeksCount}`
													: `No disp.`
											}
											style={prestamos.dataInputField}
											value={prestamoSendData.semanas}
											keyboardType="numeric"
											onChangeText={(text) =>
												setPrestamoSendDataFields({
													semanas: +text,
												})
											}
										/>
									</View>
								</View>
								<View style={prestamos.dataRowContainer}>
									<View style={prestamos.dataRowTextContainer}>
										<Text style={prestamos.dataText}>% Interés</Text>
									</View>
									<View style={prestamos.dataRowFieldContainer}>
										<Text style={prestamos.dataFieldText}>{interes}%</Text>
									</View>
								</View>
							</View>

							{/* Calcular */}
							<TouchableOpacity
								onPress={calculateData}
								style={prestamos.buttonContainer}
							>
								<Text style={prestamos.buttonText}>Calcular</Text>
							</TouchableOpacity>

							{/* Totales */}
							<View style={prestamos.dataContainer}>
								<View style={prestamos.dataTextContainer}>
									<Text style={prestamos.dataText}>Interés Total</Text>
								</View>
								<View style={prestamos.dataFieldContainer}>
									<Text style={prestamos.dataFieldText}>
										$ {formatCurrency(prestamoSendData.intTotal)}
									</Text>
								</View>
							</View>
							<View style={prestamos.dataContainer}>
								<View style={prestamos.dataTextContainer}>
									<Text style={prestamos.dataText}>Total a pagar</Text>
								</View>
								<View style={prestamos.dataFieldContainer}>
									<Text style={prestamos.dataFieldText}>
										$ {formatCurrency(prestamoSendData.totPago)}
									</Text>
								</View>
							</View>
							<View style={prestamos.dataContainer}>
								<View style={prestamos.dataTextContainer}>
									<Text style={prestamos.dataText}>Descuento semanal</Text>
								</View>
								<View style={prestamos.dataFieldContainer}>
									<Text style={prestamos.dataFieldText}>
										$ {formatCurrency(prestamoSendData.dtoSem)}
									</Text>
								</View>
							</View>

							<View style={prestamos.agreementContainer}>
								<BouncyCheckbox size={30} fillColor={COLORS.naranja} />
								<View style={prestamos.agreementTextContainer}>
									<Text
										adjustsFontSizeToFit={true}
										minimumFontScale={0.5}
										style={prestamos.agreementText}
									>
										Estoy de acuerdo con los importes de interés y descuento
										semanal calculado en este documento, realizo la solicitud al
										Comité, quienes pueden ACEPTAR o NEGAR mi petición según el
										Reglamento lo estipule.
									</Text>
								</View>
							</View>

							{/* Calcular */}
							<TouchableOpacity
								onPress={requestLoan}
								style={[
									prestamos.buttonContainer,
									{ marginTop: "3%", marginBottom: "3%" },
								]}
							>
								<Text style={prestamos.buttonText}>Solicitar</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</TouchableWithoutFeedback>
			{ConfirmationVisible && (
				<Confirm
					isModalVisible={ConfirmationVisible}
					onCallback={confirmationModalHandler}
					onExit={confirmationModalHandler}
					style={{ position: "absolute" }}
				/>
			)}
			{isWorkingModalVisible && (
				<Working
					isModalVisible={isWorkingModalVisible}
					style={{ position: "absolute" }}
				/>
			)}
		</View>
	);
}

export default Prestamos;
