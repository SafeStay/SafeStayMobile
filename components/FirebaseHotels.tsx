import { getDocs, collection, addDoc, deleteDoc, DocumentSnapshot } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { HotelFromAPI } from "./Interface";


/* Fetch hotel data from API and store it to Firestore */
export const FirebaseHotels = () => {
    /* London divided into rectangles;
    1.0:
    https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.46262867980556077,51.30131712241894,-0.252772789887299,51.662779493520524&limit=500&apiKey=83303dece118432fb31034960fd3db2d
       
    2.1:
    https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.252434756929465,51.30023477208504,-0.04797358020363348,51.48156&limit=500&apiKey=83303dece118432fb31034960fd3db2d
    
    3.0:
    https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.0479735802036335,51.30023477208504,0.16295788692491397,51.66047732186025&limit=500&apiKey=83303dece118432fb31034960fd3db2d 
    
    2.2.1:
    https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.252434756929465,51.48156,-0.150204,51.66288544904521&limit=500&apiKey=83303dece118432fb31034960fd3db2d

    2.2.2:
    https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.150204,51.48156,-0.04797358020363348,51.66288544904521&limit=500&apiKey=83303dece118432fb31034960fd3db2d

    */

    const url =
        "https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=rect:-0.150204,51.48156,-0.04797358020363348,51.66288544904521&limit=500&apiKey=83303dece118432fb31034960fd3db2d";

    const fetchHotelData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error in hotel API fetch: " + response.statusText);
            }

            const hotelData = await response.json();
            console.log("Hotel data fetched!");

            if (hotelData.features.length > 0) {
                // Promise.all waits for all async operations to complete
                await Promise.all(
                    hotelData.features.map(async (hotel: HotelFromAPI) => {
                        try {
                            if (
                                hotel.properties.name &&
                                hotel.properties.address_line2 &&
                                hotel.properties.county &&
                                hotel.properties.postcode &&
                                hotel.properties.street &&
                                hotel.properties.lat &&
                                hotel.properties.lon
                            ) {
                                const hotelProperties: HotelFromAPI["properties"] = {
                                    name: hotel.properties.name,
                                    address_line2: hotel.properties.address_line2,
                                    county: hotel.properties.county,
                                    postcode: hotel.properties.postcode,
                                    street: hotel.properties.street,
                                    lat: hotel.properties.lat,
                                    lon: hotel.properties.lon,
                                    website: hotel.properties.website
                                        ? hotel.properties.website
                                        : "",
                                };
                                const docRef = await addDoc(
                                    collection(database, "hotels11"),
                                    hotelProperties
                                );
                            } else {
                                console.log("Skipped a hotel due to missing information.");
                            }
                        } catch (error) {
                            console.error(
                                "Error adding document to firestore database for hotel data: " +
                                error
                            );
                        }
                    })
                );
                console.log("All hotel documents added to Firestore.");
            } else {
                console.log("No hotel data");
            }
        } catch (error) {
            console.error("Error fetching hotel data: " + error);
            throw error;
        }
    };

    fetchHotelData();
    return null;
};

/* Delete hotel data from Firestore */
export const FirebaseDeleteHotelData = () => {
    const deleteHotelData = async () => {
        try {
            // Get all documents in the "testhoteldata" collection
            const querySnapshot = await getDocs(collection(database, "hotels11"));

            // Delete each document
            querySnapshot.forEach(async (doc: DocumentSnapshot) => {
                await deleteDoc(doc.ref);
            });
            console.log(
                "All documents in hotels11 collection successfully deleted."
            );
        } catch (error) {
            console.error("Error deleting hotel data documents: " + error);
        }
    };
    deleteHotelData();
    return null;
};
