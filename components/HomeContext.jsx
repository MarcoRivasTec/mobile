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

	const sendRequisition = async (
		letter,
		repMotive = null,
		coment = "Pruebas",
		fileName = null,
		file = null
	) => {
		console.log(
			"Data to be sent: ",
			data.numEmp,
			data.name,
			data.surname_1,
			data.surname_2,
			letter,
			data.plantaID,
			data.turno,
			data.proyecto,
			data.puestoID,
			data.clasificacion,
			repMotive,
			coment,
			fileName,
			file
		);
		const empNum = parseInt(data.numEmp, 10);
		const fullName = `${data.name}, ${data.surname_1} ${data.surname_2}`;
		const requisitionQuery = {
			query: `mutation sendRequisition(
					$numEmp: Int!
					$name: String!
					$letter: String!
					$plantId: String!
					$shift: String!
					$project: String!
					$position: String!
					$clasification: String!
					$coment: String
					$repMotive: String
					) {
					sendRequisition(
						numEmp: $numEmp
						name: $name
						letter: $letter
						plant_id: $plant_id
						shift: $shift
						project: $project
						position: $position
						clasification: $clasification
						coment: $coment
						repMotive: $repMotive
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
			const data = await fetchPost({ requisitionQuery });
			console.log(
				"Response data at sendRequisition:",
				JSON.stringify(data.data, null, 1)
			);
			if (data.data) {
				return data.data.pdfFile;
			} else {
				console.warn(
					"Detail sending requisition information: ",
					data.data
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
