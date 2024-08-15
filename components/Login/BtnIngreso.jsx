import { Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import { layout } from "./styles";
import React, { useContext, useState } from "react";
import fetchPost from "../fetching";
import Loading from "../Animations/Loading";
import { AppContext } from "../AppContext";

function Ingresar({ nip, navigation }) {
	const { numEmp, setFields } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);

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
		fetchPost({ query })
			.then((data) => {
				setIsLoading(false);
				// console.log("Response data at ingresoo: ", data);
				if (data.data.login !== null) {
					setFields({
						name: data.data.login.name,
						accessToken: data.data.login.token,
					});
					navigation.replace("Welcome");
				}
				if (data.errors) {
					Alert.alert(data.errors[0].message);
				}
			})
			.catch((error) => {
				if (error) {
					console.error("Error at ingreso", error);
				}
				// Alert.alert(error.errors[0].message);
				// Handle the error
			})
			.finally(() => {
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
