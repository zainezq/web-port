export const environment = {
  production: true,
  firebase: {
    apiKey: (window as any).process.env.VITE_FIREBASE_API_KEY,
    authDomain: (window as any).process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: (window as any).process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: (window as any).process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: (window as any).process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: (window as any).process.env.VITE_FIREBASE_APP_ID,
    measurementId: (window as any).process.env.VITE_FIREBASE_MEASUREMENT_ID
  }
};
