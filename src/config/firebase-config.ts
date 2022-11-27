import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import {initializeApp} from "firebase/app"
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";
import {AppConfig} from "./app-config";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDW4YcWgKqSKNDhwg9_dHEYSVOKDEaG5gw",
    authDomain: "espresso-taxi-web.firebaseapp.com",
    projectId: "espresso-taxi-web",
    storageBucket: "espresso-taxi-web.appspot.com",
    messagingSenderId: "69089911121",
    appId: "1:69089911121:web:a625509b2dff665d617370"
};
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);
if (AppConfig.isEmulatorMode) {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
}
