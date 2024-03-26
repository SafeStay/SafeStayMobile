// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Text } from 'react-native';

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

return (
    <>
    <Text>Moi!</Text>
    </>
)

}

export default firebase