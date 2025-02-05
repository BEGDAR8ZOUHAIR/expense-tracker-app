// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDudpuyYFuEOdMczPdIT2kwSVIEEb4fTeI",
	authDomain: "expense-tracker-c3678.firebaseapp.com",
	projectId: "expense-tracker-c3678",
	storageBucket: "expense-tracker-c3678.firebasestorage.app",
	messagingSenderId: "364849923301",
	appId: "1:364849923301:web:22b8137091013108e1400c",
	measurementId: "G-86GFWZXRNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
});

// database

export const firestore = getFirestore(app);
export const storage = getStorage(app);