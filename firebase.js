// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDGTiH7znMOPOS-nDEc_-LOfvsaiRh_Ubw',
  authDomain: 'rn--sign-in-android-29aef.firebaseapp.com',
  projectId: 'rn--sign-in-android-29aef',
  storageBucket: 'rn--sign-in-android-29aef.appspot.com',
  messagingSenderId: '1015731250585',
  appId: '1:1015731250585:web:2e91d97af064b5b0825f08',
};

let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Erreur lors de l'initialistion de l'application: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = getFirestore();
const timestamp = serverTimestamp();
const provider = new EmailAuthProvider();
export { app, auth, db, timestamp, provider };
