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

  const handleSubmit = async () => {
    if (!name || !phone || foodItems.length === 0) {
      Alert.alert('Error', 'Please fill in all fields and add at least one food item.');
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
      // Update the donation status to 'Collected'
      await updateDoc(doc(db, 'foodBankDonations', id), { status: 'Collected' });
      Alert.alert('Success', 'Donation marked as collected.');
      fetchDonationHistory(); // Refresh the list
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
          <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

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
                {Array.isArray(item.foodItems) && item.foodItems.length > 0 ? (
                  item.foodItems.map((food, i) => (
                    <Text key={i}>
                      {food.foodType || 'Unknown'} ({food.foodName || 'Unknown'}) - {food.quantity || 'N/A'}
                    </Text>
                  ))
                ) : (
                  <Text>No food items listed</Text>
                )}
                {item.status === 'Pending' && (
                  <TouchableOpacity
                    style={styles.collectButton}
                    onPress={() => handleMarkCollected(item.id)}
                  >
                    <Text style={styles.collectButtonText}>Mark Collected</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 10 }}>No donation history available.</Text>
          )}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {['Donate', 'History'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  tab: { paddingVertical: 8, paddingHorizontal: 20 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#691b38' },
  tabText: { fontSize: 16, color: '#888' },
  activeTabText: { color: '#691b38' },
  form: { padding: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingHorizontal: 10 },
  picker: { height: 55, marginBottom: 10 },
  addMoreButton: { backgroundColor: '#0c3038', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  addMoreButtonText: { color: 'white', fontSize: 16 },
  submitButton: { backgroundColor: '#0c3038', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  foodItem: { fontSize: 14, marginTop: 5 },
  historyContainer: { padding: 20 },
  historyTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'green' },
  historyItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  collectButton: { backgroundColor: '#4da361', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  collectButtonText: { color: 'white', fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  closeModalButton: { backgroundColor: '#0c3038', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 20 },
});

export default FoodBankDonation;