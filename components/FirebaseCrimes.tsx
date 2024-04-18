import { doc, getDoc, setDoc, deleteField, collection, addDoc, deleteDoc, DocumentSnapshot } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { HotelFS } from "./Interface";

/* Fetches crimes within 1 mile radius from hotel's location and updates the data to hotel documents in Firestore */
export const fetchCrimeData = async (hotels: HotelFS[]) => {
    try {
        // Loop through each hotel object in hotels array
        for (const hotel of hotels) {
            // Construct the URL with the current hotel's lat and lon values
            const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${hotel.lat}&lng=${hotel.lon}`;

            // Fetch crime data from the crimeAPI
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error fetching crime data in fetchCrimeData function: " + response.statusText);
            }

            const crimeData = await response.json();

            // Clean up and extract relevant data from the response
            const cleanedCrimeData = crimeData.map((crime: any) => ({
                category: crime.category,
                lat: crime.location.latitude,
                lon: crime.location.longitude,
                month: crime.month
            }));

            // Update hotel document in Firestore
            if (hotel.id) {
                await updateHotelDocument(hotel.id, cleanedCrimeData);
            } else {
                console.error("Hotel ID is undefined in fetchCrimeData.");
            }
        }
        console.log("Crime data fetched and hotels updated successfully.");
    } catch (error) {
        console.error("Error fetching crime data in fetchCrimeData:", error);
        throw error;
    }
};

/* Find the correct hotel document from Firetore */
const updateHotelDocument = async (hotelId: string, crimeData: any[]) => {
    try {
        // Get the reference to the hotel document in Firestore
        const hotelRef = doc(database, "hotels11", hotelId);

        // Get the current snapshot of the hotel document
        const snapshot = await getDoc(hotelRef);
        if (!snapshot.exists()) {
            console.error("Hotel document does not exist.");
            return;
        }

        // Update the hotel document with the crime data and total crimes count
        const hotelData = snapshot.data();
        const updatedHotelData = {
            ...hotelData,
            crimes: crimeData,
            crimesTotal: crimeData.length // Calculate total crimes count
        };

        // Update the hotel document in Firestore
        await setDoc(hotelRef, updatedHotelData);
    } catch (error) {
        console.error("Error updating hotel document in updateHotelDocument:", error);
        throw error;
    }
};