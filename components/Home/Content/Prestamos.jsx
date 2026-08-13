import React, { useContext, useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Alert,
	TouchableWithoutFeedback,
	Keyboard,
	Animated,
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
import ConfirmActionModal from "./Design/ConfirmAction";

function Prestamos({ changeContent }) {
	const { accessToken, proyecto } = useContext(HomeContext);
	const [isLoading, setIsLoading] = useState(true);
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);
	const [isWorkingModalVisible, setIsWorkingModalVisible] = useState(false);
	const [confirmVisible, setConfirmVisible] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isAgreementChecked, setIsAgreementChecked] = useState(false);
	const amountBorder = useState(new Animated.Value(0))[0];
	const weeksBorder = useState(new Animated.Value(0))[0];

	const MONTHS_ES = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];

	const formatSpanishDate = (dateString) => {
		if (!dateString) return "";

		const dt = DateTime.fromISO(dateString, { setZone: true });

		if (!dt.isValid) {
			console.log("Invalid date received: ", dateString);
			return "";
		}

		const day = dt.day;
		const month = MONTHS_ES[dt.month - 1];
		const year = dt.year;

		return `${day} ${month} ${year}`;
		// return capitalize(dt.setLocale("es").toFormat("dd/MM/yy"));
		// return capitalize(
		// 	DateTime.fromISO(dateString).setLocale("es").toFormat("dd/LLLL/yy"),
		// );
	};

	const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

	const amountBorderColor = amountBorder.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [COLORS.grey, "#2ecc71", "#e74c3c"],
	});

	const weeksBorderColor = weeksBorder.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [COLORS.grey, "#2ecc71", "#e74c3c"],
	});

	const [loanData, setLoanData] = useState(null);

	const [loanInput, setLoanInput] = useState({
		amount: "",
		weeks: "",
	});

	const amount = parseFloat(loanInput.amount);
	const weeks = parseInt(loanInput.weeks);

	const isAmountValid =
		Number.isFinite(amount) &&
		loanData &&
		amount >= loanData.minAmount &&
		amount <= loanData.maxAmount;

	const isWeeksValid =
		weeks && loanData && weeks >= 2 && weeks <= loanData.maxWeeks;

	const hasActiveLoan =
		loanData?.loanStatus === "PENDING" ||
		loanData?.loanStatus === "APPROVED" ||
		loanData?.loanStatus === "REJECTED" ||
		loanData?.loanStatus === "ACTIVE" ||
		loanData?.loanStatus === "COMPLETED";

	const canCalculate =
		isAmountValid && isWeeksValid && loanData?.isAllowed && !hasActiveLoan;

	const [calculatedData, setCalculatedData] = useState({
		interestTotal: 0,
		totalToPay: 0,
		weeklyDiscount: 0,
	});

	const setLoanInputField = (fields) => {
		setLoanInput((prev) => ({ ...prev, ...fields }));
	};

	const [isCalculated, setIsCalculated] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

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
							loanStatus
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

	const requestLoan = () => {
		if (isSubmitting) return;

		if (!isCalculated) {
			Alert.alert("Error", "Debes calcular primero tu solicitud.");
			return;
		}

		if (!isAgreementChecked) {
			Alert.alert("Aviso", "Debes aceptar los términos antes de continuar.");
			return;
		}

		setConfirmVisible(true);
	};

	const submitLoan = async () => {
		if (isSubmitting) return;

		setIsSubmitting(true);
		setConfirmVisible(false);
		setIsWorkingModalVisible(true);

		try {
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
						amount: parseFloat(loanInput.amount),
						weeks: parseInt(loanInput.weeks),
					},
				},
			};

			const response = await fetchPost({
				query: mutation,
				token: accessToken,
			});

			const result = response?.data?.requestLoan;

			if (!result?.success) {
				setIsWorkingModalVisible(false);
				setIsSubmitting(false);
				Alert.alert("Error", result?.message);
				return;
			}

			setLoanInput({ amount: "", weeks: "" });

			setCalculatedData({
				interestTotal: 0,
				totalToPay: 0,
				weeklyDiscount: 0,
			});

			setIsCalculated(false);
			setIsAgreementChecked(false);

			// await fetchLoanData();

			// setIsWorkingModalVisible(false);
			confirmationModalHandler();
		} catch (error) {
			setIsWorkingModalVisible(false);
			Alert.alert("Error", "Ocurrió un problema al procesar tu solicitud.");
		} finally {
			setIsSubmitting(false);
		}
	};
	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		Animated.timing(amountBorder, {
			toValue: loanInput.amount.length === 0 ? 0 : isAmountValid ? 1 : 2,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [loanInput.amount, isAmountValid]);

	useEffect(() => {
		Animated.timing(weeksBorder, {
			toValue: loanInput.weeks.length === 0 ? 0 : isWeeksValid ? 1 : 2,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [loanInput.weeks, isWeeksValid]);

	const calculateData = () => {
		if (!loanData || !loanData.isAllowed) {
			Alert.alert("Aviso", loanData?.reason || "No puedes pedir un préstamo.");
			return;
		}

		const amount = parseFloat(loanInput.amount);
		const weeks = parseInt(loanInput.weeks);

		if (!loanData.isAllowed) {
			Alert.alert("Aviso", loanData.reason);
			return;
		}

		if (!amount || amount <= 0) {
			Alert.alert("Error", "La cantidad debe ser mayor a 0.");
			return;
		}

		if (amount < loanData.minAmount || amount > loanData.maxAmount) {
			Alert.alert(
				"Error",
				"La cantidad solicitada está fuera de los límites permitidos.",
			);
			return;
		}

		if (!weeks || weeks < 2) {
			Alert.alert("Error", "El plazo mínimo es de 2 semanas.");
			return;
		}

		if (weeks > loanData.maxWeeks) {
			Alert.alert("Error", "El número de semanas excede el máximo permitido.");
			return;
		}

		const interestRate = loanData.interestRate;

		const interestTotal = parseFloat(
			((amount * weeks * interestRate) / 100).toFixed(2),
		);

		const totalToPay = parseFloat((amount + interestTotal).toFixed(2));

		const weeklyDiscount = parseFloat((totalToPay / weeks).toFixed(2));

		setCalculatedData({
			interestTotal,
			totalToPay,
			weeklyDiscount,
		});

		setIsCalculated(true);
	};

	const formatCurrency = (amount) => {
		return amount.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "PENDING":
				return "#f39c12"; // orange
			case "APPROVED":
				return "#2ecc71"; // green
			case "REJECTED":
				return "#e74c3c"; // red
			case "COMPLETED":
				return "#3498db"; // blue
			default:
				return COLORS.black;
		}
	};

	const getStatusLabel = (status) => {
		switch (status) {
			case "PENDING":
				return "Pendiente";
			case "APPROVED":
				return "Aprobado";
			case "REJECTED":
				return "Rechazado";
			case "COMPLETED":
				return "Entregado";
			default:
				return null;
		}
	};

	useEffect(() => {
		if (isCalculated) {
			setIsCalculated(false);
			setCalculatedData({
				interestTotal: 0,
				totalToPay: 0,
				weeklyDiscount: 0,
			});
			setIsAgreementChecked(false);
		}
	}, [loanInput.amount, loanInput.weeks]);

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
							<View style={prestamos.cycleCard}>
								<View style={prestamos.cycleInfoContainer}>
									{/* <View style={prestamos.cycleHeader}> */}
									<View style={prestamos.cycleDataContainer}>
										<Text style={prestamos.cycleTitle}>
											📅 Periodo de Préstamos
										</Text>
										{/* </View> */}

										<Text
											numberOfLines={1}
											adjustsFontSizeToFit
											minimumFontScale={0.7}
											style={prestamos.cycleDates}
										>
											{formatSpanishDate(loanData?.cycle?.startDate)}
											{"  –  "}
											{formatSpanishDate(loanData?.cycle?.endDate)}
										</Text>
									</View>
								</View>
								{loanData?.loanStatus && (
									<View style={prestamos.loanStatusContainer}>
										<Text
											numberOfLines={1}
											adjustsFontSizeToFit
											minimumFontScale={0.7}
											style={prestamos.loanStatusTitle}
										>
											Préstamo solicitado:
										</Text>
										<View
											style={[
												prestamos.statusBadge,
												{
													backgroundColor:
														getStatusColor(loanData.loanStatus) + "20",
													borderColor: getStatusColor(loanData.loanStatus),
												},
											]}
										>
											<Text
												style={[
													prestamos.statusBadgeText,
													{ color: getStatusColor(loanData.loanStatus) },
												]}
											>
												{getStatusLabel(loanData.loanStatus)}
											</Text>
										</View>
									</View>
								)}
							</View>

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
							<View style={[prestamos.dataContainer]}>
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
										(Máximo {proyecto === "H79" ? "90%" : "100%"})
									</Text>
								</View>
								{/* <View
									style={[prestamos.dataFieldContainer, { paddingLeft: 0 }]}
								> */}
								<Animated.View
									style={[
										prestamos.dataFieldContainer,
										{ borderColor: amountBorderColor },
									]}
								>
									<TextInput
										numberOfLines={1}
										adjustsFontSizeToFit
										minimumFontScale={0.6}
										placeholderTextColor={"gray"}
										placeholder={`Mínimo de $${formatCurrency(
											loanData?.minAmount ?? 0,
										)} y máximo de $${formatCurrency(
											loanData?.maxAmount ?? 0,
										)}`}
										style={[
											prestamos.dataInputField,
											{ color: COLORS.black, fontSize: 14 },
										]}
										keyboardType="numeric"
										value={loanInput.amount}
										onChangeText={(text) =>
											setLoanInputField({
												amount: text.replace(/[^0-9.]/g, ""),
											})
										}
										underlineColorAndroid="transparent"
									/>
								</Animated.View>
							</View>

							{/* Semanas */}
							<View style={[prestamos.dataRowsContainer]}>
								<View style={prestamos.dataRowsRowContainer}>
									<View style={prestamos.dataRowTextContainer}>
										<Text style={prestamos.dataText}># Semanas</Text>
									</View>
									<Animated.View
										style={[
											prestamos.dataRowFieldContainer,
											{ borderColor: weeksBorderColor },
										]}
									>
										<TextInput
											placeholderTextColor={"gray"}
											placeholder={
												loanData?.maxWeeks
													? `Máx ${loanData?.maxWeeks}`
													: `No disp.`
											}
											style={[
												prestamos.dataFieldText,
												{
													color: COLORS.black,
													fontSize: 15,
												},
											]}
											keyboardType="numeric"
											value={loanInput.weeks}
											onChangeText={(text) =>
												setLoanInputField({
													weeks: text.replace(/[^0-9]/g, ""),
												})
											}
											underlineColorAndroid="transparent"
										/>
									</Animated.View>
								</View>
								<View style={prestamos.dataRowsRowContainer}>
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
								disabled={!canCalculate}
								style={[
									prestamos.buttonContainer,
									!canCalculate && prestamos.buttonDisabled,
									{ marginTop: "3%" },
								]}
							>
								{/* <TouchableOpacity
								onPress={calculateData}
								style={prestamos.buttonContainer}
							> */}
								<Text style={prestamos.buttonText}>Calcular</Text>
							</TouchableOpacity>

							{/* Totales */}
							<View style={prestamos.detailsContainer}>
								<View style={prestamos.detailContainer}>
									{/* <View style={prestamos.dataTextContainer}> */}
									<Text
										style={prestamos.detailTitle}
										numberOfLines={1}
										adjustsFontSizeToFit
										minimumFontScale={0.6}
									>
										Interés Total
									</Text>
									{/* </View> */}
									<View
										style={[
											prestamos.detailFieldContainer,
											isCalculated && prestamos.successHighlight,
										]}
									>
										<Text style={prestamos.detailFieldText}>
											$ {formatCurrency(calculatedData.interestTotal)}
										</Text>
									</View>
								</View>
								<View style={prestamos.detailContainer}>
									{/* <View style={prestamos.detailTitleContainer}> */}
									<Text
										style={prestamos.detailTitle}
										numberOfLines={1}
										adjustsFontSizeToFit
										minimumFontScale={0.6}
									>
										Total a pagar
									</Text>
									{/* </View> */}
									<View
										style={[
											prestamos.detailFieldContainer,
											isCalculated && prestamos.successHighlight,
										]}
									>
										<Text style={prestamos.detailFieldText}>
											$ {formatCurrency(calculatedData.totalToPay)}
										</Text>
									</View>
								</View>
								<View style={prestamos.detailContainer}>
									{/* <View style={prestamos.detailTitleContainer}> */}
									<Text
										style={prestamos.detailTitle}
										numberOfLines={1}
										adjustsFontSizeToFit
										minimumFontScale={0.6}
									>
										Descuento semanal
									</Text>
									{/* </View> */}
									<View
										style={[
											prestamos.detailFieldContainer,
											isCalculated && prestamos.successHighlight,
										]}
									>
										<Text style={prestamos.detailFieldText}>
											$ {formatCurrency(calculatedData.weeklyDiscount)}
										</Text>
									</View>
								</View>
							</View>

							<View
								style={[
									prestamos.agreementContainer,
									!isAgreementChecked &&
										isCalculated &&
										prestamos.agreementRequired,
								]}
							>
								<BouncyCheckbox
									size={30}
									fillColor={COLORS.naranja}
									isChecked={isAgreementChecked}
									disableBuiltInState
									onPress={() => setIsAgreementChecked((prev) => !prev)}
								/>
								<View style={prestamos.agreementTextContainer}>
									<Text
										adjustsFontSizeToFit={true}
										minimumFontScale={0.9}
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
								disabled={!isCalculated || isSubmitting || !isAgreementChecked}
								style={[
									prestamos.buttonContainer,
									(!isCalculated || isSubmitting || !isAgreementChecked) &&
										prestamos.buttonDisabled,
								]}
							>
								<Text style={prestamos.buttonText}>
									{isSubmitting ? "Enviando..." : "Solicitar"}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</TouchableWithoutFeedback>
			{confirmVisible && (
				<ConfirmActionModal
					visible={confirmVisible}
					summaryText={`Monto: $${formatCurrency(amount)}
Semanas: ${weeks}
Interés total: $${formatCurrency(calculatedData.interestTotal)}
Total a pagar: $${formatCurrency(calculatedData.totalToPay)}
Descuento semanal: $${formatCurrency(calculatedData.weeklyDiscount)}

¿Deseas continuar?`}
					onConfirm={submitLoan}
					onCancel={() => setConfirmVisible(false)}
				/>
			)}
			{ConfirmationVisible && (
				<Confirm
					customText="Tu préstamo fue procesado con éxito, espera el monto solicitado la próxima semana junto con tu depósito de nómina."
					isModalVisible={ConfirmationVisible}
					onCallback={confirmationModalHandler}
					onExit={confirmationModalHandler}
					closeModal={async () => {
						await changeContent("Menu");
					}}
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
