import { initializeApp } from "firebase/app";
import { useState } from "react";
import { Crime } from "./CrimeFetch";
import { getDatabase, ref, push, onValue, DataSnapshot, remove } from "firebase/database";
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

/* Crime datan lisääminen Firestoreen */
const Firebase: React.FC = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyCBglf_YB8g22SMyReWSLVHF5CB4Xapdgo",
    authDomain: "safestay-93c0d.firebaseapp.com",
    databaseURL: "https://safestay-93c0d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "safestay-93c0d",
    storageBucket: "safestay-93c0d.appspot.com",
    messagingSenderId: "47383716792",
    appId: "1:47383716792:web:2bf84d57b08843f2e2254d"
  };

  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);

  const fetchCrimeData = async () => {

    const url: string = "https://data.police.uk/api/crimes-street/all-crime?lat=51.509865&lng=-0.118092";
    try {
      const response: Response = await fetch(url)
      if (!response.ok) {
        throw new Error("Error in crime API fetch: " + response.statusText);
      }
      const crimeData: Crime[] = await response.json();
      console.log("Crime data fetched!");

      /* Add crime objects as documents to Firestore collection crimedata */
      if (crimeData.length > 0) {
        crimeData.forEach(async (crime: Crime) => {
          try {
            const docRef = await addDoc(collection(database, "crimedata"), crime);
          } catch (error) {
            console.error("Error adding document to firestore database for crimedata: " + error);
          }
        });
      } else {
        console.log("No crimedata");
      }
    }
    catch (error) {
      console.error("Error fetching crimedata: " + error);
      throw error;
    }

  };

  fetchCrimeData();
  return null;
}


export default Firebase;