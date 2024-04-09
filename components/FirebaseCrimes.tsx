import { getDocs, collection, addDoc, deleteDoc, DocumentSnapshot } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { Hotel } from "./Interface";
import { Crime } from "./Interface";

 export const fetchCrimeData = async () => {
    try {
      // Haetaan hotellien sijaintitiedot Firestoresta
      const hotelsSnapshot = await getDocs(collection(database, "hoteldata"));
      
      // Muunnetaan hotellien sijaintitiedot haluttuun muotoon
      const hotelLocations = hotelsSnapshot.docs.map(doc => {
        const data = doc.data();
        return { lat: data.lat, lon: data.lon }; // Olettaen, että hotellit tallennetaan lat-lng -muodossa
      });
  
      // Käydään läpi hotellien sijaintitiedot ja haetaan rikokset näiden sijaintien perusteella
      hotelLocations.forEach(async (location) => {
        const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${location.lat}&lng=${location.lon}`;
        
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Error in crime API fetch: " + response.statusText);
          }
          const crimeData = await response.json();
          
          // Lisätään rikosdokumentit Firestoreen
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
        } catch (error) {
          console.error("Error fetching crimedata1: " + error);
          throw error;
        }
      });
    } catch (error) {
      console.error("Error fetching hotel data2: " + error);
      throw error;
    }
    fetchCrimeData();
    return null;
  };