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
  }

  getCurrentUser(): AuthUser | null {
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
