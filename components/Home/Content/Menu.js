import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { menu } from "./styles";
import Icon from "../icons";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors";

function Menu({ changeContent }) {
	return (
		<View style={menu.container}>
			{/* Row 1 */}
			<View style={[menu.row, { marginTop: 10 }]}>
				<TouchableOpacity
					style={menu.button}
					onPress={() => changeContent("Vacaciones")}
				>
					<View style={menu.content}>
						<Icon
							name="VACACIONES"
							style={menu.icon}
							size={30}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Vacaciones
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={menu.button}
					onPress={() => changeContent("ReciboNom")}
				>
					<View style={menu.content}>
						<Icon
							name="RECIBO_NOM"
							style={menu.icon}
							size={35}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Recibo de Nómina
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity 
				style={menu.button}
				onPress={() => changeContent("Prenomina")}
				>
					<View style={menu.content}>
						<Icon
							name="PRENOMINA"
							style={menu.icon}
							size={35}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Prenómina
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			{/* Row 2 */}
			<View style={menu.row}>
				<TouchableOpacity 
				style={menu.button}
				onPress={() => changeContent("Solicitudes")}
				>
					<View style={menu.content}>
						<Icon
							name="SOLICITUDES"
							style={menu.icon}
							size={35}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Solicitudes
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={menu.button}>
					<View style={menu.content}>
						<Icon
							name="PRESTAMOS"
							style={menu.icon}
							size={45}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Préstamos
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={menu.button}>
					<View style={menu.content}>
						<Icon
							name="RETIRO_AHORRO"
							style={menu.icon}
							size={35}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Retiro de Ahorro
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			{/* Row 3 */}
			<View style={menu.row}>
				<TouchableOpacity style={menu.button}>
					<View style={menu.content}>
						<Icon
							name="CARTAS"
							style={menu.icon}
							size={35}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Cartas
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={menu.button}>
					<View style={menu.content}>
						<Icon
							name="REPOSICIONES"
							style={[menu.icon, { marginTop: "15%" }]}
							size={32}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Reposiciones
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={menu.button}>
					<View style={menu.content}>
						<Icon
							name="DENUNCIA"
							style={menu.icon}
							size={32}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Línea de Denuncia
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			{/* Row 4 */}
			<View style={[menu.row, { marginBottom: 5 }]}>
				<TouchableOpacity style={menu.button}>
					<View style={menu.content}>
						<Ionicons
							name="chatbox-ellipses-outline"
							style={menu.icon}
							size={35}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Mensajes
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={menu.button}>
					<View style={menu.content}>
						<Icon
							name="POLIZAS"
							size={35}
							style={menu.icon}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Pólizas
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={menu.button}>
					<View style={menu.content}>
						<Icon
							name="CAMBIO_NIP"
							style={menu.icon}
							size={46}
							color={COLORS.white}
						/>
						<Text numberOfLines={2} style={menu.text}>
							Cambio de NIP
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Menu;
