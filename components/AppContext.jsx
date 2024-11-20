import React, { createContext, useEffect, useState } from "react";
import * as Device from "expo-device";
import { Dimensions, Platform } from "react-native";
import appConfig from "../app.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { defUsr } from "../defaultValues";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const { width, height } = Dimensions.get("screen");
	const [info, setInfo] = useState({
		// accessToken: "",
		// name: "",
		numEmp: "", // Add numEmp to the state
		region: "",
		platform: Platform.OS,
		// deviceName: null,
		deviceType: null,
		brand: null,
		model: null,
		systemVersion: null,
		width: width,
		height: height,
		appVersion: appConfig.expo.version,
		playStoreURI: "market://details?id=com.tecma.TECMAMovilConnect",
		appStoreURI: "https://apps.apple.com/app/id6736772143",

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

		const loadCredentials = async () => {
			try {
				const storedNumEmp = await AsyncStorage.getItem("storedNumEmp");
				if (storedNumEmp) setInfoFields({ numEmp: storedNumEmp });
				// const storedRegion = await AsyncStorage.getItem("storedRegion");
				// if (storedRegion) setInfoFields({ region: storedRegion });
			} catch (error) {
				console.error("Failed to load stored employee number: ", error);
			}
		};

		fetchDeviceInfo();
		loadCredentials();
	}, []);

	// useEffect(() => {
	// 	console.log("Info has changed: ", JSON.stringify(info, null, 1));
	// }, [info]);

	return (
		<AppContext.Provider value={{ ...info, setInfoFields }}>
			{children}
		</AppContext.Provider>
	);
};
