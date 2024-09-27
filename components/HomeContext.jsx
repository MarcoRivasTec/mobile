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
		motive = null,
		coment = "TEST",
		fileName = null,
		file = null,
		dayToAdjust = null,
		period = null,
		startDate = null,
		endDate = null,
		days = null,
	} = {}) => {
		let fullName;
		if (data.surname_1 !== "" && data.surname_2 !== "") {
			fullName = `${data.surname_1} ${data.surname_2}, ${data.name}`;
		}
		if (data.surname_1 !== "" && data.surname_2 === "") {
			fullName = `${data.surname_1}, ${data.name}`;
		}
		if (data.surname_1 === "" && data.surname_2 !== "") {
			fullName = `${data.surname_2}, ${data.name}`;
		}
		if (data.surname_1 === "" && data.surname_2 === "") {
			fullName = data.name;
		}
		const empNum = parseInt(data.numEmp, 10);
		// const fullName2 = `${data.surname_1}${data.surname_2 !== "" ? `" "${data.surname_2}` : ""}, ${data.name}`;
		// const fullName =
		console.log(
			"Arguments: ",
			letter,
			motive,
			coment,
			fileName,
			file,
			dayToAdjust,
			period
		);
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
					$motive: String,
					$fileName: String,
					$file: String,
					$day_to_adjust: String,
					$period: Int,
					$start_date: String,
					$end_date: String,
					$days: Int
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
						motive: $motive,
						fileName: $fileName,
						file: $file,
						day_to_adjust: $day_to_adjust,
						period: $period,
						start_date: $start_date,
						end_date: $end_date,
						days: $days
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
				motive: motive,
				coment: coment,
				fileName: fileName,
				file: file,
				day_to_adjust: dayToAdjust,
				period: period,
				start_date: startDate,
				end_date: endDate,
				days: days,

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
