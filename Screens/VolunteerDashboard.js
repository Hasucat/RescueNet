import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'; 
import { db, collection, getDocs, updateDoc, doc } from './../firebase'; 

const VolunteerDashboard = () => {
  const [rescues, setRescues] = useState([]);
  const [selectedRescue, setSelectedRescue] = useState(null);
  const navigation = useNavigation(); 

  // Fetch rescue requests from Firebase
  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rescues'));
        const rescueRequests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRescues(rescueRequests);
      } catch (error) {
        console.error('Error fetching rescues: ', error);
        Alert.alert('Error', 'Unable to fetch rescue requests.');
      }
    };

    fetchRescues();
  }, []);

  // Handle accepting a rescue request
  const handleAccept = async (rescueId) => {
    try {
      const rescueDocRef = doc(db, 'rescues', rescueId);
      await updateDoc(rescueDocRef, {
        status: 'accepted',
      });

      Alert.alert('Success', 'Rescue request accepted!');

      const updatedRescues = rescues.map((rescue) =>
        rescue.id === rescueId ? { ...rescue, status: 'accepted' } : rescue
      );
      setRescues(updatedRescues);
    } catch (error) {
      console.error('Error accepting rescue request: ', error);
      Alert.alert('Error', 'Unable to accept rescue request.');
    }
  };

  // Handle viewing the rescue location on the map
  const handleViewLocation = (rescue) => {
    setSelectedRescue(rescue);
  };

  // Render each rescue request as a list item
  const renderRescueItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>
        Name: {item.name}
      </Text>
      <Text style={styles.listItemText}>
        Phone: {item.phone}
      </Text>
      <Text style={styles.listItemText}>
        Risk Type: {item.riskType}
      </Text>
      <Text style={styles.listItemText}>
        Description: {item.description}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewButton} onPress={() => handleViewLocation(item)}>
          <Text style={styles.buttonText}>View Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.acceptButton,
            { backgroundColor: item.status === 'accepted' ? '#28a745' : '#ffc107' },
          ]}
          onPress={() => handleAccept(item.id)}
          disabled={item.status === 'accepted'}
        >
          <Text style={styles.buttonText}>
            {item.status === 'accepted' ? 'Accepted' : 'Accept'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {selectedRescue ? (
        <MapView
          style={styles.map}
          region={{
            latitude: selectedRescue.location.latitude,
            longitude: selectedRescue.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: selectedRescue.location.latitude,
              longitude: selectedRescue.location.longitude,
            }}
            title={selectedRescue.name}
            description={selectedRescue.description}
          />
        </MapView>
      ) : (
        <FlatList
          data={rescues}
          keyExtractor={(item) => item.id}
          renderItem={renderRescueItem}
        />
      )}

      {selectedRescue && (
        <Button title="Back to Volunteer Dashboard" onPress={() => setSelectedRescue(null)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 16,
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  acceptButton: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});

export default VolunteerDashboard;
