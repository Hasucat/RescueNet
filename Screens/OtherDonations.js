import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  ActivityIndicator, 
  TextInput 
} from 'react-native';
import { db } from './../firebase.js';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';

const OtherDonations = () => {
  const [selectedTab, setSelectedTab] = useState('Funding');
  const [foodDonations, setFoodDonations] = useState([]);
  const [clothingDonations, setClothingDonations] = useState([]);
  const [fundingDonations, setFundingDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      // Fetch food donations
      const foodQuery = query(collection(db, 'foodBankDonations'));
      const foodSnapshot = await getDocs(foodQuery);
      const foodData = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFoodDonations(foodData);

      // Fetch clothing donations
      const clothingQuery = query(collection(db, 'apparelDonations'));
      const clothingSnapshot = await getDocs(clothingQuery);
      const clothingData = clothingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClothingDonations(clothingData);

      // Fetch funding donations
      const fundingQuery = query(collection(db, 'fundingDonations'));
      const fundingSnapshot = await getDocs(fundingQuery);
      const fundingData = fundingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFundingDonations(fundingData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch donations.');
      console.error(error);
    }
    setLoading(false);
  };

  const handleMarkCollected = async (id, type) => {
    try {
      await deleteDoc(doc(db, type, id)); // Remove the donation from Firestore
      Alert.alert('Success', 'Donation marked as collected.');
      fetchDonations(); // Refresh the list
    } catch (error) {
      Alert.alert('Error', 'Failed to mark donation as collected.');
      console.error(error);
    }
  };

  const filterDonations = (donations) => {
    if (!searchQuery) return donations;

    if (selectedTab === 'Funding') {
      // Filter funding donations by donor's name
      return donations.filter(donation => 
        donation.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      // Filter food and clothing donations by district
      return donations.filter(donation => 
        donation.district?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const renderContent = () => {
    if (selectedTab === 'Funding') {
      const filteredFunding = filterDonations(fundingDonations);
      return (
        <ScrollView style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Funding Donations</Text>
          {filteredFunding.length > 0 ? (
            filteredFunding.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text>Date: {item.timestamp?.toDate ? new Date(item.timestamp.toDate()).toLocaleString() : 'N/A'}</Text>
                <Text>Amount: BDT {item.amount}</Text>
                <Text>Donor: {item.name}</Text>
                <Text>Phone: {item.phone}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No funding donations available.</Text>
          )}
        </ScrollView>
      );
    } else if (selectedTab === 'Food') {
      const filteredFood = filterDonations(foodDonations);
      return (
        <ScrollView style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Food Donations</Text>
          {filteredFood.length > 0 ? (
            filteredFood.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text>Date: {item.timestamp?.toDate ? new Date(item.timestamp.toDate()).toLocaleString() : 'N/A'}</Text>
                <Text>Donor: {item.name}</Text>
                <Text>Phone: {item.phone}</Text>
                <Text>Location: {item.district}, {item.division}</Text>
                <Text>Food Items:</Text>
                {item.foodItems.map((food, i) => (
                  <Text key={i}>
                    - {food.foodType}: {food.foodName} ({food.quantity})
                  </Text>
                ))}
                <TouchableOpacity
                  style={styles.collectButton}
                  onPress={() => handleMarkCollected(item.id, 'foodBankDonations')}
                >
                  <Text style={styles.collectButtonText}>Mark Collected</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No food donations available.</Text>
          )}
        </ScrollView>
      );
    } else if (selectedTab === 'Clothing') {
      const filteredClothing = filterDonations(clothingDonations);
      return (
        <ScrollView style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Clothing Donations</Text>
          {filteredClothing.length > 0 ? (
            filteredClothing.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text>Date: {item.timestamp?.toDate ? new Date(item.timestamp.toDate()).toLocaleString() : 'N/A'}</Text>
                <Text>Donor: {item.name}</Text>
                <Text>Phone: {item.phone}</Text>
                <Text>Location: {item.district}, {item.division}</Text>
                <Text>Clothing Items:</Text>
                {item.clothingItems.map((clothing, i) => (
                  <Text key={i}>
                    - {clothing.clothingType} ({clothing.size}, {clothing.category})
                  </Text>
                ))}
                <TouchableOpacity
                  style={styles.collectButton}
                  onPress={() => handleMarkCollected(item.id, 'apparelDonations')}
                >
                  <Text style={styles.collectButtonText}>Mark Collected</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No clothing donations available.</Text>
          )}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {['Funding', 'Food', 'Clothing'].map((tab) => (
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

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder={
          selectedTab === 'Funding' 
            ? "Search by donor's name" 
            : "Search by district (e.g., Dhaka)"
        }
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0c3038" />
      ) : (
        renderContent()
      )}
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  historyContainer: { padding: 20 },
  historyTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'green' },
  historyItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  collectButton: { backgroundColor: '#4da361', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  collectButtonText: { color: 'white', fontWeight: 'bold' },
  noDataText: { textAlign: 'center', marginTop: 20 },
});

export default OtherDonations;