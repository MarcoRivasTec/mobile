// NewContext.js
import React, { createContext, useState, useEffect } from "react";
import fetchPost from "./fetching";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
	const [data, setData] = useState({
		accessToken: "",
		numEmp: "",
		name: "",
		surname_1: "",
		surname_2: "",
		razon: "",

		planta: "",
		plantaID: "",
		area: "",
		proyecto: "",
		supervisor: "",
		nomina: "",
		puesto: "",
		puestoID: "",
		turno: "",
		clasificacion: "",
	});

	useEffect(() => {
		console.log(JSON.stringify(data, null, 1));
	}, [data]);

	const setDataFields = (fields) => {
		setData((prevState) => ({ ...prevState, ...fields }));
	};

	const [profileImg, setProfileImg] = useState(null);

	const sendRequisition = async ({
		letter,
		repMotive = null,
		coment = "TEST",
		fileName = null,
		file = null,
	} = {}) => {
		const empNum = parseInt(data.numEmp, 10);
		const fullName = `${data.name}, ${data.surname_1} ${data.surname_2}`;
		console.log("Arguments: ", letter, repMotive, coment, fileName, file);
		const requisitionQuery = {
			query: `mutation sendRequisition(
					$numEmp: Int!,
					$name: String!,
					$letter: String!,
					$plant_id: String!,
					$shift: String!,
					$project: String!,
					$position: String!,
					$clasification: String!,
					$coment: String,
					$repMotive: String,
					$fileName: String,
					$file: String,
					) {
					sendRequisition(
						numEmp: $numEmp,
						name: $name,
						letter: $letter,
						plant_id: $plant_id,
						shift: $shift,
						project: $project,
						position: $position,
						clasification: $clasification,
						coment: $coment,
						repMotive: $repMotive,
						fileName: $fileName,
						file: $file
					) {
						pdfFile
					}
					}`,
			variables: {
				numEmp: empNum,
				name: fullName,
				letter: letter,
				plant_id: data.plantaID,
				shift: data.turno,
				project: data.proyecto,
				position: data.puestoID,
				clasification: data.clasificacion,
				repMotive: repMotive,
				coment: coment,
				fileName: fileName,
				file: file,
			},
		};
		try {
			// console.log("Data to be sent: ", requisitionQuery);
			const response = await fetchPost({ query: requisitionQuery });
			console.log(
				"Response data at sendRequisition:",
				JSON.stringify(response.data, null, 1)
			);
			if (response.data) {
				// console.log(response.data.sendRequisition.pdfFile);
				return response.data.sendRequisition.pdfFile;
			} else {
				console.warn(
					"Detail sending requisition information: ",
					response.data
				);
				return false;
			}
		} catch (error) {
			console.error("Error sending requisition information:", error);
		}
	};

	return (
		<HomeContext.Provider
			value={{
				...data,
				setDataFields,
				profileImg,
				setProfileImg,
				sendRequisition,
			}}
		>
			{children}
		</HomeContext.Provider>
	);
};
