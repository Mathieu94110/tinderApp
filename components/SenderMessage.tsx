import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.senderMessage}>
      <Text style={{ color: '#fff' }}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
const styles = StyleSheet.create({
  senderMessage: {
    backgroundColor: 'rgb(147 51 234)',
    borderRadius: 8,
    borderTopRightRadius: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 'auto',
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});
