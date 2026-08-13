import React, { useContext, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { menu } from "./styles";
import SectionButton from "./Menu/SectionButton";
import { AppContext } from "../../AppContext";
import { HomeContext } from "../../HomeContext";

const BUTTONS_PER_ROW = 3;
const ROWS_PER_PAGE = 4;
const BUTTONS_PER_PAGE = BUTTONS_PER_ROW * ROWS_PER_PAGE;

const PAGE_TOP_PADDING = 12;
const PAGE_BOTTOM_PADDING = 28;
const ROW_GAP = 15;

const chunkArray = (items, chunkSize) => {
	const chunks = [];

	for (let index = 0; index < items.length; index += chunkSize) {
		chunks.push(items.slice(index, index + chunkSize));
	}

	return chunks;
};

function Menu({ changeContent, navigation }) {
	const { region } = useContext(AppContext);
	const { menuButtons } = useContext(HomeContext);

	const [menuSize, setMenuSize] = useState({
		width: 0,
		height: 0,
	});

	const [currentPage, setCurrentPage] = useState(0);

	console.log("Region is:", region);

	const allButtons = useMemo(
		() =>
			[
				menuButtons.checkin && {
					id: "checkin",
					title: "Check In",
					iconLibrary: "AD",
					icon: "qrcode",
					onPress: () => changeContent("CheckIn"),
				},
				menuButtons.badge && {
					id: "badge",
					title: "Gafete Digital",
					iconLibrary: "AD",
					icon: "qrcode",
					onPress: () => navigation.navigate("GafeteQR"),
				},
				menuButtons.payroll && {
					id: "payroll",
					title: "Recibo de Nómina",
					icon: "RECIBO_NOM",
					onPress: () => changeContent("ReciboNom"),
				},
				menuButtons.prepayroll && {
					id: "prepayroll",
					title: "Prenómina",
					icon: "PRENOMINA",
					onPress: () => changeContent("Prenomina"),
				},
				menuButtons.absenteeism && {
					id: "absenteeism",
					title: "Solicitudes",
					icon: "SOLICITUDES",
					onPress: () => changeContent("Solicitudes"),
				},
				menuButtons.loans && {
					id: "loans",
					title: "Préstamos",
					icon: "PRESTAMOS",
					onPress: () => changeContent("Prestamos"),
				},
				menuButtons.savings && {
					id: "savings",
					title: "Retiro de Ahorro",
					icon: "RETIRO_AHORRO",
					onPress: () => changeContent("RetiroAhorro"),
				},
				menuButtons.letters && {
					id: "letters",
					title: "Cartas",
					icon: "CARTAS",
					onPress: () => changeContent("Cartas"),
				},
				menuButtons.replacements && {
					id: "replacements",
					title: "Reposiciones",
					icon: "REPOSICIONES",
					onPress: () => changeContent("Reposiciones"),
				},
				menuButtons.vacations && {
					id: "vacations",
					title: "Vacaciones",
					icon: "VACACIONES",
					onPress: () => changeContent("Vacaciones"),
				},
				menuButtons.policies && {
					id: "policies",
					title: "Pólizas",
					icon: "POLIZAS",
					onPress: () => changeContent("Polizas"),
				},
				menuButtons.opinion && {
					id: "opinion",
					title: "Opiniones",
					icon: "OPINIONES",
					onPress: () => changeContent("Opiniones"),
				},

				// Add more buttons here:
				menuButtons.denounces && {
					id: "denounces",
					title: "Línea de Denuncias",
					icon: "DENUNCIA",
					onPress: () => changeContent("LineaDenuncia"),
				},
			].filter(Boolean),
		[menuButtons, changeContent, navigation],
	);

	/*
	 * Each entry in pages contains up to 12 buttons.
	 *
	 * Page 1: buttons 1–12
	 * Page 2: buttons 13–24
	 * Page 3: buttons 25–36
	 */
	const pages = useMemo(
		() => chunkArray(allButtons, BUTTONS_PER_PAGE),
		[allButtons],
	);

	const handleLayout = (event) => {
		const { width, height } = event.nativeEvent.layout;

		setMenuSize({
			width,
			height,
		});
	};

	const handleScrollEnd = (event) => {
		if (!menuSize.width) {
			return;
		}

		const horizontalOffset = event.nativeEvent.contentOffset.x;
		const pageIndex = Math.round(horizontalOffset / menuSize.width);

		setCurrentPage(pageIndex);
	};

	const renderPage = ({ item: pageButtons, index: pageIndex }) => {
		const rows = chunkArray(pageButtons, BUTTONS_PER_ROW);

		const availableHeight =
			menuSize.height -
			PAGE_TOP_PADDING -
			PAGE_BOTTOM_PADDING -
			ROW_GAP * (ROWS_PER_PAGE - 1);

		const rowHeight = availableHeight / ROWS_PER_PAGE;

		return (
			<View
				style={[
					menu.page,
					{
						width: menuSize.width,
						height: menuSize.height,
						paddingTop: PAGE_TOP_PADDING,
						paddingBottom: PAGE_BOTTOM_PADDING,
					},
				]}
			>
				{rows.map((row, rowIndex) => (
					<View
						key={`page-${pageIndex}-row-${rowIndex}`}
						style={[
							menu.row,
							{
								height: rowHeight,
								marginBottom: rowIndex < rows.length - 1 ? ROW_GAP : 0,

								justifyContent:
									row.length < BUTTONS_PER_ROW ? "center" : "flex-start",
							},
						]}
					>
						{row.map((button, buttonIndex) => (
							<View key={button.id} style={menu.buttonSlot}>
								<SectionButton
									title={button.title}
									icon={button.icon}
									iconLibrary={button.iconLibrary}
									rowHeight={rowHeight}
									onPress={button.onPress}
									delay={
										(pageIndex * BUTTONS_PER_PAGE +
											rowIndex * BUTTONS_PER_ROW +
											buttonIndex) *
										30
									}
								/>
							</View>
						))}
					</View>
				))}
			</View>
		);
	};

	return (
		<View style={menu.container} onLayout={handleLayout}>
			{menuSize.width > 0 && menuSize.height > 0 && (
				<>
					<FlatList
						data={pages}
						horizontal
						pagingEnabled
						renderItem={renderPage}
						keyExtractor={(_, index) => `menu-page-${index}`}
						showsHorizontalScrollIndicator={false}
						onMomentumScrollEnd={handleScrollEnd}
						decelerationRate="fast"
						bounces={false}
						getItemLayout={(_, index) => ({
							length: menuSize.width,
							offset: menuSize.width * index,
							index,
						})}
					/>

					{pages.length > 1 && (
						<View style={menu.pagination}>
							{pages.map((_, index) => (
								<View
									key={`page-indicator-${index}`}
									style={[
										menu.paginationDot,
										index === currentPage && menu.paginationDotActive,
									]}
								/>
							))}
						</View>
					)}
				</>
			)}
		</View>
	);
}

export default Menu;
