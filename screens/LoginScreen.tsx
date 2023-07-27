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
        source={{ uri: 'https://tinder.com/static/tinder.png' }}
      >
        {type === 1 ? (
          <View style={styles.loginContent}>
            <Text>Connection</Text>
            <Text>Accéder à votre compte Tinder</Text>
            <View>
              <Text>Email</Text>
              <TextInput
                keyboardType='email-adress'
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <Text>Mot de passe</Text>
              <TextInput
                secureTextEntry={true}
                keyboardType='password'
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
              <TouchableOpacity onPress={signIn}>
                <Text>Se connecter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setType(2)}>
                <Text>Vous n'avez pas encore de compte ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.loginContent}>
            <Text>Inscription</Text>
            <Text>Créer un nouveau compte</Text>
            <View>
              <Text>Nom</Text>
              <TextInput value={name} onChangeText={(name) => setName(name)} />
              <Text>Email</Text>
              <TextInput
                keyboardType='email-adress'
                value={email}
                onChangeText={(text) => setEmail(text)}
                secureTextEntry={false}
              />
              <Text>Mot de passe</Text>
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
              <TouchableOpacity onPress={signUp}>
                <Text>S'inscrire</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setType(1)}>
                <Text>Vous avez déjà un compte ?</Text>
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
  loginContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  googleText: {
    padding: 14,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
