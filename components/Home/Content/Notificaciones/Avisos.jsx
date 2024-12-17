import { View, Text } from "react-native";
import { avisos } from "./styles";
import LoadingContent from "../../../Animations/LoadingContent";

function Avisos({ isLoading }) {
	return isLoading ? (
		<View style={avisos.container}>
			<LoadingContent />
		</View>
	) : (
		<View style={avisos.container}>
			<View style={avisos.titleContainer}>
				<Text style={avisos.titleText}>No hay avisos disponibles</Text>
			</View>
		</View>
	);
}

export default Avisos;
