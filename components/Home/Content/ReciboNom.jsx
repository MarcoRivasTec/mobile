import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { reciboNom } from "./styles";
import ContentHeader from "./ContentHeader";
import ButtonInfo from "./Buttons/ButtonInfo";
import Icon from "../icons";
import COLORS from "../../../constants/colors";
import fetchPost from "../../fetching";
import { AppContext } from "../../AppContext";
import LoadingContent from "../../Animations/LoadingContent";
//import HistorialModal from "./Vacaciones/HistorialModal";

function ReciboNom() {
	const { numEmp } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);
	const [fondoAhorro, setFondoAhorro] = useState({
		saldo_ca: 0,
		saldo_fa: 0,
		saldo_pr: 0,
	});

	// New state to manage loading

	// Fetch data when component mounts
	useEffect(() => {
		const fetchData = async () => {
			const query = {
				query: `query FondoAhorro($numEmp: String!){
					FondoAhorro(numEmp: $numEmp) {
						saldo_fa
						saldo_ca
						saldo_pr
					}
				}`,
				variables: {
					numEmp: numEmp,
				},
			};
			try {
				const data = await fetchPost({ query });
				console.log("Response data at fondo ahorro:", data);
				if (data.data.FondoAhorro) {
					setFondoAhorro(data.data.FondoAhorro);
					// setDiasVacs(data.data.Vacaciones.diasvacs);
				} else {
					console.warn("Error retrieving fondo ahorro information");
				}
			} catch (error) {
				console.error("Error at fondo ahorro:", error);
			} finally {
				// console.log(diasVacs.disponibles);
				setIsLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchData();
	}, [numEmp]); // Dependency array includes numEmp to refetch data if numEmp changes

	// Render loading or error state if data is not yet available
	if (isLoading) {
		return <LoadingContent />;
	}

	return (
		<View style={reciboNom.container}>
			<ContentHeader title="Recibo de Nómina"></ContentHeader>
			<View style={reciboNom.sectionContainer}>
				<View style={reciboNom.sectionTitleContainer}>
					<Text style={{ fontSize: 22, fontWeight: "bold" }}>
						Fondo de Ahorro
					</Text>
				</View>
				<View style={reciboNom.sectionButtonContainer}>
					<ButtonInfo data={fondoAhorro.saldo_fa} title="Acumulado" />
					<ButtonInfo
						data={fondoAhorro.saldo_pr}
						title="Saldo préstamo ahorro"
					/>
					{fondoAhorro.saldo_ca != 0 ? (
						<ButtonInfo
							data={fondoAhorro.saldo_ca}
							title="Caja de Ahorro"
						/>
					) : (
						<View style={{ flex: 1 }} />
					)}
				</View>
			</View>
			<View style={reciboNom.nominaContainer}>
				{/* Barra Busqueda */}
				<View style={reciboNom.nominaHeader}>
					<TouchableOpacity style={reciboNom.nominaYearContainer}>
						<View style={reciboNom.nominaSearchIconContainer}>
							<Icon
								name="search"
								size={13}
								style={reciboNom.nominaSearchIcon}
							></Icon>
						</View>
						<Text style={reciboNom.nominaSearchText}>2023</Text>
					</TouchableOpacity>
					<TouchableOpacity style={reciboNom.nominaWeekContainer}>
						<View style={reciboNom.nominaSearchIconContainer}>
							<Icon
								name="search"
								size={13}
								style={reciboNom.nominaSearchIcon}
							></Icon>
						</View>
						<Text style={reciboNom.nominaSearchText}>
							Semana 09
						</Text>
					</TouchableOpacity>
				</View>

				{/* Cantidades */}
				<View style={reciboNom.nominaCantidadContainer}>
					<TouchableOpacity
						style={reciboNom.nominaCantidadElementContainer}
					>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>
								Percepciones
							</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>$5,954</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							reciboNom.nominaCantidadElementContainer,
							{ backgroundColor: COLORS.flatlistElement1 },
						]}
					>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>
								Deducciones
							</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>
								$939.99
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={reciboNom.nominaCantidadElementContainer}
					>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidadTitle}>
								Neto
							</Text>
						</View>
						<View style={reciboNom.nominaCantidadBox}>
							<Text style={reciboNom.nominaCantidad}>$5,015</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default ReciboNom;
