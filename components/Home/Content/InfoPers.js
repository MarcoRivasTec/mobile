import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { infopers } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
import Familia from "./InfoPers/Familia";
import Tallas from "./InfoPers/Tallas";
import ModifyDomicilioModal from "./InfoPers/Domicilio/ModifyDomicilioModal"

function InfoPers() {
	const { width, height } = Dimensions.get("window");
	const infoheight = Math.round(height * 0.4);
	const domicilioHeight = Math.round(height * 0.3);
	const infonavitHeight = Math.round(height * 0.34);
	const titleHeight = Math.round(height * 0.036);

	const [selectedModal, setSelectedModal] = useState(null);
	const openModal = (modalName) => setSelectedModal(modalName);
	const closeModal = () => setSelectedModal(null);

	const identificacion = {
		rfc: "DUHM710425JF6",
		curp: "DUHM710425HCHNRR04",
		imss: "33887142934",
		genero: "Masculino",
		cuenta: "585777906"
	};
	identificacion.edoCivil = identificacion.genero === "Masculino" ? "Casado" : "Casada";


	const [domicilio, setDomicilio] = useState({
		calle: "Tlahuac",
		numero: 3754,
		colonia: "Lopez Mateos",
		telefono: 6566491000,
	});

	const infonavit = {
		noCredito: "0801045612",
		tipo: "Cuota Fija",
		tasa: "2329.7700",
		status: "Activo",
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
							<CardRow title="RFC" data={identificacion.rfc} />
							<CardRow title="CURP" data={identificacion.curp} />
							<CardRow title="IMSS" data={identificacion.imss} />
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
									<Text style={infopers.cardInfoRowDataText}>{identificacion.genero}</Text>
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
									<Text style={infopers.cardInfoRowDataText}>{identificacion.edoCivil}</Text>
								</View>
							</View>
							<CardRow title="CUENTA" data={identificacion.cuenta} />
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
							<CardRow title="Dirección" data={`${domicilio.calle} ${domicilio.numero}`} />
							<CardRow title="Colonia" data={domicilio.colonia} />
							<CardRow title="Teléfono" data={domicilio.telefono} />
							<TouchableOpacity
								onPress={() => openModal("domicilio")}
								style={infopers.cardInfoButton}
							>
								<Text style={infopers.cardInfoButtonText}>
									Actualiza tu dirección
								</Text>
								{selectedModal === "domicilio" && (
									<ModifyDomicilioModal
										onExit={openModal}
										onCallback={closeModal}
										domicilio={domicilio}
										setDomicilio={setDomicilio}
									/>
								)}
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
							<CardRow title="No. Crédito" data={infonavit.noCredito} />
							<CardRow title="Tipo" data={infonavit.tipo} />
							<CardRow title="Tasa" data={infonavit.tasa} />
							<CardRow title="Estatus: " data={infonavit.status} />
						</View>
					</View>

					{/* Tallas */}
					<Tallas
						selectedModal={selectedModal}
						width={width}
						height={height}
						titleHeight={titleHeight}
						openModal={openModal}
						closeModal={closeModal}
					/>

					{/* Familia */}
					<Familia
						selectedModal={selectedModal}
						width={width}
						height={height}
						CardRow={CardRow}
						openModal={openModal}
						closeModal={closeModal}
					/>
				</ScrollView>
			</View>
		</View>
	);
}

export default InfoPers;
