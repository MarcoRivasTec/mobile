import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { familia } from "./styles";
import { infopers } from "../styles";
import Icon from "../../icons";
import AddMemberModal from "./Familia/AddMemberModal";
import ConfirmModal from "./ConfirmModal";

function Familia({
	selectedModal,
	height,
	width,
	CardRow,
	openModal,
	closeModal,
}) {
    const cardHeight = Math.round(height * 0.18);
	const titleHeight = Math.round(height * 0.036);

	const [parientes, setParientes] = useState([
		{
			parentesco: "Compañero 1",
			nombre: "Marco Uriel",
			apellidoPaterno: "Rivas",
			apellidoMaterno: "Lozano",
			fecha_nac: "24/05/1995",
			sexo: "Hombre",
		},
		{
			parentesco: "Compañero 2",
			nombre: "Marco Uriel",
			apellidoPaterno: "Rivas",
			apellidoMaterno: "Lozano",
			fecha_nac: "24/05/1995",
			sexo: "Hombre",
		},
		{
			parentesco: "Compañero 3",
			nombre: "Marco Uriel",
			apellidoPaterno: "Rivas",
			apellidoMaterno: "Lozano",
			fecha_nac: "24/05/1995",
			sexo: "Hombre",
		},
	]);

    const addMember = (newMember) => {
        setParientes([...parientes, newMember]);
    };

    const [memberIndexToRemove, setMemberIndexToRemove] = useState(null); // State to store index of member to remove
	const removeMember = () => {
		const updatedParientes = [...parientes];
		updatedParientes.splice(memberIndexToRemove, 1);
		setParientes(updatedParientes);
        closeModal();
		setMemberIndexToRemove(null); // Reset member index to remove state
	};

	return (
		<View style={[familia.familiaContainer]}>
			{/* Title */}
			<View style={[familia.familiaTitleContainer, { height: titleHeight }]}>
				<Text style={familia.familiaTitleText}>Familia</Text>
				{/* Add Button */}
				<TouchableOpacity
					onPress={() => openModal("familia")}
					style={familia.familiaAddButton}
				>
					<Text style={familia.familiaAddButtonText}>Agregar</Text>
				</TouchableOpacity>
				{selectedModal === "familia" && (
					<AddMemberModal onCallback={closeModal} onExit={closeModal} onRegister={addMember}/>
				)}
			</View>

			{/* Content */}
			<View style={familia.familiaContentContainer}>
				{parientes.map((pariente, index) => (
					<View
						key={index}
						style={[familia.familiaMemberContainer, { height: cardHeight }]}
					>
						{/* Member */}
						<View style={familia.familiaMemberNameContainer}>
							<View
								style={[
									familia.familiaMemberIconContainer,
									{ height: height * 0.05, width: width * 0.1 },
								]}
							>
								<Icon name="USER" size={18} style={familia.familiaMemberIcon} />
							</View>
							<View style={familia.familiaMemberDataContainer}>
								<Text style={familia.familiaMemberDataText}>
									{pariente.parentesco}
								</Text>
							</View>
						</View>
						{/* Remove Button */}
						<TouchableOpacity
                            onPress={() => {
                                setMemberIndexToRemove(index);
                                openModal("confirm"); // Open the confirmation modal
                            }}
							// onPress={() => removeMember(index)}
							style={familia.familiaRemoveButton}
						>
							<Text style={familia.familiaRemoveButtonText}>Quitar</Text>
						</TouchableOpacity>
						{selectedModal === "confirm" && (
							<ConfirmModal
								onCallback={closeModal}
								onExit={closeModal}
								title="Remover pariente"
								data="¿Estás seguro que deseas remover este pariente?"
                                onConfirm={() => removeMember(memberIndexToRemove)}
							/>
						)}
						{/* Card Content */}
						<View style={familia.familiaCardContainer}>
							<CardRow
								title="Nombre"
								data={`${pariente.nombre} ${pariente.apellidoPaterno} ${pariente.apellidoMaterno}`}
							/>
							<View style={infopers.cardInfoRowContainer}>
								<View
									style={[
										infopers.cardInfoRowTitleContainer,
										{ flex: 0, width: "20%" },
									]}
								>
									<Text numberOfLines={1} style={infopers.cardInfoRowTitleText}>
										Fec. Nac.
									</Text>
								</View>
								<View style={infopers.cardInfoRowDataContainer}>
									<Text style={infopers.cardInfoRowDataText}>
										{pariente.fecha_nac}
									</Text>
								</View>
								<View
									style={[
										infopers.cardInfoRowTitleContainer,
										{ flex: 4, marginBottom: "-0.5%" },
									]}
								>
									<Text numberOfLines={2} style={infopers.cardInfoRowTitleText}>
										Sexo
									</Text>
								</View>
								<View style={[infopers.cardInfoRowDataContainer, { flex: 8 }]}>
									<Text style={infopers.cardInfoRowDataText}>
										{pariente.sexo}
									</Text>
								</View>
							</View>
						</View>
					</View>
				))}
			</View>
		</View>
	);
}

export default Familia;
