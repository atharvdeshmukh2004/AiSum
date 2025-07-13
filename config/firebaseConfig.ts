// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi6l4fOSvAVpGLdQWZijRDcz80vCA0g2A",
  authDomain: "aisum-92ead.firebaseapp.com ",
  projectId: "aisum-92ead",
  storageBucket: "aisum-92ead.firebasestorage.app",
  messagingSenderId: "492241802551",
  appId: " 1:492241802551:web:d21e97731a7670293bb6b2",

  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export{auth, provider}
export const db = getFirestore(app)