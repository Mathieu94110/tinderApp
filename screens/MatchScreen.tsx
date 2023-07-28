import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={[styles.matchScreen, { opacity: 0.89 }]}>
      <View style={styles.matchScreenImageContainer}>
        <Image
          style={styles.matchScreenImage}
          source={{
            uri: 'https://e9digital.com/love-at-first-website/images/its-a-match.png',
          }}
        />
      </View>

      <Text style={styles.matchScreenTitle}>Vous et {userSwiped.displayName} avez matché !.</Text>

      <View style={styles.matchScreenProfilesImg}>
        <Image
          style={styles.matchScreenProfileImg}
          source={{
            uri: loggedInProfile.photoURL,
          }}
        />
        <Image
          style={styles.matchScreenProfileImg}
          source={{
            uri: userSwiped.photoURL,
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.matchScreenMessage}
        onPress={() => {
          navigation.goBack();
          navigation.navigate('Chat');
        }}
      >
        <Text style={{ textAlign: 'center' }}>Envoyer un message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
const styles = StyleSheet.create({
  matchScreen: {
    height: '100%',
    backgroundColor: 'rgb(239 68 68)',
    paddingTop: 80,
  },
  matchScreenImageContainer: {
    justifyContent: 'center',
    paddingTop: 80,
    paddingLeft: 40,
    paddingRight: 40,
  },
  matchScreenImage: {
    height: 80,
    width: '100%',
    borderRadius: 9999,
  },
  matchScreenTitle: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  matchScreenProfilesImg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  matchScreenProfileImg: {
    height: 128,
    width: 128,
    borderRadius: 9999,
  },
  matchScreenMessage: {
    backgroundColor: '#fff',
    margin: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 32,
    paddingBottom: 32,
    borderRadius: 9999,
    marginTop: 80,
  },
});
