import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCAOJW00KRtvc-i5vRg7zV5Pxm62BdmKkY',
  authDomain: 'fellow-c71c1.firebaseapp.com',
  projectId: 'fellow-c71c1',
  storageBucket: 'fellow-c71c1.appspot.com',
  messagingSenderId: '1058322759635',
  appId: '1:1058322759635:web:31a80cf1e97b0376cf3926',
  measurementId: 'G-MWYR6J1D5K'
};

const app = initializeApp(firebaseConfig);

let analytics;
let db;
let googleAuthProvider;
let facebookAuthProvider;

isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
    db = getFirestore();
    googleAuthProvider = new GoogleAuthProvider();
    facebookAuthProvider = new FacebookAuthProvider();
  }
});
export { analytics, db, googleAuthProvider, facebookAuthProvider };
