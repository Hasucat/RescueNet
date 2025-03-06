import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db, auth } from './../firebase.js';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

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

// Food categories for the dropdown
const foodCategories = [
  'Rice',
  'Vegetables',
  'Fruits',
  'Meat',
  'Fish',
  'Dairy',
  'Bakery',
  'Canned Goods',
  'Snacks',
  'Beverages',
  'Others',
];

const FoodBankDonation = () => {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [foodType, setFoodType] = useState('');
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [donationHistory, setDonationHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Donate');

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  const addFoodItem = () => {
    if (!foodType || !foodName || !quantity) {
      Alert.alert('Error', 'Please fill in all food details.');
      return;
    }
    setFoodItems([...foodItems, { foodType, foodName, quantity }]);
    setFoodType('');
    setFoodName('');
    setQuantity('');
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^(\+8801[5-9])(\d{8})$/; // Basic validation for Bangladeshi phone numbers
    return phonePattern.test(phoneNumber);
  };

  const handleSubmit = async () => {
    if (!name || !phone || foodItems.length === 0) {
      Alert.alert('Error', 'Please fill in all fields and add at least one food item.');
      return;
    }

    // Phone number validation
    if (!validatePhoneNumber(phone)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number in the format: +8801XXXXXXXX');
      return;
    }

    try {
      await addDoc(collection(db, 'foodBankDonations'), {
        userID: auth.currentUser?.uid,
        name,
        phone,
        district: selectedDistrict,
        division: selectedDivision,
        foodItems,
        status: 'Pending',
        timestamp: new Date(),
      });
      Alert.alert('Success', 'Donation request submitted!');
      setName('');
      setPhone('');
      setFoodItems([]);
      fetchDonationHistory();
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchDonationHistory = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(collection(db, 'foodBankDonations'), where('userID', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDonationHistory(history);
  };

  const handleMarkCollected = async (id) => {
    try {
      await updateDoc(doc(db, 'foodBankDonations', id), { status: 'Collected' });
      Alert.alert('Success', 'Donation marked as collected.');
      fetchDonationHistory();
    } catch (error) {
      Alert.alert('Error', 'Failed to mark donation as collected.');
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
          <TextInput
            style={styles.input}
            placeholder="e.g. +880 17********"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          {/* Add More Food Items */}
          {foodItems.length > 0 && (
            <View>
              {foodItems.map((item, index) => (
                <Text key={index} style={styles.foodItem}>
                  {item.foodType} ({item.foodName}) - {item.quantity}
                </Text>
              ))}
            </View>
          )}

          {/* Food Type Dropdown */}
          <Picker selectedValue={foodType} onValueChange={setFoodType} style={styles.picker}>
            <Picker.Item label="Select Food Type" value="" />
            {foodCategories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>

          <TextInput style={styles.input} placeholder="Food Name" value={foodName} onChangeText={setFoodName} />
          <TextInput style={styles.input} placeholder="Quantity (e.g., 1 kg, 1 packet)" value={quantity} onChangeText={setQuantity} />

          <TouchableOpacity style={styles.addMoreButton} onPress={addFoodItem}>
            <Text style={styles.addMoreButtonText}>Add More Food Item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.submitButtonText}>Review Donation</Text>
          </TouchableOpacity>

          {/* Modal for overview */}
          <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Donation Overview</Text>
                <ScrollView>
                  <Text>Name: {name}</Text>
                  <Text>Phone: {phone}</Text>
                  <Text>Location: {selectedDistrict}, {selectedDivision}</Text>
                  <Text>Food Items:</Text>
                  {foodItems.map((item, index) => (
                    <Text key={index} style={styles.foodItem}>
                      {item.foodType} ({item.foodName}) - {item.quantity}
                    </Text>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.closeModalButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit Donation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
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
          <Text style={styles.historyTitle}>Food Bank Donation History</Text>
          {donationHistory.length > 0 ? (
            donationHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text>Date: {item.timestamp?.toDate ? new Date(item.timestamp.toDate()).toLocaleString() : 'N/A'}</Text>
                <Text>Status: {item.status || 'Pending'}</Text>
                <Text>Location: {item.district || 'Unknown'}, {item.division || 'Unknown'}</Text>
                <Text>Food Items:</Text>
                {item.foodItems?.map((food, index) => (
                  <Text key={index} style={styles.foodItem}>
                    {food.foodType} ({food.foodName}) - {food.quantity}
                  </Text>
                ))}
                {item.status !== 'Collected' && (
                  <TouchableOpacity onPress={() => handleMarkCollected(item.id)} style={styles.markCollectedButton}>
                    <Text style={styles.markCollectedButtonText}>Mark as Collected</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <Text>No donation history found.</Text>
          )}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('Donate')}>
          <Text style={styles.tabText}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab('History')}>
          <Text style={styles.tabText}>Donation History</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    height: 40,
    marginBottom: 10,
  },
  addMoreButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  addMoreButtonText: {
    color: '#fff',
    fontSize: 16,
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
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeModalButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  foodItem: {
    marginVertical: 5,
  },
  historyContainer: {
    flex: 1,
    padding: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  markCollectedButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  markCollectedButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FoodBankDonation;
