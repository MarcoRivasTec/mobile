import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { navbar } from "./styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Icon from "./icons";
import ConfirmModal from "./Content/InfoPers/ConfirmModal";
import { showMessage } from "react-native-flash-message";
import { CommonActions } from "@react-navigation/native";

function Navbar({ changeContent, navigation }) {
	const [ConfirmationVisible, setConfirmationVisible] = useState(false);

	function confirmationModalHandler() {
		setConfirmationVisible(!ConfirmationVisible);
	}

	const temporarilyDisabled = () => {
		showMessage({
			message: "Esta función está temporalmente deshabilitada",
			type: "info",
			duration: 3000,
			position: "bottom",
			icon: { icon: "info", position: "right" },
			// statusBarHeight: 40,
		});
	};

	return (
		<View style={navbar.container}>
			<View style={navbar.box}>
				<View style={navbar.boxLeft}>
					<TouchableOpacity onPress={temporarilyDisabled} style={navbar.button}>
						<Ionicons name="search" size={16} color={COLORS.white} />
					</TouchableOpacity>
				</View>
				<View style={navbar.boxRight}>
					{/* <TouchableOpacity onPress={temporarilyDisabled} style={navbar.button}>
						<Ionicons
							name="notifications-outline"
							size={16}
							color={COLORS.white}
						/>
					</TouchableOpacity> */}
					<TouchableOpacity onPress={temporarilyDisabled} style={navbar.button}>
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
					// onConfirm={() => navigation.replace("Login")}
					onConfirm={() => {
						navigation.dispatch(
							CommonActions.reset({
								index: 0,
								routes: [{ name: "Login" }],
							})
						);
					}}
					style={navbar.modal}
				/>
			)}
		</View>
	);
}

export default Navbar;
