import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { familia } from "./styles";
import { infopers } from "../styles";
import Icon from "../../icons";
import AddMemberModal from "./Familia/AddMemberModal";

function Familia({
	selectedModal,
	height,
	width,
	CardRow,
	openModal,
	closeModal,
}) {
	const [parientes, setParientes] = useState([
		{
			parentesco: "Compañero",
			nombre: "Marco Uriel",
			apellidoPaterno: "Rivas",
			apellidoMaterno: "Lozano",
            fecha_nac: "24/05/1995",
			sexo: "Hombre",
		},
        {
			parentesco: "Compañero",
			nombre: "Marco Uriel",
			apellidoPaterno: "Rivas",
			apellidoMaterno: "Lozano",
            fecha_nac: "24/05/1995",
			sexo: "Hombre",
		},
        {
			parentesco: "Compañero",
			nombre: "Marco Uriel",
			apellidoPaterno: "Rivas",
			apellidoMaterno: "Lozano",
            fecha_nac: "24/05/1995",
			sexo: "Hombre",
		},
	]);
	const cardHeight = Math.round(height * 0.18);
	const titleHeight = Math.round(height * 0.036);

    const removeMember = (indexToRemove) => {
        const updatedParientes = parientes.filter((_, index) => index !== indexToRemove);
        setParientes(updatedParientes);
    }

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
					<AddMemberModal onCallback={closeModal} onExit={closeModal} />
				)}
			</View>

			{/* Content */}
			<View style={familia.familiaContentContainer}>

				{parientes.map((pariente, index) => (
                    <View key={index} style={[familia.familiaMemberContainer, { height: cardHeight }]}>
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
                                <Text style={familia.familiaMemberDataText}>{pariente.parentesco}</Text>
                            </View>
                        </View>
                        {/* Remove Button */}
                        <TouchableOpacity onPress={() => removeMember(index)} style={familia.familiaRemoveButton}>
                            <Text style={familia.familiaRemoveButtonText}>Quitar</Text>
                        </TouchableOpacity>
                        {/* Card Content */}
                        <View style={familia.familiaCardContainer}>
                            <CardRow title="Nombre" data={`${pariente.nombre} ${pariente.apellidoPaterno} ${pariente.apellidoMaterno}`} />
                            {/* <View style={{flexDirection: "row"}}>
                                <CardRow title="Nombre" data="PRUEBA" />
                                <CardRow title="Nombre" data="PRUEBA" />
                            </View> */}
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
                                    <Text style={infopers.cardInfoRowDataText}>{pariente.fecha_nac}</Text>
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
                                    <Text style={infopers.cardInfoRowDataText}>{pariente.sexo}</Text>
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
