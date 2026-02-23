import React, { useContext, useState } from "react";
import {
	View,
	TouchableOpacity,
	Modal,
	Text,
	TextInput,
	FlatList,
	Alert,
} from "react-native";
import { navbar } from "./styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Icon from "./icons";
import ConfirmModal from "./Content/InfoPers/ConfirmModal";
import { showMessage } from "react-native-flash-message";
import { CommonActions } from "@react-navigation/native";
import { AppContext } from "../AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const normalizeText = (text) =>
	text
		.normalize("NFD") // separate accents
		.replace(/[\u0300-\u036f]/g, "") // remove accents
		.toLowerCase();

function Navbar({ changeContent, navigation }) {
	const { appVersion } = useContext(AppContext);
	const [showSettings, setShowSettings] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [showAppInfo, setShowAppInfo] = useState(false);

	const [query, setQuery] = useState("");

	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const sections = [
		{ key: "Menu", label: "Menú" },
		{ key: "InfoPers", label: "Información Personal" },
		{ key: "Area", label: "Área" },
		{ key: "Redes", label: "Redes" },
		{ key: "Ideas", label: "Tecma Ideas" },
		{ key: "Notificaciones", label: "Notificaciones" },
		{ key: "Vacaciones", label: "Vacaciones" },
		{ key: "ReciboNom", label: "Recibo de Nómina" },
		{ key: "Prenomina", label: "Pre-Nómina" },
		{ key: "Solicitudes", label: "Solicitudes" },
		{ key: "Prestamos", label: "Préstamos" },
		{ key: "RetiroAhorro", label: "Retiro de Ahorro" },
		{ key: "Cartas", label: "Cartas" },
		{ key: "Reposiciones", label: "Reposiciones" },
		{ key: "LineaDenuncia", label: "Línea de Denuncia" },
		{ key: "Polizas", label: "Pólizas" },
		{ key: "Opiniones", label: "Opiniones" },
	];

	const filteredSections = sections.filter((s) =>
		normalizeText(s.label).includes(normalizeText(query)),
	);

	const removeBiometrics = async () => {
		try {
			console.log("Iniciando eliminación de datos biométricos...");
			// Delete secure credentials
			await SecureStore.deleteItemAsync("numEmp", {
				keychainService: "com.tecma.movilconnect.service.login",
			});
			await SecureStore.deleteItemAsync("nip", {
				keychainService: "com.tecma.movilconnect.service.login",
			});
			await SecureStore.deleteItemAsync("region", {
				keychainService: "com.tecma.movilconnect.service.login",
			});

			// Remove biometric flag
			await AsyncStorage.removeItem("biometricEnabled");

			showMessage({
				message: "Datos biométricos eliminados",
				description:
					"Se ha desactivado el acceso con huella digital / reconocimiento facial.",
				type: "success",
				duration: 4000,
			});
		} catch (error) {
			console.error("Error removing biometrics:", error);
			showMessage({
				message: "Error",
				description: "No se pudieron eliminar los datos biométricos.",
				type: "danger",
			});
		}
	};

	return (
		<View style={navbar.container}>
			<View style={navbar.box}>
				<View style={navbar.boxLeft}>
					<TouchableOpacity
						onPress={() => setShowSearch(true)}
						style={navbar.button}
					>
						<Ionicons name="search" size={16} color={COLORS.white} />
					</TouchableOpacity>
					{/* <TouchableOpacity onPress={temporarilyDisabled} style={navbar.button}>
						<Ionicons name="search" size={16} color={COLORS.white} />
					</TouchableOpacity> */}
				</View>
				<View style={navbar.boxRight}>
					{/* <TouchableOpacity onPress={temporarilyDisabled} style={navbar.button}>
						<Ionicons
							name="notifications-outline"
							size={16}
							color={COLORS.white}
						/>
					</TouchableOpacity> */}
					{/* <TouchableOpacity onPress={temporarilyDisabled} style={navbar.button}>
						<Ionicons name="settings-outline" size={16} color={COLORS.white} />
					</TouchableOpacity> */}
					<TouchableOpacity
						onPress={() => setShowSettings(true)}
						style={navbar.button}
					>
						<Ionicons name="settings-outline" size={16} color={COLORS.white} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={confirmationModalHandler}
						style={[navbar.button, { backgroundColor: COLORS.rosa }]}
					>
						<Ionicons name="exit-outline" size={16} color={COLORS.white} />
					</TouchableOpacity>
				</View>
			</View>
			<View style={navbar.home}>
				{/* Home Button */}
				<TouchableOpacity
					style={navbar.homeBackground}
					onPress={() => changeContent("Menu")}
				>
					<Icon name="HOME" size={25} color={COLORS.white} />
				</TouchableOpacity>
			</View>
			{ConfirmationVisible && (
				<ConfirmModal
					onCallback={confirmationModalHandler}
					onExit={confirmationModalHandler}
					title="Cerrar sesión"
					data="¿Estás seguro que deseas cerrar sesión?"
					onConfirm={() => {
						confirmationModalHandler();
						navigation.navigate("Login", { clear: true });
					}}
					style={navbar.modal}
				/>
			)}
			<Modal
				visible={showSearch}
				transparent
				animationType="fade"
				onRequestClose={() => setShowSearch(false)}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "rgba(0,0,0,0.5)",
						justifyContent: "center",
						padding: 20,
					}}
				>
					<View
						style={{
							backgroundColor: COLORS.white,
							borderRadius: 10,
							padding: 16,
							maxHeight: "80%",
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
								marginBottom: 10,
							}}
						>
							Búsqueda de sección
						</Text>

						<TextInput
							placeholder="Escribe para buscar..."
							placeholderTextColor={COLORS.placeholder}
							value={query}
							onChangeText={setQuery}
							autoFocus
							style={{
								borderWidth: 1,
								borderColor: "#ccc",
								borderRadius: 6,
								padding: 8,
								marginBottom: 10,
								color: "black",
							}}
						/>

						<FlatList
							data={filteredSections}
							keyExtractor={(item) => item.key}
							keyboardShouldPersistTaps="handled"
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										changeContent(item.key);
										setShowSearch(false);
										setQuery("");
									}}
									style={{
										paddingVertical: 12,
										borderBottomWidth: 1,
										borderBottomColor: "#eee",
									}}
								>
									<Text
										style={{
											color: "black",
											fontSize: 16,
											fontFamily: "Roboto",
										}}
									>
										- {item.label}
									</Text>
								</TouchableOpacity>
							)}
							ListEmptyComponent={
								<Text
									style={{ textAlign: "center", color: "#888", marginTop: 10 }}
								>
									Ningún resultado encontrado
								</Text>
							}
						/>

						<TouchableOpacity
							onPress={() => {
								setShowSearch(false);
								setQuery("");
							}}
							style={{
								marginTop: 12,
								alignSelf: "flex-end",
							}}
						>
							<Text style={{ color: COLORS.rosa }}>Cerrar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<Modal
				visible={showSettings}
				transparent
				animationType="fade"
				onRequestClose={() => setShowSettings(false)}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						backgroundColor: "rgba(0,0,0,0.4)",
					}}
				>
					<View
						style={{
							backgroundColor: COLORS.white,
							borderTopLeftRadius: 16,
							borderTopRightRadius: 16,
							padding: 20,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
								marginBottom: 12,
							}}
						>
							Opciones
						</Text>

						{/* 🔐 Remove biometric login */}
						{/* <TouchableOpacity
							onPress={() => {
								setShowSettings(false);
								// trigger confirmation modal or logic
								showMessage({
									message: "Inicio biométrico removido",
									description:
										"El inicio de sesión con datos biométricos ha sido deshabilitado.",
									type: "success",
								});
							}}
							style={{ paddingVertical: 12 }}
						>
							<Text style={{ color: "#d9534f", fontWeight: "600" }}>
								Cambiar huella digital / rostro (datos biométricos)
							</Text>
						</TouchableOpacity> */}

						{/* 🔐 Remove biometric login */}
						<TouchableOpacity
							onPress={async () => {
								console.log("Opción de remover datos biométricos seleccionada");
								setShowSettings(false);
								Alert.alert(
									"Remover datos biométricos",
									"¿Estás seguro que deseas eliminar el acceso con huella o reconocimiento facial?",
									[
										{ text: "Cancelar", style: "cancel" },
										{
											text: "Eliminar",
											style: "destructive",
											onPress: removeBiometrics,
										},
									],
								);
							}}
							style={{ paddingVertical: 12 }}
						>
							<Text style={{ color: "#d9534f", fontWeight: "600" }}>
								Remover datos biométricos (huella digital/rostro)
							</Text>
						</TouchableOpacity>

						{/* Divider */}
						<View
							style={{ height: 1, backgroundColor: "#eee", marginVertical: 8 }}
						/>

						{/* Optional extras */}
						{/* <TouchableOpacity style={{ paddingVertical: 12 }}>
							<Text>Cambiar método de acceso</Text>
						</TouchableOpacity> */}

						<TouchableOpacity
							onPress={() => {
								setShowSettings(false);
								setShowAppInfo(true);
							}}
							style={{ paddingVertical: 12 }}
						>
							<Text>Información de la aplicación</Text>
						</TouchableOpacity>

						{/* Close */}
						<TouchableOpacity
							onPress={() => setShowSettings(false)}
							style={{ paddingVertical: 12 }}
						>
							<Text style={{ color: COLORS.rosa, textAlign: "right" }}>
								Cerrar
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<Modal
				visible={showAppInfo}
				transparent
				animationType="fade"
				onRequestClose={() => setShowAppInfo(false)}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "rgba(0,0,0,0.5)",
						justifyContent: "center",
						padding: 20,
					}}
				>
					<View
						style={{
							backgroundColor: COLORS.white,
							borderRadius: 16,
							padding: 20,
						}}
					>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								marginBottom: 12,
							}}
						>
							Tecma Móvil Connect
						</Text>

						<Text style={{ marginBottom: 6 }}>Versión: {appVersion}</Text>

						<Text style={{ marginBottom: 6 }}>Build: 2026.01</Text>

						{/* <Text style={{ marginBottom: 6 }}>
							Plataforma: React Native + Expo
						</Text> */}

						<Text style={{ marginBottom: 6 }}>
							Desarrollado por: TECMA Group
						</Text>

						<View
							style={{
								height: 1,
								backgroundColor: "#eee",
								marginVertical: 12,
							}}
						/>

						<TouchableOpacity
							onPress={() => setShowAppInfo(false)}
							style={{ alignSelf: "flex-end" }}
						>
							<Text style={{ color: COLORS.rosa }}>Cerrar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Navbar;
