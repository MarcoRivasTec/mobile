import React from "react";
import { View } from "react-native";
import SVGLogo from "../../assets/LOGOTECMAMOVIL.svg";
import { contentRenderer } from "./styles";
import Menu from "./Content/Menu";
import Vacaciones from "./Content/Vacaciones";
import ReciboNom from "./Content/ReciboNom";
import Prenomina from "./Content/Prenomina";
import Solicitudes from "./Content/Solicitudes";
import InfoPers from "./Content/InfoPers";
import Area from "./Content/Area";
import Polizas from "./Content/Polizas";
import Prestamos from "./Content/Prestamos";
import Opiniones from "./Content/Opiniones";
import Cartas from "./Content/Cartas";
import Reposiciones from "./Content/Reposiciones";
import Redes from "./Content/Redes";
import LineaDenuncia from "./Content/LineaDenuncia";
import Directorio from "./Content/Directorio";
import TecmaIdeas from "./Content/TecmaIdeas";

function ContentRenderer({ content, changeContent }) {
	function renderContent() {
		switch (content) {
			case "Menu":
				return <Menu changeContent={changeContent} />;

			case "InfoPers":
				return <InfoPers />;
			case "Area":
				return <Area />;
			case "Redes":
				return <Redes />;
			case "Ideas":
				return <TecmaIdeas />;
			case "Directorio":
				return <Directorio />;

			case "Vacaciones":
				return <Vacaciones />;
			case "ReciboNom":
				return <ReciboNom />;
			case "Prenomina":
				return <Prenomina />;
			case "Solicitudes":
				return <Solicitudes />;
			case "Prestamos":
				return <Prestamos />;
			// case "Retiro":
			// 	return <Retiro />;

			case "Cartas":
				return <Cartas />;
			case "Reposiciones":
				return <Reposiciones />;
			case "LineaDenuncia":
				return <LineaDenuncia />;
			case "Polizas":
				return <Polizas />;
			case "Opiniones":
				return <Opiniones />;
			// case "CambioNIP":
			// 	return <CambioNIP />;
			default:
				return null;
		}
	}

	return (
		<View style={contentRenderer.container}>
			<SVGLogo
				height="55%"
				width="55%"
				style={contentRenderer.svg}
			></SVGLogo>
			{renderContent()}
		</View>
	);
}

export default ContentRenderer;
