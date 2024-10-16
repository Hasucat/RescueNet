import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity,ImageBackground, ActivityIndicator, View, Alert, Image,ScrollView } from 'react-native';
import { auth, db } from './firebase.js';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';;

const UserDashboard = () => {
  const navigation = useNavigation();
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
      {/* Rectangular Header with Background Image */}
      <ImageBackground
        source={require('./assets/header2.jpg')} // Your background image here
        style={styles.header}
        resizeMode="cover" // Makes the image cover the entire header
      >
        <Text style={styles.headerText}>Welcome</Text>
      </ImageBackground>

      {!isVolunteer && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Rescue Request Status:</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <Text style={styles.statusText}>
              {rescueStatus || 'No rescue request submitted yet.'}
            </Text>
          )}
        </View>
      )}
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
    
    {/* Sign out button */}
    <TouchableOpacity onPress={handleSignOut} style={styles.button}>
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
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
    
    backgroundColor: '#1188ae', // Purple background color
    height: 160, // Adjust height to your design
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 0,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0c3038',
  },
  statusText: {
    fontSize: 16,
    color: '#0c3038',
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
    height: 200,
    padding: 10, // Increased padding inside the card
    marginBottom: 20, // Space between rows of icons
    backgroundColor: "#f8f7e8", // White background for card appearance
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.1, // Slight shadow for card effect
    shadowRadius: 4,
    elevation: 3, // Shadow effect for Android
    marginHorizontal: -5, // Space between icons in the same row
    marginRight: -3,
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
});
