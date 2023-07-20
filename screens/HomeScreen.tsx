import React, {useLayoutEffect} from 'react';
import {View, Image, Text, SafeAreaView} from 'react-native';
import useAuth from '../hooks/useAuth';
import {useNavigation} from '@react-navigation/core';

function Home() {
  const {user} = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <View>
      <Text>Home</Text>
        {user && (
          <View>
            <Image source={{uri: user.photoURL}} />
            <Text>{user.name}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Home;
