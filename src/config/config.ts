
// Contains Global Configurations
const config  = {
    firebase: {
        apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
        authDomain: import.meta.env.VITE_APP_FIREBASE_DOMAIN,
        projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_APP_FIREBASE_SENDER_ID,
        appId: import.meta.env.VITE_APP_FIREBASE_APP_ID ,
        measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
    }
}

export const service_account_config = import.meta.env.VITE_APP_FIREBASE_SERVICE_ACCOUNT

export default config;