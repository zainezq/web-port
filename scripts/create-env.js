const fs = require("fs");
require("dotenv").config();

const envConfig = `export const environment = {
  production: true,
  firebase: {
    apiKey: "${process.env.VITE_FIREBASE_API_KEY}",
    authDomain: "${process.env.VITE_FIREBASE_AUTH_DOMAIN}",
    projectId: "${process.env.VITE_FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.VITE_FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.VITE_FIREBASE_APP_ID}",
    measurementId: "${process.env.VITE_FIREBASE_MEASUREMENT_ID}"
  }
};`;

// Write environment.ts
fs.writeFileSync("./src/environments/environment.ts", envConfig);
console.log("✅ environment.ts file generated!");
