import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export const biometricAuthenticate = async () => {
	const hasHardware = await LocalAuthentication.hasHardwareAsync();
	const isSupported =
		await LocalAuthentication.supportedAuthenticationTypesAsync();
	const isEnrolled = await LocalAuthentication.isEnrolledAsync();

	if (!hasHardware || !isEnrolled || isSupported.length === 0) {
		Alert.alert("Error", "No tienes biometría configurada o tu dispositivo no es compatible.");
		return;
	}

	const result = await LocalAuthentication.authenticateAsync({
		promptMessage: "Autenticación biométrica",
		fallbackLabel: "Introduce tu PIN",
		cancelLabel: "Cancelar",
		disableDeviceFallback: false, // Allows fallback to device passcode
	});

	if (result.success) {
		return true;
	} else {
		return false;
	}
};
