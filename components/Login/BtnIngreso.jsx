import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { layout } from "./styles";
import React, { useState } from "react";
import fetchPost from "../fetching";
import Loading from "../Animations/Loading";

function Ingresar({ user, nip, navigation }) {
	const [isLoading, setIsLoading] = useState(false);

	const query = {
		query: `mutation login($numEmp: String!, $nip: String!){
			login(numEmp: $numEmp, nip: $nip) {
				token
				name
			}
		}`,
		variables: {
			numEmp: user,
			nip: nip,
		},
	};

	const handleLogin = () => {
		setIsLoading(true);
		fetchPost({ query })
			.then((data) => {
				console.log("Response data at login:", data);
				if (data.data.login.token) {
					const nameParts = data.data.login.name.split(" ");
					const firstName = nameParts[0];
					navigation.navigate("Welcome", {firstName});
				} else {
					console.warn("Login failed: No token received");
				}
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error at app:", error);
				// Handle the error
				setIsLoading(false);
			});
	};

	return (
		<LinearGradient
			colors={[COLORS.naranja, COLORS.rojo]}
			style={layout.buttonContainer}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
		>
			{isLoading === false ? (
				<TouchableOpacity style={layout.button} onPress={handleLogin}>
					<Text style={layout.buttonText}>Ingresar</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity style={layout.button}>
					<Loading />
				</TouchableOpacity>
			)}
		</LinearGradient>
	);
}

export default Ingresar;
