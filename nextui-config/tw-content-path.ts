import fs from "fs";

// Read package.json file
const packageJsonPath = "./package.json";
const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
const packageJson = JSON.parse(packageJsonContent);

// Extract NextUI components from dependencies
const nextuiComponents = Object.keys(packageJson.dependencies)
    .filter(
        (dep) =>
            dep.startsWith("@nextui-org/") &&
            dep !== "@nextui-org/system" &&
            dep !== "@nextui-org/theme",
    )
    .map((dep) => dep.split("/")[1])
    .join("|");

export const nextuiTailwindContentPath = `./node_modules/@nextui-org/theme/dist/components/(${nextuiComponents}).js`;
