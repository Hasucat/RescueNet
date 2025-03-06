import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal, ScrollView } from 'react-native';
import { db, auth } from './../firebase.js';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const divisionsAndDistricts = {
  Dhaka: ['Dhaka City', 'Gazipur', 'Narayanganj', 'Tangail'],
  Chattogram: ['Chattogram City', 'Cox’s Bazar', 'Feni', 'Comilla'],
  Rajshahi: ['Rajshahi City', 'Bogura', 'Naogaon', 'Pabna'],
  Khulna: ['Khulna City', 'Bagerhat', 'Jessore', 'Satkhira'],
  Barishal: ['Barishal City', 'Bhola', 'Patuakhali', 'Pirojpur'],
  Sylhet: ['Sylhet City', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Rangpur: ['Rangpur City', 'Kurigram', 'Dinajpur', 'Thakurgaon'],
  Mymensingh: ['Mymensingh City', 'Jamalpur', 'Netrokona', 'Madaripur'],
};

const ApparelDonation = () => {
  const [name, setName] = useState('');
  // Using phoneNumber only.
  const [phoneNumber, setPhoneNumber] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [donationHistory, setDonationHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Donate');
  const [clothingItems, setClothingItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  // Function to validate phone number (Bangladeshi numbers: 11 digits starting with 015, 016, 017, 018, or 019)
  const validatePhoneNumber = (number) => {
    const regex = /^(015|016|017|018|019)\d{8}$/;
    return regex.test(number);
  };

  // Handle phone number change
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  // When the division changes, reset the district
  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    setSelectedDistrict('');
  };

  const handleAddClothing = () => {
    if (!clothingType || !size || !category) {
      Alert.alert("Error", "Please fill in all clothing details.");
      return;
    }
    setClothingItems([...clothingItems, { clothingType, size, category }]);
    setClothingType('');
    setSize('');
    setCategory('');
  };

  const handleSubmit = async () => {
    if (!name || !phoneNumber || !selectedDivision || !selectedDistrict || clothingItems.length === 0) {
      Alert.alert("Error", "Please fill in all fields and add at least one clothing item.");
      return;
    }

    // Validate the phone number
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Invalid phone number:\nMust be exactly 11 digits.\nMust be a valid Bangladeshi SIM number.');
      return;
    }

    try {
      await addDoc(collection(db, "apparelDonations"), {
        userID: auth.currentUser?.uid,
        name,
        phone: phoneNumber, // using phoneNumber
        clothingItems,
        division: selectedDivision,
        district: selectedDistrict,
        status: 'Pending',
        timestamp: new Date(),
      });
      Alert.alert("Success", "Donation request submitted!");
      // Clear fields after successful submission
      setName('');
      setPhoneNumber('');
      setClothingItems([]);
      setSelectedDivision('');
      setSelectedDistrict('');
      fetchDonationHistory();
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const fetchDonationHistory = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(collection(db, "apparelDonations"), where("userID", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDonationHistory(history);
  };

  const handleMarkCollected = async (id) => {
    try {
      await updateDoc(doc(db, "apparelDonations", id), { status: 'Collected' });
      Alert.alert("Success", "Donation marked as collected.");
      fetchDonationHistory();
    } catch (error) {
      Alert.alert("Error", "Failed to mark donation as collected.");
      console.error(error);
    }
  };

  const renderContent = () => {
    if (selectedTab === 'Donate') {
      return (
        <View style={styles.form}>
          {/* Division Picker */}
          <Picker
            selectedValue={selectedDivision}
            onValueChange={handleDivisionChange}
            style={styles.picker}
          >
            <Picker.Item label="Select Division" value="" />
            {Object.keys(divisionsAndDistricts).map((division, index) => (
              <Picker.Item key={index} label={division} value={division} />
            ))}
          </Picker>

          {/* District Picker */}
          {selectedDivision && (
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={setSelectedDistrict}
              style={styles.picker}
            >
              <Picker.Item label="Select District" value="" />
              {divisionsAndDistricts[selectedDivision].map((district, index) => (
                <Picker.Item key={index} label={district} value={district} />
              ))}
            </Picker>
          )}

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="e.g. 01*********"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
          />

          {/* Display Added Clothing Items */}
          {clothingItems.length > 0 && (
            <View>
              {clothingItems.map((item, index) => (
                <Text key={index} style={styles.clothingItem}>
                  {item.clothingType} ({item.size}) - {item.category}
                </Text>
              ))}
            </View>
          )}

          {/* Clothing Details Input */}
          <TextInput
            style={styles.input}
            placeholder="Type of Clothing"
            value={clothingType}
            onChangeText={setClothingType}
          />
          <Picker selectedValue={size} onValueChange={setSize} style={styles.picker}>
            <Picker.Item label="Select Size" value="" />
            <Picker.Item label="Small" value="Small" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Large" value="Large" />
            <Picker.Item label="Extra Large" value="XL" />
          </Picker>
          <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Men" value="Men" />
            <Picker.Item label="Women" value="Women" />
            <Picker.Item label="Kids" value="Kids" />
            <Picker.Item label="Unisex" value="Unisex" />
          </Picker>

          {/* Optional "Add More Clothing" Button */}
          <TouchableOpacity style={styles.addMoreButton} onPress={handleAddClothing}>
            <Text style={styles.addMoreButtonText}>Add More Clothing</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.submitButtonText}>Review Donation</Text>
          </TouchableOpacity>

          {/* Modal for Overview */}
          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Donation Overview</Text>
                <ScrollView>
                  <Text>Name: {name}</Text>
                  <Text>Phone: {phoneNumber}</Text>
                  <Text>Location: {selectedDistrict}, {selectedDivision}</Text>
                  <Text>Clothing Items:</Text>
                  {clothingItems.map((item, index) => (
                    <Text key={index} style={styles.clothingItem}>
                      {item.clothingType} ({item.size}) - {item.category}
                    </Text>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.closeModalButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Donation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.submitButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    } else if (selectedTab === 'History') {
      return (
        <ScrollView style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Apparel Donation History</Text>
          {donationHistory.length > 0 ? (
            donationHistory.map((donation) => (
              <View key={donation.id} style={styles.donationCard}>
                <Text>Name: {donation.name}</Text>
                <Text>Status: {donation.status}</Text>
                <Text>Location: {donation.district}, {donation.division}</Text>
                <Text>Clothing Items:</Text>
                {donation.clothingItems && donation.clothingItems.map((item, index) => (
                  <Text key={index} style={styles.clothingItem}>
                    {`${item.clothingType} (${item.size}) - ${item.category}`}
                  </Text>
                ))}
              </View>
            ))
          ) : (
            <Text>No donations found</Text>
          )}
        </ScrollView>
      );
    }
    
  };

  return (
    <View style={styles.container}>
      {/* Tabs styled like Funding.js */}
      <View style={styles.tabsContainer}>
        {['Donate', 'History'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  // Tab styles (same as Funding.js)
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#691b38',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#691b38',
  },
  form: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  picker: {
    height: 54,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 9,
  },
  addMoreButton: {
    backgroundColor: '#007bff',
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  addMoreButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  historyContainer: {
    flex: 1,
    paddingTop: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  donationCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  markCollectedButton: {
    backgroundColor: '#28a745',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  clothingItem: {
    fontSize: 14,
  },
});

export default ApparelDonation;
