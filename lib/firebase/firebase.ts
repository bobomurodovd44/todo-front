// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdZnuV37W4d3UlFEtv8qGmZai9zTLzwJE",
  authDomain: "auth-91487.firebaseapp.com",
  projectId: "auth-91487",
  storageBucket: "auth-91487.firebasestorage.app",
  messagingSenderId: "17553174464",
  appId: "1:17553174464:web:25c4fea5837a66fa8ea225",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
