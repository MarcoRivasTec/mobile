import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { menu } from "./styles";
import SectionButton from "./Menu/SectionButton";
import { AppContext } from "../../AppContext";
import { HomeContext } from "../../HomeContext";

function Menu({ changeContent, navigation }) {
	const { region } = useContext(AppContext);
	const { menuButtons } = useContext(HomeContext);
	const [menuHeight, setMenuHeight] = useState(0);
	console.log("Region is: ", region);

	const allButtons = [
		menuButtons.badge && {
			title: "Gafete Digital",
			iconLibrary: "AD",
			icon: "qrcode",
			onPress: () => navigation.navigate("GafeteQR"),
		},
		menuButtons.payroll && {
			title: "Recibo de Nómina",
			icon: "RECIBO_NOM",
			onPress: () => changeContent("ReciboNom"),
		},
		menuButtons.prepayroll && {
			title: "Prenómina",
			icon: "PRENOMINA",
			onPress: () => changeContent("Prenomina"),
		},
		menuButtons.absenteeism && {
			title: "Solicitudes",
			icon: "SOLICITUDES",
			onPress: () => changeContent("Solicitudes"),
		},
		menuButtons.loans && {
			title: "Préstamos",
			icon: "PRESTAMOS",
			onPress: () => changeContent("Prestamos"),
		},
		menuButtons.savings && {
			title: "Retiro de Ahorro",
			icon: "RETIRO_AHORRO",
			onPress: () => changeContent("RetiroAhorro"),
		},
		menuButtons.letters && {
			title: "Cartas",
			icon: "CARTAS",
			onPress: () => changeContent("Cartas"),
		},
		menuButtons.replacements && {
			title: "Reposiciones",
			icon: "REPOSICIONES",
			onPress: () => changeContent("Reposiciones"),
		},
		menuButtons.vacations && {
			title: "Vacaciones",
			icon: "VACACIONES",
			onPress: () => changeContent("Vacaciones"),
		},
		menuButtons.policies && {
			title: "Pólizas",
			icon: "POLIZAS",
			onPress: () => changeContent("Polizas"),
		},
		menuButtons.denounces && {
			title: "Línea de Denuncias",
			icon: "DENUNCIA",
			onPress: () => changeContent("LineaDenuncia"),
		},
		menuButtons.opinion && {
			title: "Opiniones",
			icon: "OPINIONES",
			onPress: () => changeContent("Opiniones"),
		},
	].filter(Boolean);

	const rows = [];
	for (let i = 0; i < allButtons.length && i < 12; i += 3) {
		rows.push(allButtons.slice(i, i + 3));
	}

	return (
		<View
			onLayout={(event) => {
				const { height } = event.nativeEvent.layout;
				setMenuHeight(height);
			}}
			style={[menu.container]}
		>
			{menuHeight > 0 &&
				rows.map((row, rowIndex) => (
					<View
						key={rowIndex}
						style={[
							menu.row,
							{
								// marginVertical: 50,
								height:
									rows.length === 4 ? menuHeight * 0.22 : menuHeight * 0.24,
								marginVertical: "2%",
								justifyContent:
									row.length === 1
										? "center"
										: row.length === 2
										? ""
										: "space-between",
							},
						]}
					>
						{row.map((btn, i) => (
							<SectionButton
								key={i}
								title={btn.title}
								icon={btn.icon}
								iconLibrary={btn.iconLibrary}
								menuHeight={menuHeight}
								onPress={btn.onPress}
								delay={(rowIndex * 3 + i) * 30} // stagger each by 100ms
							/>
						))}
					</View>
				))}
		</View>
	);
}

export default Menu;
