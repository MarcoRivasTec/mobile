import { Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { layout } from "./styles";
import React, { useContext, useState } from "react";
import fetchPost from "../fetching";
import Loading from "../Animations/Loading";
import { AppContext } from "../AppContext";

function Ingresar({ nip, navigation }) {
	const { numEmp } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);

	const query = {
		query: `mutation login($numEmp: String!, $nip: String!){
			login(numEmp: $numEmp, nip: $nip) {
				token
				name
			}
		}`,
		variables: {
			numEmp: numEmp,
			nip: nip,
		},
	};

	const handleLogin = () => {
		if (numEmp === "") {
			Alert.alert("Debes introducir tu número de empleado o reloj");
			return;
		}
		if (nip === "") {
			Alert.alert("Debes introducir tu NIP");
			return;
		}

		setIsLoading(true);
		fetchPost({ query })
			.then((data) => {
				setIsLoading(false);
				if (data.data.login !== null) {
					navigation.navigate("Welcome", {
						name: data.data.login.name
					});
				}
				if (data.errors[0].message) {
					Alert.alert(data.errors[0].message);
				}
			})
			.catch((error) => {
				setIsLoading(false);
				// console.warn(error);
				// Alert.alert(error.errors[0].message);
				// Handle the error
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
