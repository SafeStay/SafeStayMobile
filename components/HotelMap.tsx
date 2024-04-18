import { collection, getDocs } from "firebase/firestore";
import { HotelFS } from "./Interface";
import { database } from "./FirebaseConfig";

/* Fetch hoteldata from Firestore to app */
export const fetchHotelDataFromFirestore = async (): Promise<HotelFS[]> => {
  try {
    const querySnapshot = await getDocs(collection(database, "hotels11"));
    const hotelData: HotelFS[] = [];
    querySnapshot.forEach((doc) => {
      const hotelDoc = doc.data() as HotelFS;

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
