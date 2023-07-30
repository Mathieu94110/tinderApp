import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuth from '../hooks/useAuth';
import { TinderProfile } from '../types/user';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { db, timestamp } from '../firebase';
import generateId from '../lib/generateId';

function Home() {
  const [profiles, setProfiles] = useState<TinderProfile[]>([]);
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);
  const navigation = useNavigation();

  // redirect to Modal screen as long as user doesnt exist on firebase db
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, 'Users', user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate('Modal');
        }
      }),
    [],
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      // fetch all cards for this user uid passed and swiped
      const passes = await getDocs(collection(db, 'Users', user.uid, 'passes')).then((snapshot) =>
        snapshot.docs.map((doc) => doc.id),
      );

      const swipes = await getDocs(collection(db, 'Users', user.uid, 'swipes')).then((snapshot) =>
        snapshot.docs.map((doc) => doc.id),
      );
      console.log(passes);
      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

      // reject himself profile and users already swiped or passed
      unsub = onSnapshot(
        query(collection(db, 'Users'), where('id', 'not-in', [...passedUserIds, ...swipedUserIds])),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .sort((x, y) => x.timestamp - y.timestamp),
          );
        },
      );
    };

    fetchCards();

    return unsub;
  }, [db]);

  console.log(profiles);

  const swipeLeft = async (cardIndex: number) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    setDoc(doc(db, 'Users', user.uid, 'passes', userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex: number) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (await getDoc(doc(db, 'Users', user.uid))).data();

    // Check if user has swiped too
    getDoc(doc(db, 'Users', userSwiped.id, 'swipes', user.uid)).then((documentSnapshot) => {
      if (documentSnapshot.exists()) {
        // user has matched with this person
        // create match
        console.log(`Congratulation, you matched with ${userSwiped.displayName}`);
        setDoc(doc(db, 'Users', user.uid, 'swipes', userSwiped.id), userSwiped);

        // Create a match !
        setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
          users: {
            [user.uid]: loggedInProfile,
            [userSwiped.id]: userSwiped,
          },
          usersMatched: [user.uid, userSwiped.id],
          timestamp,
        });
        // navigate to match screen with info about match
        navigation.navigate('Match', {
          loggedInProfile,
          userSwiped,
        });
      } else {
        // User has swiped as first interaction between the two...
        console.log(`${userSwiped.displayName} sent into swipes category`);
        setDoc(doc(db, 'Users', user.uid, 'swipes', userSwiped.id), userSwiped);
      }
    });
  };

  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.homeHeader}>
        {user && (
          <TouchableOpacity onPress={logout}>
            <Image
              style={styles.homeHeaderAvatarImg}
              source={{
                uri: user.photoURL
                  ? user.photoURL
                  : 'https://img.freepik.com/free-icon/user_318-159711.jpg',
              }}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image style={styles.homeHeaderTinderImg} source={require('../assets/tinder-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Icon name='comments' size={30} color='#FF5864' />
        </TouchableOpacity>
      </View>
      <View style={styles.homeBody}>
        {profiles && (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: 'transparent' }}
            cards={profiles}
            overlayLabels={{
              left: {
                title: 'NEXT',
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
            renderCard={(card) => {
              return card ? (
                <View key={card?.id} style={styles.homeProfileCard}>
                  <Text>{card?.displayName}</Text>

                  <Image
                    source={{
                      uri: card?.photoURL
                        ? card?.photoURL
                        : 'https://audiovisuel.epiknet.org/wp-content/uploads/2019/03/%EF%BC%9F.jpg',
                    }}
                    style={styles.homeProfileCardImg}
                  />

                  <View style={styles.cardShadow}>
                    <View>
                      <Text style={styles.homeProfileCardName}>
                        <Text>{card?.displayName}</Text>
                      </Text>
                      <Text>{card?.job}</Text>
                    </View>

                    <Text style={styles.homeProfileCardAge}>{card?.age}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.cardShadow}>
                  <Text style={styles.noResults}>Vous avez parcouru tous les profils</Text>

                  <Image
                    height={100}
                    width={100}
                    source={{
                      uri: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037',
                    }}
                  />
                </View>
              );
            }}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex: number) => {
              swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex: number) => {
              swipeRight(cardIndex);
            }}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}
            stackSize={5}
          ></Swiper>
        )}
      </View>
      <View style={styles.homeFooter}>
        <TouchableOpacity
          onPress={() => swipeRef.current?.swipeLeft()}
          style={[styles.homeProfileArrows, styles.crossBtn]}
        >
          <Text style={styles.cross}>X</Text>
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
  noResults: {
    fontWeight: '600',
    paddingBottom: 20,
  },
  cross: {
    color: 'red',
    fontSize: 24,
    fontWeight: '600',
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
