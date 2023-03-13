import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA1tmhCHNI65ADSCT3mV_DIqcYI2P-BxYw",
    authDomain: "voting-system-blockchain.firebaseapp.com",
    projectId: "voting-system-blockchain",
    storageBucket: "voting-system-blockchain.appspot.com",
    messagingSenderId: "1085657595481",
    appId: "1:1085657595481:web:d4007346c31643e6a5fb48",
    measurementId: "G-4ZK7MM3CN7"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
