import React, {createContext, useContext, useMemo, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext({});
export default function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({children}) {
  const [user, setUser] = useState<any>(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

    GoogleSignin.configure({
      webClientId:
        '1015731250585-mte56pgu2vig24hbdr75i9rohmh9to31.apps.googleusercontent.com',
    });

  const signInWithGoogle = async () => {

    console.log('sign in with google called');
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then(user => {
        setUser(user);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoadingInitial(false);
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signInWithGoogle,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
