const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Paths
const packageJsonPath = path.resolve(__dirname, "..", "package.json");
const appJsonPath = path.join(__dirname, "..", 'app.json');
const envPath = path.resolve(__dirname, "../env", ".env");
let oldEndpoint = "";
const newEndpoint = `"https://api.tecmamovilconnect.com/"`;

async function loadJson(filePath) {
	return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

async function saveJson(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function updateJsonValues() {
	try {
		const appJson = await loadJson(appJsonPath);
		const packageJson = await loadJson(packageJsonPath);

		// Set fixed values (original ones from JSON files)
		appJson.expo.name = "TECMA Móvil Connect";
		appJson.expo.slug = "tecma-movil-connect";
		appJson.expo.ios.bundleIdentifier = "com.tecma.TecmaMovilConnect";
		appJson.expo.ios.infoPlist.CFBundleDisplayName = "TECMA Móvil Connect";
		appJson.expo.android.package = "com.tecma.movilconnect";
		appJson.expo.android.name = "TECMA Móvil Connect";
		appJson.expo.version = "1.0.5";

		packageJson.name = "@tecma/tecmamovilconnect";

		await saveJson(appJsonPath, appJson);
		await saveJson(packageJsonPath, packageJson);

		// 🔍 Depuración añadida aquí
		console.log("appJsonPath:", appJsonPath);
		console.log("Escritura completada, contenido grabado:");
		console.log(JSON.stringify(appJson, null, 2));

		const fileRawContent = fs.readFileSync(appJsonPath, 'utf8');
		console.log("Contenido físico de app.json tras guardado:");
		console.log(fileRawContent);
	} catch (error) {
		console.error("Error updating JSON values:", error);
	}
}

async function restoreJsonValues() {
	const appJson = await loadJson(appJsonPath);
	const packageJson = await loadJson(packageJsonPath);

	// Restore values
	appJson.expo.name = "TECMA Móvil Connect Dev";
	appJson.expo.slug = "tecma-movil-connect-dev";
	appJson.expo.version = "1.0.5dev";
	appJson.expo.ios.bundleIdentifier = "com.tecma.TecmaMovilConnectDev";
	appJson.expo.ios.infoPlist.CFBundleDisplayName = "TECMA Móvil Connect Dev";
	appJson.expo.android.package = "com.tecma.movilconnecttest";
	appJson.expo.android.name = "TECMA Móvil Connect Test";

	packageJson.name = "@tecma/tecmamovilconnecttest";

	await saveJson(appJsonPath, appJson);
	await saveJson(packageJsonPath, packageJson);
	console.log("Restored JSON values to Test configuration.");
}

// Function to update the API_ENDPOINT in the .env file
async function updateEnvApiEndpoint() {
	if (fs.existsSync(envPath)) {
		let envContent = fs.readFileSync(envPath, 'utf8');
		const currentEndpointMatch = envContent.match(/API_ENDPOINT=(.*)/);

		if (currentEndpointMatch) {
			oldEndpoint = currentEndpointMatch[1];
			fs.writeFileSync(envPath, envContent.replace(/API_ENDPOINT=.*/g, `API_ENDPOINT=${newEndpoint}`), 'utf8');
			console.log("API endpoint updated successfully.");
		}
	} else {
		console.log(".env file not found. Skipping API endpoint update.");
	}
}

async function restoreEnvApiEndpoint() {
	if (fs.existsSync(envPath) && oldEndpoint) {
		let envContent = fs.readFileSync(envPath, 'utf8');
		envContent = envContent.replace(/API_ENDPOINT=.*/g, `API_ENDPOINT=${oldEndpoint}`);
		fs.writeFileSync(envPath, envContent, 'utf8');
		console.log("API endpoint restored successfully.");
	}
}

async function updateReanimatedVersion(version) {
	const packageJson = await loadJson(packageJsonPath);
	packageJson.dependencies["react-native-reanimated"] = version;
	await saveJson(packageJsonPath, packageJson);
	console.log(`Updated react-native-reanimated to version ${version}`);
}

// Function to run a command and handle errors
function runCommand(command) {
	try {
		execSync(command, { stdio: "inherit" });
	} catch (error) {
		console.error(`Error occurred: ${error.message}`);
		process.exit(1);
	}
}

// Set name and those of packages/identifiers to production values
async function prepareForBuild() {
	await updateJsonValues();
}

// Determine which command to run
const isAndroidPrebuild = process.env.EXPO_PREBUILD_ANDROID;
const isAndroidPrebuildClean = process.env.EXPO_PREBUILD_ANDROID_CLEAN;
const isIOSPrebuild = process.env.EXPO_IOS_PREBUILD;
const isIOSPrebuildClean = process.env.EXPO_PREBUILD_IOS_CLEAN;
const isEASBuild = process.env.EAS_BUILD;
let command = "";

if (isAndroidPrebuild) {
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

// Run the prebuild or build command
(async function main() {
	if (command) {
		try {
			// Await configuration updates
			await prepareForBuild();          // Ensures updateJsonValues completes
			await updateEnvApiEndpoint();           // This is synchronous
			console.log("Setting react-native-reanimated to 3.9.0-rc.1 for build");
			await updateReanimatedVersion("3.9.0-rc.1");

			// Now, execute the build command
			runCommand(command);
		} finally {
			console.log("Restoring react-native-reanimated to 3.10.1");
			await updateReanimatedVersion("3.10.1");
			console.log("Restoring original API_ENDPOINT");
			await restoreEnvApiEndpoint();
			await restoreJsonValues();  // Await if restoreJsonValues is async
		}
	} else {
		console.log("No build command found. Skipping build.");
	}
})();