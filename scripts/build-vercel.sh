#!/bin/bash
echo '{
  "firebase": {
    "apiKey": "'$VITE_FIREBASE_API_KEY'",
    "authDomain": "'$VITE_FIREBASE_AUTH_DOMAIN'",
    "projectId": "'$VITE_FIREBASE_PROJECT_ID'",
    "storageBucket": "'$VITE_FIREBASE_STORAGE_BUCKET'",
    "messagingSenderId": "'$VITE_FIREBASE_MESSAGING_SENDER_ID'",
    "appId": "'$VITE_FIREBASE_APP_ID'",
    "measurementId": "'$VITE_FIREBASE_MEASUREMENT_ID'"
  }
}' > src/assets/config.json

npm run build
