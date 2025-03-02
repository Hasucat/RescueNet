import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const VolunteerDashboard = () => {
  const navigation = useNavigation();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  // Implement auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // If no user is signed in, redirect to auth
        navigation.replace("Auth");
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to check volunteer registration status
  const checkVolunteerRegistration = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const volunteerDoc = await getDoc(doc(db, "volunteers", user.uid));
      setIsRegistered(volunteerDoc.exists());
    } catch (error) {
      console.error("Error checking registration:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Use focus effect to re-check registration status every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      checkVolunteerRegistration();
    }, [checkVolunteerRegistration])
  );

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Auth");
      })
      .catch((error) => alert(error.message));
  };

  // Handlers for navigating to Rescue Requests or Rescue Status
  const handleRescueRequests = () => {
    if (!isRegistered) {
      setModalVisible(true);
    } else {
      navigation.navigate('RescueRequests');
    }
  };

  const handleRescueStatus = () => {
    if (!isRegistered) {
      setModalVisible(true);
    } else {
      navigation.navigate("VolunteerStatus");
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
    <View style={styles.container}>
      {/* Header at top left */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome</Text>
        </Text>
      </View>

      {/* Grid Layout */}
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("VolunteerRegistration")}
        >
          <Text style={styles.gridText}>Volunteer Registration</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("VolunteerProfileUpdate")}
        >
          <Text style={styles.gridText}>Profile Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={handleRescueRequests}
        >
          <Text style={styles.gridText}>Rescue Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} onPress={handleRescueStatus}>
          <Text style={styles.gridText}>Rescue Status</Text>
        </TouchableOpacity>
      </View>

      {/* Modal shown if not registered */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              You must register as a volunteer before accessing this feature.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("VolunteerRegistration");
              }}
            >
              <Text style={styles.modalButtonText}>Go to Registration</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VolunteerDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
  },
  welcomeText: {
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    height: 120,
    backgroundColor: "#e0f0ff",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0c3038",
  },
  gridText: {
    fontSize: 18,
    textAlign: "center",
  },
  signOutButton: {
    marginTop: 30,
    backgroundColor: "#0c3038",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutText: {
    color: "#fff",
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#0c3038",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
