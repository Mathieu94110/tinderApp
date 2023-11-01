import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import ChatRow from './ChatRow';
import { collection, onSnapshot, query, where } from '@firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';

const ChatList = () => {
  const [matches, setMatches] = useState([]);

  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'matches'), where('usersMatched', 'array-contains', user.uid)),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          ),
      ),
    [user],
  );

  return matches.length > 0 ? (
    <FlatList
      style={styles.chatList}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={styles.chatListEmptyContainer}>
      <Text style={styles.chatListEmptyText}>Vous n'avez pas encore de match 😢</Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  chatList: {
    height: '100%',
  },
  chatListEmptyContainer: {
    padding: 20,
  },
  chatListEmptyText: {
    fontWeight: '600',
    color: '#FF5864',
    fontSize: 18,
  },
});
