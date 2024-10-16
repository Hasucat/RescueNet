import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image, ActivityIndicator } from 'react-native';
import { auth, db } from './firebase.js';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
    <View style={styles.container}>
      {/* Curved Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
      </View>

      {/* Rescue Status for non-volunteers */}
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
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('VolunteerRegistration')}>
          <Image source={require('./assets/logo/alert.png')} style={styles.icon} />
          <Text style={styles.iconText}>Volunteer Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('VolunteerDashboard')}>
          <Image source={require('./assets/logo/alert.png')} style={styles.icon} />
          <Text style={styles.iconText}>Volunteer Dashboard</Text>
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
    height: 150, // Adjust height to your design
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
  statusContainer: {
    marginTop: 0,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 2,
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
