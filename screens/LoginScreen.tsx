import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.fullSize}>
      <ImageBackground
        resizeMode='cover'
        style={styles.fullSize}
        source={{ uri: 'https://tinder.com/static/tinder.png' }}
      >
        <TouchableOpacity onPress={signInWithGoogle} style={styles.actionButton}>
          <Text>
            <Text style={styles.loginText}>Se connecter avec </Text>
            <Text style={styles.googleText}>
              <Text style={{ color: '#4285F4' }}>G</Text>
              <Text style={{ color: '#DB4437' }}>o</Text>
              <Text style={{ color: '#F4B400' }}>o</Text>
              <Text style={{ color: '#4285F5' }}>g</Text>
              <Text style={{ color: '#0F9D58' }}>l</Text>
              <Text style={{ color: '#DB4437' }}>e</Text>
            </Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullSize: {
    flex: 1,
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#4285F4',
    position: 'absolute',
    bottom: 40,
    width: '50%',
    minWidth: 200,
    borderRadius: 10,
    padding: 10,
    marginLeft: '25%',
    marginRight: '25%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
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
