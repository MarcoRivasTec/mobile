import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { infopers } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
import DomicilioModal from "./InfoPers/DomicilioModal";
import TallasModal from "./InfoPers/TallasModal";
import FamiliaModal from "./InfoPers/FamiliaModal";

function InfoPers() {
	const { width, height } = Dimensions.get("window");
	const infoheight = Math.round(height * 0.4);
	const domicilioHeight = Math.round(height * 0.3);
	const infonavitHeight = Math.round(height * 0.34);
	const tallasHeight = Math.round(height * 0.15);
	const familiaHeight = Math.round(height * 0.23);

	const [parientes, setParientes] = useState([
        {
            nombre: "Marco Uriel",
            apellidoPaterno: "Rivas",
            apellidoMaterno: "Lozano",
            parentesco: "Compañero",
            sexo: "Hombre"
        }
    ]);

	const handleRegisterPariente = (newPariente) => {
        setParientes(currentParientes => [...currentParientes, newPariente]);
    };

	const [selectedModal, setSelectedModal] = useState(null);

	const openModal = (modalName) => {
		setSelectedModal(modalName);
	};

	const closeModal = () => {
		setSelectedModal(null);
	};

	function CardRow(props) {
		return (
			<View style={infopers.cardInfoRowContainer}>
				<View style={infopers.cardInfoRowTitleContainer}>
					<Text numberOfLines={1} style={infopers.cardInfoRowTitleText}>
						{props.title}
					</Text>
				</View>
				<View style={infopers.cardInfoRowDataContainer}>
					<Text style={infopers.cardInfoRowDataText}>{props.data}</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={infopers.container}>
			<ContentHeader title="Información Personal" />
			<View style={infopers.contentContainer}>
				<ScrollView
					contentContainerStyle={infopers.scrollContentContainer}
					style={infopers.scrollContainer}
				>
					{/* Identificacion */}
					<View style={[infopers.cardContainer, { height: infoheight }]}>
						{/* Title */}
						<View style={infopers.cardTitleContainer}>
							<Text style={infopers.cardTitleText}>Identificación</Text>
						</View>
						{/* Card */}
						<View style={infopers.cardInfoContainer}>
							<CardRow title="RFC" data="PRUEBA" />
							<CardRow title="CURP" data="PRUEBA" />
							<CardRow title="IMSS" data="PRUEBA" />
							<View style={infopers.cardInfoRowContainer}>
								<View
									style={[
										infopers.cardInfoRowTitleContainer,
										{ flex: 0, width: "20%" },
									]}
								>
									<Text numberOfLines={1} style={infopers.cardInfoRowTitleText}>
										GENERO
									</Text>
								</View>
								<View style={infopers.cardInfoRowDataContainer}>
									<Text style={infopers.cardInfoRowDataText}>PRUEBA</Text>
								</View>
								<View
									style={[
										infopers.cardInfoRowTitleContainer,
										{ flex: 4, marginBottom: "-0.5%" },
									]}
								>
									<Text numberOfLines={2} style={infopers.cardInfoRowTitleText}>
										ESTADO CIVIL
									</Text>
								</View>
								<View style={[infopers.cardInfoRowDataContainer, { flex: 8 }]}>
									<Text style={infopers.cardInfoRowDataText}>PRUEBA</Text>
								</View>
							</View>
							<CardRow title="CUENTA" data="PRUEBA" />
						</View>
					</View>

					{/* Domicilio */}
					<View style={[infopers.cardContainer, { height: domicilioHeight }]}>
						{/* Title */}
						<View style={infopers.cardTitleContainer}>
							<Text style={infopers.cardTitleText}>Domicilio</Text>
						</View>
						{/* Card */}
						<View style={infopers.cardInfoContainer}>
							<CardRow title="Dirección" data="PRUEBA" />
							<CardRow title="Colonia" data="PRUEBA" />
							<CardRow title="Teléfono" data="PRUEBA" />
							<TouchableOpacity
								onPress={() => openModal("domicilio")}
								style={infopers.cardInfoButton}
							>
								<Text style={infopers.cardInfoButtonText}>
									Actualiza tu dirección
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					{/* Infonavit */}
					<View style={[infopers.cardContainer, { height: infonavitHeight }]}>
						{/* Title */}
						<View style={infopers.cardTitleContainer}>
							<Text style={infopers.cardTitleText}>Infonavit</Text>
						</View>
						{/* Card */}
						<View style={infopers.cardInfoContainer}>
							<CardRow title="No. Crédito" data="PRUEBA" />
							<CardRow title="Tipo" data="PRUEBA" />
							<CardRow title="Tasa" data="PRUEBA" />
							<CardRow title="Estatus: " data="PRUEBA" />
						</View>
					</View>

					{/* Tallas */}
					<View style={[infopers.tallasContainer, { height: tallasHeight }]}>
						<View style={infopers.tallasTitleContainer}>
							<Text style={infopers.tallasTitleText}>Tallas</Text>
							<TouchableOpacity
								onPress={() => openModal("tallas")}
								style={infopers.tallasButton}
							>
								<Text style={infopers.tallasButtonText}>Ver Tallas</Text>
							</TouchableOpacity>
						</View>
						<View style={infopers.tallasPrendasContainer}>
							<View style={infopers.tallasPrendaContainer}>
								<View style={infopers.tallasPrendaIconContainer}>
									<Icon
										name="CAMISA"
										size={22}
										style={infopers.tallasPrendaIcon}
									/>
								</View>
								<View style={infopers.tallasPrendaDataContainer}>
									<Text style={infopers.tallasPrendaDataText}>S</Text>
								</View>
							</View>
							<View style={infopers.tallasPrendaContainer}>
								<View style={infopers.tallasPrendaIconContainer}>
									<Icon
										name="PANTALON"
										size={22}
										style={infopers.tallasPrendaIcon}
									/>
								</View>
								<View style={infopers.tallasPrendaDataContainer}>
									<Text style={infopers.tallasPrendaDataText}>8 US</Text>
								</View>
							</View>
							<View style={infopers.tallasPrendaContainer}>
								<View style={infopers.tallasPrendaIconContainer}>
									<Icon
										name="ZAPATO"
										size={14}
										style={infopers.tallasPrendaIcon}
									/>
								</View>
								<View style={infopers.tallasPrendaDataContainer}>
									<Text style={infopers.tallasPrendaDataText}>32 MX</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Familia */}
					<View style={[infopers.familiaContainer, { height: familiaHeight }]}>
						{/* Title */}
						<View style={infopers.familiaTitleContainer}>
							<Text style={infopers.familiaTitleText}>Familia</Text>
							{/* Add Button */}
							<TouchableOpacity
								onPress={() => openModal("familia")}
								style={infopers.familiaAddButton}
							>
								<Text style={infopers.familiaAddButtonText}>Agregar</Text>
								
							</TouchableOpacity>
							{selectedModal === "familia" && (
									<FamiliaModal onCallback={closeModal} onExit={closeModal} />
								)}
						</View>
						{/* Content */}
						<View style={infopers.familiaContentContainer}>
							{/* Member */}
							<View style={infopers.familiaMemberContainer}>
								<View
									style={[
										infopers.familiaMemberIconContainer,
										{ height: height * 0.05, width: width * 0.1 },
									]}
								>
									<Icon
										name="USUARIO"
										size={18}
										style={infopers.familiaMemberIcon}
									/>
								</View>
								<View style={infopers.familiaMemberDataContainer}>
									<Text style={infopers.familiaMemberDataText}>Madre</Text>
								</View>
							</View>
							{/* Remove Button */}
							<TouchableOpacity style={infopers.familiaRemoveButton}>
								<Text style={infopers.familiaRemoveButtonText}>Quitar</Text>
							</TouchableOpacity>
							{/* Card Content */}
							<View style={infopers.familiaCardContainer}>
								<CardRow title="Nombre" data="PRUEBA" />
								<View style={infopers.cardInfoRowContainer}>
									<View
										style={[
											infopers.cardInfoRowTitleContainer,
											{ flex: 0, width: "20%" },
										]}
									>
										<Text
											numberOfLines={1}
											style={infopers.cardInfoRowTitleText}
										>
											Fec. Nac.
										</Text>
									</View>
									<View style={infopers.cardInfoRowDataContainer}>
										<Text style={infopers.cardInfoRowDataText}>PRUEBA</Text>
									</View>
									<View
										style={[
											infopers.cardInfoRowTitleContainer,
											{ flex: 4, marginBottom: "-0.5%" },
										]}
									>
										<Text
											numberOfLines={2}
											style={infopers.cardInfoRowTitleText}
										>
											Sexo
										</Text>
									</View>
									<View
										style={[infopers.cardInfoRowDataContainer, { flex: 8 }]}
									>
										<Text style={infopers.cardInfoRowDataText}>PRUEBA</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
			{/* Modals */}
			<View>
				{selectedModal === "domicilio" && (
					<DomicilioModal onCallback={closeModal} onExit={closeModal} onRegister={handleRegisterPariente} />
				)}
				{selectedModal === "tallas" && (
					<TallasModal onCallback={closeModal} onExit={closeModal} />
				)}
			</View>
		</View>
	);
}

export default InfoPers;
