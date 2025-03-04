import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  Modal, 
  Button,
  ActivityIndicator,
  TextInput,
  Linking
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db, auth } from './../firebase.js'; 

const UserStatus = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  const [volModalVisible, setVolModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedCancelRescue, setSelectedCancelRescue] = useState(null);
  const [selectedLocationRescue, setSelectedLocationRescue] = useState(null);

  // Real-time listener for rescue requests made by the current user
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "User not logged in");
      setLoading(false);
      return;
    }
    const q = query(collection(db, "rescues"), where("userID", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rescueList = [];
      querySnapshot.forEach((docSnapshot) => {
        rescueList.push({ id: docSnapshot.id, ...docSnapshot.data() });
      });
      setRescues(rescueList);
      setLoading(false);
    }, (error) => {
      Alert.alert("Error", "Failed to fetch rescue requests.");
      console.error(error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Delete a rescue request (if needed)
  const handleDelete = async (rescueId) => {
    try {
      await deleteDoc(doc(db, "rescues", rescueId));
      Alert.alert("Deleted", "Rescue request deleted successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to delete rescue request.");
    }
  };

  // Update rescue status to Completed when user confirms rescue completion
  const handleComplete = async (rescueId) => {
    try {
      await updateDoc(doc(db, "rescues", rescueId), { 
        status: "Completed",
        lastAction: "User Confirmed Completion"
      });
      Alert.alert("Success", "Rescue confirmed as completed.");
    } catch (error) {
      Alert.alert("Error", "Failed to update rescue status.");
      console.error(error);
    }
  };

  // Update rescue status to Canceled when user cancels the request.
  const handleUserCancel = async (rescueId, reason) => {
    if (!reason) {
      Alert.alert("Input Required", "Please provide a reason for cancellation.");
      return;
    }
    try {
      await updateDoc(doc(db, "rescues", rescueId), { 
        status: "Canceled", 
        cancelReason: reason,
        lastAction: "User Canceled"
      });
      Alert.alert("Canceled", "Your rescue request has been canceled.");
      setCancelModalVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to cancel the rescue request.");
      console.error(error);
    }
  };

  // Fetch volunteer info based on volunteerAssigned field (assumed to be volunteer's UID)
  const showVolunteerInfo = async (volunteerUid) => {
    try {
      const volDoc = await getDoc(doc(db, "volunteers", volunteerUid));
      if (volDoc.exists()) {
        setVolunteerInfo(volDoc.data());
        setVolModalVisible(true);
      } else {
        Alert.alert("Info", "No volunteer info found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch volunteer info.");
    }
  };

  // Open location modal to view rescue location on map
  const openLocationModal = (rescue) => {
    if (rescue.location && rescue.location.latitude && rescue.location.longitude) {
      setSelectedLocationRescue(rescue);
      setLocationModalVisible(true);
    } else {
      Alert.alert("Location Error", "Location data is not available for this rescue.");
    }
  };

  // Open cancellation modal for a specific rescue request.
  const openCancelModal = (rescue) => {
    if (rescue.status.toLowerCase() === 'pending' || rescue.status.toLowerCase() === 'accepted') {
      setSelectedCancelRescue(rescue);
      setCancelModalVisible(true);
    } else {
      Alert.alert('Not Allowed', 'You cannot cancel once the rescue is in progress.');
    }
  };

  // Handle external navigation for location
  const handleNavigate = () => {
    if (selectedLocationRescue && selectedLocationRescue.location) {
      const lat = Number(selectedLocationRescue.location.latitude);
      const lon = Number(selectedLocationRescue.location.longitude);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
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
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0c3038" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rescue Request Status</Text>
      </View>
      {rescues.length === 0 ? (
        <Text style={styles.loadingText}>No rescue requests found.</Text>
      ) : (
        rescues.map((rescue) => (
          <View key={rescue.id} style={styles.rescueBox}>
            <Text style={styles.rescueName}>{rescue.name}</Text>
            <Text style={styles.rescueStatus}>
  <Text style={styles.statusLabel}>Status: </Text>
  <Text style={styles.statusContent}>
    {rescue.status} 
    {rescue.lastAction ? ` (${rescue.lastAction}${rescue.cancelReason ? `: ${rescue.cancelReason}` : ''})` : ""}
  </Text>
</Text>
            <Text style={styles.rescueDescription}>Description: {rescue.description}</Text>
            <Text style={styles.rescueInfo}>Risk: {rescue.riskType}</Text>
            <Text style={styles.rescueInfo}>Phone: {rescue.phone}</Text>

            {/* Action Buttons */}
            {rescue.status.toLowerCase() === 'in progress' && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleComplete(rescue.id)}
              >
                <Text style={styles.buttonText}>Confirm Rescue Completion</Text>
              </TouchableOpacity>
            )}
            {(rescue.status.toLowerCase() === 'pending' || rescue.status.toLowerCase() === 'accepted') && (
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: '#ff3b30' }]}
                onPress={() => openCancelModal(rescue)}
              >
                <Text style={styles.buttonText}>Cancel Request</Text>
              </TouchableOpacity>
            )}
            {rescue.status.toLowerCase() === 'accepted' && rescue.volunteerAssigned && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.volunteerButton} 
                  onPress={() => showVolunteerInfo(rescue.volunteerAssigned)}
                >
                  <Text style={styles.buttonText}>Volunteer Info</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Button to view rescue location */}
            <TouchableOpacity onPress={() => openLocationModal(rescue)} style={styles.mapButton}>
              <Text style={styles.mapButtonText}>View Location</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* Volunteer Info Modal */}
      {volunteerInfo && (
        <Modal
          visible={volModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setVolModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: '#fff' }]}>
              <Text style={styles.modalTitle}>Volunteer Info</Text>
              <Text style={styles.modalText}>Name: {volunteerInfo.name}</Text>
              <Text style={styles.modalText}>Age: {volunteerInfo.age}</Text>
              <Text style={styles.modalText}>Gender: {volunteerInfo.gender}</Text>
              <Text style={styles.modalText}>Phone: {volunteerInfo.phoneNumber}</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton} 
                onPress={() => setVolModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Location Modal */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rescue Location</Text>
          {selectedLocationRescue && selectedLocationRescue.location && selectedLocationRescue.location.latitude && selectedLocationRescue.location.longitude ? (
            <MapView
              style={styles.modalMap}
              initialRegion={{
                latitude: Number(selectedLocationRescue.location.latitude),
                longitude: Number(selectedLocationRescue.location.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={{ 
                latitude: Number(selectedLocationRescue.location.latitude), 
                longitude: Number(selectedLocationRescue.location.longitude) 
              }} />
            </MapView>
          ) : (
            <Text style={styles.errorText}>Location not available</Text>
          )}
          <View style={styles.modalButtons}>
            <Button title="Navigate" onPress={handleNavigate} />
            <Button title="Close" onPress={() => setLocationModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Cancellation Modal */}
      <Modal
        visible={cancelModalVisible}
        animationType="slide"
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cancel Rescue Request</Text>
          <Text style={styles.modalText}>Enter Cancellation Reason:</Text>
          <TextInput
            style={styles.input}
            placeholder="Reason for cancellation"
            value={cancelReason}
            onChangeText={setCancelReason}
          />
          {selectedCancelRescue && (
            <Button title="Submit Cancellation" onPress={() => handleUserCancel(selectedCancelRescue.id, cancelReason)} />
          )}
          <Button title="Close" onPress={() => setCancelModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default UserStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  rescueBox: {
    borderWidth: 3,
    borderColor: '#3b5063',
    borderRadius: 8,
    padding: 10,
    marginVertical: 20,
  },
  rescueName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  rescueDescription: {
    fontSize: 14,
    marginBottom: 2,
    color: '#555',
  },
  header: {
    backgroundColor: '#374552',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
    borderRadius: 5,
    borderColor:'#b8cde0',
    borderWidth:4,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
    rescueStatus: {
      fontSize: 16, 
      marginVertical: 2, 
    },
    statusLabel: {
      color: "#18ad6d",
      fontWeight: "bold",
    },
    statusContent: {
      color: "#000", 
    },
  rescueInfo: {
    fontSize: 14,
    marginBottom: 2,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  volunteerButton: {
    backgroundColor: '#0a84ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapButton: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#4178bf',
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  modalText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#0a84ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
});
