// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbqdt96oKddPyiO6J9x9YYZA8sGQFG1wY",
  authDomain: "secondbrainlabs-6f844.firebaseapp.com",
  projectId: "secondbrainlabs-6f844",
  storageBucket: "secondbrainlabs-6f844.appspot.com",
  messagingSenderId: "252336056462",
  appId: "1:252336056462:web:742eec75d03ffff473c1df",
  measurementId: "G-8J0BVRRD5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth};