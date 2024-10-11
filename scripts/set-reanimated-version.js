const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Path to your package.json file
const packageJsonPath = path.resolve(__dirname, "..", "package.json");

// Function to update the reanimated version
function updateReanimatedVersion(version) {
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
	packageJson.dependencies["react-native-reanimated"] = version;
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
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

// Update the version to 3.9.0-rc.1
console.log("Setting react-native-reanimated to 3.9.0-rc.1 for build");
updateReanimatedVersion("3.9.0-rc.1");

// Determine which command to run
const isPrebuild = process.env.EXPO_PREBUILD;
const isPrebuildClean = process.env.EXPO_PREBUILD_CLEAN;
const isEASBuild = process.env.EAS_BUILD;
let command = "";

if (isPrebuild) {
	command = "npx expo prebuild --platform android";
} else if (isPrebuildClean) {
	command = "npx expo prebuild --clean --platform android";
} else if (isEASBuild) {
	command = "eas build --profile preview --platform android";
}

// Run the prebuild or build command
if (command) {
	try {
		runCommand(command);
	} finally {
		// Restore the version to 3.10.1 after the build process
		console.log("Restoring react-native-reanimated to 3.10.1");
		updateReanimatedVersion("3.10.1");
	}
} else {
	console.log("No build command found. Skipping build.");
}
