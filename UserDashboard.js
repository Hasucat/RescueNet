import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated,Text, TouchableOpacity,ImageBackground, ActivityIndicator, View, Alert, Image,ScrollView } from 'react-native';
import { auth, db } from './firebase.js';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';;
import { Ionicons,Entypo, MaterialCommunityIcons,AntDesign } from 'react-native-vector-icons';

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

  const [rescueStatus, setRescueStatus] = useState(null);
  const [isVolunteer, setIsVolunteer] = useState(false); // For checking if the user is a volunteer
  const [loading, setLoading] = useState(true);

  // Fetch user rescue request status or check if the user is a volunteer
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to view your dashboard.");
        return;
      }

      const userID = user.uid;

      try {
        // Check if the user is a volunteer
        const volunteerQuery = query(collection(db, "volunteers"), where("userID", "==", userID));
        const volunteerSnapshot = await getDocs(volunteerQuery);
        
        if (!volunteerSnapshot.empty) {
          setIsVolunteer(true); // The user is a volunteer
        } else {
          // If the user is not a volunteer, check their rescue request status
          const rescueQuery = query(collection(db, "rescues"), where("userID", "==", userID));
          const rescueSnapshot = await getDocs(rescueQuery);

          if (!rescueSnapshot.empty) {
            const rescueData = rescueSnapshot.docs[0].data();
            setRescueStatus(rescueData.status); // Assuming there's a 'status' field in the rescue document
          } else {
            setRescueStatus('No rescue requests found.');
          }
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
  <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')} style={styles.menuItem}>
    <View style={styles.iconTextContainer}>
      <Ionicons name="person" size={30} color="#5c6996" />
      <Text style={styles.menuText}>Update Profile</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('ImportantContacts')} style={styles.menuItem}>
    <View style={styles.iconTextContainer}>
      <MaterialCommunityIcons name="contacts" size={30} color="#158a20" />
      <Text style={styles.menuText}>Emergency Contact</Text>
    </View>
  </TouchableOpacity>
  
  <TouchableOpacity onPress={() => navigation.navigate('VolunteerRegistration')} style={styles.menuItem}>
    <View style={styles.iconTextContainer}>
      <MaterialCommunityIcons name="account-heart" size={30} color="#b01950" />
      <Text style={styles.menuText}>Be Volunteer</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('Tutorial')} style={styles.menuItem}>
    <View style={styles.iconTextContainer}>
      <Entypo name="youtube" size={30} color="#db1a14" />
      <Text style={styles.menuText}>Tutorial</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate('RelevantLink')} style={styles.menuItem}>
    <View style={styles.iconTextContainer}>
      <Entypo name="link" size={30} color="#589ea3" />
      <Text style={styles.menuText}>Relevant Link</Text>
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
<ImageBackground
        source={require('./assets/header2.jpg')} // Background image for the icons
        style={styles.rescueRequest}
        resizeMode="cover" // Makes the image cover the entire background
      >
      {!isVolunteer && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}  color="#f7f8fa" > Rescue Request Status:</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#f7f8fa" />
          ) : (
            <Text style={styles.statusText}>
              {rescueStatus || 'No rescue request submitted yet.'}
            </Text>
          )}
        </View>
      )}
      </ImageBackground>
      <ImageBackground
        source={require('./assets/dashboard5.png')} // Background image for the icons
        style={styles.contentBackground}
        resizeMode="cover" // Makes the image cover the entire background
      >
    {/* 6 icons arranged in 3 rows of 2 icons each */}
    <View style={styles.iconGrid}>
    <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Rescue')}>
        	<Image source={require('./assets/Rescue.png')} style={styles.cardImage} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('DisasterAlerts')}>
      		<Image source={require('./assets/alerts.png')} style={styles.cardImage} />
      	</TouchableOpacity>
</View>
<View style={styles.iconRow}>
	<TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Donation')}>
      		<Image source={require('./assets/donation1.png')} style={styles.cardImage} />
      	</TouchableOpacity>
      	
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('EmergencyList')}>
        	<Image source={require('./assets/emergency.png')} style={styles.cardImage} />
        </TouchableOpacity>
</View>
<View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('VolunteerRegistration')}>
        	<Image source={require('./assets/volunreg.png')} style={styles.cardImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('VolunteerDashboard')}>
        	<Image source={require('./assets/volunalert.png')} style={styles.cardImage} />
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
    
    backgroundColor: '#2a5157', // Purple background color
    height: 130, // Adjust height to your design
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: -60,
  },
  bar: {
    height: 90,
    backgroundColor: '#fff',
    marginBottom: 0,
    marginTop: -40,
    marginHorizontal: -10,
    backgroundColor:'#1c294f'
  },
  menuItem: {
    padding: 15,
    borderBottomColor: '#ddd',
    backgroundColor: '#f5f2e6',
  },
  iconTextContainer: {
    flexDirection: 'row',     // Align icon and text in a row
    alignItems: 'center',     // Center vertically
  },
  menuIcon: { 
    position: 'absolute',
     left: 20,
      top: 80 ,
      marginRight: 15,
      color: '#000',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1, // Background overlay behind the menu
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#f5f2e6',
    padding: 20,
    zIndex: 10, // Ensure it sits above the overlay
  },
  menuText: { 
    color: '#00000', 
    fontSize: 19, 
    marginVertical: 10,
    marginLeft: 10, 
 },
  statusContainer: {
    marginTop: 0,
    height: 100,
    alignItems: 'center',
    padding:20,
  },
  backButton: {
    marginBottom: 60, // Space between the back button and menu items
    alignSelf: 'flex-start',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f7f8fa',
  },
  statusText: {
    fontSize: 16,
    color: '#e32802',
    marginTop: 2,
  },
  contentBackground: {
    flex: 1, // Make it cover the remaining space after the header
    paddingHorizontal: 40,
    justifyContent: 'center',
    paddingVertical: 40, // Padding around the icons and button
  },
  scrollContainer: {
    flexGrow: 1, // Allows content to fill the space when not enough items
    paddingBottom: 10, // Optional: Add some space at the bottom
  },
  iconGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconRow: {
    flexDirection: 'row', // Arrange icons in a row
    justifyContent: 'space-between',
    marginBottom: -2, // Space between rows
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%', // Increased width to make icons wider
    height: 160,
    padding: 10, // Increased padding inside the card
    marginBottom: 14, // Space between rows of icons
    backgroundColor: "#f8f7e8", // White background for card appearance
    borderRadius: 6, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.1, // Slight shadow for card effect
    shadowRadius: 4,
    elevation: 3, // Shadow effect for Android
    marginHorizontal: -6, // Space between icons in the same row
    marginRight: -6,
    marginTop: -5,
  },
  cardImage: {
    width: '100%', // Ensures image covers the entire width of the card
    height: 130, // Adjust the height of the card as needed
    borderRadius: 10, // Same as the card container to create a consistent look
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
    marginTop: 20, // Adjust for spacing below icons
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  rescueRequest: {
    width: '100%',
    height:100,
  },
});
