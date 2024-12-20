import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity,ImageBackground, View, Alert, Image,ScrollView } from 'react-native';

const EmergencyContacts = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.iconGrid}>
    <View style={styles.container}>
      
        <View style={styles.iconGrid}>
        
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Helplines')}>
            <Image source={require('../assets/helplines.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Hospitals')}>
            <Image source={require('../assets/hospitals.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Media')}>
            <Image source={require('../assets/media.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        </View>
        
       

     </View>
     </ScrollView>
  );
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31505e',
  },
  iconGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', // Increased width to make icons wider
    height: 300, 
    padding: 30, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#fff", // White background for card appearance
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.85, // Slight shadow for card effect
    shadowRadius: 4,
    elevation: 8.4, // Shadow effect for Android
    borderWidth:4,
    borderColor:'#000',
    marginHorizontal: 18,
    marginTop: 20
    
  },
  cardImage: {
    width: '120%', // Ensures image covers the entire width of the card
    height: 252, // Adjust the height of the card as needed
     // Same as the card container to create a consistent look
  },
  iconGrid: {
    flexGrow: 1, 
    paddingBottom: 10,
    backgroundColor: '#31505e',
  },
});
