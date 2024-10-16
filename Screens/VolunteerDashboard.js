import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { db, collection, getDocs, updateDoc, doc } from './../firebase.js'; // Adjust import paths as needed
import * as Location from 'expo-location';

const VolunteerDashboard = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchRescueRequests();
    getCurrentLocation();
  }, []);

  const fetchRescueRequests = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'rescues'));
      const rescueData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRescues(rescueData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch rescue requests.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to fetch your location.');
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  };

  const handleAcceptRequest = async (rescueId) => {
    try {
      const rescueDocRef = doc(db, 'rescues', rescueId);
      await updateDoc(rescueDocRef, {
        status: 'Accepted',
        volunteerLocation: location,
      });
      Alert.alert('Success', 'Rescue request accepted.');
      fetchRescueRequests(); // Refresh after accepting a task
    } catch (error) {
      Alert.alert('Error', 'Failed to accept rescue request.');
    }
  };

  const renderRescueItem = ({ item }) => (
    <View style={styles.rescueItem}>
      <Text style={styles.rescueText}>Name: {item.name}</Text>
      <Text style={styles.rescueText}>Phone: {item.phone}</Text>
      <Text style={styles.rescueText}>Risk Type: {item.riskType}</Text>
      <Text style={styles.rescueText}>Description: {item.description}</Text>
      <Button title="Accept Rescue" onPress={() => handleAcceptRequest(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={rescues}
          renderItem={renderRescueItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No rescue requests available.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  rescueItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
  rescueText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default VolunteerDashboard;
