import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal, ScrollView } from 'react-native';
import { db, auth } from './../firebase.js';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
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
  const [region, setRegion] = useState({
    latitude: 23.8103,
    longitude: 90.4125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clothingType, setClothingType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [donationHistory, setDonationHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Donate');
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchDonationHistory();
  }, []);

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
      Alert.alert("Error", "Please fill in all fields and select a location.");
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

          {/* Add More Clothing Items */}
          {clothingItems.length > 0 && (
            <View>
              {clothingItems.map((item, index) => (
                <Text key={index} style={styles.clothingItem}>
                  {item.clothingType} ({item.size}) - {item.category}
                </Text>
              ))}
            </View>
          )}

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

          <TouchableOpacity style={styles.addMoreButton} onPress={handleAddClothing}>
            <Text style={styles.addMoreButtonText}>Add More Clothing</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.submitButtonText}>Review Donation</Text>
          </TouchableOpacity>

          {/* Modal for overview */}
          <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Donation Overview</Text>
                <ScrollView>
                  <Text>Name: {name}</Text>
                  <Text>Phone: {phone}</Text>
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
            donationHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text>Date: {item.timestamp?.toDate ? new Date(item.timestamp.toDate()).toLocaleString() : 'N/A'}</Text>
                <Text>Status: {item.status || 'Pending'}</Text>
                <Text>Location: {item.district || 'Unknown'}, {item.division || 'Unknown'}</Text>
                <Text>Clothing Items:</Text>
                {Array.isArray(item.clothingItems) && item.clothingItems.length > 0 ? (
                  item.clothingItems.map((clothing, i) => (
                    <Text key={i}>
                      {clothing.clothingType || 'Unknown'} ({clothing.size || 'N/A'}) - {clothing.category || 'Uncategorized'}
                    </Text>
                  ))
                ) : (
                  <Text>No clothing items listed</Text>
                )}
              </View>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 10 }}>No donation history available.</Text>
          )}
        </ScrollView>
      );
    }
  }    

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
  clothingItem: { fontSize: 14, marginTop: 5 },
  historyContainer: { padding: 20 },
  historyTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'green' },
  historyItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  closeModalButton: { backgroundColor: '#0c3038', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 20 },
});

export default ApparelDonation;
