const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'}); ;

const envFile = `export const environment = {
    API_KEY: '${process.env.API_KEY}',
    AUTH_DOMAIN: '${process.env.AUTH_DOMAIN}',
    PROJECT_ID: '${process.env.PROJECT_ID}',
    STORAGE_BUCKET: '${process.env.STORAGE_BUCKET}',
    MESSAGING_SENDER_ID: '${process.env.MESSAGING_SENDER_ID}',
    APP_ID: '${process.env.APP_ID}',
    MEASUREMENT_ID: '${process.env.MEASUREMENT_ID}'
};
`;

const targetPath = path.join(__dirname, './src/environments/environment.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
  }
});
