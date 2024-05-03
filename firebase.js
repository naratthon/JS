const { initializeApp } = require("firebase/app");
const { errorHandler } = require("./helpers");
const { getFirestore, doc, setDoc} = require("firebase/firestore")


const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
} = process.env;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

let app;
let firestoreDb;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore();
        return app;
    } catch (error) {
        errorHandler(error, "firebase-initializeFirebaseApp");
    }
};

const uploadProcessedData = async () => {
    const dataToUpload = {
        Air_pressure: 500,
        Humidity: 123,
        Rain_prop: 10,
        Temperature: 20,
        Time: new Date(),
    };

    try {
        const document = doc(firestoreDb, "sensors", "today");
        let dataUpdated = await setDoc(document, dataToUpload);
        return dataUpdated;
    } catch (error) {
        errorHandler(error, "firebase-uploadProcessedData");
    }
};


const getFirebaseApp = () => app;

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp,
    uploadProcessedData,
};
