import fs from "fs";

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

fs.writeFileSync("./src/environments/environment.ts", envConfig);
console.log("✅ Successfully created environment.ts for deployment!");
