// NewContext.js
import React, { createContext, useState, useEffect } from "react";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
	const [data, setData] = useState({
		accessToken: "",
		name: "",
		surname_1: "",
		surname_2: "",
		numEmp: "", // Add numEmp to the state
		proyecto: "", // Proyecto originally contains some spaces, these are trimmed in Welcome component
		razon: "",
		puesto: "",

		planta: "",
		area: "",
		supervisor: "",
		turno: "",
		nomina: "",
	});

	useEffect(() => {
		console.log(JSON.stringify(data, null, 1));
	}, [data]);

	const setDataFields = (fields) => {
		setData((prevState) => ({ ...prevState, ...fields }));
	};

	const [profileImg, setProfileImg] = useState(null);

	const sendRequisition = async (
		// numEmp,
		// name,
		// date,
		letter,
		rh,
		advisor,
		// fileName,
		// file,
		plant,
		shift,
		project,
		position
	) => {
		const requisitionQuery = {
			query: `mutation sendRequisition($numEmp: Int!, $name: String!, $date: String!, $letter: String!, $rh: String!, $advisor: String!, $fileName: String!, $file: String!, $plant: String!, $shift: String!, $project: String!, $position: String!){
                sendRequisition(numEmp: $numEmp, name: $name, date: $date, letter: $letter, rh: $rh, advisor: $advisor, fileName: $fileName, file: $file, plant: $plant, shift: $shift, project: $project, position: $position)
            }`,
			variables: {
				numEmp: data.numEmp,
				name: data.name,
				// date: date,
				letter: letter,
				rh: rh,
				advisor: advisor,
				// fileName: fileName,
				// file: file,
				plant: plant,
				shift: shift,
				project: project,
				position: position,
			},
		};
		try {
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
