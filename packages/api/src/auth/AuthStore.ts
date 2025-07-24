import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../configuration/firebase';

// A store do Zustand combina o estado e as ações em um único objeto.
// Não é necessário um hook `useProvideAuth` separado, a lógica pode viver aqui.
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
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  // Ação para limpar erros
  clearError: () => set({ error: null }),

  // Ação para cadastrar (Sign Up)
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
      // O onAuthStateChanged listener irá atualizar o estado do usuário
      return response.user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      set({ error: errorMessage, loading: false });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // Ação para autenticar (Sign In)
  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      // O onAuthStateChanged listener irá atualizar o estado do usuário
      return response.user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      set({ error: errorMessage, loading: false });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // Ação para deslogar (Sign Out)
  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await firebaseSignOut(auth);
      return true;
      // O onAuthStateChanged listener irá limpar o usuário
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      set({ error: errorMessage, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  // Método para inicializar o listener do Firebase
  // Deve ser chamado uma vez na raiz da aplicação
  init: () => {
    if (get()._unsubscribe) return; // Evita múltiplas inscrições

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

  // Função para limpar o listener quando o app for fechado
  cleanup: () => {
    const unsubscribe = get()._unsubscribe;
    if (unsubscribe) unsubscribe();
  },
}));
