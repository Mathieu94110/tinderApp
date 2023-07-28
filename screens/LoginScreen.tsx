import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const LoginScreen = () => {
  const [type, setType] = useState(1); // 1 = Connection , 2 = Inscription
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { loading, setLoading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [type]);

  const signIn = () => {
    if (name.trim === '' || password.trim === '') {
      return Alert.alert('Il faur renseigner tous les champs');
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const signUp = () => {
    if (name.trim === '' || email.trim === '' || password.trim === '') {
      return Alert.alert('Il faur renseigner tous les champs');
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        updateProfile(user, { displayName: name });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View>
        <Text>Chargement en cours...</Text>
      </View>
    );
  }
  return (
    <View style={styles.fullSize}>
      <ImageBackground
        resizeMode='cover'
        style={styles.fullSize}
        source={{
          uri: 'https://theme.zdassets.com/theme_assets/302164/8e05540d6f7ea752f80938c848f3ed79b548b959.png',
        }}
      >
        {type === 1 ? (
          <View style={styles.loginScreenContent}>
            <Text style={styles.loginScreenTitle}>Connection</Text>
            <Text style={styles.loginScreenSubTitle}>Accéder à votre compte Tinder</Text>
            <View>
              <Text style={styles.loginScreenLabel}>Email</Text>
              <TextInput
                keyboardType='email-adress'
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.loginScreenTextInput}
              />
              <Text style={styles.loginScreenLabel}>Mot de passe</Text>
              <TextInput
                secureTextEntry={true}
                keyboardType='password'
                value={password}
                onChangeText={(password) => setPassword(password)}
                style={styles.loginScreenTextInput}
              />
              <TouchableOpacity onPress={signIn} style={styles.loginScreenLoginTextWrapper}>
                <Text style={styles.loginScreenLoginText}>Se connecter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setType(2)}>
                <Text style={styles.loginScreenSwitchText}>Vous n'avez pas encore de compte ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.loginScreenContent}>
            <Text style={styles.loginScreenTitle}>Inscription</Text>
            <Text style={styles.loginScreenSubTitle}>Créer un nouveau compte</Text>
            <View>
              <Text style={styles.loginScreenLabel}>Nom</Text>
              <TextInput
                value={name}
                onChangeText={(name) => setName(name)}
                style={styles.loginScreenTextInput}
              />
              <Text style={styles.loginScreenLabel}>Email</Text>
              <TextInput
                keyboardType='email-adress'
                value={email}
                onChangeText={(text) => setEmail(text)}
                secureTextEntry={false}
                style={styles.loginScreenTextInput}
              />
              <Text style={styles.loginScreenLabel}>Mot de passe</Text>
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(password) => setPassword(password)}
                style={styles.loginScreenTextInput}
              />
              <TouchableOpacity onPress={signUp} style={styles.loginScreenLoginTextWrapper}>
                <Text style={styles.loginScreenLoginText}>S'inscrire</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setType(1)}>
                <Text style={styles.loginScreenSwitchText}>Vous avez déjà un compte ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullSize: {
    flex: 1,
  },
  loginScreenContent: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginScreenTitle: {
    width: '100%',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 34,
    color: '#000',
    textAlign: 'center',
  },
  loginScreenSubTitle: {
    width: '100%',
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginScreenLabel: {
    fontWeight: '500',
    paddingBottom: 8,
    color: '#fff',
  },
  loginScreenTextInput: {
    backgroundColor: 'rgb(249 250 251)',
    border: '1px solid rgb(209 213 219)',
    color: 'rgb(17 24 39)',
    fontSize: 14,
    borderRadius: 5,
  },
  loginText: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  loginScreenLoginText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  loginScreenLoginTextWrapper: {
    borderRadius: 8,
    marginTop: 32,
    backgroundColor: '#000',
    paddingBottom: 12,
    paddingTop: 12,
  },
  loginScreenSwitchText: {
    color: '#fff',
    fontWeight: '500',
    marginTop: 8,
  },
});

export default LoginScreen;
