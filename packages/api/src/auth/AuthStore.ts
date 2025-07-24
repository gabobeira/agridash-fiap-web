import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../configuration/firebase';

// Função para sanitizar erros de autenticação
const sanitizeAuthError = (error: unknown): string => {
  const errorCode = (error as { code?: string })?.code;

  // Log completo apenas no desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.error('Auth Error Details:', error);
  }

  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email ou senha incorretos';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde';
    case 'auth/user-disabled':
      return 'Conta desabilitada. Entre em contato com o suporte';
    case 'auth/email-already-in-use':
      return 'Este email já está em uso';
    case 'auth/weak-password':
      return 'Senha muito fraca. Use pelo menos 8 caracteres';
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/network-request-failed':
      return 'Erro de conexão. Verifique sua internet';
    default:
      return 'Erro de autenticação. Tente novamente';
  }
};

type AuthUser = { uid: string; email: string | null } | null;
type AuthStore = {
  user: AuthUser;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signUp: (email: string, password: string, name?: string) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<boolean | void>;
  init: () => void;
  cleanup: () => void;
  _unsubscribe?: () => void;
  _initialized?: boolean;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,
  error: null,
  _initialized: false,

  clearError: () => set({ error: null }),

  signUp: async (email: string, password: string, name?: string) => {
    set({ loading: true, error: null });
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (name) {
        await updateProfile(response.user, { displayName: name });
      }
      return response.user;
    } catch (err) {
      const sanitizedError = sanitizeAuthError(err);
      set({ error: sanitizedError, loading: false });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response.user;
    } catch (err) {
      const sanitizedError = sanitizeAuthError(err);
      set({ error: sanitizedError, loading: false });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await firebaseSignOut(auth);
      return true;
    } catch (err) {
      const sanitizedError = sanitizeAuthError(err);
      set({ error: sanitizedError, loading: false });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  init: () => {
    const state = get();
    if (state._unsubscribe || state._initialized) return;

    set({ loading: true, _initialized: true });

    const unsubscribe = onAuthStateChanged(auth, rawUser => {
      if (rawUser) {
        const formattedUser = {
          uid: rawUser.uid,
          email: rawUser.email,
        };
        set({ user: formattedUser, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    });

    set({ _unsubscribe: unsubscribe });
  },

  cleanup: () => {
    const state = get();
    const unsubscribe = state._unsubscribe;
    if (unsubscribe) {
      unsubscribe();
      set({ _unsubscribe: undefined, _initialized: false });
    }
  },
}));
