import React, { useRef, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { FakeProfiles } from '../locales/profiles';
import { TinderProfile } from '../types/user';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/core';

function Home() {
  const swipeRef = useRef<number | null>(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  const usersCollection = firestore().collection('Users');

  useLayoutEffect(
    () =>
      usersCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((documentSnapShot) => {
          console.log('docid =', documentSnapShot.data().id, 'uid =', uid);
          const userUid = documentSnapShot.data().id;
          if (!userUid || userUid !== user.user.id) {
            navigation.navigate('Modal');
          }
        });
      }),
    [],
  );

  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image style={styles.homeHeaderAvatarImg} source={require('../assets/my-portrait.jpg')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image style={styles.homeHeaderTinderImg} source={require('../assets/tinder-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name='comments' size={30} color='#FF5864' />
        </TouchableOpacity>
      </View>
      <View style={styles.homeBody}>
        <Swiper
          containerStyle={{ backgroundColor: 'transparent' }}
          cards={FakeProfiles}
          overlayLabels={{
            left: {
              title: 'PASS',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  color: '#4DED30',
                },
              },
            },
          }}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex: number) => {
            console.log('Swipe PASS', cardIndex);
            // swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex: number) => {
            console.log('Swipe MATCH', cardIndex);
            // swipeRight(cardIndex);
          }}
          cardIndex={0}
          backgroundColor={'#4FD0E9'}
          stackSize={5}
          renderCard={(card: TinderProfile) => (
            <View key={card.id} style={styles.homeProfileCard}>
              <Text>{card.firstName}</Text>
              {card.photoURL && (
                <Image source={{ uri: card.photoURL }} style={styles.homeProfileCardImg} />
              )}
              <View style={styles.cardShadow}>
                <View>
                  <Text style={styles.homeProfileCardName}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.occupation}</Text>
                </View>
                <Text style={styles.homeProfileCardAge}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.homeFooter}>
        <TouchableOpacity
          onPress={() => swipeRef.current?.swipeLeft()}
          style={[styles.homeProfileArrows, styles.crossBtn]}
        >
          <Text style={{ color: 'red', fontSize: 24, fontWeight: '600' }}>X</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current?.swipeRight()}
          style={[styles.homeProfileArrows, styles.heartBtn]}
        >
          <Icon name='heart' color='green' size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
  homeHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  homeHeaderAvatarImg: {
    height: 40,
    width: 40,
    borderRadius: 9999,
  },
  homeHeaderTinderImg: {
    height: 56,
    width: 56,
  },
  homeBody: {
    flex: 1,
    marginTop: 24,
  },
  homeProfileCard: {
    position: 'relative',
    backgroundColor: '#fff',
    height: '75%',
    borderRadius: 12,
  },
  homeProfileCardImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  cardShadow: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 80,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.42,
    elevation: 2,
  },
  homeProfileCardName: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#000',
  },
  homeProfileCardAge: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    color: '#000',
  },
  homeFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  homeProfileArrows: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    width: 54,
    height: 54,
  },
  crossBtn: {
    backgroundColor: '#FECACA',
  },
  heartBtn: {
    backgroundColor: '#BBF7D0',
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
});
