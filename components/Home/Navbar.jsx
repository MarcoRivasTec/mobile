import React from "react";
import { View, TouchableOpacity } from "react-native";
import { navbar } from "./styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Icon from "./icons";

function Navbar({changeContent, navigation}) {
	return (
		<View style={navbar.container}>
			<View style={navbar.box}>
				<View style={navbar.boxLeft}>
					<TouchableOpacity style={navbar.button}>
						<Ionicons name="search" size={16} color={COLORS.white} />
					</TouchableOpacity>
				</View>
				<View style={navbar.boxRight}>
					<TouchableOpacity style={navbar.button}>
						<Ionicons
							name="notifications-outline"
							size={16}
							color={COLORS.white}
						/>
					</TouchableOpacity>
					<TouchableOpacity style={navbar.button}>
						<Ionicons name="settings-outline" size={16} color={COLORS.white} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.replace("Login")}
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
		</View>
	);
}

export default Navbar;
