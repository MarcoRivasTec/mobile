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
import { DateTime } from "luxon";

function Prestamos() {
	const { sendRequisition, accessToken } = useContext(HomeContext);
	const [isLoading, setIsLoading] = useState(true);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);

	const [loanData, setLoanData] = useState(null);

	const [prestamoSendData, setPrestamoSendData] = useState({
		solicita: 0,
		semanas: 0,
		intTotal: 0,
		totPago: 0,
		dtoSem: 0,
	});

	const [isCalculated, setIsCalculated] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const setPrestamoSendDataFields = (fields) => {
		setPrestamoSendData((prevState) => ({ ...prevState, ...fields }));
	};

	const fetchLoanData = async () => {
		console.log("Fetching loan data");
		const query = {
			query: `
				query LoanData {
					LoanData {
						success
						message
						data {
							isAllowed
							reason
							balance
							minAmount
							maxAmount
							maxWeeks
							interestRate
							existingLoanStatus
							cycle {
								startDate
								endDate
							}
							serverNow
						}
					}
				}
			`,
		};

		try {
			const response = await fetchPost({
				query,
				token: accessToken,
			});

			const result = response?.data?.LoanData;

			console.log(
				"Response data at fetchLoanData:",
				JSON.stringify(result, null, 1),
			);
			// 1️⃣ If structure invalid OR success is false
			if (!result || result.success !== true) {
				Alert.alert(
					"Error",
					result?.message ||
						"No se pudo obtener respuesta del servidor. Intenta de nuevo.",
				);
				return;
			}

			const data = result.data;

			// 2️⃣ Save eligibility object
			setLoanData(data);

			// 3️⃣ If not allowed → show backend reason
			if (!data.isAllowed) {
				Alert.alert("Aviso", data.reason || result.message);
			}
		} catch (error) {
			console.error("LoanData fetch error:", error);

			// 4️⃣ Network / server unreachable
			Alert.alert(
				"Error",
				"No se pudo obtener respuesta del servidor. Intenta de nuevo.",
			);
		}
	};

	const getData = async () => {
		setIsLoading(true);
		await fetchLoanData();
		// await onRequestLoan(1);
		setIsLoading(false);
	};

	const onRequestLoan = async (example) => {
		const fileQuery = {
			query: `mutation RequestLoan($example: Int!) {
				requestLoan(example: $example) {
					success
					message
				}
			}`,
			variables: {
				example: example,
			},
		};
		const data = await fetchPost({
			query: fileQuery,
			token: accessToken,
		});
		console.log("Data is: ", JSON.stringify(data, null, 1));
		if (data.data?.requestLoan?.success) {
			console.log("Url is: ", data.data.requestLoan);
			// await Linking.openURL(data.data.requestLoan.url);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const calculateData = () => {
		if (!loanData) return;

		if (!loanData.isAllowed) {
			Alert.alert(
				"Aviso",
				loanData.reason || "No es posible solicitar préstamo.",
			);
			return;
		}

		if (!prestamoSendData.solicita || prestamoSendData.solicita <= 0) {
			Alert.alert("Error", "La cantidad a solicitar debe ser mayor a 0.");
			return;
		}

		if (
			prestamoSendData.solicita < loanData.minAmount ||
			prestamoSendData.solicita > loanData.maxAmount
		) {
			Alert.alert(
				"Error",
				"La cantidad solicitada está fuera de los límites permitidos.",
			);
			return;
		}

		if (!prestamoSendData.semanas || prestamoSendData.semanas < 2) {
			Alert.alert("Error", "El plazo mínimo es de 2 semanas.");
			return;
		}

		if (prestamoSendData.semanas > loanData.maxWeeks) {
			Alert.alert("Error", "El número de semanas excede el máximo permitido.");
			return;
		}

		const interestRate = loanData.interestRate;

		const intTotal = parseFloat(
			(prestamoSendData.solicita * (interestRate / 100)).toFixed(2),
		);

		const totPago = parseFloat(
			(prestamoSendData.solicita + intTotal).toFixed(2),
		);

		const dtoSem = parseFloat((totPago / prestamoSendData.semanas).toFixed(2));

		setPrestamoSendData((prev) => ({
			...prev,
			intTotal,
			totPago,
			dtoSem,
		}));

		setIsCalculated(true);
	};

	// const requestLoan = async () => {
	// 	if (!isCalculated) {
	// 		Alert.alert("Error", "Debes calcular primero tu solicitud de préstamo");
	// 		return;
	// 	}
	// 	try {
	// 		setIsWorkingModalVisible(true);

	// 		// console.log(
	// 		// 	`Requested loan and type: ${
	// 		// 		prestamoSendData.solicita
	// 		// 	} type: ${typeof prestamoSendData.solicita}, weeks: ${
	// 		// 		prestamoSendData.semanas
	// 		// 	} type: ${typeof prestamoSendData.semanas}`
	// 		// );
	// 		const requestRetiro = async () => {
	// 			setIsWorkingModalVisible(true);
	// 			const response = await sendRequisition({
	// 				letter: "PtmoFA",
	// 				requestedLoan: prestamoSendData.solicita,
	// 				loanWeeks: prestamoSendData.semanas,
	// 			});
	// 			console.log("Response loan is: ", JSON.stringify(response, null, 1));
	// 			setIsWorkingModalVisible(false);
	// 			switch (response) {
	// 				case "Done":
	// 					confirmationModalHandler();
	// 					break;
	// 				case "Exists":
	// 					Alert.alert(
	// 						"Error",
	// 						"Ya existe un préstamo registrado en el sistema.",
	// 					);
	// 					break;
	// 				case "Existing requisition":
	// 					Alert.alert(
	// 						"Importante",
	// 						"Ya existe una solicitud de préstamo registrada en el sistema, espera el monto solicitado la próxima semana junto con tu depósito de nómina.",
	// 					);
	// 					break;
	// 				case "Limit":
	// 					Alert.alert(
	// 						"Error",
	// 						"El préstamo solicitado está fuera de los límites permitidos.",
	// 					);
	// 					break;
	// 				case "LessThan2Weeks":
	// 					Alert.alert(
	// 						"Error",
	// 						"El plazo a pagar el préstamo no puede ser menor a 2 semanas.",
	// 					);
	// 					break;
	// 				case "OutOfRange":
	// 					Alert.alert(
	// 						"Error",
	// 						"Fecha fuera de periodo de préstamos, no se puede solicitar en este momento.",
	// 					);
	// 					break;
	// 				case "ExceedsPeriod":
	// 					Alert.alert(
	// 						"Error",
	// 						"El plazo de semanas excede el límite permitido.",
	// 					);
	// 					break;
	// 				case "Error":
	// 					Alert.alert(
	// 						"Error",
	// 						"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto.",
	// 					);
	// 					break;

	// 				default:
	// 					Alert.alert(
	// 						"Error",
	// 						"Hubo un problema con tu solicitud, intenta de nuevo en 1 minuto.",
	// 					);
	// 					break;
	// 			}
	// 		};

	// 		await requestRetiro();
	// 	} catch (error) {
	// 		Alert.alert(
	// 			"Error",
	// 			"Ocurrió un problema al solicitar tu préstamo, inténtalo de nuevo.",
	// 		);
	// 	}
	// };

	const requestLoan = async () => {
		if (!isCalculated) {
			Alert.alert("Error", "Debes calcular primero tu solicitud de préstamo");
			return;
		}
		try {
			setIsWorkingModalVisible(true);

			const mutation = {
				query: `
						mutation RequestLoan($input: RequestLoanInput!) {
						requestLoan(input: $input) {
							success
							message
						}
						}
					`,
				variables: {
					input: {
						amount: prestamoSendData.solicita,
						weeks: prestamoSendData.semanas,
					},
				},
			};

			const response = await fetchPost({
				query: mutation,
				token: accessToken,
			});
		} catch (error) {
			Alert.alert(
				"Error",
				"Ocurrió un problema al solicitar tu préstamo, inténtalo de nuevo.",
			);
		}
	};

	// useEffect(() => {
	// 	console.log(JSON.stringify(prestamoSendData, null, 2));
	// }, [prestamoSendData]);

	const formatCurrency = (amount) => {
		return amount.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	return loanData?.isAllowed ? (
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
										$ {formatCurrency(loanData?.balance ?? 0)}
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
											loanData?.minAmount ?? 0,
										)} y máximo de $${formatCurrency(
											loanData?.maxAmount ?? 0,
										)}`}
										style={[prestamos.dataInputField, { color: COLORS.black }]}
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
												loanData?.maxWeeks
													? `Máx ${loanData?.maxWeeks}`
													: `No disp.`
											}
											style={[
												prestamos.dataInputField,
												{ color: COLORS.black },
											]}
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
										<Text style={prestamos.dataFieldText}>
											{loanData?.interestRate ?? 0}%
										</Text>
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
					customText="Tu préstamo fue procesado con éxito, espera el monto solicitado la próxima semana junto con tu depósito de nómina."
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
	) : (
		<View style={prestamos.container}>
			<ContentHeader title="Préstamos" />
			<View style={prestamos.contentContainer}>
				<Text style={prestamos.notAllowedText}>
					{loanData?.reason ||
						"No es posible solicitar un préstamo en este momento."}
				</Text>
			</View>
		</View>
	);
}

export default Prestamos;
