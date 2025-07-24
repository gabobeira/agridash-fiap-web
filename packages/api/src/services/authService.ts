import { AuthUseCase } from '../application/AuthUseCase';
import { FirebaseAuthService } from '../infrastructure/FirebaseAuthService';

export function createAuthService(firebaseConfig: {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
}) {
  const firebaseAuthService = new FirebaseAuthService(firebaseConfig);
  return new AuthUseCase(firebaseAuthService);
}

// Factory function para criar a instância padrão
export function getDefaultAuthService(): AuthUseCase | undefined {
  // Verifica se estamos no ambiente do servidor durante o build
  if (typeof window === 'undefined' && process.env.NODE_ENV === undefined) {
    // Retorna undefined durante o build para evitar erros
    return undefined;
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Verifica se todas as variáveis necessárias estão definidas
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    console.warn('Firebase configuration is incomplete, returning undefined');
    return undefined;
  }

  return createAuthService(firebaseConfig);
}
