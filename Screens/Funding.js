import React, { useState } from 'react';
import {KeyboardAvoidingView,TouchableOpacity, View, Text, TextInput, Button, Alert,ImageBackground, StyleSheet } from 'react-native';

const Funding = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [showWebView, setShowWebView] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(null);
  
    const handlePaymentSuccess = (response) => {
      // Assume payment response has transactionId and status
      const { transactionId, status } = response;
  
      if (status === 'Success') {
        storeDonationDetails(transactionId);
        Alert.alert('Payment Successful!', 'Thank you for your donation.');
        setTransactionStatus('Success');
      } else {
        Alert.alert('Payment Failed', 'Please try again.');
        setTransactionStatus('Failed');
      }
  
      setShowWebView(false);
    };
    const handleDonationSubmit = () => {
        if (!amount || !name) {
          Alert.alert('Please fill in all fields');
          return;
        }
    
        // Navigate to bKash payment (you'd set the payment URL here)
        setShowWebView(true);
      };
    
  return (
    <ImageBackground
      source={require('../assets/LoginBackground.png')} // Replace with your image path
      style={styles.background}
    >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={styles.authBox}>
        <Text style={styles.title}>Make a Donation</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="black"
        value={name}
        onChangeText={setName}
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

      {showWebView && (
        <WebView
          source={{ uri: 'https://your-bkash-payment-gateway-url.com' }} // bKash payment gateway URL
          onNavigationStateChange={(navState) => {
            // Check for success URL, handle response here
            if (navState.url.includes('payment-success')) {
              const transactionId = '123456789'; // Extract from URL or response
              handlePaymentSuccess({ transactionId, status: 'Success' });
            }
          }}
        />
      )}

      {transactionStatus && <Text>Transaction Status: {transactionStatus}</Text>}
      </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Funding;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // This will adjust the image aspect ratio
        justifyContent: 'center',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      authBox: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
      },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
    backgroundColor: '#0c3038', // Set your desired button color here
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
},
buttonText: {
    color: '#fff', // Text color inside the button
    fontWeight: 'bold',
    fontSize: 18,
},
});
