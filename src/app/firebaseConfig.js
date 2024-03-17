import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBBKiq2d514EUIUHME3RcGltgHc7LOQwmg",
  authDomain: "esp32-73f59.firebaseapp.com",
  databaseURL: "https://esp32-73f59-default-rtdb.firebaseio.com/",
  projectId: "esp32-73f59",
  storageBucket: "esp32-73f59.appspot.com",
  messagingSenderId: "894597913280",
  appId: "1:894597913280:web:c20c35102130bd737dab25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };