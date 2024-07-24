import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { area } from "./styles";
import ContentHeader from "./ContentHeader";
import CardRow from "./Design/CardRow";
import fetchPost from "../../fetching";
import LoadingContent from "../../Animations/LoadingContent";
import { AppContext } from "../../AppContext";

function Area() {
	const { numEmp } = useContext(AppContext);

	const query = {
		query: `query Area($numEmp: String!){
			Area(numEmp: $numEmp) {
					puesto
					turno
					ingreso
					nomina
					supervisor
					area
					planta
					clasificacion
			}
		}`,
		variables: {
			numEmp: numEmp,
		},
	};

	const [areaData, setArea] = useState({
		puesto: "Indefinido",
		turno: "Indefinido",
		ingreso: "Indefinido",
		nomina: "Indefinido",
		supervisor: "Indefinido",
		area: "Indefinido",
		planta: "Indefinido",
		clasificacion: "Indefinido",
	});

	// New state to manage loading
	const [isLoading, setIsLoading] = useState(true);

	// Fetch data when component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchPost({ query });
				console.log("Response data at area:", data);
				if (data.data.Area) {
					setArea(data.data.Area);
					console.log(data.data.Area);
				} else {
					console.warn("Error retrieving area information");
				}
			} catch (error) {
				console.error("Error at area:", error);
			} finally {
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
		<View style={area.container}>
			<ContentHeader title="Área" />
			<View style={area.contentContainer}>
				{/* Title */}
				<View style={area.titleContainer}>
					<Text style={area.titleText}>Información Área</Text>
				</View>
				{/* Identificacion */}
				<View style={area.cardContainer}>
					{/* Card */}
					<View style={area.cardInfoContainer}>
						<CardRow title="Puesto" data={areaData.puesto} />
						<CardRow title="Turno" data={areaData.turno} />
						<CardRow title="Ingreso" data={areaData.ingreso} />
						<CardRow title="Nomina" data={areaData.nomina} />
						<CardRow
							title="Supervisor"
							data={areaData.supervisor}
						/>
						<CardRow title="Área" data={areaData.area} />
						<CardRow title="Planta" data={areaData.planta} />
						<CardRow
							title="Clasificación"
							data={areaData.clasificacion}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Area;
