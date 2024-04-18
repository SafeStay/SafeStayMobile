import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: `${process.env.FIREBASEAPIKEY}` ,
    authDomain: "safestay-93c0d.firebaseapp.com",
    databaseURL: "https://safestay-93c0d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "safestay-93c0d",
    storageBucket: "safestay-93c0d.appspot.com",
    messagingSenderId: "47383716792",
    appId: "1:47383716792:web:2bf84d57b08843f2e2254d"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);