// import auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {Button, View} from 'react-native';

// function App() {
//   GoogleSignin.configure({
//     webClientId:
//       '1015731250585-mte56pgu2vig24hbdr75i9rohmh9to31.apps.googleusercontent.com',
//   });

//   const signInWithGoogle = async () => {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//     // Get the users ID token
//     const {idToken} = await GoogleSignin.signIn();

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign-in the user with the credential
//     const user_sign_in = auth().signInWithCredential(googleCredential);
//     user_sign_in
//       .then(user => {
//         console.log(user);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   return (
//     <View>
//       <Button title="Google Sign-In" onPress={signInWithGoogle} />
//     </View>
//   );
// }
// export default App;
import React from 'react';
import {AuthProvider} from './hooks/useAuth';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(); // Ignore log notification by message
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
