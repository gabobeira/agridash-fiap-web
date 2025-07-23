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

import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { AuthRepository } from '../domain/AuthRepository';
import { AuthUser } from '../domain/AuthUser';

export class FirebaseAuthRepository implements AuthRepository {
  private readonly app: FirebaseApp | null;
  private readonly auth;
  private currentUserCache: AuthUser | null = null;
  private authStateInitialized: boolean = false;

  constructor(firebaseConfig: object) {
    // Verifica se estamos no ambiente do servidor durante o build
    if (typeof window === 'undefined' && !process.env.NODE_ENV) {
      this.app = null;
      this.auth = null;
      return;
    }

    // Verifica se a configuração é válida
    if (!this.isValidConfig(firebaseConfig)) {
      console.warn(
        'Invalid Firebase configuration, Firebase will not be initialized'
      );
      this.app = null;
      this.auth = null;
      return;
    }

    try {
      if (!getApps().length) {
        this.app = initializeApp(firebaseConfig);
      } else {
        this.app = getApps()[0];
      }
      this.auth = getAuth(this.app);

      onAuthStateChanged(this.auth, user => {
        this.currentUserCache = user ? this.mapUser(user) : null;

        if (!this.authStateInitialized) {
          this.authStateInitialized = true;
        }
      });
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      this.app = null;
      this.auth = null;
    }
  }

  private isValidConfig(config: unknown): boolean {
    const firebaseConfig = config as Record<string, unknown>;
    return !!(
      firebaseConfig?.apiKey &&
      firebaseConfig?.authDomain &&
      firebaseConfig?.projectId &&
      firebaseConfig.apiKey !== 'undefined' &&
      firebaseConfig.authDomain !== 'undefined' &&
      firebaseConfig.projectId !== 'undefined'
    );
  }

  async signIn(email: string, password: string): Promise<AuthUser> {
    if (!this.auth) {
      throw new Error('Firebase not initialized');
    }

    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const authUser = this.mapUser(result.user);
      this.currentUserCache = authUser;
      return authUser;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async signUp(
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthUser> {
    if (!this.auth) {
      throw new Error('Firebase not initialized');
    }

    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (displayName) {
        await updateProfile(result.user, { displayName });
      }

      const authUser = this.mapUser(result.user);
      this.currentUserCache = authUser;
      return authUser;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    if (!this.auth) {
      throw new Error('Firebase not initialized');
    }

    try {
      await fbSignOut(this.auth);
      this.currentUserCache = null;
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  }

  getCurrentUser(): AuthUser | null {
    if (!this.authStateInitialized) {
      return null;
    }

    return this.currentUserCache;
  }

  async getCurrentUserAsync(): Promise<AuthUser | null> {
    if (!this.auth) {
      return null;
    }

    if (this.authStateInitialized) {
      return this.getCurrentUser();
    }

    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(this.auth!, () => {
        if (this.authStateInitialized) {
          unsubscribe();
          resolve(this.getCurrentUser());
        }
      });
    });
  }

  isAuthStateInitialized(): boolean {
    return this.authStateInitialized;
  }

  private mapUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  }
}
