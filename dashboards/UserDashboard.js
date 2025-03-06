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
  View,
  Dimensions
} from 'react-native';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import { auth, db } from '../firebase.js';

const { width } = Dimensions.get('window'); // Get screen width

const UserDashboard = () => {
  const navigation = useNavigation();

  const handleNavigate = (route) => {
    navigation.navigate(route);
  };

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
          <Text style={styles.headerText}>    User Dashboard</Text>
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
          source={require('../assets/dashboard.png')} // Background image for the icons
          style={styles.contentBackground}
          resizeMode="cover" // Makes the image cover the entire background
        >

          {/* 6 icons arranged in 3 rows of 2 icons each */}
          <View style={styles.iconbox}>
          <Text style={styles.iconText}>Priority Services</Text>
          <View style={styles.iconGrid}>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Rescue')}>
                <Image source={require('../assets/rescue.png')} style={styles.cardImage} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('DisasterAlerts')}>
                <Image source={require('../assets/disal.png')} style={styles.cardImage} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Donation')}>
                <Image source={require('../assets/donation1.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('EmergencyContacts')}>
                <Image source={require('../assets/emergency.png')} style={styles.cardImage} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ShelterContacts')}>
                <Image source={require('../assets/sheltericon.png')} style={styles.cardImage} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Guides')}>
                <Image source={require('../assets/guides.png')} style={styles.cardImage} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.slidecontainer}>
    <Text style={styles.sliderText}>Disaster Information</Text>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
          {/* Card 1 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Cyclone')}>
            <ImageBackground source={require('../assets/cyclone.png')} style={styles.DcardImage} resizeMode="cover">
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Flood')}>
            <ImageBackground source={require('../assets/flood.png')} style={styles.DcardImage} resizeMode="cover">
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Earthquake')}>
            <ImageBackground source={require('../assets/earthquake.png')} style={styles.DcardImage} resizeMode="cover">
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 4 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Tsunami')}>
            <ImageBackground source={require('../assets/tsunami.png')} style={styles.DcardImage}  resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>
          
          {/* Card 5 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Landslide')}>
            <ImageBackground source={require('../assets/landslide.png')} style={styles.DcardImage} resizeMode="cover">            
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 6 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Drought')}>
            <ImageBackground source={require('../assets/drought.png')} style={styles.DcardImage} resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 7 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Hurricane')}>
            <ImageBackground source={require('../assets/hurricane.png')} style={styles.DcardImage} resizeMode="cover">            
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 8 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Wildfire')}>
            <ImageBackground source={require('../assets/wildfire.png')} style={styles.DcardImage} resizeMode="cover">              
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 9 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('HighTide')}>
            <ImageBackground source={require('../assets/hightide.png')} style={styles.DcardImage} resizeMode="cover">            
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 10 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Lightning')}>
            <ImageBackground source={require('../assets/lightning.png')} style={styles.DcardImage} resizeMode="cover">            
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 11 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('RoadAccident')}>
            <ImageBackground source={require('../assets/roadacc.png')} style={styles.DcardImage} resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 12 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Fire')}>
            <ImageBackground source={require('../assets/fire.png')} style={styles.DcardImage} resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 13 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('CyberCrime')}>
            <ImageBackground source={require('../assets/cybercrime.png')} style={styles.DcardImage} resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 14 */}
          <TouchableOpacity style={styles.Dcard} onPress={() => handleNavigate('Robbery')}>
            <ImageBackground source={require('../assets/robbery.png')} style={styles.DcardImage} resizeMode="cover">
            </ImageBackground>
          </TouchableOpacity>
           


    </View>
      </ScrollView>
   </View>
            
            <TouchableOpacity style={styles.statusButton} onPress={() => navigation.navigate('UserStatus')}>
              <Text style={styles.statusButtonText}>Rescue Status</Text>
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
    fontSize: 26,
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
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginTop: 10,
   
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '43%',
    height: 93,
    backgroundColor: "#f8f7e8",
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: -45,
    marginRight: -45,
    marginTop: -17,
    borderColor: '#368009',
    borderWidth: 3,
  },
  cardImage: {
    width: '100%',
    height: 87,
    
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
  iconbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 1,
    paddingHorizontal: 1,
    marginHorizontal: -25,
  },
  iconText: {
    color: '#43547a',
    fontSize: 17,
    fontWeight: 'bold', 
    marginLeft: -180,
    marginTop: -60, 
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

  slidecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 1,
    paddingHorizontal: 3,
    marginHorizontal: -30,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 1,
    paddingRight: 72,
  },
  card: {
    width: width / 5, // 3 cards per screen
    height: 80,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderRadius: 1,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 3,
    marginBottom: 3,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sliderText: {
    color: '#43547a',
    fontSize: 17,
    fontWeight: 'bold', 
    marginLeft: -150, 
    marginBottom: 19,
  },

  // --- New Status Button Styles ---
  statusButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: -26,
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Dcard: {
    width: width/4,
    height: 90,
    borderColor: '#b06464',
    borderWidth: 2,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: '#f0b4b4',
  
  },
  DcardImage:{
    width: '100%',
    height: 80,
   
  }
  // -----------------------------
});
