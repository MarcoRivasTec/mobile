import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { prestamos } from "./styles";
import ContentHeader from "./ContentHeader";
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import Button from "./Button";

function Prestamos() {
	// const { width, height } = Dimensions.get("window");

	return (
		<View style={prestamos.container}>
			<ContentHeader title="Préstamos" />
			<View style={prestamos.contentContainer}>
				<View style={prestamos.titleBar}>
					<View style={prestamos.titleContainer}>
						<Text style={prestamos.titleText}>Fondo de Ahorro</Text>
					</View>
				</View>
				<View style={prestamos.infoContainer}>
					{/* Saldo atual */}
					<View style={prestamos.dataRowContainer}>
						<View style={prestamos.dataRowTextContainer}>
							<Text style={prestamos.dataText}>Saldo actual: </Text>
						</View>
						<View
							style={[
								prestamos.dataRowFieldContainer,
								{ alignItems: "flex-start" },
							]}
						>
							<Text style={[prestamos.dataFieldText, { left: "4%" }]}>
								15,454.80
							</Text>
						</View>
					</View>
					{/* Solicitud */}
					<View style={[prestamos.dataContainer, {marginTop: "1%"}]}>
						<View style={prestamos.dataTextContainer}>
							<Text style={prestamos.dataText}>
								¿Cuánto te gustaría solicitar?
							</Text>
						</View>
						<View style={prestamos.dataFieldContainer}>
							<Text style={prestamos.dataFieldText}>15,454.80</Text>
						</View>
					</View>

					{/* Semanas */}
					<View style={prestamos.dataRowContainer}>
						<View style={prestamos.dataRowContainer}>
							<View style={prestamos.dataRowTextContainer}>
								<Text style={prestamos.dataText}># Semanas</Text>
							</View>
							<View style={prestamos.dataRowFieldContainer}>
								<Text style={prestamos.dataFieldText}>28</Text>
							</View>
						</View>
						<View style={prestamos.dataRowContainer}>
							<View style={prestamos.dataRowTextContainer}>
								<Text style={prestamos.dataText}>% Interés</Text>
							</View>
							<View style={prestamos.dataRowFieldContainer}>
								<Text style={prestamos.dataFieldText}>0.159%</Text>
							</View>
						</View>
					</View>

					{/* Calcular */}
					<TouchableOpacity style={prestamos.buttonContainer}>
						<Text style={prestamos.buttonText}>Calcular</Text>
					</TouchableOpacity>

					{/* Totales */}
					<View style={prestamos.dataContainer}>
						<View style={prestamos.dataTextContainer}>
							<Text style={prestamos.dataText}>Interés Total</Text>
						</View>
						<View style={prestamos.dataFieldContainer}>
							<Text style={prestamos.dataFieldText}>0.0%</Text>
						</View>
					</View>
					<View style={prestamos.dataContainer}>
						<View style={prestamos.dataTextContainer}>
							<Text style={prestamos.dataText}>Total a pagar</Text>
						</View>
						<View style={prestamos.dataFieldContainer}>
							<Text style={prestamos.dataFieldText}>0.00</Text>
						</View>
					</View>
					<View style={prestamos.dataContainer}>
						<View style={prestamos.dataTextContainer}>
							<Text style={prestamos.dataText}>Descuento semanal</Text>
						</View>
						<View style={prestamos.dataFieldContainer}>
							<Text style={prestamos.dataFieldText}>0.00</Text>
						</View>
					</View>

					<View style={prestamos.agreementContainer}>
						<BouncyCheckbox size={30} fillColor="pink" />
						<View style={prestamos.agreementTextContainer}>
							<Text adjustsFontSizeToFit={true} style={prestamos.agreementText}>
								Estoy de acuerdo con los importes de interés y descuento semanal
								calculado en este documento, realizo la solicitud al Comité,
								quienes pueden ACEPTAR o NEGAR mi petición según el Reglamento
								lo estipule.
							</Text>
						</View>
					</View>

					{/* Calcular */}
					<TouchableOpacity
						style={[prestamos.buttonContainer, { marginTop: "3%", marginBottom: "3%" }]}
					>
						<Text style={prestamos.buttonText}>Solicitar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default Prestamos;
