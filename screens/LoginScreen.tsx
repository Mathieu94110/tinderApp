import React, {useLayoutEffect} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
  const {signInWithGoogle} = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      <Text>Login</Text>
      <ImageBackground
        resizeMode="cover"
        source={{uri: 'https://tinder.com/static/tinder.png'}}>
        <TouchableOpacity onPress={signInWithGoogle}>
          <Text>Sign in & get Swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
