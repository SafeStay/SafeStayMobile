import { getDocs, collection, addDoc, deleteDoc, DocumentSnapshot } from 'firebase/firestore';
import { Hotel } from "./HotelList";

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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


/* Fetch hotel data from API and store it to Firestore */
export const FirebaseHotels = () => {

    /* London divided into 3 rectangles */
    /* eka neliö */
    /* https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.46262867980556077,51.30131712241894,-0.252772789887299,51.662779493520524&limit=500&apiKey=83303dece118432fb31034960fd3db2d */

    /* toka neliö
south west 51.30023477208504, -0.252434756929465
north east 51.66288544904521, -0.04797358020363348

kolmas neliö 
south west 51.30023477208504, -0.0479735802036335
north east 51.66047732186025, 0.16295788692491397 */

    /* Firestoreen tallentuu liikaa dataa -> pitää korjata: poimitaan vain halutut */

    const fetchHotelData = async () => {
        //const url = "https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.519998,51.298608,0.236424,51.693031&limit=500&offset=500&apiKey=83303dece118432fb31034960fd3db2d";
        //const url = "https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.41979972616455885,51.338032257309244,0.10312635061483043,51.62147221392149&limit=500&offset=2500&apiKey=83303dece118432fb31034960fd3db2d";
        const url = "https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.46262867980556077,51.30131712241894,-0.252772789887299,51.662779493520524&limit=500&apiKey=83303dece118432fb31034960fd3db2d";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error in hotel API fetch: " + response.statusText);
            }

            const hotelData = await response.json();
            console.log("Hotel data fetched!");

            if (hotelData.features.length > 0) {
                // Promise.all waits for all async operations to complete
                await Promise.all(hotelData.features.map(async (hotel: Hotel) => {
                    try {
                        const docRef = await addDoc(collection(database, "hoteldata"), hotel.properties);
                    } catch (error) {
                        console.error("Error adding document to firestore database for hotel data: " + error);
                    }
                }));
            } else {
                console.log("No hotel data");
            }
        } catch (error) {
            console.error("Error fetching hoteldata: " + error);
            throw error;
        }
    };

    fetchHotelData();
    return null;
}

/* Delete crime data from Firestore */
export const FirebaseDeleteHotelData = () => {

    const deleteHotelData = async () => {

        try {
            // Get all documents in the "hoteldata" collection
            const querySnapshot = await getDocs(collection(database, "hoteldata"));

            // Delete each document
            querySnapshot.forEach(async (doc: DocumentSnapshot) => {
                await deleteDoc(doc.ref);
                console.log(`Document with ID ${doc.id} deleted successfully from hoteldata.`);
            });

            console.log("All documents in hoteldata collection successfully deleted.");
        } catch (error) {
            console.error("Error deleting hotel data documents: " + error);
        }
    }

    deleteHotelData();
    return null;
}

