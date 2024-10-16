import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute
import { Picker } from "@react-native-picker/picker";
import { auth, db } from "./../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const VolunteerRegistration = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute(); // Use route to retrieve params
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Check if location is returned from MapScreen and update state
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  const handleLocationPick = () => {
    navigation.navigate("MapScreen");
  };

  const handleRegister = async () => {
    if (!name || !age || !phoneNumber || !gender || !location) {
      Alert.alert("Error", "Please fill all the fields and select a location.");
      return;
    }

    const volunteerData = {
      userId: currentUser.uid,
      name,
      age,
      phoneNumber,
      gender,
      location,
      status: "available",
    };

    try {
      await setDoc(doc(db, "volunteers", currentUser.uid), volunteerData);
      Alert.alert("Success", "You are registered as a volunteer!");
      navigation.replace("UserDashboard");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volunteer Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      {/* Gender Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      {/* Location Picker Button */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={handleLocationPick}
      >
        <Ionicons name="location-outline" size={24} color="#007bff" />
        <Text style={styles.locationText}>
          {location
            ? `Selected: ${location.latitude}, ${location.longitude}`
            : "Select Working Location on Map"}
        </Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register as Volunteer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: { height: 50, fontSize: 16 },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6f2ff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  locationText: { marginLeft: 10, fontSize: 16, color: "#007bff" },
  registerButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  registerButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default VolunteerRegistration;
