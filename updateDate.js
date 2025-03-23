const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src/app/entities/sidebar/sidebar.component.ts");

const currentDate = new Date().toISOString();

let fileContent = fs.readFileSync(filePath, "utf8");

fileContent = fileContent.replace(
  /lastUpdated:\s*Date\s*=\s*new\s*Date\([^)]*\);/,
  `lastUpdated: Date = new Date('${currentDate}');`
);

fs.writeFileSync(filePath, fileContent);

console.log("✅ lastUpdated timestamp updated:", currentDate);
