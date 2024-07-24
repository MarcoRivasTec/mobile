import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [info, setInfo] = useState({
		accessToken:
			"",
		name: "",
		numEmp: "", // Add numEmp to the state
		proyecto: "",
		razon: "",
		puesto: "",
	});

	// const [info, setInfo] = useState({
	// 	accessToken:
	// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTQzMjcsIm5hbWUiOiJNQVJDT1MiLCJpYXQiOjE3MTk1OTE3MTgsImV4cCI6MTcxOTU5NTMxOH0.1dqxePDn9VcszLI4OLeVOQTdKA9I_cIlJq8K0hkYLg4",
	// 	name: "MARCOS",
	// 	numEmp: "94327", // Add numEmp to the state
	// 	proyecto: "H03",
	// });
	const [profileImg, setProfileImg] = useState(null);

	useEffect(() => {
		console.log("Info has changed: ", info);
	}, [info]);

	const setFields = (fields) => {
		setInfo((prevState) => ({ ...prevState, ...fields }));
	};

	return (
		<AppContext.Provider value={{ ...info, profileImg, setProfileImg, setFields }}>
			{children}
		</AppContext.Provider>
	);
};
