import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { FakeProfiles } from '../locales/profiles';
import { TinderProfile } from '../types/user';
import { HomeProps } from '../types/navigation';
// import Icon from 'react-native-vector-icons/FontAwesome';

function Home({ navigation }: HomeProps) {
  const swipeRef = useRef<number | null>(null);

  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image style={styles.homeHeaderAvatarImg} source={require('../assets/my-portrait.jpg')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.homeHeaderTinderImg} source={require('../assets/tinder-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Icon name='comments' size={30} color='#900' />; */}
          {/* <Ionicons name='md-chatbubbles-sharp' size={30} color='#FF5864' /> */}
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
          // onPress={() => swipeRef.current?.swipeLeft()}
          style={styles.homeProfileArrows}
        >
          {/* <Entypo name='cross' color='red' size={24} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => swipeRef.current?.swipeRight()}
          style={styles.homeProfileArrows}
        >
          {/* <AntDesign name='heart' color='green' size={24} /> */}
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
  },
  homeProfileCardAge: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
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
    width: 16,
    height: 64,
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
});
