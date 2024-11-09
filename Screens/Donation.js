import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity,ImageBackground, View, Alert, Image,ScrollView } from 'react-native';

const Donation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/dashboard5.png')} // Background image for the icons
        style={styles.contentBackground}
        resizeMode="cover" // Makes the image cover the entire background
      >
    
        <View style={styles.iconGrid}>
        
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Funding')}>
            <Image source={require('../assets/money.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('FoodBank')}>
            <Image source={require('../assets/food.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Clothing')}>
            <Image source={require('../assets/clothing.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        </View>
        
        </ImageBackground>

     </View>
  
  );
};

export default Donation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    
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
  
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 200, 
    padding: 30, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#f8f7e8", // White background for card appearance
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.1, // Slight shadow for card effect
    shadowRadius: 4,
    elevation: 3, // Shadow effect for Android
    
  },
  cardImage: {
    width: '70%', // Ensures image covers the entire width of the card
    height: 170, // Adjust the height of the card as needed
    borderRadius: 10, // Same as the card container to create a consistent look
  },

});
