import React from "react";
import { View, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { polizas } from "./styles";
import ContentHeader from "./ContentHeader";
import Poliza from "./Polizas/Poliza";

function Polizas() {
	const { width, height } = Dimensions.get("window");
	

	return (
		<View style={polizas.container}>
			<ContentHeader title="Pólizas" />
			<View style={polizas.contentContainer}>
				<ScrollView
					contentContainerStyle={polizas.scrollContentContainer}
					style={polizas.scrollContainer}
				>					
					{/* Polizas */}
					<Poliza
						width={width}
						height={height}
                        title="Dental"
                        icon="DENTAL"
                        size={20}
                        info1="Dra. Verónica Álvarez"
                        info2="Ave. del Granjero #6965 Esquina con Bulgaria"
                        info3="Fraccionamiento Oasis Sur"
                        contact1="(656) 620 51 88"
                        contact2="(656) 276 48 89"
					/>
					<Poliza
						width={width}
						height={height}
                        title="Anteojos"
                        icon="OPTICA"
                        size={12}
                        info1="Av. Juárez No. 614, esquina con Colón"
                        info2="Lunes a Sábado de 9:00 am a 6:00"
                        info3="Domingo 10:00 am a 3:00 pm"
                        contact1="(656) 612 89 54"
                        contact2="optica.realvision@yahoo.com.mx"
						contactIcon2="mail-outline"
					/>
					<Poliza
						width={width}
						height={height}
                        title="Seguro de Auto"
                        icon="AUTO"
                        info1="Magaly Franco Gonzalez"
                        contact1="(614) 239 56 55"
                        contact2="(656) 649 10 00 Ext. 1498"
						contact3="mfranco@intercam.com.mx"
						contactIcon3="mail-outline"
					/>
				</ScrollView>
			</View>
		</View>
	);
}

export default Polizas;
