import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { cartas } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonAction from "./Buttons/ButtonAction";
import CartaModal from "./Cartas/CartaModal";
import { HomeContext } from "../../HomeContext";

function Cartas() {
	const { sendRequisition } = useContext(HomeContext);
	const [isCartaModalVisible, setCartaModalVisible] = useState(false);
	const [text, setText] = useState("");
	const [type, setType] = useState("");

	const cartasRequisition = async () => {
		return await sendRequisition({ letter: type });
	};

	function cartaModalHandler() {
		setCartaModalVisible(!isCartaModalVisible);
	}

	const requestCartaHandler = async (carta) => {
		setType(carta);
		switch (carta) {
			case "CartaGuaderia":
				setText("Carta Guardería");
				break;
			case "CartaPrestamo":
				setText("Carta para Préstamo/Crédito");
				break;
			case "CartaTrabajo":
				setText("Carta de Trabajo");
				break;
			case "CartaVisa":
				setText("Carta Trámite Visa Láser");
				break;
			case "CartaPermiso":
				setText("Carta Permiso USA");
				break;
		}
		cartaModalHandler();
	};

	return (
		<View style={cartas.container}>
			<ContentHeader title="Cartas" />
			<View style={cartas.sectionContainer}>
				<View style={cartas.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Solicitud de cartas
					</Text>
				</View>
				<View style={[cartas.sectionButtonContainer]}>
					<View style={cartas.buttonContainer}>
						<ButtonAction
							toggleModal={() => requestCartaHandler("CartaPrestamo")}
							icon="CARTA_SAL"
							size={45}
							title="Carta Salario"
							fontSize={14}
						/>
					</View>

					<View style={cartas.buttonContainer}>
						<ButtonAction
							toggleModal={() => requestCartaHandler("CartaGuarderia")}
							icon="GUARDERIA"
							size={45}
							title="Guardería"
							fontSize={14}
						/>
					</View>
				</View>
				<View style={cartas.sectionButtonContainer}>
					<View style={cartas.buttonContainer}>
						<ButtonAction
							toggleModal={() => requestCartaHandler("CartaVisa")}
							icon="VISA"
							size={45}
							title="Carta Visa"
							fontSize={15}
						/>
					</View>

					<View style={cartas.buttonContainer}>
						<ButtonAction
							toggleModal={() => requestCartaHandler("CartaPermiso")}
							icon="PERMISO_USA"
							size={45}
							title="Permiso USA"
							fontSize={14}
						/>
					</View>
				</View>
				<View style={[cartas.sectionButtonContainer]}>
					<ButtonAction
						toggleModal={() => requestCartaHandler("CartaTrabajo")}
						icon="PERMISO"
						size={40}
						title="Carta Trabajo"
						fontSize={14}
					/>
				</View>
			</View>
			{isCartaModalVisible && (
				<CartaModal
					text={text}
					cartasRequisition={cartasRequisition}
					onCallback={cartaModalHandler}
					onExit={cartaModalHandler}
					isModalVisible={isCartaModalVisible}
				/>
			)}
		</View>
	);
}

export default Cartas;
