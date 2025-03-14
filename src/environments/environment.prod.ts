// environment.prod.ts
export const environment = {
  production: true,
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || 'default_prod_api_key',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'default_prod_auth_domain',
    projectId: process.env.FIREBASE_PROJECT_ID || 'default_prod_project_id',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'default_prod_storage_bucket',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'default_prod_messaging_sender_id',
    appId: process.env.FIREBASE_APP_ID || 'default_prod_app_id',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'default_prod_measurement_id',
  },
};
