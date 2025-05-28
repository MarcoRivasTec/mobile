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
import YearPicker from "./YearPicker";

function HistorialModal({ onCallback, isModalVisible, onExit }) {
	const { numEmp, region } = useContext(AppContext);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [years, setYears] = useState([]);
	const [historial, setHistorial] = useState([]);
	// New state to manage loading
	const [isLoading, setIsLoading] = useState(true);

	const [isYearModalVisible, setIsYearModalVisible] = useState(false);

	function yearModalHandler() {
		setIsYearModalVisible(!isYearModalVisible);
	}

	// Fetch data when component mounts
	useEffect(() => {
		setIsLoading(true);
		const query = {
			query: `query HistorialVacaciones($numEmp: String!, $region: String!, $year: Int!){
				HistorialVacaciones(numEmp: $numEmp, region: $region, year: $year) {
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
				region: region,
				year: selectedYear,
			},
		};

		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				// console.log("Response data at historial:", data);
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
		setIsLoading(true);
		const query = {
			query: `query HistorialYears($numEmp: String!, $region: String!){
				HistorialYears(numEmp: $numEmp, region: $region) {
					years {
						id
						year
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
				// console.log("Response data at historial years:", data);
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

	// useEffect(() => {
	// 	console.log("Historial update: ", historial);
	// }, [historial]);

	// useEffect(() => {
	// 	console.log("Selected year update: ", typeof selectedYear);
	// }, [selectedYear]);

	useEffect(() => {
		console.log("Years update: ", years);
	}, [years]);

	// Render loading or error state if data is not yet available
	// if (isLoading) {
	// 	return <LoadingContent />;
	// }

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
								{isLoading === false ? (
									<FlatList
										alwaysBounceVertical="false"
										data={historial}
										renderItem={renderItem}
										keyExtractor={(item) => item.id}
										style={
											historialModal.listElementBoxContainer
										}
									/>
								) : (
									<LoadingContent />
								)}
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
						{isYearModalVisible && (
							<YearModal
								years={years}
								selectedYear={selectedYear}
								setSelectedYear={setSelectedYear}
								onCallback={yearModalHandler}
								isYearModalVisible={isYearModalVisible}
							/>
						)}
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default HistorialModal;
