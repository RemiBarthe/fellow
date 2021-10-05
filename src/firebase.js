import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider } from 'firebase/auth';

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
export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
