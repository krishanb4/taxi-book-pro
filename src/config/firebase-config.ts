import {getFirestore} from 'firebase/firestore';
import {initializeApp} from "firebase/app"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQ5k7q5gKOYmbNf5O7HjNapE4Ic5jkKlY",
    authDomain: "taxi-book-pro.firebaseapp.com",
    projectId: "taxi-book-pro",
    storageBucket: "taxi-book-pro.appspot.com",
    messagingSenderId: "256189431652",
    appId: "1:256189431652:web:001cacb4d01caa82d70471"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
