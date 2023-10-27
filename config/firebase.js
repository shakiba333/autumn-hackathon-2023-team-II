// import firebase from "firebase";
// import Constants from "expo-constants";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDytX0WT8hgfyoWuZLAcVT4ZXWApAKVVoo",
  authDomain: "autumn-hackathon-2023-team-2.firebaseapp.com",
  projectId: "autumn-hackathon-2023-team-2",
  storageBucket: "autumn-hackathon-2023-team-2.appspot.com",
  messagingSenderId: "848983060500",
  appId: "1:848983060500:web:460b842ffefc5329f33701",
  measurementId: "G-XVR8EZM0BT"
};




  const Firebase = initializeApp(firebaseConfig);
  const db = getFirestore(Firebase)

  export { Firebase, db };
