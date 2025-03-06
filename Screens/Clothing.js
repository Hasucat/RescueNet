import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal, ScrollView, ImageBackground } from 'react-native';
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
  const [phone, setPhone] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [donationHistory, setDonationHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Donate');
  const [clothingItems, setClothingItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  // Function to validate phone number
  const validatePhoneNumber = (number) => {
    const regex = /^(015|016|107|018|019)\d{7}$/;
    return regex.test(number);
  };

  // Handle phone number change
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
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
    if (!name || !phone || !selectedDivision || !selectedDistrict || clothingItems.length === 0) {
      Alert.alert("Error", "Please fill in all fields and add at least one clothing item.");
      return;
    }

    // Validate the phone number
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Invalid phone number: Must be exactly 11 digits.\nMust be a valid Bangladeshi SIM number.');
      return;
    }

    try {
      await addDoc(collection(db, "apparelDonations"), {
        userID: auth.currentUser?.uid,
        name,
        phone,
        clothingItems,
        division: selectedDivision,
        district: selectedDistrict,
        status: 'Pending',
        timestamp: new Date(),
      });
      Alert.alert("Success", "Donation request submitted!");
      setName('');
      setPhone('');
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
          <Picker selectedValue={selectedDivision} onValueChange={setSelectedDivision} style={styles.picker}>
            <Picker.Item label="Select Division" value="" />
            {Object.keys(divisionsAndDistricts).map((division, index) => (
              <Picker.Item key={index} label={division} value={division} />
            ))}
          </Picker>

          {/* District Picker */}
          {selectedDivision && (
            <Picker selectedValue={selectedDistrict} onValueChange={setSelectedDistrict} style={styles.picker}>
              <Picker.Item label="Select District" value="" />
              {divisionsAndDistricts[selectedDivision].map((district, index) => (
                <Picker.Item key={index} label={district} value={district} />
              ))}
            </Picker>
          )}

          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="e.g. 017********" value={phoneNumber} onChangeText={handlePhoneNumberChange} keyboardType="phone-pad" />

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
          <TextInput style={styles.input} placeholder="Type of Clothing" value={clothingType} onChangeText={setClothingType} />
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
          {donationHistory.length > 0 ? donationHistory.map((donation) => (
            <View key={donation.id} style={styles.donationCard}>
              <Text>Name: {donation.name}</Text>
              <Text>Status: {donation.status}</Text>
              <TouchableOpacity style={styles.markCollectedButton} onPress={() => handleMarkCollected(donation.id)}>
                <Text style={styles.submitButtonText}>Mark as Collected</Text>
              </TouchableOpacity>
            </View>
          )) : <Text>No donations found</Text>}
        </ScrollView>
      );
    }
  };

  return (
    
    <View style={styles.container}>
      <ImageBackground
            source={require('../assets/blue.jpeg')} 
            style={styles.headerBackground} 
            >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Apparel Donation</Text>
            </View>
    </ImageBackground>
      
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTab('Donate')} style={[styles.tabButton, selectedTab === 'Donate' && styles.activeTab]}>
          <Text style={styles.tabButtonText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('History')} style={[styles.tabButton, selectedTab === 'History' && styles.activeTab]}>
          <Text style={styles.tabButtonText}>History</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%', 
    height: 60,   
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 0,   
    marginBottom: 24,
    marginTop: -6,
    marginHorizontal:20,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: -11.7
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 500,
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
