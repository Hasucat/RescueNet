import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  Modal,
  Button,
  TextInput
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const VolunteerStatus = () => {
  const [rescue, setRescue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const currentUser = auth.currentUser;

  // Fetch rescue details from volunteer doc based on rescueId
  const fetchVolunteerRescue = useCallback(async () => {
    if (!currentUser) {
      Alert.alert('Error', 'User not authenticated.');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const volDoc = await getDoc(doc(db, 'volunteers', currentUser.uid));
      if (volDoc.exists()) {
        const volData = volDoc.data();
        if (volData.rescueId) {
          const rescueDoc = await getDoc(doc(db, 'rescues', volData.rescueId));
          if (rescueDoc.exists()) {
            setRescue({ id: rescueDoc.id, ...rescueDoc.data() });
          } else {
            Alert.alert('Error', 'Rescue details not found.');
          }
        } else {
          Alert.alert('Info', 'You have not accepted any rescue request yet.');
          setRescue(null);
        }
      } else {
        Alert.alert('Error', 'Volunteer document not found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch your rescue status.');
      console.error(error);
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    fetchVolunteerRescue();
  }, [fetchVolunteerRescue]);

  // Action: Confirm Arrival to mark as "In Progress"
  const handleConfirmArrival = async () => {
    if (!rescue) return;
    try {
      await updateDoc(doc(db, 'rescues', rescue.id), { status: 'In Progress' });
      Alert.alert('Success', 'You have confirmed your arrival. Rescue is now In Progress.');
      fetchVolunteerRescue();
    } catch (error) {
      Alert.alert('Error', 'Failed to update status.');
      console.error(error);
    }
  };

  // Action: Mark rescue as Completed
  const handleMarkCompleted = async () => {
    if (!rescue) return;
    try {
      await updateDoc(doc(db, 'rescues', rescue.id), { status: 'Completed', lastAction: 'User Confirmed Completion' });
      // Optionally, update volunteer document to make them available again:
      await updateDoc(doc(db, 'volunteers', currentUser.uid), { status: 'available', rescueId: '' });
      Alert.alert('Success', 'Rescue marked as completed.');
      setRescue(null); // Clear the accepted rescue entry
    } catch (error) {
      Alert.alert('Error', 'Failed to mark rescue as completed.');
      console.error(error);
    }
  };

  // Action: Cancel rescue (only allowed if still in "Accepted")
  const handleCancelRequest = async (reason) => {
    if (!rescue) return;
    if (rescue.status.toLowerCase() !== 'accepted') {
      Alert.alert('Not Allowed', 'You cannot cancel once the rescue is in progress.');
      return;
    }
    if (!reason) {
      Alert.alert('Input Required', 'Please provide a reason for cancellation.');
      return;
    }
    try {
      // For a volunteer canceling, update lastAction accordingly.
      await updateDoc(doc(db, 'rescues', rescue.id), { 
        status: 'Canceled', 
        cancelReason: reason,
        lastAction: 'Volunteer Canceled'
      });
      // Update volunteer document to make them available again.
      await updateDoc(doc(db, 'volunteers', currentUser.uid), { status: 'available', rescueId: '' });
      Alert.alert('Canceled', 'Rescue request has been canceled.');
      setCancelModalVisible(false);
      setRescue(null); // Clear the rescue entry
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel the rescue request.');
      console.error(error);
    }
  };

  // Open the location modal
  const openLocationModal = () => {
    setLocationModalVisible(true);
  };

  // Open the cancellation modal (only for accepted rescue)
  const openCancelModal = () => {
    if (rescue && rescue.status.toLowerCase() === 'accepted') {
      setCancelModalVisible(true);
    } else {
      Alert.alert('Not Allowed', 'Cannot cancel once the rescue is in progress.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0c3038" />
      </View>
    );
  }

  if (!rescue) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>No accepted rescue request to display.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
  <Text style={styles.header}>Rescue Request Status</Text>
</View>

      <Text style={styles.name}>{rescue.name}</Text>
      <Text style={styles.description}>
  <Text style={styles.label}>Description : </Text>
  <Text style={styles.descriptionContent}>{rescue.description}</Text>
</Text>

<Text style={styles.info}>
  <Text style={styles.label}>Risk Type: </Text>
  <Text style={styles.infoContent}>{rescue.riskType}</Text>
</Text>

<Text style={styles.info}>
  <Text style={styles.label}>Phone: </Text>
  <Text style={styles.infoContent}>{rescue.phone}</Text>
</Text>

<Text style={styles.info}>
  <Text style={styles.label}>Status: </Text>
  <Text style={styles.infoContent}>
    {rescue.status} 
    {rescue.lastAction ? ` (${rescue.lastAction}${rescue.cancelReason ? `: ${rescue.cancelReason}` : ''})` : ""}
  </Text>
</Text>

      <TouchableOpacity onPress={openLocationModal} style={styles.mapButton}>
        <Text style={styles.mapButtonText}>View Location</Text>
      </TouchableOpacity>

      {rescue.status.toLowerCase() === 'accepted' && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleConfirmArrival}>
            <Text style={styles.buttonText}>Confirm Arrival</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#c9371a' }]} onPress={openCancelModal}>
            <Text style={styles.buttonText}>Cancel Request</Text>
          </TouchableOpacity>
        </View>
      )}
      {rescue.status.toLowerCase() === 'in progress' && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleMarkCompleted}>
            <Text style={styles.buttonText}>Mark as Completed</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Location Modal */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Rescue Location</Text>
          {rescue.location && rescue.location.latitude && rescue.location.longitude ? (
            <MapView
              style={styles.modalMap}
              initialRegion={{
                latitude: Number(rescue.location.latitude),
                longitude: Number(rescue.location.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker 
                coordinate={{
                  latitude: Number(rescue.location.latitude),
                  longitude: Number(rescue.location.longitude)
                }} 
              />
            </MapView>
          ) : (
            <Text style={styles.errorText}>Location not available</Text>
          )}
          <View style={styles.modalButtons}>
            <Button title="Navigate" onPress={() => {
              const lat = Number(rescue.location.latitude);
              const lon = Number(rescue.location.longitude);
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
            }} />
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
           <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelRequest(cancelReason)}
          >
            <Text style={styles.buttonText}>Submit Cancellation</Text>
          </TouchableOpacity>
      
        
        <TouchableOpacity style={styles.closeButton} onPress={() => setCancelModalVisible(false)}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default VolunteerStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    backgroundColor: "#374552", // Light gray background
    padding: 5, // Add some padding
    borderRadius: 5,
    borderColor:'#b8cde0',
    borderWidth:4,
    alignItems: "center", // Center the text horizontally
    marginTop: -5, // Add some margin
    marginBottom:4,
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
    color:'#fff'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop:5,
    textAlign: 'center',
  },
  description: {
    fontSize: 16, 
  },
  label: {
    color: "#633b4b", // Change to your preferred label color
    fontWeight: "bold",
  },
  descriptionContent: {
    color: "#000", // Black color for the description content
  },
  info: {
    fontSize: 16, 
    marginVertical: 2, // Small spacing between lines
  },
  label: {
    color: "#633b4b", // Change this to your preferred label color
    fontWeight: "bold",
  },
  infoContent: {
    color: "#000", // Black color for the actual content
  },
  mapButton: {
    marginVertical: 15,
    marginLeft:35,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#4178bf',
    borderRadius: 6,
    width: '80%',
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginVertical: -12,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#4da361',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginVertical: 4,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalTitle:{
    color: '#c9371a',
    fontWeight: 'bold',
    fontSize:25,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    backgroundColor: 'rgba(156, 203, 218, 0.5)',
    
  },
  modalMap: {
    flex: 1,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#18ad6d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#d6362b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTexts: {
    color: 'white',
    fontWeight: 'bold',
  },
});
