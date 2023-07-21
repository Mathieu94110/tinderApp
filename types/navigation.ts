import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { googleUserInfo } from './user';

export type RootStackParamList = {
  Home: { userInfos: googleUserInfo };
  Chat: undefined;
  Login: undefined;
};

export type LoginNavigationProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type HomeNavigationProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ChatNavigationProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type HomeProps = {
  route: HomeScreenRouteProp;
  navigation: HomeNavigationProps;
};
