import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { Dimensions } from "react-native";
import { polizas } from "./styles";
import ContentHeader from "./ContentHeader";
import Poliza from "./Polizas/Poliza";
import { AppContext } from "../../AppContext";
import fetchPost from "../../fetching";
import LoadingContent from "../../Animations/LoadingContent";

function Polizas() {
	const { width, height } = Dimensions.get("window");
	const { region } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const [policies, setPolicies] = useState([]);

	useEffect(() => {
		const getPolicies = async () => {
			setIsLoading(true);

			const policiesQuery = {
				query: `query Policies($region: String!) {
					Policies(region: $region) {
						success
						message
						data {
						id
						status
						policy
						icon
						line_1
						line_2
						line_3
						ref_1
						ref_2
						ref_3
						ref_4
						icon_ref_1
						icon_ref_2
						icon_ref_3
						icon_ref_4
						}
					}
				}`,
				variables: {
					region: region,
				},
			};
			try {
				const response = await fetchPost({ query: policiesQuery });
				console.log("Response data is: ", JSON.stringify(response, null, 1));
				if (response && response.data.Policies.success) {
					setPolicies(response.data.Policies.data);
				} else {
					Alert.alert(
						"Error",
						"Hubo un problema al obtener las pólizas, inténtalo de nuevo."
					);
					console.warn("Detail retrieving policies: ", response?.data);
				}
			} catch (error) {
				console.error("Error retrieving policies information:", error);
			}
			setIsLoading(false);
		};
		getPolicies();
	}, []);

	return (
		<View style={polizas.container}>
			<ContentHeader title="Pólizas" />
			{isLoading ? (
				<View style={polizas.contentContainer}>
					<LoadingContent />
				</View>
			) : policies.length > 0 ? (
				<View style={polizas.contentContainer}>
					<ScrollView
						contentContainerStyle={polizas.scrollContentContainer}
						style={polizas.scrollContainer}
					>
						{policies.map((policy) => (
							<Poliza
								key={policy.id} // Unique key for each item
								width={width}
								height={height}
								title={policy.policy} // Dynamic title
								icon={policy.icon} // Dynamic icon
								line_1={policy.line_1}
								line_2={policy.line_2}
								line_3={policy.line_3}
								ref_1={policy.ref_1}
								ref_2={policy.ref_2}
								ref_3={policy.ref_3}
								ref_4={policy.ref_4}
								icon_ref_1={policy.icon_ref_1}
								icon_ref_2={policy.icon_ref_2}
								icon_ref_3={policy.icon_ref_3}
								icon_ref_4={policy.icon_ref_4}
							/>
						))}
						{/* Polizas */}
						{/* <Poliza
							width={width}
							height={height}
							title="Dental"
							icon="DENTAL"
							size={20}
							info1="Dra. Verónica Álvarez"
							info2="Ave. del Granjero #6965 Esquina con Bulgaria"
							info3="Fraccionamiento Oasis Sur"
							contact1="(656) 620 51 88"
							contact2="(656) 276 48 89"
						/>
						<Poliza
							width={width}
							height={height}
							title="Anteojos"
							icon="OPTICA"
							size={12}
							info1="Av. Juárez No. 614, esquina con Colón"
							info2="Lunes a Sábado de 9:00 am a 6:00"
							info3="Domingo 10:00 am a 3:00 pm"
							contact1="(656) 612 89 54"
							contact2="optica.realvision@yahoo.com.mx"
							contactIcon2="mail-outline"
						/>
						<Poliza
							width={width}
							height={height}
							title="Seguro de Auto"
							icon="AUTO"
							info1="Magaly Franco Gonzalez"
							contact1="(614) 239 56 55"
							contact2="(656) 649 10 00 Ext. 1498"
							contact3="mfranco@intercam.com.mx"
							contactIcon3="mail-outline"
						/> */}
					</ScrollView>
				</View>
			) : (
				<View style={polizas.contentContainer}>
					<View style={polizas.titleContainer}>
						<Text style={polizas.titleText}>
							No existen pólizas para mostrar por el momento
						</Text>
					</View>
				</View>
			)}
		</View>
	);
}

export default Polizas;
