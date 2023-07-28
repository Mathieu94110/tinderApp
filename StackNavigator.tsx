import React from 'react';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ModalScreen from './screens/ModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';
import ChatScreen from './screens/ChatScreen';
import MatchScreen from './screens/MatchScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Chat' component={ChatScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name='Modal' component={ModalScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: 'transparentModal',
              headerShown: false,
            }}
          >
            <Stack.Screen name='Match' component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name='Login' component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
