import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { familia } from "./styles";
import { infopers } from "../styles";
import Icon from "../../icons";
import AddMemberModal from "./Familia/AddMemberModal";
import ConfirmModal from "./ConfirmModal";
import CardRow from "../Design/CardRow";
import fetchPost from "../../../fetching";
import { AppContext } from "../../../AppContext";

function Familia({
	data,
	selectedModal,
	height,
	width,
	openModal,
	closeModal,
	updateData,
}) {
	const { numEmp, region } = useContext(AppContext);
	const cardHeight = Math.round(height * 0.18);
	const titleHeight = Math.round(height * 0.036);

	const removeFamilyMember = async ({ pariente }) => {
		const removeFamilyQuery = {
			query: `mutation removeFamilyMember($numEmp: String!, $region: String!,  $name: String!, $date: String!) {
					removeFamilyMember(numEmp: $numEmp, region: $region, name: $name, date: $date)
				}`,
			variables: {
				numEmp: numEmp,
				region: region,
				name: pariente.nombre,
				date: pariente.fec_act,
			},
		};
		try {
			// console.log("Remove family query before passing: ", removeFamilyQuery);
			const data = await fetchPost({ query: removeFamilyQuery });
			// console.log("Data after passing: ", data);
			if (data.data.removeFamilyMember) {
				Alert.alert(
					"Informacion actualizada",
					"El miembro fue removido"
				);
				updateData();
				closeModal();
			} else {
				console.warn("Error remove family member");
			}
		} catch (error) {
			console.error("Error at remove family member", error);
		} finally {
		}
	};

	const formattedParentesco = (type, sex) => {
		switch (type) {
			case "1":
				return "Cónyuge";
			case "2":
				return sex === "F" ? "Hija" : "Hijo";
			case "3":
				return sex === "F" ? "Madre" : "Padre";
		}
	};

	return (
		<View style={[familia.familiaContainer]}>
			{/* Title */}
			<View
				style={[familia.familiaTitleContainer, { height: titleHeight }]}
			>
				<Text style={familia.familiaTitleText}>Familia</Text>
				{/* Add Button */}
				<TouchableOpacity
					onPress={() => openModal("familia")}
					style={familia.familiaAddButton}
				>
					<Text style={familia.familiaAddButtonText}>Agregar</Text>
				</TouchableOpacity>
				{selectedModal === "familia" && (
					<AddMemberModal
						onCallback={closeModal}
						onExit={closeModal}
						updateData={updateData}
					/>
				)}
			</View>

			{/* Content */}
			{data ? (
				<View style={familia.familiaContentContainer}>
					{data.map((pariente, index) => (
						<View
							key={index}
							style={[
								familia.familiaMemberContainer,
								{ height: cardHeight },
							]}
						>
							{/* Member */}
							<View style={familia.familiaMemberNameContainer}>
								<View
									style={[
										familia.familiaMemberIconContainer,
										{
											height: height * 0.05,
											width: width * 0.1,
										},
									]}
								>
									<Icon
										name="USER"
										size={18}
										style={familia.familiaMemberIcon}
									/>
								</View>
								<View
									style={familia.familiaMemberDataContainer}
								>
									<View
										style={
											familia.familiaMemberDataTextContainer
										}
									>
										<Text
											adjustsFontSizeToFit={true}
											numberOfLines={1}
											style={
												familia.familiaMemberDataText
											}
										>
											{formattedParentesco(
												pariente.parentesco,
												pariente.sexo
											)}
										</Text>
									</View>
								</View>
							</View>
							{/* Remove Button */}
							<TouchableOpacity
								onPress={() => {
									openModal("confirm"); // Open the confirmation modal
								}}
								style={familia.familiaRemoveButton}
							>
								<Text style={familia.familiaRemoveButtonText}>
									Quitar
								</Text>
							</TouchableOpacity>
							{selectedModal === "confirm" && (
								<ConfirmModal
									onCallback={closeModal}
									onExit={closeModal}
									title="Remover pariente"
									data="¿Estás seguro que deseas remover este pariente?"
									onConfirm={() =>
										removeFamilyMember({ pariente })
									}
								/>
							)}
							{/* Card Content */}
							<View style={familia.familiaCardContainer}>
								<CardRow
									title="Nombre"
									data={pariente.nombre}
								/>
								<View style={infopers.cardInfoRowContainer}>
									<View
										style={[
											infopers.cardInfoRowTitleContainer,
											{ flex: 0, width: "20%" },
										]}
									>
										<Text
											numberOfLines={1}
											style={
												infopers.cardInfoRowTitleText
											}
										>
											Fec. Nac.
										</Text>
									</View>
									<View
										style={
											infopers.cardInfoRowDataContainer
										}
									>
										<Text
											style={infopers.cardInfoRowDataText}
										>
											{pariente.fec_nac}
										</Text>
									</View>
									<View
										style={[
											infopers.cardInfoRowTitleContainer,
											{ flex: 4 },
										]}
									>
										<Text
											numberOfLines={2}
											style={
												infopers.cardInfoRowTitleText
											}
										>
											Sexo
										</Text>
									</View>
									<View
										style={[
											infopers.cardInfoRowDataContainer,
											{ flex: 8 },
										]}
									>
										<Text
											style={infopers.cardInfoRowDataText}
										>
											{pariente.sexo}
										</Text>
									</View>
								</View>
							</View>
						</View>
					))}
				</View>
			) : (
				<View style={familia.familiaContentContainer}>
					<Text>Sin registros</Text>
				</View>
			)}
		</View>
	);
}

export default Familia;
