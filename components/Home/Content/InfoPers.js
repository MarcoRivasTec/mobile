import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { infopers } from "./styles";
import ContentHeader from "./ContentHeader";
import CardRow from "./Design/CardRow";
import Familia from "./InfoPers/Familia";
import Tallas from "./InfoPers/Tallas";
import ModifyDomicilioModal from "./InfoPers/Domicilio/ModifyDomicilioModal";
import fetchPost from "../../fetching";
import LoadingContent from "../../Animations/LoadingContent";

function InfoPers({ numEmp }) {
	const { width, height } = Dimensions.get("window");
	const infoheight = Math.round(height * 0.4);
	const domicilioHeight = Math.round(height * 0.3);
	const infonavitHeight = Math.round(height * 0.34);
	const titleHeight = Math.round(height * 0.036);

	const query = {
		query: `query InfoPers($numEmp: String!){
			InfoPers(numEmp: $numEmp) {
				identificacion {
					rfc
					curp
					imss
					genero
					edocivil
					cuenta
				}
				domicilio {
					calle
					numext
					col
					tel
				}
				infonavit {
					credito
					tipo
					tasa
					estatus
				}
			}
		}`,
		variables: {
			numEmp: numEmp,
		},
	};

	const [identificacion, setIdentificacion] = useState({
		rfc: "No definido",
		curp: "No definido",
		imss: "No definido",
		genero: "No definido",
		edocivil: "No definido",
		cuenta: "No definido",
	});
	const [domicilio, setDomicilio] = useState();
	const [infonavit, setInfonavit] = useState({
		credito: "No definido",
		tipo: "No definido",
		tasa: 0,
		estatus: "No definido",
	});

	const [selectedModal, setSelectedModal] = useState(null);
	const openModal = (modalName) => setSelectedModal(modalName);
	const closeModal = () => setSelectedModal(null);

	// New state to manage loading
	const [isLoading, setIsLoading] = useState(true);

	// Fetch data when component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				console.log("Response data at infopers:", data);
				if (data.data.InfoPers) {
					setIdentificacion(data.data.InfoPers.identificacion);
					setDomicilio(data.data.InfoPers.domicilio);
					setInfonavit(data.data.InfoPers.infonavit);
					console.log(data.data.InfoPers.infonavit);
				} else {
					console.warn("Error retrieving personal information");
				}
			} catch (error) {
				console.error("Error at infopers:", error);
			} finally {
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};

		fetchData();
	}, [numEmp]); // Dependency array includes numEmp to refetch data if numEmp changes

	// Render loading or error state if data is not yet available
	if (isLoading) {
		return <LoadingContent/>
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
					<View
						style={[infopers.cardContainer, { height: infoheight }]}
					>
						{/* Title */}
						<View style={infopers.cardTitleContainer}>
							<Text style={infopers.cardTitleText}>
								Identificación
							</Text>
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
										{ flex: 0, width: "28%" },
									]}
								>
									<Text
										numberOfLines={1}
										style={infopers.cardInfoRowTitleText}
									>
										GENERO
									</Text>
								</View>
								<View style={infopers.cardInfoRowDataContainer}>
									<Text style={infopers.cardInfoRowDataText}>
										{identificacion.genero}
									</Text>
								</View>
								<View
									style={[
										infopers.cardInfoRowTitleContainer,
										{ flex: 6, marginBottom: "-0.5%" },
									]}
								>
									<Text
										numberOfLines={2}
										style={infopers.cardInfoRowTitleText}
									>
										ESTADO CIVIL
									</Text>
								</View>
								<View
									style={[
										infopers.cardInfoRowDataContainer,
										{ flex: 8 },
									]}
								>
									<Text style={infopers.cardInfoRowDataText}>
										{identificacion.edocivil}
									</Text>
								</View>
							</View>
							<CardRow
								title="CUENTA"
								data={identificacion.cuenta}
							/>
						</View>
					</View>

					{/* Domicilio */}
					<View
						style={[
							infopers.cardContainer,
							{ height: domicilioHeight },
						]}
					>
						{/* Title */}
						<View style={infopers.cardTitleContainer}>
							<Text style={infopers.cardTitleText}>
								Domicilio
							</Text>
						</View>
						{/* Card */}
						<View style={infopers.cardInfoContainer}>
							<CardRow
								title="Dirección"
								data={`${domicilio.calle} ${domicilio.numext}`}
							/>
							<CardRow title="Colonia" data={domicilio.col} />
							<CardRow title="Teléfono" data={domicilio.tel} />
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
					<View
						style={[
							infopers.cardContainer,
							{ height: infonavitHeight },
						]}
					>
						{/* Title */}
						<View style={infopers.cardTitleContainer}>
							<Text style={infopers.cardTitleText}>
								Infonavit
							</Text>
						</View>
						{/* Card */}
						<View style={infopers.cardInfoContainer}>
							<CardRow
								title="No. Crédito"
								data={infonavit.credito}
							/>
							<CardRow title="Tipo" data={infonavit.tipo} />
							<CardRow title="Tasa" data={infonavit.tasa} />
							<CardRow
								title="Estatus: "
								data={infonavit.estatus}
							/>
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
