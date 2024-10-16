import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios'; // For search functionality
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const MapScreen = ({ route }) => {
  const [region, setRegion] = useState({
    latitude: 23.8103, // Dhaka, Bangladesh
    longitude: 90.4125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigation = useNavigation();

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
        accuracy: Location.Accuracy.High,
        timeout: 10000,
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

  const handleSubmit = () => {
    if (!marker) {
      Alert.alert("Error", "Please mark a location before submitting.");
      return;
    }
  
    // Return the selected location to the VolunteerRegistration screen
    navigation.navigate('VolunteerRegistration', {
      location: {
        latitude: marker.latitude,
        longitude: marker.longitude,
      },
    });
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
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Location Button */}
      <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
        {loadingLocation ? <ActivityIndicator color="#007bff" /> : <Ionicons name="locate" size={24} color="#007bff" />}
      </TouchableOpacity>

      {/* Map */}
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

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Location</Text>
      </TouchableOpacity>
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
    height: 445,
    marginBottom: 10, 
  },
  locationButton: {
    position: 'absolute',
    top: 90, 
    right: 10, 
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50, 
    elevation: 3, 
    zIndex: 10, 
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

export default MapScreen;
