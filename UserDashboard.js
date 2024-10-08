import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { auth } from './firebase.js';
import { signOut } from 'firebase/auth';

const UserDashboard = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Auth'); // Redirect to Auth screen after signing out
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  return (
    <View style={styles.container}>
      {/* Curved Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
      </View>

      {/* 4 icons for navigation */}
      <View style={styles.iconGrid}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Rescue')}>
          <Image source={require('./assets/logo/rescue.png')} style={styles.icon} />
          <Text style={styles.iconText}>Rescue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ImportantContacts')}>
          <Image source={require('./assets/logo/contact.png')} style={styles.icon} />
          <Text style={styles.iconText}>Important Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('DosAndDonts')}>
          <Image source={require('./assets/logo/dos_and_donts.png')} style={styles.icon} />
          <Text style={styles.iconText}>Do's & Don'ts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('DisasterAlerts')}>
          <Image source={require('./assets/logo/alert.png')} style={styles.icon} />
          <Text style={styles.iconText}>Disaster Alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Sign out button */}
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
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#1188ae', // Purple background color
    height: 170, // Adjust height to your design
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50, // Space below header to content
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    marginBottom: 20,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    marginTop: 30, // Adjust for spacing below icons
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
