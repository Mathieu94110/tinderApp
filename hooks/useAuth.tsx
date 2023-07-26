import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext({});
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});
export function AuthProvider({ children }) {
  const [user, setUser] = useState<any>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log('user infos', user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signInWithGoogle() {
    try {
      // get the user id token
      const { idToken } = await GoogleSignin.signIn();
      // create a credential using the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // authenticate the user using the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('error', error);
    }
  }
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      setLoading,
      signInWithGoogle,
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
