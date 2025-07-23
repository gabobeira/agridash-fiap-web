import { AuthUseCase, FirebaseAuthService } from '@agridash/api';

const firebaseConfig = {
  apiKey: 'AIzaSyCxJCibt_ooE3tN9nVjPYYSWdVS8AZrd0E',
  authDomain: 'control-farm-web-fiap.firebaseapp.com',
  projectId: 'control-farm-web-fiap',
  storageBucket: 'control-farm-web-fiap.firebasestorage.app',
  messagingSenderId: '97027004548',
  appId: '1:97027004548:web:6bc37205b1126c9f978ad1',
  measurementId: 'G-DPB3S4CNDY',
};

const firebaseAuthService = new FirebaseAuthService(firebaseConfig);
export const authUseCase = new AuthUseCase(firebaseAuthService);
