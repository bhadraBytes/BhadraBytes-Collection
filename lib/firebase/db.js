// db.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHzNTx6B2mBtJzpLGY_H-v_DMzyn4skPY",
  authDomain: "heads-tailsauthentication.firebaseapp.com",
  projectId: "heads-tailsauthentication",
  storageBucket: "heads-tailsauthentication.appspot.com",
  messagingSenderId: "242595930964",
  appId: "1:242595930964:web:709260e4057234572adec1",
  measurementId: "G-339XC8VV63",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Ensure you are using getFirestore to initialize the Firestore


export { db }; // Export the db object
