const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

// Paths
const packageJsonPath = path.resolve(__dirname, "..", "package.json");
const appJsonPath = path.join(__dirname, "..", 'app.json');
const envPath = path.resolve(__dirname, "../env", ".env");
const prodEndpoint = "https://api.tecmamovilconnect.com/";
const testPort = 8083;

async function loadJson(filePath) {
	return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

async function saveJson(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function updateJsonValues(mode) {
	try {
		console.log("\n\nUpdating JSON values...\n");
		const appJson = await loadJson(appJsonPath);
		console.warn("Json data is: ", appJson);
		const packageJson = await loadJson(packageJsonPath);

		if (mode === "dev") {
			appJson.expo.name = "TECMA Móvil Connect Dev";
			appJson.expo.slug = "tecma-movil-connect-dev";
			appJson.expo.version = "1.0.5dev";
			appJson.expo.icon = "./assets/icon-dev.png";
			appJson.expo.splash.image = "./assets/icon-dev.png";
			appJson.expo.android.adaptiveIcon.foregroundImage = "./assets/icon-dev.png";
			appJson.expo.ios.bundleIdentifier = "com.tecma.TecmaMovilConnectDev";
			appJson.expo.ios.infoPlist.CFBundleDisplayName = "TECMA Móvil Connect Dev";
			appJson.expo.android.package = "com.tecma.movilconnecttest";
			appJson.expo.android.name = "TECMA Móvil Connect Test";
			packageJson.name = "@tecma/tecmamovilconnecttest";
			
		} else if (mode === "prod") {
			
			appJson.expo.name = "TECMA Móvil Connect";
			appJson.expo.slug = "tecma-movil-connect";
			appJson.expo.version = "1.0.5";
			appJson.expo.icon = "./assets/icon.png";
			appJson.expo.splash.image = "./assets/icon.png";
			appJson.expo.android.adaptiveIcon.foregroundImage = "./assets/adaptive-icon.png";
			appJson.expo.ios.bundleIdentifier = "com.tecma.TecmaMovilConnect";
			appJson.expo.ios.infoPlist.CFBundleDisplayName = "TECMA Móvil Connect";
			appJson.expo.android.package = "com.tecma.movilconnect";
			appJson.expo.android.name = "TECMA Móvil Connect";
			packageJson.name = "@tecma/tecmamovilconnect";
		}

		await saveJson(appJsonPath, appJson);
		await saveJson(packageJsonPath, packageJson);

		// Debug logs
		// console.log("appJsonPath:", appJsonPath);
		// console.log("Escritura completada, contenido grabado:");
		// console.log(JSON.stringify(appJson, null, 2));

		const fileRawContent = fs.readFileSync(appJsonPath, 'utf8');
		console.log("\n\nContenido físico de app.json tras guardado:");
		console.log(fileRawContent);
	} catch (error) {
		console.error("Error updating JSON values:", error);
	}
}

async function updateEnvApiEndpoint(endpoint) {
	if (fs.existsSync(envPath)) {
		let envContent = fs.readFileSync(envPath, "utf-8");
		envContent = envContent.replace(
			/API_ENDPOINT=.*/,
			`API_ENDPOINT=${endpoint}`
		);
		fs.writeFileSync(envPath, envContent);
		console.log(`API_ENDPOINT updated to ${endpoint}`);
	} else {
		console.log(".env file not found. Skipping API endpoint update.");
	}
}

async function updateReanimatedVersion(version) {
	const packageJson = await loadJson(packageJsonPath);
	packageJson.dependencies["react-native-reanimated"] = version;
	await saveJson(packageJsonPath, packageJson);
	console.log(`Updated react-native-reanimated to version ${version}`);
}

async function getLocalIp() {
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
			if (iface.family === "IPv4" && !iface.internal) {
				return iface.address;
			}
		}
	}
	return "localhost";
}

async function runCommandFresh(command) {
	return new Promise((resolve, reject) => {
		// We create a new environment by copying process.env.
		// You can add or override environment variables as needed.
		const env = { ...process.env };

		// spawn the command with a shell,
		// stdio: "inherit" streams stdout/stderr from the child process to the parent.
		const child = spawn(command, { shell: true, env, stdio: "inherit" });

		child.on("close", (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`Process exited with code ${code}`));
			}
		});
		child.on("error", (error) => {
			reject(error);
		});
	});
}

const isAndroidDev = process.env.DEV_MODE_ANDROID;
const isAndroidRun = process.env.DEV_MODE_ANDROID_RUN;
const isIOSDev = process.env.DEV_MODE_IOS;

const isAndroidPrebuild = process.env.EXPO_PREBUILD_ANDROID;
const isAndroidPrebuildClean = process.env.EXPO_PREBUILD_ANDROID_CLEAN;
const isIOSPrebuild = process.env.EXPO_IOS_PREBUILD;
const isIOSPrebuildClean = process.env.EXPO_PREBUILD_IOS_CLEAN;
const isEASBuild = process.env.EAS_BUILD;
let command = "";

if (isAndroidDev) {
	command = "npx expo start -c --dev-client";
} else if (isAndroidRun) {
	command = "npx expo run:android -d";
} else if (isIOSDev) {
	command = "npx expo run:ios -d";
} else if (isAndroidPrebuild) {
	command = "npx expo prebuild --platform android";
} else if (isAndroidPrebuildClean) {
	command = "npx expo prebuild --clean --platform android";
} else if (isIOSPrebuild) {
	command = "npx expo prebuild --platform ios";
} else if (isIOSPrebuildClean) {
	command = "npx expo prebuild --clean --platform ios";
} else if (isEASBuild) {
	command = "eas build --profile preview --platform android";
}

(async function main() {
	if (command) {
		if (isAndroidPrebuild || isAndroidPrebuildClean || isIOSPrebuild || isIOSPrebuildClean || isEASBuild) {
			try {
				console.warn("\n\nRunning prebuild mode...");
				console.log("\nUpdating JSON values for prebuild...");
				await updateJsonValues("prod");
				console.log("\nSetting react-native-reanimated to 3.9.0-rc.1 for build");
				await updateReanimatedVersion("3.9.0-rc.1");
				console.log("\nUpdating API endpoint to production...");
				await updateEnvApiEndpoint(prodEndpoint);

				const appJson = await loadJson(appJsonPath);
				console.warn("Json expo version: ", appJson.expo.version);

				console.warn("\n\nRunning command for prod mode");
				// Use runCommandFresh here instead of runCommandAsync
				await runCommandFresh(command);
			} catch (error) {
				console.error("Error while running command:", error);
				process.exit(1);
			} finally {
				console.log("\nRestoring react-native-reanimated to 3.10.1");
				await updateReanimatedVersion("3.10.1");
				console.log("\nFinished prebuild process.");
			}
		} else if (isAndroidDev || isAndroidRun || isIOSDev) {
			try {
				console.warn("\n\nRunning dev mode...");

				// 🧹 Delete android folder if it exists (only for dev mode)
				const androidPath = path.resolve(__dirname, "..", "android");
				if (fs.existsSync(androidPath)) {
					console.log("Deleting existing android folder...");
					fs.rmSync(androidPath, { recursive: true, force: true });
					console.log("Android folder deleted.");
				}

				console.log("\nUpdating JSON values for dev...");
				await updateJsonValues("dev");
				// console.log("\nSetting react-native-reanimated to 3.10.1 for dev");
				// await updateReanimatedVersion("3.10.1");
				console.log("\nUpdating API endpoint to dev...");
				const localIp = await getLocalIp();
				const devEndpoint = `http://${localIp}:${testPort}/papitecma`;
				await updateEnvApiEndpoint(devEndpoint);

				console.warn("\n\nRunning command for dev mode");
				// Use runCommandFresh here as well
				await runCommandFresh(command);
			} catch (error) {
				console.error("Error while running command:", error);
				process.exit(1);
			}
		}
	} else {
		console.log("No build command found. Skipping build.");
	}
})();

