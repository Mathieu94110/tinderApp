import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecieverMessage = ({ message }) => {
  return (
    <View style={styles.recieverMessage}>
      <Image
        style={styles.recieverMessageImg}
        source={{
          uri: message.photoURL,
        }}
      />
      <Text style={{ color: '#fff' }}>{message.message}</Text>
    </View>
  );
};

export default RecieverMessage;

const styles = StyleSheet.create({
  recieverMessage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(248 113 113)',
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 56,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  recieverMessageImg: {
    height: 48,
    width: 48,
    borderRadius: 9999,
    position: 'absolute',
    top: 0,
    left: -56,
  },
});
