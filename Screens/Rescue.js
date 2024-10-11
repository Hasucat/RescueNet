import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker'; // For risk type dropdown
import { db, getFirestore, collection, addDoc } from './../firebase.js';
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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is needed to use this feature.');
        return;
      }
    })();
  }, []);

  const handleUseCurrentLocation = async () => {
    setLoadingLocation(true);
    let location = await Location.getCurrentPositionAsync({});
    setMarker({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setRegion({
      ...region,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setLoadingLocation(false);
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
    if (!marker || !name || !phone || !riskType || !description) {
      Alert.alert("Error", "Please fill in all fields and mark your location.");
      return;
    }
    
    try {
      await addDoc(collection(db, "rescues"), {
        name,
        phone,
        riskType,
        description,
        location: {
          latitude: marker.latitude,
          longitude: marker.longitude
        }
      });
      Alert.alert("Success", "Rescue request submitted!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

           {/* Use Current Location Button */}
      <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
        <Ionicons name="locate" size={24} color="#007bff" />
        {loadingLocation && <ActivityIndicator color="#007bff" style={styles.loadingIndicator} />}
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

        {/* Use Current Location Button */}
        <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
          {loadingLocation ? <ActivityIndicator color="#fff" /> : <Text style={styles.locationButtonText}>Use Current Location</Text>}
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Rescue Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 4, // Add shadow effect for Android
      marginBottom: 3,
      marginTop:36,
      marginLeft:10,
      marginRight:10

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
      flex: 1,
    },
    form: {
      padding: 10,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    picker: {
      height: 40,
      marginBottom: 10,
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 3, // Add shadow effect for Android
        marginBottom: 10,
        marginLeft:340
      },
      loadingIndicator: {
        marginLeft: 10,
      },
    submitButton: {
      backgroundColor: '#28a745',
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