import React, { useState, useEffect, useContext } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { historialModal } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";
import { AppContext } from "../../../AppContext";
import LoadingContent from "../../../Animations/LoadingContent";
import DownArrow from "../../../Animations/DownArrow";
import fetchPost from "../../../fetching";
import YearModal from "./YearModal";

function HistorialModal({ onCallback, isModalVisible, onExit }) {
	const { numEmp } = useContext(AppContext);
	// const { currentYear } = new Date().getFullYear();
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [years, setYears] = useState([]);
	const [historial, setHistorial] = useState([]);

	const [isYearModalVisible, setIsYearModalVisible] = useState(false);

	function yearModalHandler() {
		console.warn(isYearModalVisible);
		setIsYearModalVisible(!isYearModalVisible);
	}

	const vacaciones = [
		{
			id: "1",
			fecha: "01/15/2024",
			dias: "5.00",
			observaciones: "5 días disfrutados",
		},
		{
			id: "2",
			fecha: "02/10/2024",
			dias: "3.00",
			observaciones: "3 días de descanso",
		},
		{
			id: "3",
			fecha: "03/20/2024",
			dias: "41.00",
			observaciones: "4 días de vacaciones",
		},
		{
			id: "4",
			fecha: "04/05/2024",
			dias: "50.00",
			observaciones: "5 días libres",
		},
		{
			id: "5",
			fecha: "05/12/2024",
			dias: "30.00",
			observaciones: "3 días de relax",
		},
		{
			id: "6",
			fecha: "06/30/2024",
			dias: "40.00",
			observaciones: "4 días de ocio",
		},
		{
			id: "7",
			fecha: "01/15/2024",
			dias: "50.00",
			observaciones: "5 días disfrutados",
		},
		{
			id: "8",
			fecha: "02/10/2024",
			dias: "30.00",
			observaciones: "3 días de descanso",
		},
		{
			id: "9",
			fecha: "03/20/2024",
			dias: "4",
			observaciones: "4 días de vacaciones",
		},
		{
			id: "10",
			fecha: "04/05/2024",
			dias: "5",
			observaciones: "5 días libres",
		},
		{
			id: "11",
			fecha: "05/12/2024",
			dias: "3",
			observaciones: "3 días de relax",
		},
		{
			id: "12",
			fecha: "06/30/2024",
			dias: 4,
			observaciones: "4 días de ocio",
		},
		{
			id: "13",
			fecha: "01/15/2024",
			dias: 5,
			observaciones: "5 días disfrutados",
		},
		{
			id: "14",
			fecha: "02/10/2024",
			dias: 3,
			observaciones: "3 días de descanso",
		},
		{
			id: "15",
			fecha: "03/20/2024",
			dias: 4,
			observaciones: "4 días de vacaciones",
		},
		{
			id: "16",
			fecha: "04/05/2024",
			dias: 5,
			observaciones: "5 días libres",
		},
		{
			id: "17",
			fecha: "05/12/2024",
			dias: 3,
			observaciones: "3 días de relax",
		},
		{
			id: "18",
			fecha: "06/30/2024",
			dias: 4,
			observaciones: "4 días de ocio",
		},
		{
			id: "19",
			fecha: "01/15/2024",
			dias: 5,
			observaciones: "5 días disfrutados",
		},
		{
			id: "20",
			fecha: "02/10/2024",
			dias: 3,
			observaciones: "3 días de descanso",
		},
		{
			id: "21",
			fecha: "03/20/2024",
			dias: 4,
			observaciones: "4 días de vacaciones",
		},
		{
			id: "22",
			fecha: "04/05/2024",
			dias: 5,
			observaciones: "5 días libres",
		},
		{
			id: "23",
			fecha: "05/12/2024",
			dias: 3,
			observaciones: "3 días de relax",
		},
		{
			id: "24",
			fecha: "06/30/2024",
			dias: 4,
			observaciones: "4 días de ocio",
		},
		// Add more items as needed
	];

	// New state to manage loading
	const [isLoading, setIsLoading] = useState(true);

	// Fetch data when component mounts
	useEffect(() => {
		const query = {
			query: `query HistorialVacaciones($numEmp: String!, $year: Int!){
				HistorialVacaciones(numEmp: $numEmp, year: $year) {
					yearly {
						id
						dias
						fecha
						observaciones
					}
				}
			}`,
			variables: {
				numEmp: numEmp,
				year: selectedYear,
			},
		};

		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				console.log("Response data at historial:", data);
				if (data.data.HistorialVacaciones) {
					setHistorial(data.data.HistorialVacaciones.yearly);
				} else {
					console.warn("Error retrieving historial information");
				}
			} catch (error) {
				console.error("Error at historial:", error);
			} finally {
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchData();
	}, [selectedYear]); // Dependency array includes numEmp to refetch data if numEmp changes

	useEffect(() => {
		const query = {
			query: `query HistorialYears($numEmp: String!){
				HistorialYears(numEmp: $numEmp) {
					years {
						id
						year
					}
				}
			}`,
			variables: {
				numEmp: numEmp,
			},
		};

		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				console.log("Response data at historial years:", data);
				if (data.data.HistorialYears) {
					setYears(data.data.HistorialYears.years);
				} else {
					console.warn("Error retrieving years information");
				}
			} catch (error) {
				console.error("Error at years:", error);
			} finally {
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchData();
	}, []); // Dependency array includes numEmp to refetch data if numEmp changes

	useEffect(() => {
		console.log("Historial update: ", historial);
	}, [historial]);

	useEffect(() => {
		console.log("Year Modal update: ", isYearModalVisible);
	}, [isYearModalVisible]);

	useEffect(() => {
		console.log("Historial years update: ", years);
	}, [years]);

	// Render loading or error state if data is not yet available
	if (isLoading) {
		return <LoadingContent />;
	}

	// Render each item in the FlatList
	function renderItem({ item, index }) {
		const backgroundColor =
			index % 2 === 0 ? COLORS.flatlistElement1 : COLORS.flatlistElement2;

		return (
			<TouchableOpacity
				style={[historialModal.listElement, { backgroundColor }]}
			>
				<Text style={[historialModal.listElementText, { flex: 3 }]}>
					{item.fecha}
				</Text>
				<Text style={[historialModal.listElementText, { flex: 1 }]}>
					{item.dias}
				</Text>
				<Text style={[historialModal.listElementText, { flex: 4 }]}>
					{item.observaciones}
				</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={onCallback}
			>
				<View style={historialModal.backgroundContainer}>
					<View style={historialModal.modalContainer}>
						{/* Title */}
						<View style={historialModal.titleContainer}>
							<Text style={historialModal.textTitle}>
								Historial de vacaciones
							</Text>
						</View>
						{/* Year Search */}
						{Platform.OS === "ios" ? (
							<TouchableOpacity
								onPress={yearModalHandler}
								style={historialModal.searchContainer}
							>
								<View
									style={historialModal.searchFieldContainer}
								>
									<View
										style={
											historialModal.searchIconContainer
										}
									>
										<Icon
											name="search"
											size={18}
											style={historialModal.searchIcon}
										/>
									</View>
									<View
										style={
											historialModal.searchYearContainer
										}
									>
										<Text
											style={
												historialModal.searchYearText
											}
										>
											{selectedYear}
										</Text>
									</View>
									<View
										style={
											historialModal.searchArrowContainer
										}
									>
										<DownArrow />
									</View>
								</View>
							</TouchableOpacity>
						) : (
							<View style={historialModal.searchContainer}>
								<YearPicker
									years={years}
									selectedYear={selectedYear}
									setSelectedYear={setSelectedYear}
								/>
							</View>
						)}
						{isYearModalVisible && (
							<YearModal
								years={years}
								selectedYear={selectedYear}
								setSelectedYear={setSelectedYear}
								onCallback={yearModalHandler}
								isYearModalVisible={isYearModalVisible}
							/>
						)}

						{/* <TouchableOpacity
							style={historialModal.searchContainer}
						>
							<View style={historialModal.searchFieldContainer}>
								<View
									style={historialModal.searchIconContainer}
								>
									<Icon
										name="search"
										size={18}
										style={historialModal.searchIcon}
									/>
								</View>
								<View
									style={historialModal.searchYearContainer}
								>
									<Text style={historialModal.searchYearText}>
										{selectedYear}
									</Text>
								</View>
							</View>
						</TouchableOpacity> */}
						{/* List */}
						<View style={historialModal.listContainer}>
							{/* List Title */}
							<View style={historialModal.listTitleContainer}>
								<Text
									style={[
										historialModal.listTitleText,
										{ flex: 3 },
									]}
								>
									Fecha
								</Text>
								<Text
									style={[
										historialModal.listTitleText,
										{ flex: 1 },
									]}
								>
									Días
								</Text>
								<Text
									style={[
										historialModal.listTitleText,
										{ flex: 4 },
									]}
								>
									Observaciones
								</Text>
							</View>
							{/* List Elements */}
							<View style={historialModal.listElementsContainer}>
								<FlatList
									alwaysBounceVertical="false"
									data={historial}
									renderItem={renderItem}
									keyExtractor={(item) => item.id}
									style={
										historialModal.listElementBoxContainer
									}
								></FlatList>
							</View>
						</View>
						{/* Back button */}
						<TouchableOpacity
							onPress={onExit}
							style={historialModal.exitButton}
						>
							<Text style={historialModal.textExitButton}>
								Volver
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default HistorialModal;
