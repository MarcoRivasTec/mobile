import React from "react";
import { View } from "react-native";
import { menu } from "./styles";
import SectionButton from "./Menu/SectionButton";
import { showMessage } from "react-native-flash-message";

function Menu({ changeContent, navigation }) {
	return (
		<View style={menu.container}>
			{/* Row 1 */}
			<View style={[menu.row, { marginTop: "3%" }]}>
				<SectionButton
					title="Gafete Digital"
					iconLibrary="AD"
					icon="qrcode"
					marginTop="8%"
					onPress={() => navigation.navigate("GafeteQR")}
					size={40}
				/>

				<SectionButton
					title="Recibo de Nómina"
					icon="RECIBO_NOM"
					onPress={() => changeContent("ReciboNom")}
				/>
				<SectionButton
					title="Prenómina"
					icon="PRENOMINA"
					onPress={() => changeContent("Prenomina")}
				/>
			</View>
			{/* Row 2 */}
			<View style={menu.row}>
				<SectionButton
					title="Solicitudes"
					icon="SOLICITUDES"
					onPress={() => changeContent("Solicitudes")}
				/>
				<SectionButton
					title="Préstamos"
					icon="PRESTAMOS"
					size={40}
					onPress={() => changeContent("Prestamos")}
				/>
				<SectionButton
					title="Retiro de Ahorro"
					icon="RETIRO_AHORRO"
					onPress={() => changeContent("RetiroAhorro")}
				/>
			</View>
			{/* Row 3 */}
			<View style={menu.row}>
				<SectionButton
					title="Cartas"
					icon="CARTAS"
					onPress={() => changeContent("Cartas")}
				/>
				<SectionButton
					title="Reposiciones"
					icon="REPOSICIONES"
					size={32}
					marginTop="15%"
					onPress={() => changeContent("Reposiciones")}
				/>
				<SectionButton
					title="Vacaciones"
					icon="VACACIONES"
					onPress={() => changeContent("Vacaciones")}
					size={30}
				/>
			</View>
			{/* Row 4 */}
			<View style={[menu.row, { marginBottom: "1%" }]}>
				<SectionButton
					title="Pólizas"
					icon="POLIZAS"
					onPress={() => changeContent("Polizas")}
				/>
				<SectionButton
					title="Línea de Denuncias"
					icon="DENUNCIA"
					size={32}
					onPress={() => changeContent("LineaDenuncia")}
				/>
				{/* <SectionButton
					title="Avisos"
					icon="chatbox-ellipses-outline"
					size={41}
					iconLibrary="Ionicons"
					onPress={() => changeContent("Notificaciones")}
				/> */}
				<SectionButton
					title="Opiniones"
					icon="OPINIONES"
					onPress={() => changeContent("Opiniones")}
				/>
			</View>
		</View>
	);
}

export default Menu;
