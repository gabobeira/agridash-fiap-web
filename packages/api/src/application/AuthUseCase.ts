import { AuthService } from '../domain/AuthService';
import { AuthUser } from '../domain/AuthUser';

export class AuthUseCase {
  constructor(private authService: AuthService) {}

  async signIn(email: string, password: string): Promise<AuthUser> {
    return this.authService.signIn(email, password);
  }

  async signUp(email: string, password: string, displayName?: string): Promise<AuthUser> {
    return this.authService.signUp(email, password, displayName);
  }

  async signOut(): Promise<void> {
    return this.authService.signOut();
  }

  getCurrentUser(): AuthUser | null {
    return this.authService.getCurrentUser();
  }
}
