import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity,ImageBackground, View, Alert, Image,ScrollView } from 'react-native';

const EmergencyList = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.iconGrid}>
    <View style={styles.container}>
      
        <View style={styles.iconGrid}>
        
            <TouchableOpacity style={styles.iconContainerE} onPress={() => navigation.navigate('EmergencyContacts')}>
            <Image source={require('../assets/emergencyccontacts.png')} style={styles.cardImage} />
            </TouchableOpacity>

        
        </View>
       
      

     </View>
    </ScrollView>
  );
};

export default EmergencyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7e8',
    
  },
  contentBackground: {
    flex: 1, // Make it cover the remaining space after the header
    paddingHorizontal: 0,
    justifyContent: 'center',
    paddingVertical: 50, // Padding around the icons and button
  },
  iconGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  iconContainerE: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 230, 
    padding: 5, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#fff", // White background for card appearance
    borderRadius: 1, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.96, // Slight shadow for card effect
    shadowRadius: 4.5,
    elevation: 10, // Shadow effect for Android
    marginTop: 80,
    borderColor:'#000',
    borderWidth:4,
    marginHorizontal: 39,
    
  },
  iconContainerS: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 230, 
    padding: 5, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#fff", // White background for card appearance
    borderRadius: 1, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.96, // Slight shadow for card effect
    shadowRadius: 4.5,
    elevation: 10, // Shadow effect for Android
    marginTop: 20,
    borderColor:'#000',
    borderWidth:4,
    marginHorizontal: 39,
    
  },
  cardImage: {
    width: '103%', // Ensures image covers the entire width of the card
    height: 215, // Adjust the height of the card as needed
  },
  iconGrid: {
    flexGrow: 1, 
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
});
