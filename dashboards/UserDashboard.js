import { useNavigation } from '@react-navigation/core';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import { auth, db } from '../firebase.js';

const UserDashboard = () => {
  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0];

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -300 : 0, // Slide in when menuVisible is true
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(!menuVisible));
  };

  // For checking if the user is a volunteer
  const [isVolunteer, setIsVolunteer] = useState(false);



  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Auth'); // Redirect to Auth screen after signing out
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
            <Ionicons name="menu" size={39} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Welcome</Text>
        </View>

        {/* Slide Menu */}
        {menuVisible && (
          <>
            {/* Background overlay to close the menu */}
            <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
            <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
              <TouchableOpacity onPress={toggleMenu} style={styles.backButton}>
                <Ionicons name="arrow-back" size={30} color="#000" />
              </TouchableOpacity>
              <View style={styles.bar}></View> 
              <TouchableOpacity onPress={() => navigation.navigate('VolunteerRegistration')} style={styles.menuItem}>
                <View style={styles.iconTextContainer}>
                  <Ionicons name="person" size={30} color="#5c6996" />
                  <Text style={styles.menuText}>Update Profile</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('EmergencyContacts')} style={styles.menuItem}>
                <View style={styles.iconTextContainer}>
                  <MaterialCommunityIcons name="contacts" size={30} color="#158a20" />
                  <Text style={styles.menuText}>Emergency Contact</Text>
                </View>
              </TouchableOpacity>
              
              

              <TouchableOpacity onPress={() => navigation.navigate('Survey')} style={styles.menuItem}>
                <View style={styles.iconTextContainer}>
                  <Entypo name="clipboard" size={30} color="#6d666e" />
                  <Text style={styles.menuText}>Survey</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.menuItem}>
                <View style={styles.iconTextContainer}>
                  <AntDesign name="infocirlce" size={30} color="#000000" />
                  <Text style={styles.menuText}>About</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <View style={styles.iconTextContainer}>
                  <Text style={styles.buttonText}>Sign out</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}

        {/* Header Background with "Status" button */}
        {/* <ImageBackground
          source={require('../assets/header2.jpg')} // Background image for the header area
          style={styles.rescueRequest}
          resizeMode="cover" // Makes the image cover the entire background
        >
          {!isVolunteer && (
            
          )}
        </ImageBackground> */}
        
        
        <ImageBackground
          source={require('../assets/dashboard5.png')} // Background image for the icons
          style={styles.contentBackground}
          resizeMode="cover" // Makes the image cover the entire background
        >
          <TouchableOpacity style={styles.statusButton} onPress={() => navigation.navigate('UserStatus')}>
              <Text style={styles.statusButtonText}>Rescue Status</Text>
          </TouchableOpacity>

          {/* 6 icons arranged in 3 rows of 2 icons each */}
          <View style={styles.iconGrid}>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Rescue')}>
                <Image source={require('../assets/Rescue.png')} style={styles.cardImage} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('DisasterAlerts')}>
                <Image source={require('../assets/alerts.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Donation')}>
                <Image source={require('../assets/donation1.png')} style={styles.cardImage} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('EmergencyList')}>
                <Image source={require('../assets/emergency.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default UserDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#2a5157',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: -30,
  },
  bar: {
    height: 90,
    backgroundColor: '#1c294f',
    marginBottom: 0,
    marginTop: -40,
    marginHorizontal: -10,
  },
  menuItem: {
    padding: 15,
    borderBottomColor: '#ddd',
    backgroundColor: '#f5f2e6',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: { 
    position: 'absolute',
    left: 20,
    top: 60,
    marginRight: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#f5f2e6',
    padding: 20,
    zIndex: 10,
  },
  menuText: { 
    color: '#000', 
    fontSize: 19, 
    marginVertical: 10,
    marginLeft: 10, 
  },
  backButton: {
    marginBottom: 60,
    alignSelf: 'flex-start',
  },
  // --- New Status Button Styles ---
  statusButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 40,
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // -----------------------------
  rescueRequest: {
    width: '100%',
    height: 95,
    justifyContent: 'center',
  },
  contentBackground: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  iconGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 180,
    backgroundColor: "#f8f7e8",
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: -30,
    marginRight: 35,
    marginTop: -5,
    borderColor: '#000',
    borderWidth: 3,
  },
  cardImage: {
    width: '90%',
    height: 170,
    borderRadius: 10,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#0c3038',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  cardImageV: {
    width: '100%',
    height: 110,
  },
  cardImageG: {
    width: '100%',
    height: 95,
    borderRadius: 10,
  },
  iconContainerG: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 180,
    backgroundColor: "#fffadf",
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: -30,
    marginRight: 35,
    marginTop: -5,
    borderColor: '#000',
    borderWidth: 3,
  },
});
