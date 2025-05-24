const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'});

const filePath = path.join(__dirname, "src/app/entities/sidebar/sidebar.component.ts");

const currentDate = new Date().toISOString();

let fileContent = fs.readFileSync(filePath, "utf8");

fileContent = fileContent.replace(
  /lastUpdated:\s*Date\s*=\s*new\s*Date\([^)]*\);/,
  `lastUpdated: Date = new Date('${currentDate}');`
);

fs.writeFileSync(filePath, fileContent);

console.log("✅ lastUpdated timestamp updated:", currentDate);

const envFile = `export const environment = {
  production: false,
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    measurementId: '${process.env.MEASUREMENT_ID}'
  }
};`;


const targetPath = path.join(__dirname, './src/environments/environment.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
  }
});

