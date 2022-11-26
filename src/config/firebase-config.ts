import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import {initializeApp} from "firebase/app"
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";
import {AppConfig} from "./app-config";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcTmJFadajAHt_mLjPZGuteN3UnUmGgw4",
    authDomain: "espresso-paris-transfer.firebaseapp.com",
    projectId: "espresso-paris-transfer",
    storageBucket: "espresso-paris-transfer.appspot.com",
    messagingSenderId: "146903883327",
    appId: "1:146903883327:web:82a30d4e75752aa2e9628a"
};
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);
if (AppConfig.isEmulatorMode) {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
}
