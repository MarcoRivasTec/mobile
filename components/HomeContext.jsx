// NewContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import fetchPost from "./fetching";
import { AppContext } from "./AppContext";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
	const { region } = useContext(AppContext);
	const [data, setData] = useState({
		accessToken: "",
		numEmp: "",
		name: "",
		surname_1: "",
		surname_2: "",
		sexo: "",
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
	const [isSupervisor, setIsSupervisor] = useState(false);

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
		coment = null,
		fileName = null,
		file = null,
		dayToAdjust = null,
		period = null,
		startDate = null,
		endDate = null,
		days = null,
		requestedLoan = null,
		loanWeeks = null,
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
		// const empNum = parseInt(data.numEmp, 10);
		// const fullName2 = `${data.surname_1}${data.surname_2 !== "" ? `" "${data.surname_2}` : ""}, ${data.name}`;
		// const fullName =
		console.log(
			`Arguments:
			numEmp: ${data.numEmp},
			letter: ${letter},
			motive: ${motive},
			coment: ${coment},
			fileName: ${fileName},
			daytoadjust: ${dayToAdjust},			
			period: ${period},
			start date: ${startDate},
			end date: ${endDate},
			days: ${days},
			requestedLoan: ${requestedLoan},
			loanWeeks: ${loanWeeks}`
		);
		const requisitionQuery = {
			query: `mutation sendRequisition(
					$numEmp: String!,
					$region: String!,
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
					$days: Int,
					$requested_loan: Float,
					$loan_weeks: Int
					) {
					sendRequisition(
						numEmp: $numEmp,
						region: $region,
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
						days: $days,
						requested_loan: $requested_loan,
						loan_weeks: $loan_weeks
					) {
						pdfFile
					}
					}`,
			variables: {
				numEmp: data.numEmp,
				region: region,
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
				requested_loan: requestedLoan,
				loan_weeks: loanWeeks,
			},
		};
		try {
			// console.log("Data to be sent: ", requisitionQuery);
			const response = await fetchPost({ query: requisitionQuery });
			const pdfFile = response?.data?.sendRequisition?.pdfFile;
			console.log(
				"Response data at sendRequisition:",
				JSON.stringify(response, null, 1)
			);
			if (pdfFile) {
				// console.log(response.data.sendRequisition.pdfFile);
				return pdfFile;
			} else {
				console.warn(
					"Detail sending requisition information: ",
					response?.data
				);
				return false;
			}
		} catch (error) {
			console.error("Error sending requisition information:", error);
			return false;
		}
	};

	// useEffect(() => {
	// 	console.warn("User is supervisor: ", isSupervisor);
	// }, [isSupervisor]);

	return (
		<HomeContext.Provider
			value={{
				...data,
				setDataFields,
				isSupervisor,
				setIsSupervisor,
				profileImg,
				setProfileImg,
				sendRequisition,
			}}
		>
			{children}
		</HomeContext.Provider>
	);
};
