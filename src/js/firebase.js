import { initializeApp } from "firebase/app";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDO-t4_N06kd-MPxb7B4hefV81IVQyOAEc",
  authDomain: "filmoteka-first-command.firebaseapp.com",
  databaseURL: "https://filmoteka-first-command-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "filmoteka-first-command",
  storageBucket: "filmoteka-first-command.appspot.com",
  messagingSenderId: "303342780153",
  appId: "1:303342780153:web:603ed5f9d4898668b22c28"
};


export function initFirebase() {
  initializeApp(FIREBASE_CONFIG);
}
