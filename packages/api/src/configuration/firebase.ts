import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCxJCibt_ooE3tN9nVjPYYSWdVS8AZrd0E',
  authDomain: 'control-farm-web-fiap.firebaseapp.com',
  projectId: 'control-farm-web-fiap',
  storageBucket: 'control-farm-web-fiap.firebasestorage.app',
  messagingSenderId: '97027004548',
  appId: '1:97027004548:web:6bc37205b1126c9f978ad1',
  measurementId: 'G-DPB3S4CNDY',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
