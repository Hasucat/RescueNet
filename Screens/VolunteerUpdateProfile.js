import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Alert, ImageBackground, TouchableOpacity, Keyboard, TouchableWithoutFeedback, View, Text } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { auth, db } from "./../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";



const VolunteerProfileUpdate = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchVolunteerData = async () => {
      if (!currentUser) return;
      try {
        const docRef = doc(db, "volunteers", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setAge(data.age.toString());
          setPhoneNumber(data.phoneNumber);
          setGender(data.gender);
          setLocation(data.location);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load volunteer data.");
      }
    };

    fetchVolunteerData();
  }, []);

  useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  const handleLocationPick = () => {
    navigation.navigate("MapScreen");
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(015|016|017|018|019)\d{8}$/;
    return phoneRegex.test(phone);
  };

  const handleUpdate = async () => {
    if (!name || !age || !phoneNumber || !gender || !location) {
      Alert.alert("Error", "Please fill all the fields and select a location.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Invalid phone number. \n\nPhone number must be exactly 11 digits and of a valid Bangladeshi SIM.");
      return;
    }

    if (isNaN(age) || age < 13) {
      Alert.alert("Error", "Age must be at least 13 years old.");
      return;
    }

    const updatedData = {
      name,
      age,
      phoneNumber,
      gender,
      location,
    };

    try {
      await updateDoc(doc(db, "volunteers", currentUser.uid), updatedData);
      Alert.alert("Success", "Your profile has been updated!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <ImageBackground
              source={require('../assets/header2.jpg')}
              style={styles.headerBackground}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Update Profile</Text>
              </View>
            </ImageBackground>

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

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  cardContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 60,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 1,
  },
  headerBackground: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 19,
    marginTop: 10,
    fontWeight: '900',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    marginTop: -8,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
    marginTop: -8,
  },
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
  updateButton: {
    backgroundColor: '#56ba65',
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 40,
    width: '45%',
    height: 60,
    marginLeft:84,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 9,
    fontWeight: '900',
    marginBottom: 3,
  },
});

export default VolunteerProfileUpdate;