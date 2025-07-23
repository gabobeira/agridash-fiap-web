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
import { AuthService } from '../domain/AuthService';
import { AuthUser } from '../domain/AuthUser';

export class FirebaseAuthService implements AuthService {
  private readonly app: FirebaseApp;
  private readonly auth;
  private currentUserCache: AuthUser | null = null;
  private authStateInitialized: boolean = false;

  constructor(firebaseConfig: object) {
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
  }

  async signIn(email: string, password: string): Promise<AuthUser> {
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
    if (this.authStateInitialized) {
      return this.getCurrentUser();
    }

    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
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

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(this.auth, user => {
      const authUser = user ? this.mapUser(user) : null;
      callback(authUser);
    });
  }

  private mapUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  }
}
