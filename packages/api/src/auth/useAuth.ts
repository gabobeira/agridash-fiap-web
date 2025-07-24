import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../configuration/firebase';

export interface FUser {
  uid: string;
  email: string | null;
  name?: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<FUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const handleUser = (rawUser: User | null, name?: string | null) => {
    if (rawUser) {
      const formattedUser = {
        uid: rawUser.uid,
        email: rawUser.email,
        name: rawUser.displayName || name || null,
      };
      setUser(formattedUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (name) {
        await updateProfile(response.user, { displayName: name });
      }
      handleUser(response.user, name);
      return response.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setLoading(false);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      handleUser(response.user);
      return response.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setLoading(false);
      return null;
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignOut(auth);
      handleUser(null);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    clearError,
    signIn,
    signOut,
    signUp,
  };
}
