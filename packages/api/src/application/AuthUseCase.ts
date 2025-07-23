import { AuthRepository } from '../domain/AuthRepository';
import { AuthUser } from '../domain/AuthUser';
import { FirebaseAuthRepository } from '../infrastructure/FirebaseAuthRepository';

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async signIn(email: string, password: string): Promise<AuthUser> {
    return this.authRepository.signIn(email, password);
  }

  async signUp(
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthUser> {
    return this.authRepository.signUp(email, password, displayName);
  }

  async signOut(): Promise<void> {
    return this.authRepository.signOut();
  }

  getCurrentUser(): AuthUser | null {
    return this.authRepository.getCurrentUser();
  }

  async getCurrentUserAsync(): Promise<AuthUser | null> {
    // Verifica se o FirebaseAuthRepository tem o método getCurrentUserAsync
    if ('getCurrentUserAsync' in this.authRepository) {
      return (
        this.authRepository as FirebaseAuthRepository
      ).getCurrentUserAsync();
    }
    // Fallback para getCurrentUser se não tiver o método async
    return this.authRepository.getCurrentUser();
  }
}
