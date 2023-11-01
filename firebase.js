// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDGTiH7znMOPOS-nDEc_-LOfvsaiRh_Ubw',
  authDomain: 'rn--sign-in-android-29aef.firebaseapp.com',
  projectId: 'rn--sign-in-android-29aef',
  storageBucket: 'rn--sign-in-android-29aef.appspot.com',
  messagingSenderId: '1015731250585',
  appId: '1:1015731250585:web:2e91d97af064b5b0825f08',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const timestamp = serverTimestamp();
const provider = new EmailAuthProvider();
export { app, auth, db, timestamp, provider };
