// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Text } from 'react-native';
import { useEffect, useState } from "react";
import { Crime } from "./CrimeFetch";
import { getDatabase, ref, push, onValue, DataSnapshot, remove } from "firebase/database";

const firebase: React.FC = () => {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBglf_YB8g22SMyReWSLVHF5CB4Xapdgo",
  authDomain: "safestay-93c0d.firebaseapp.com",
  databaseURL: "https://safestay-93c0d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "safestay-93c0d",
  storageBucket: "safestay-93c0d.appspot.com",
  messagingSenderId: "47383716792",
  appId: "1:47383716792:web:2bf84d57b08843f2e2254d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const [streetCrimes, setStreetCrimes] = useState<Crime[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreetCrimes = async () => {
      try {
        const response = await fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=51.509865&lng=-0.118092`);
        if (!response.ok) {
          throw new Error('Failed to fetch street crimes');
        }
        const data: Crime[] = await response.json();

        // Save data to Firebase Realtime Database
        //const crimesRef = ref((database, '/streetCrimes'), streetCrimes);
        await push(ref(database, '/streetCrimes'), streetCrimes);

        setStreetCrimes(data);
      } catch (error) {
        console.error('Error fetching street crimes:', error);
        setError((error as Error).message || 'An error occurred');
      }
    };

    fetchStreetCrimes();
  }, []);

  //'51.509865', '-0.118092'



return (
    <>
    <Text>Moi!</Text>
    </>
)

}

export default firebase