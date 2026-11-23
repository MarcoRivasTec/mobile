import { requireOptionalNativeModule } from "expo";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert, Platform } from "react-native";

const deviceCredential = requireOptionalNativeModule("TecmaDeviceCredential");
const promptMessage = "Confirma tu identidad para iniciar sesión";

const biometricLabels = {
	[LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION]:
		Platform.OS === "ios" ? "Face ID" : "Reconocimiento facial",
	[LocalAuthentication.AuthenticationType.FINGERPRINT]:
		Platform.OS === "ios" ? "Touch ID" : "Huella digital",
	[LocalAuthentication.AuthenticationType.IRIS]: "Reconocimiento de iris",
};

const getLoginMethods = async () => {
	const [level, hasDeviceCredential, types] = await Promise.all([
		LocalAuthentication.getEnrolledLevelAsync(),
		deviceCredential?.isAvailableAsync() ?? false,
		LocalAuthentication.supportedAuthenticationTypesAsync(),
	]);
	const { NONE, SECRET } = LocalAuthentication.SecurityLevel;

	if (!hasDeviceCredential) {
		return level === NONE
			? []
			: [{ id: "system", label: "Desbloquear con el teléfono" }];
	}

	const methods = [];
	if (level > SECRET) {
		methods.push({
			id: "biometrics",
			label: types.length === 1 ? biometricLabels[types[0]] ?? "Biometría" : "Biometría",
		});
	}
	methods.push({
		id: "deviceCredential",
		label: Platform.OS === "ios" ? "Código del iPhone" : "Bloqueo de pantalla",
	});

	return methods;
};

const selectLoginMethod = (methods) => {
	if (methods.length === 1) return Promise.resolve(methods[0].id);

	return new Promise((resolve) => {
		Alert.alert(
			"Iniciar sesión con el teléfono",
			"Selecciona cómo quieres confirmar tu identidad.",
			[
				{ text: "Cancelar", style: "cancel", onPress: () => resolve(null) },
				...methods.map(({ id, label }) => ({
					text: label,
					onPress: () => resolve(id),
				})),
			],
			{ cancelable: false },
		);
	});
};

export const authenticateWithDevice = async () => {
	if (Platform.OS !== "ios" && Platform.OS !== "android") return "unavailable";

	const methods = await getLoginMethods();
	if (methods.length === 0) return "unavailable";

	const method = await selectLoginMethod(methods);
	if (!method) return "cancelled";
	if (method === "deviceCredential") {
		return deviceCredential.authenticateAsync(promptMessage);
	}

	const biometricsOnly = method === "biometrics";
	const result = await LocalAuthentication.authenticateAsync({
		promptMessage,
		fallbackLabel: biometricsOnly ? "" : "Usar código del dispositivo",
		cancelLabel: "Cancelar",
		disableDeviceFallback: biometricsOnly,
	});
	if (result.success) return "success";
	if (["user_cancel", "app_cancel", "system_cancel"].includes(result.error)) {
		return "cancelled";
	}
	return "failed";
};
