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
                style={[styles.actionButton, { backgroundColor: '#c9371a' }]}
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
            <View style={styles.volInfoBar}>
              <Text style={styles.volInfoText}>Volunteer Info</Text>
            </View>
            <Text style={styles.info}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.infoContent}>{volunteerInfo.name}</Text>
            </Text>
            <Text style={styles.info}>
            <Text style={styles.label}>Age: </Text>
            <Text style={styles.infoContent}>{volunteerInfo.age}</Text>
            </Text>
            <Text style={styles.info}>
            <Text style={styles.label}>Gender: </Text>
            <Text style={styles.infoContent}>{volunteerInfo.gender}</Text>
            </Text>
            
            <Text style={styles.info}>
            <Text style={styles.label}>Phone: </Text>
            <Text style={styles.infoContent}>{volunteerInfo.phoneNumber}</Text>
            </Text>
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
            <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleUserCancel(selectedCancelRescue.id, cancelReason)}
          >
            <Text style={styles.buttonText}>Submit Cancellation</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.closeButton} onPress={() => setCancelModalVisible(false)}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
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
    backgroundColor: '#4da361',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginVertical: 1,
    width: '70%',
    alignItems: 'center',
    marginBottom: 3,
    marginLeft:5
  },
  info: {
    fontSize: 16, 
    marginVertical: 2, 
    marginLeft: 12,
    
  },
  label: {
    color: "#633b4b", // Change this to your preferred label color
    fontWeight: "bold",
   
    
  },
  infoContent: {
    color: "#000", // Black color for the actual content
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionButton: {
    backgroundColor: '#4da361',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginVertical: 1,
    width: '70%',
    alignItems: 'center',
    marginLeft: 55,
    marginBottom:-3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapButton: {
    marginVertical:1,
    padding: 10,
    backgroundColor: '#4178bf',
    borderRadius: 6,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '70%',
    marginLeft: 55,
    marginTop:5,
  },
  modalOverlay:{
    borderRadius: 1,
    borderColor:'#000',
    borderWidth:1,
    marginTop:250,
    width:'95%',
    marginLeft: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  volInfoBar: {
    width: '95%',
    backgroundColor: '#62bd65', // Blue bar
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor:'#fff',
    borderWidth:2,
    marginTop: 10,
    marginLeft:10,
  },
  volInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text
  },
  modalMap: {
    flex: 1,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal:30,
    
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#c9371a',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor:'#fff',
    borderWidth:2,
    marginTop: 2,
    width:'80',
    marginLeft:130,
    alignItems: 'center',
    marginBottom: 10,
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
