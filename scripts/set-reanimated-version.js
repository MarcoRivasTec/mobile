const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Paths
const packageJsonPath = path.resolve(__dirname, "..", "package.json");
const envFilePath = path.resolve(__dirname, "../env", ".env");

// Function to update the reanimated version
function updateReanimatedVersion(version) {
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
	packageJson.dependencies["react-native-reanimated"] = version;
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Function to update the API_ENDPOINT in the .env file
function updateEnvApiEndpoint(newEndpoint) {
	let envContent = fs.readFileSync(envFilePath, "utf-8");
	envContent = envContent.replace(
		/API_ENDPOINT=.*/,
		`API_ENDPOINT=${newEndpoint}`
	);
	fs.writeFileSync(envFilePath, envContent);
	console.log(`API_ENDPOINT updated to ${newEndpoint}`);
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

// Store the original API_ENDPOINT
const originalEndpoint = `"http://201.174.7.187:8083/papitecma"`;
const newEndpoint = `"https://api.tecmamovilconnect.com/"`;

// Update API_ENDPOINT before build
updateEnvApiEndpoint(newEndpoint);

// Update the version to 3.9.0-rc.1
console.log("Setting react-native-reanimated to 3.9.0-rc.1 for build");
updateReanimatedVersion("3.9.0-rc.1");

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
if (command) {
	try {
		runCommand(command);
	} finally {
		// Restore the version and API_ENDPOINT after the build process
		console.log("Restoring react-native-reanimated to 3.10.1");
		updateReanimatedVersion("3.10.1");
		console.log("Restoring original API_ENDPOINT");
		updateEnvApiEndpoint(originalEndpoint);
	}
} else {
	console.log("No build command found. Skipping build.");
}
