import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState([]);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message),
      ),
    [matchDetails, db],
  );

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Message', {
          matchDetails,
        })
      }
      style={[styles.chatRow, styles.cardShadow]}
    >
      {/* Avatar */}
      <Image
        style={styles.chatRowImg}
        source={{
          uri: matchedUserInfo?.photoURL,
        }}
      />

      <View>
        <Text style={styles.ChatRowMatchedUserName}>{matchedUserInfo?.displayName}</Text>
        <Text>{lastMessage || 'Dites Bonjour!'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  chatRow: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 8,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  chatRowImg: {
    borderRadius: 9999,
    height: 64,
    width: 64,
    marginRight: 16,
  },
  ChatRowMatchedUserName: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
  },
});
