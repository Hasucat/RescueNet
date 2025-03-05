import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const Funding = () => {
  const [selectedTab, setSelectedTab] = useState('Donate');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Load balance and transaction history from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem('balance');
        const storedHistory = await AsyncStorage.getItem('transactionHistory');
        if (storedBalance) setBalance(parseFloat(storedBalance));
        if (storedHistory) setTransactionHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage
  const saveData = async (newBalance, newHistory) => {
    try {
      await AsyncStorage.setItem('balance', newBalance.toString());
      await AsyncStorage.setItem('transactionHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  // Handle donation submission
  const handleDonationSubmit = async () => {
    const donationAmount = parseFloat(amount);
    if (!donationAmount || donationAmount <= 0 || !name || !phone) {
      Alert.alert('Please fill all fields (Name, Phone, and Amount)');
      return;
    }
    if (donationAmount > balance) {
      Alert.alert('Insufficient balance');
      return;
    }

    const newBalance = balance - donationAmount;
    setBalance(newBalance);

    const transaction = { type: 'Donation', amount: donationAmount, name, phone, date: new Date().toLocaleString() };
    const newHistory = [transaction, ...transactionHistory];
    setTransactionHistory(newHistory);

    saveData(newBalance, newHistory);
    setTransactionStatus('Thank you for your donation!');
    setAmount('');
    setName('');
    setPhone(''); // Clear phone number field

    // Add donation to Firestore
    try {
      await addDoc(collection(db, 'fundingDonations'), {
        amount: donationAmount,
        name: name,
        phone: phone, // Include phone number
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error adding donation to Firestore: ", error);
    }

    // Hide status message after 3 seconds
    setTimeout(() => setTransactionStatus(null), 3000);
  };

  // Handle adding funds
  const handleAddFunds = () => {
    const depositAmount = parseFloat(amount);
    if (!depositAmount || depositAmount <= 0) {
      Alert.alert('Please enter a valid positive amount');
      return;
    }

    const newBalance = balance + depositAmount;
    setBalance(newBalance);

    const transaction = { type: 'Deposit', amount: depositAmount, date: new Date().toLocaleString() };
    const newHistory = [transaction, ...transactionHistory];
    setTransactionHistory(newHistory);

    saveData(newBalance, newHistory);
    setTransactionStatus('Funds added successfully!');
    setAmount('');

    // Hide status message after 3 seconds
    setTimeout(() => setTransactionStatus(null), 3000);
  };

  // Render content based on selected tab
  const renderContent = () => {
    if (selectedTab === 'Donate') {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Make a Donation</Text>
          <Text style={styles.balance}>Balance: {balance.toFixed(2)} Taka</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="black"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="black"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount (BDT)"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity style={styles.button} onPress={handleDonationSubmit}>
            <Text style={styles.buttonText}>Donate Now</Text>
          </TouchableOpacity>

          {transactionStatus && <Text style={styles.status}>{transactionStatus}</Text>}
        </View>
      );
    } else if (selectedTab === 'AddFunds') {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add Funds</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount (BDT)"
            placeholderTextColor="black"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddFunds}>
            <Text style={styles.buttonText}>Add Funds</Text>
          </TouchableOpacity>

          {transactionStatus && <Text style={styles.status}>{transactionStatus}</Text>}
        </View>
      );
    } else if (selectedTab === 'History') {
      return (
        <ScrollView style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Transaction History</Text>
          {transactionHistory.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text>{item.date}</Text>
              <Text>{item.type}: BDT {item.amount.toFixed(2)}</Text>
              {item.name && <Text>Donor: {item.name}</Text>}
              {item.phone && <Text>Phone: {item.phone}</Text>} {/* Display phone number in history */}
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  // Reset transaction status when tab changes
  useEffect(() => {
    setTransactionStatus(null);
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {['Donate', 'AddFunds', 'History'].map((tab) => (
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

export default Funding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'green',
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderColor: 'black',
    color: '#0c3038',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0c3038',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  historyContainer: {
    marginTop: 20,
    padding: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'green',
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contentContainer: {
    paddingBottom: 20,
  },
});