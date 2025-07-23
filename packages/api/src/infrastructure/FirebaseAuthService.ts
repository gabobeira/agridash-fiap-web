import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { AuthService } from '../domain/AuthService';
import { AuthUser } from '../domain/AuthUser';

// Função utilitária para ler o cookie de sessão
function getSessionToken(): string | null {
  if (typeof document === 'undefined') return null;
  return (
    document.cookie
      .split('; ')
      .find(row => row.startsWith('session_token='))
      ?.split('=')[1] || null
  );
}

export class FirebaseAuthService implements AuthService {
  private app: FirebaseApp;
  private auth;

  constructor(firebaseConfig: object) {
    if (!getApps().length) {
      this.app = initializeApp(firebaseConfig);
    } else {
      this.app = getApps()[0];
    }
    this.auth = getAuth(this.app);
  }

  async signIn(email: string, password: string): Promise<AuthUser> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    // Obter o token da sessão do usuário
    const token = await result.user.getIdToken();
    // Criar cookie de sessão (válido para ambiente browser)
    if (typeof window !== 'undefined') {
      document.cookie = `session_token=${token}; path=/; secure; samesite=strict`;
    }
    return this.mapUser(result.user);
  }

  async signUp(
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthUser> {
    const result = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    return this.mapUser(result.user);
  }

  async signOut(): Promise<void> {
    await fbSignOut(this.auth);
    // Remove o cookie de sessão
    if (typeof window !== 'undefined') {
      document.cookie =
        'session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

  getCurrentUser(): AuthUser | null {
    // Valida se existe o cookie de sessão
    const sessionToken = getSessionToken();
    if (!sessionToken) return null;
    const user = this.auth.currentUser;
    return user ? this.mapUser(user) : null;
  }

  private mapUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  }
}
