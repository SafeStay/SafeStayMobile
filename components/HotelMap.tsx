import { collection, getDocs } from "firebase/firestore";
import { Hotel } from "./HotelList";
import { database } from "./FirebaseConfig";

/* Fetch hoteldata from Firestore */
export const fetchHotelDataFromFirestore = async (): Promise<Hotel[]> => {
  try {
    const querySnapshot = await getDocs(collection(database, "testhoteldata"));
    const hotelData: Hotel[] = [];
    querySnapshot.forEach((doc) => {
      const hotelDoc = doc.data() as Hotel;

      hotelDoc.id = doc.id;
      hotelData.push(hotelDoc);
    });
    return hotelData;
  } catch (error) {
    console.error("Error fetching hotel data from Firestore:", error);
    throw error;
  }
};

export default fetchHotelDataFromFirestore;
