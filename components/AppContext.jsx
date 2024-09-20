import React, { createContext, useEffect, useState } from "react";
import * as Device from "expo-device";
import { Dimensions } from "react-native";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const { width, height } = Dimensions.get("screen");
	const [info, setInfo] = useState({
		// accessToken: "",
		// name: "",
		numEmp: "", // Add numEmp to the state
		platform: "",
		// deviceName: null,
		deviceType: null,
		brand: null,
		model: null,
		systemVersion: null,
		width: width,
		height: height,

		// proyecto: "",
		// razon: "",
		// puesto: "",
	});

	const setInfoFields = (fields) => {
		setInfo((prevState) => ({ ...prevState, ...fields }));
	};

	useEffect(() => {
		const fetchDeviceInfo = async () => {
			// const deviceName = Device.deviceName;
			const deviceType =
				Device.deviceType === 1
					? "PHONE"
					: Device.deviceType === 2
					? "TABLET"
					: "DESKTOP";
			const brand = Device.brand;
			const model = Device.modelName;
			const systemVersion = Device.osVersion;

			setInfoFields({
				// deviceName: deviceName,
				deviceType: deviceType,
				brand: brand,
				model: model,
				systemVersion: systemVersion,
			});
		};

		fetchDeviceInfo();
	}, []);

	useEffect(() => {
		console.log("Info has changed: ", JSON.stringify(info, null, 1));
	}, [info]);

	return (
		<AppContext.Provider value={{ ...info, setInfoFields }}>
			{children}
		</AppContext.Provider>
	);
};
