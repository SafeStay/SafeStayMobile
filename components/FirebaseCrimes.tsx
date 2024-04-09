import { getDocs, collection, addDoc, deleteDoc, DocumentSnapshot } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { Hotel } from "./HotelList";


export const fetchCrimeData = async (hotels: Hotel[]) => {
    /*     const url = "https://data.police.uk/api/crimes-street/all-crime?lat=51.509865&lng=-0.118092"
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error in hotel API fetch: " + response.statusText);
            }
        } catch (error) {
            console.error("Error fetching testcrimedata: " + error);
            throw error;
        } */
};
