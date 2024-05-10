import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { historialModal } from "./styles";
import Icon from "../../icons";
import COLORS from "../../../../constants/colors";

function HistorialModal({ onCallback, isModalVisible, onExit }) {
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

	// Render each item in the FlatList
	function renderItem({ item, index }) {
		const backgroundColor = index % 2 === 0 ? COLORS.flatlistElement1 : COLORS.flatlistElement2;

		return (
			<TouchableOpacity style={[historialModal.listElement, {backgroundColor}]}>
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
						<TouchableOpacity style={historialModal.searchContainer}>
							<View style={historialModal.searchFieldContainer}>
								<View style={historialModal.searchIconContainer}>
									<Icon
										name="search"
										size={18}
										style={historialModal.searchIcon}
									/>
								</View>
								<View style={historialModal.searchYearContainer}>
									<Text style={historialModal.searchYearText}>2023</Text>
								</View>
							</View>
						</TouchableOpacity>
						{/* List */}
						<View style={historialModal.listContainer}>
							{/* List Title */}
							<View style={historialModal.listTitleContainer}>
								<Text style={[historialModal.listTitleText, { flex: 3 }]}>
									Fecha
								</Text>
								<Text style={[historialModal.listTitleText, { flex: 1 }]}>
									Días
								</Text>
								<Text style={[historialModal.listTitleText, { flex: 4 }]}>
									Observaciones
								</Text>
							</View>
							{/* List Elements */}
							<View style={historialModal.listElementsContainer}>
								<FlatList
									alwaysBounceVertical="false"
									data={vacaciones}
									renderItem={renderItem}
									keyExtractor={(item) => item.id}
									style={historialModal.listElementBoxContainer}
								></FlatList>
							</View>
						</View>
						{/* Back button */}
						<TouchableOpacity
							onPress={onExit}
							style={historialModal.exitButton}
						>
							<Text style={historialModal.textExitButton}>Volver</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default HistorialModal;
