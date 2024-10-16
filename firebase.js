import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { collection, addDoc ,getDocs,updateDoc, doc} from 'firebase/firestore'; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {

    apiKey: "AIzaSyDv3YmWIYCaqopc2d9EFHBPuMmZv-a31uY",
  
    authDomain: "rescuenet-88f36.firebaseapp.com",
  
    projectId: "rescuenet-88f36",
  
    storageBucket: "rescuenet-88f36.appspot.com",
  
    messagingSenderId: "878850103950",
  
    appId: "1:878850103950:web:f58deff56a3a7f130b87df",
  
    measurementId: "G-NM3E67HEWN"
  
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
const db = getFirestore(app);
export { auth ,db,collection,addDoc,getDocs,updateDoc, doc,getFirestore };