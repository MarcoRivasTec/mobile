import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [info, setInfo] = useState({
		accessToken: "",
		name: "",
		numEmp: "94327", // Add numEmp to the state
		proyecto: "",
	});

	const setFields = (fields) => {
		setInfo((prevState) => ({ ...prevState, ...fields }));
	};

	return (
		<AppContext.Provider value={{ ...info, setFields }}>
			{children}
		</AppContext.Provider>
	);
};
