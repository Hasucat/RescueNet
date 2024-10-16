import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Alert, ImageBackground, TouchableOpacity, Modal, FlatList, Keyboard, TouchableWithoutFeedback, View, Text } from 'react-native';

export default function VolunteerRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [NID, setNID] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = () => {
    Alert.alert(`Registration Successful`, `Name: ${name}\nEmail: ${email}`);
    
    // Resetting fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setNID('');
    setAge('');
    setGender('');
    setProfession('');
    setWorkArea('');
    setExperience('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/background.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              <ImageBackground
                source={require('../assets/header2.jpg')}
                style={styles.headerBackground}
              >
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Volunteer Registration</Text>
                </View>
              </ImageBackground>

              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <View style={styles.row}>
                <View style={styles.smallContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge} 
                  />
                </View>
                <View style={styles.smallContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    value={gender}
                    onChangeText={setGender}
                  />
                </View>  
                <View style={styles.smallContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Profession"
                    value={profession}
                    onChangeText={setProfession}
                  />
                </View>  
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter your Emergency Contact"
                value={phone}
                onChangeText={setPhone}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your NID"
                value={NID}
                onChangeText={setNID}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                style={styles.input}
                placeholder="Working area choice"
                value={workArea}
                onChangeText={setWorkArea}
              />
              <TextInput
                style={styles.input}
                placeholder="Previous experience as volunteer"
                value={experience}
                onChangeText={setExperience}
              />

              <ImageBackground
                source={require('../assets/register2.gif')}
                style={styles.registerBackground}
              >
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    marginTop: 8,
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
  },
  headerBackground: {
    width: '100%', 
    height: 90,   
    justifyContent: 'center', 
    alignItems: 'center',  
    marginBottom: 10,
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
    fontSize: 22,
    marginTop: 10,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3, 
    width: '100%',
  },
  smallContainer: {
    flex: 1,
    height: 50,
    marginHorizontal: 1,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0)', 
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerBackground: {
    width: '100%', 
    height: 100,   
    justifyContent: 'center', 
    alignItems: 'center',  
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
