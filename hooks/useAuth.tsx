import React, { createContext, useContext, useMemo, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { ANDROID_CLIENT_ID } from '@env';

const AuthContext = createContext({});
export default function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState<any>(null);

  GoogleSignin.configure({
    webClientId: ANDROID_CLIENT_ID,
  });

  const signInWithGoogle = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        setUser(user.user);
      })
      .catch((error) => console.error(error));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signInWithGoogle,
    }),
    [user],
  );

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
}
