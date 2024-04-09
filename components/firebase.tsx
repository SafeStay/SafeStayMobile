import { Crime } from './Interface';
import { getDocs, collection, addDoc, deleteDoc, DocumentSnapshot } from 'firebase/firestore';
import { database } from "./FirebaseConfig";


/* Fetch crime data from API and store it to Firestore */
export const Firebase = () => {

  const fetchCrimeData = async () => {
    const url: string = "https://data.police.uk/api/crimes-street/all-crime?lat=51.509865&lng=-0.118092";
    try {
      const response: Response = await fetch(url)
      if (!response.ok) {
        throw new Error("Error in crime API fetch: " + response.statusText);
      }
      const crimeData: Crime[] = await response.json();
      console.log("Crime data fetched!");

      // Add crime objects as documents to Firestore collection crimedata 
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

  // fetchCrimeData();
  // return null;
}

/* Delete crime data from Firestore */
export const FirebaseDeleteCrimeData = () => {

  const deleteCrimeData = async () => {

    try {
      // Get all documents in the "crimedata" collection
      const querySnapshot = await getDocs(collection(database, "crimedata"));

      // Delete each document
      querySnapshot.forEach(async (doc: DocumentSnapshot) => {
        await deleteDoc(doc.ref);
        console.log(`Document with ID ${doc.id} deleted successfully from crimedata.`);
      });

      console.log("All documents in crimedata collection successfully deleted.");
    } catch (error) {
      console.error("Error deleting crimedata documents: " + error);
    }
  }

  deleteCrimeData();
  return null;
}

