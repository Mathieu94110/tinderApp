import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoadingInitial(false);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => console.log(error));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
      loading,
      logout,
      setLoading,
    }),
    [user, loading],
  );
  return (
    <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>
  );
}

// // Let's only export the `useAuth` hook instead of the context.
// // We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
