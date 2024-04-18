import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { prenomina } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
import COLORS from "../../../constants/colors";

function Prenomina() {
	return (
		<View style={prenomina.container}>
			<ContentHeader title="Prenómina"></ContentHeader>
			<View style={prenomina.prenominaContainer}>
				{/* Barra Busqueda */}
				<View style={prenomina.prenominaHeader}>
					{/* Boton Año */}
					<TouchableOpacity style={prenomina.prenominaYearContainer}>
						<View style={prenomina.prenominaSearchIconContainer}>
							<Icon
								name="search"
								size={13}
								style={prenomina.prenominaSearchIcon}
							></Icon>
						</View>
						<Text style={prenomina.prenominaSearchText}>2023</Text>
					</TouchableOpacity>
					{/* Boton Semana */}
					<TouchableOpacity style={prenomina.prenominaWeekContainer}>
						<View style={prenomina.prenominaSearchIconContainer}>
							<Icon
								name="search"
								size={13}
								style={prenomina.prenominaSearchIcon}
							></Icon>
						</View>
						<Text style={prenomina.prenominaSearchText}>Semana 09</Text>
					</TouchableOpacity>
				</View>

				{/* Cantidades */}
				<View style={prenomina.prenominaCantidadContainer}>
					<TouchableOpacity style={prenomina.prenominaCantidadElementContainer}>
						<View style={prenomina.prenominaCantidadBox}>
							<Text style={prenomina.prenominaCantidadTitle}>Horas</Text>
						</View>
						<View style={prenomina.prenominaCantidadBox}>
							<Text style={prenomina.prenominaCantidad}>47.50</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							prenomina.prenominaCantidadElementContainer,
							{ backgroundColor: COLORS.flatlistElement1 },
						]}
					>
						<View style={prenomina.prenominaCantidadBox}>
							<Text style={prenomina.prenominaCantidadTitle}>Extras</Text>
						</View>
						<View style={prenomina.prenominaCantidadBox}>
							<Text style={prenomina.prenominaCantidad}>0.00</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={prenomina.prenominaCantidadElementContainer}>
						<View style={prenomina.prenominaCantidadBox}>
							<Text style={prenomina.prenominaCantidadTitle}>Incidencias</Text>
						</View>
						<View style={prenomina.prenominaCantidadBox}>
							<Text style={prenomina.prenominaCantidad}>0</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={prenomina.buttonContainer}>
						<ImageBackground
							source={require("../../../assets/BOTON_SELECCION.png")}
							style={prenomina.buttonBackground}
							resizeMode={"stretch"}
						>
							<Text style={prenomina.buttonText}>Ver detalle</Text>
						</ImageBackground>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default Prenomina;
