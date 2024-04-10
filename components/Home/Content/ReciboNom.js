import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { reciboNom } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonInfo from "./Buttons/ButtonInfo";
import Icon from "../icons";
import COLORS from "../../../constants/colors";
//import HistorialModal from "./Vacaciones/HistorialModal";

function ReciboNom() {
	return (
		<View style={reciboNom.container}>
			<ContentHeader title="Recibo de Nómina"></ContentHeader>
			<View style={reciboNom.sectionContainer}>
				<View style={reciboNom.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Fondo de Ahorro
					</Text>
				</View>
				<View style={reciboNom.sectionButtonContainer}>
					<ButtonInfo data="$232,022" title="Acumulado" />
					<ButtonInfo data="$1,500" title="Saldo préstamo ahorro" />
					{/* View Relleno */}
					<View style={{ flex: 1 }} />
				</View>
			</View>
			<View style={reciboNom.nominaContainer}>
				{/* Barra Busqueda */}
				<View style={reciboNom.nominaHeader}>
					<TouchableOpacity style={reciboNom.nominaYearContainer}>
						<View style={reciboNom.nominaSearchIconContainer}>
							<Icon
								name="search"
								size={13}
								style={reciboNom.nominaSearchIcon}
							></Icon>
						</View>
						<Text style={reciboNom.nominaSearchText}>2023</Text>
					</TouchableOpacity>
					<TouchableOpacity style={reciboNom.nominaWeekContainer}>
						<View style={reciboNom.nominaSearchIconContainer}>
							<Icon
								name="search"
								size={13}
								style={reciboNom.nominaSearchIcon}
							></Icon>
						</View>
						<Text style={reciboNom.nominaSearchText}>Semana 09</Text>
					</TouchableOpacity>
				</View>

				{/* Cantidades */}
				<View style={reciboNom.nominaCantidadContainer}>
					<TouchableOpacity style={reciboNom.nominaCantidadElementContainer}>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>Percepciones</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>$5,954</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							reciboNom.nominaCantidadElementContainer,
							{ backgroundColor: COLORS.flatlistElement1 },
						]}
					>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>Deducciones</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>$939.99</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={reciboNom.nominaCantidadElementContainer}>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>Neto</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>$5,015</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default ReciboNom;
