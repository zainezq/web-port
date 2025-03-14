const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const targetPath = './src/environments/environment.development.ts';
  const colors = require('colors');
  require('dotenv').config({
    path: 'src/.env'
  });
  const environmentContent = `export const environment = {
  firebase: {
    apiKey: "${process.env["FIREBASE_API_KEY"]}",
    authDomain: "${process.env["FIREBASE_AUTH_DOMAIN"]}",
    projectId: "${process.env["FIREBASE_PROJECT_ID"]}",
    storageBucket: "${process.env["FIREBASE_STORAGE_BUCKET"]}",
    messagingSenderId: "${process.env["FIREBASE_MESSAGING_SENDER_ID"]}",
    appId: "${process.env["FIREBASE_APP_ID"]}",
  },
};
`;
  writeFile(targetPath, environmentContent, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};
setEnv();
