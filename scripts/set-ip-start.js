const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

function getLocalIp() {
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
			if (iface.family === "IPv4" && !iface.internal) {
				return iface.address;
			}
		}
	}
	return "localhost"; // Fallback in case no IP is found
}

// Paths
const envFilePath = path.resolve(__dirname, "../env", ".env");

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
const originalEndpoint = `https://api.tecmamovilconnect.com/`;
const localIp = getLocalIp();
const testPort = 8083;
const newEndpoint = `http://${localIp}:${testPort}/papitecma`;
console.log("Endpoint in use: ", newEndpoint)

// Update API_ENDPOINT before build F
updateEnvApiEndpoint(newEndpoint);

let command = "npx expo start -c";

// Run the prebuild or build command
if (command) {
	try {
		runCommand(command);
	} finally {
		// Restore the version and API_ENDPOINT after the build process
		console.log("Restoring original API_ENDPOINT...");
		updateEnvApiEndpoint(originalEndpoint);
	}
} else {
	console.log("No command found, skipping.");
}
