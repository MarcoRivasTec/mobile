const fs = require("fs");
const path = require("path");

const packageJsonPath = path.resolve(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

console.log("Setting react-native-reanimated to 3.9.0-rc.1 for build");

packageJson.dependencies["react-native-reanimated"] = "3.9.0-rc.1";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
