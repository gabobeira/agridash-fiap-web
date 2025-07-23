import { AuthUser } from './AuthUser';

export interface AuthService {
  signIn(email: string, password: string): Promise<AuthUser>;
  signUp(email: string, password: string, displayName?: string): Promise<AuthUser>;
  signOut(): Promise<void>;
  getCurrentUser(): AuthUser | null;
}
