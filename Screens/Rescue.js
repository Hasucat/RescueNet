import React, { useState, useEffect } from 'react';
import { ScrollView,View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker'; // For risk type dropdown
import { db, auth } from './../firebase.js'; // Ensure you're importing auth to get current user
import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios'; // For search functionality
import { Ionicons } from '@expo/vector-icons'; 

const Rescue = () => {
  const [region, setRegion] = useState({
    latitude: 23.8103, // Dhaka, Bangladesh
    longitude: 90.4125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [riskType, setRiskType] = useState('');
  const [description, setDescription] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // For search input

  useEffect(() => {
    (async () => {
      await checkGpsEnabled();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is needed to use this feature.');
        return;
      }
    })();
  }, []);

  const checkGpsEnabled = async () => {
    let providerStatus = await Location.hasServicesEnabledAsync();
    if (!providerStatus) {
      Alert.alert(
        'GPS Disabled',
        'Please enable your location services/GPS to use this feature.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is needed to use this feature.');
        setLoadingLocation(false);
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,  // Try increasing the accuracy
        timeout: 10000,  // Timeout for location fetching
      });
  
      setMarker({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch current location. Please try again.');
      console.error("Location fetch error:", error); // Log the error
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      Alert.alert("Error", "Please enter a location to search.");
      return;
    }

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: searchQuery,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        }
      });

      if (response.data.length > 0) {
        const location = response.data[0];
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lon);

        setMarker({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        Alert.alert("Error", "Location not found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to search location.");
    }
  };

  const handleSubmit = async () => {
    const user = auth.currentUser; // Get current logged-in user
    if (!user) {
      Alert.alert("Error", "You must be logged in to submit a rescue request.");
      return;
    }

    const userID = user.uid; // Get userID from Firebase Auth

    if (!marker || !name || !phone || !riskType || !description) {
      Alert.alert("Error", "Please fill in all fields and mark your location.");
      return;
    }
    
    try {
      await addDoc(collection(db, "rescues"), {
        userID, // Include userID in the Firestore document
        name,
        phone,
        riskType,
        description,
        location: {
          latitude: marker.latitude,
          longitude: marker.longitude
        },
        status: 'pending', // Set the default status to 'pending'
        timestamp: new Date(), // Add a timestamp to track the request time
      });
      Alert.alert("Success", "Rescue request submitted!");
      setName('');
      setPhone('');
      setRiskType('');
      setDescription('');
      setMarker(null); // Reset the marker after submission

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>

      {/* Map */}
      

      {/* Search Bar */}
      <View style={styles.searchContainer}>

        {/* Search Bar*/}
        <TextInput
          style={styles.searchInput}
          placeholder="Search location"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Location Button as Overlay */}
      <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
        {loadingLocation ? <ActivityIndicator color="#007bff" /> : <Ionicons name="locate" size={24} color="#007bff" />}
      </TouchableOpacity>

      <MapView
        style={styles.map}
        region={region}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        {marker && <Marker coordinate={marker} />}
        
      </MapView>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        
        {/* Risk Type Dropdown */}
        <Picker
          selectedValue={riskType}
          onValueChange={(itemValue) => setRiskType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Risk Type" value="" />
          <Picker.Item label="Fire" value="Fire" />
          <Picker.Item label="Flood" value="Flood" />
          <Picker.Item label="Earthquake" value="Earthquake" />
          <Picker.Item label="Theft" value="Theft" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Rescue Request</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // Allows content to fill the space when not enough items
    paddingBottom: 20, // Optional: Add some space at the bottom
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 3,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  map: {
    height:445,
    marginBottom:10 // Set a fixed height for the map to avoid layout issues
  },
  form: {
    padding :7,
    marginTop: 1
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  locationButton: {
    position: 'absolute',
    top: 90, // You can adjust this value to position the button
    right: 10, // Position to the right corner of the map
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50, // Make it circular
    elevation: 3, // Add shadow for Android
    zIndex: 10, // Ensure it stays on top
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#0c3038',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Rescue;
