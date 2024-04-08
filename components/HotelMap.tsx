import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Hotel } from "./HotelList";
import { database } from "./FirebaseConfig";

/* const firebaseConfig = {
  apiKey: "AIzaSyCBglf_YB8g22SMyReWSLVHF5CB4Xapdgo",
  authDomain: "safestay-93c0d.firebaseapp.com",
  databaseURL:
    "https://safestay-93c0d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "safestay-93c0d",
  storageBucket: "safestay-93c0d.appspot.com",
  messagingSenderId: "47383716792",
  appId: "1:47383716792:web:2bf84d57b08843f2e2254d",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app); */


export const fetchHotelDataFromFirestore = async (): Promise<Hotel[]> => {
  try {
    const querySnapshot = await getDocs(collection(database, "hoteldata"));
    const hotelData: Hotel[] = [];
    querySnapshot.forEach((doc) => {
      hotelData.push(doc.data() as Hotel);
    });
    console.log("Hotel data fetched from Firestore:", hotelData);
    return hotelData;
  } catch (error) {
    console.error("Error fetching hotel data from Firestore:", error);
    throw error;
  }
};

fetchHotelDataFromFirestore();

export default fetchHotelDataFromFirestore;
