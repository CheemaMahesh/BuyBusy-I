// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig1 = {
  apiKey: "AIzaSyCocF6SZkL1WMa9JUTRXpz14bzs1yJgDwQ",
  authDomain: "busy-buy-1.firebaseapp.com",
  projectId: "busy-buy-1",
  storageBucket: "busy-buy-1.appspot.com",
  messagingSenderId: "136663594022",
  appId: "1:136663594022:web:8e11459fab070fc941e2e7"
};

// Firebase configuration for the second app
const firebaseConfig2 = {
   apiKey: "AIzaSyCTrZmii7IObwZxWbmCI9TfRwdauN4SmaQ",
  authDomain: "blogging-app-e3676.firebaseapp.com",
  projectId: "blogging-app-e3676",
  storageBucket: "blogging-app-e3676.appspot.com",
  messagingSenderId: "1087811735223",
  appId: "1:1087811735223:web:9c3f1072d7b0f68cd18732"
};

const firebaseConfig3 = {
  apiKey: "AIzaSyC7xB4sCjOdNCQsF-Qu3XntJ1wNf97-qb0",
  authDomain: "orderids-ee26b.firebaseapp.com",
  projectId: "orderids-ee26b",
  storageBucket: "orderids-ee26b.appspot.com",
  messagingSenderId: "25546707482",
  appId: "1:25546707482:web:83fe6697a8fa5be98177a3"
};




// Initialize the first Firebase app with a unique name
const app1 = initializeApp(firebaseConfig1, "app1");

// Initialize the second Firebase app with a unique name
const app2 = initializeApp(firebaseConfig2, "app2");

// Initialize 3rd Firebase app with a unique name
const app3 = initializeApp(firebaseConfig3, "app3");

// Initialize Firebase Authentication and get a reference to the service for app1
export const auth1 = getAuth(app1);

// Initialize Firestore and get a reference to the service for app2
export const db2 = getFirestore(app2);

// Initialize Firestore and get a reference to the service for app3
export const db3 = getFirestore(app3);