import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  ActivityIndicator, 
  Linking,
  Modal,
  Button
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

const RescueRequests = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptedRequestId, setAcceptedRequestId] = useState(null);
  const [volStatus, setVolStatus] = useState('available'); // "available" or "unavailable"
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRescue, setSelectedRescue] = useState(null);
  const navigation = useNavigation();
  const currentUser = auth.currentUser;

  // Fetch volunteer status from volunteers collection
  const fetchVolunteerStatus = useCallback(async () => {
    if (!currentUser) return;
    try {
      const volDoc = await getDoc(doc(db, 'volunteers', currentUser.uid));
      if (volDoc.exists()) {
        const data = volDoc.data();
        setVolStatus(data.status || 'available');
      }
    } catch (error) {
      console.error('Error fetching volunteer status:', error);
    }
  }, [currentUser]);

  // Fetch pending rescue requests
  const fetchRescues = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'rescues'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const rescueList = [];
      querySnapshot.forEach((docSnapshot) => {
        rescueList.push({ id: docSnapshot.id, ...docSnapshot.data() });
      });
      setRescues(rescueList);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch rescue requests.');
      console.error(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVolunteerStatus();
    fetchRescues();
  }, [fetchVolunteerStatus, fetchRescues]);

  // Handle calling the phone number
  const handleCall = useCallback((phone) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to make a call.');
        }
      })
      .catch((error) => Alert.alert('Error', error.message));
  }, []);

  // Handle Accepting a rescue request
  const handleAccept = useCallback(async (rescueId, requestorName) => {
    if (!currentUser) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }
    if (acceptedRequestId || volStatus !== 'available') {
      Alert.alert('Info', 'You have already accepted a request or are unavailable.');
      return;
    }
    try {
      // Update the rescue request status to Accepted and add volunteerAssigned field
      await updateDoc(doc(db, 'rescues', rescueId), { 
        status: 'Accepted',
        volunteerAssigned: currentUser.uid 
      });
      // Update current volunteer's status to unavailable and record the accepted rescue's ID
      await updateDoc(doc(db, 'volunteers', currentUser.uid), { 
        status: 'unavailable',
        rescueId: rescueId
      });
      setAcceptedRequestId(rescueId);
      setVolStatus('unavailable');
      Alert.alert('Success', `Request of user ${requestorName} is accepted.`);
      fetchRescues(); // Refresh list
    } catch (error) {
      Alert.alert('Error', 'Failed to accept the rescue request.');
      console.error(error);
    }
  }, [currentUser, acceptedRequestId, volStatus, fetchRescues]);

  // Open modal to show the rescue location on a larger map
  const openLocationModal = useCallback((rescue) => {
    const latitude = rescue.location ? Number(rescue.location.latitude) : null;
    const longitude = rescue.location ? Number(rescue.location.longitude) : null;
    
    if (latitude !== null && longitude !== null) {
      setSelectedRescue(rescue);
      setModalVisible(true);
    } else {
      Alert.alert('Location Error', 'Location data is not available for this rescue.');
    }
  }, []);

  // Handle navigation using an external maps app
  const handleNavigate = useCallback(() => {
    if (selectedRescue) {
      const latitude = Number(selectedRescue.location.latitude);
      const longitude = Number(selectedRescue.location.longitude);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            Alert.alert('Error', 'Unable to open map application.');
          }
        })
        .catch((error) => Alert.alert('Error', error.message));
    }
  }, [selectedRescue]);

  // Render each rescue request
  const renderRescueItem = useCallback(({ item }) => {
    // Extract coordinates from the nested location object
    const latitude = item.location ? Number(item.location.latitude) : null;
    const longitude = item.location ? Number(item.location.longitude) : null;
    
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>Description: {item.description}</Text>
        <Text style={styles.info}>Risk Type: {item.riskType}</Text>
        <Text style={styles.info}>Phone: {item.phone}</Text>
        <Text style={styles.info}>Status: {item.status}</Text>
        <TouchableOpacity onPress={() => openLocationModal(item)}>
          <View style={styles.mapContainer}>
            {(latitude !== null && longitude !== null) ? (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker coordinate={{ latitude, longitude }} />
              </MapView>
            ) : (
              <Text style={styles.errorText}>Location not available</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => handleCall(item.phone)}
          >
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.acceptButton,
              (acceptedRequestId || volStatus !== 'available') ? { backgroundColor: '#ccc' } : {}
            ]}
            onPress={() => handleAccept(item.id, item.name)}
            disabled={acceptedRequestId !== null || volStatus !== 'available'}
          >
            <Text style={styles.buttonText}>
              {acceptedRequestId === item.id ? 'Accepted' : 'Accept'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [handleCall, handleAccept, openLocationModal, acceptedRequestId, volStatus]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0c3038" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={rescues}
        keyExtractor={(item) => item.id}
        renderItem={renderRescueItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No pending rescue requests.</Text>
        }
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rescue Location</Text>
          {selectedRescue && selectedRescue.location && selectedRescue.location.latitude && selectedRescue.location.longitude ? (
            <MapView
              style={styles.modalMap}
              initialRegion={{
                latitude: Number(selectedRescue.location.latitude),
                longitude: Number(selectedRescue.location.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={{ 
                latitude: Number(selectedRescue.location.latitude), 
                longitude: Number(selectedRescue.location.longitude) 
              }} />
            </MapView>
          ) : (
            <Text style={styles.errorText}>Location not available</Text>
          )}
          <View style={styles.modalButtons}>
            <Button title="Navigate" onPress={handleNavigate} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RescueRequests;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  info: {
    fontSize: 14,
    marginBottom: 2,
    color: '#555',
  },
  mapContainer: {
    height: 150,
    width: '100%',
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  callButton: {
    backgroundColor: '#0a84ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  acceptButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMap: {
    flex: 1,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
