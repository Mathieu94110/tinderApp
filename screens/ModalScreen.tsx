import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import useAuth from '../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';

const ModalScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;
  const uid = user.uid;
  const usersCollection = firestore().collection('Users');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Revenir à la page d'accueil",
      headerStyle: {
        backgroundColor: '#FF5864',
      },
      headerTitleStyle: { color: 'white' },
    });
    console.log(user);
  }, []);

  async function checkUserProfile() {
    usersCollection.get().then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapShot) => {
          console.log('docid =', documentSnapShot.data().id, 'uid =', uid);
          const userId = documentSnapShot.id;
          const userUid = documentSnapShot.data().id;
          if (userUid === uid) {
            updateUserProfile(userId);
          } else {
            addUser();
          }
        });
      } else {
        addUser();
      }
    });
  }

  const addUser = () => {
    usersCollection
      .add({
        id: uid,
        displayName: user.displayName,
        photoUrl: image,
        job: job,
        age: age,
        timestamp: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('User added');
        navigation.navigate('Home');
      });
  };

  const updateUserProfile = (userId: string) => {
    usersCollection
      .doc(userId)
      .update({
        photoUrl: image,
        job: job,
        age: age,
      })
      .then(() => {
        console.log('User updated');
        navigation.navigate('Home');
      });
  };

  const deteteUsers = (userId: string) => {
    usersCollection
      .doc(userId)
      .delete()
      .then(() => {
        console.log('User deleted');
      });
  };
  return (
    <View style={styles.modalScreen}>
      <Image
        style={styles.modalHeaderImg}
        resizeMode='contain'
        source={{
          uri: 'https://www.nicepng.com/png/detail/269-2697827_tinder-full-color-watermark-tinder-man-city.png',
        }}
      />
      <Text style={styles.modalWelcomeText}>Bienvenue {user.displayName}!</Text>

      <Text style={styles.modalStepsText}>Étape 1: La photo de profil</Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        style={styles.modalStepsTextInput}
        placeholder='Ajouter une photo de profil'
      />

      <Text style={styles.modalStepsText}>Étape 1: Le métier</Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        style={styles.modalStepsTextInput}
        placeholder='Indiquer votre métier'
      />

      <Text style={styles.modalStepsText}>Étape 3: L'age</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        style={styles.modalStepsTextInput}
        keyboardType='numeric'
        placeholder='Indiquer votre age'
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={[styles.modalUpdateProfileContainer, incompleteForm ? styles.gray : styles.red]}
        onPress={checkUserProfile}
      >
        <Text style={styles.modalUpdateProfileText}>Mettre à jour le profil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  modalHeaderImg: {
    width: 200,
    height: 100,
  },
  modalWelcomeText: {
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 28,
    color: '#6b7280',
    padding: 8,
    fontWeight: '600',
  },
  modalStepsText: {
    textAlign: 'center',
    padding: 16,
    fontWeight: '600',
    color: '#FF5864',
    fontSize: 20,
  },
  modalStepsTextInput: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 28,
    paddingBottom: 8,
  },
  modalUpdateProfileContainer: {
    width: 256,
    padding: 12,
    borderRadius: 12,
    position: 'absolute',
    bottom: 10,
  },
  gray: {
    backgroundColor: '#9CA3AF',
  },
  red: {
    backgroundColor: 'red',
  },
  modalUpdateProfileText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    lineHeight: 28,
  },
});
