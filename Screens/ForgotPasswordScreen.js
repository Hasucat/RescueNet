import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure to import the correct firebase config

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert('Password Reset', 'Check your email for reset instructions');
          navigation.goBack(); // Navigate back to the login screen after success
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Error', 'Please enter a valid email address');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
      <Text style={styles.headerText}>Account Recovery</Text>
      <Text style={styles.headerBelowText}>Enter your email to set a new password</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#54595c'
  },
  headerBar: {
    width: '100%',
    backgroundColor: '#54595c',  // You can choose your preferred color
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,  // Optional, adds a border at the bottom
    borderColor: '#54595c',  // Color for the border
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: -4,
    color:'white'
  },
  headerBelowText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: -3,
    marginTop:3,
    color:'black'
  },
  input: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop:10,
    width: '80%',
  },
  button: {
    backgroundColor: '#3ea36c',
    padding: 10,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },
});
