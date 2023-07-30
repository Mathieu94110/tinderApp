import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerTitleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Icon name='arrow-left' size={34} color='#FF5864' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity style={styles.headerCallEnabled}>
          <Icon name='phone' size={24} color='red' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    paddingLeft: 8,
  },
  headerCallEnabled: {
    borderRadius: 9999,
    marginRight: 16,
    padding: 12,
    backgroundColor: 'rgb(254 202 202)',
  },
});
