import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { auth } from './firebase.js';
import { signOut } from 'firebase/auth';

const UserDashboard = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Auth"); // Updated the screen name to "Auth"
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});