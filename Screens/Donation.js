import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity,ImageBackground, View, Alert, Image,ScrollView } from 'react-native';

const Donation = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.iconGrid}>
    <View style={styles.container}>
      
        <View style={styles.iconGrid}>
        
            <TouchableOpacity style={styles.iconContainerM} onPress={() => navigation.navigate('Funding')}>
            <Image source={require('../assets/money.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        
            <TouchableOpacity style={styles.iconContainerF} onPress={() => navigation.navigate('FoodBank')}>
            <Image source={require('../assets/food.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Clothing')}>
            <Image source={require('../assets/clothing.png')} style={styles.cardImageC} />
            </TouchableOpacity>
        
        </View>
        
     </View>
     </ScrollView>
  );
};

export default Donation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31505e',
    
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
  
  iconContainerM: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 235, 
    padding: 10, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#fbf3e1", // White background for card appearance
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.1, // Slight shadow for card effect
    shadowRadius: 4,
    elevation: 3, // Shadow effect for Android
    borderColor:'#000',
    borderWidth:4,
    marginHorizontal: 39,
    marginTop: 20,
  },

  iconContainerF: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 235, 
    padding: 10, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#66acab", // White background for card appearance
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.1, // Slight shadow for card effect
    shadowRadius: 4,
    elevation: 3, // Shadow effect for Android
    borderColor:'#000',
    borderWidth:4,
    marginHorizontal: 39,
    
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 245, 
    padding: 10, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#fcfdfc", // White background for card appearance
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.1, // Slight shadow for card effect
    shadowRadius: 4,
    elevation: 3, // Shadow effect for Android
    borderColor:'#000',
    borderWidth:4,
    marginHorizontal: 39,
    
  },
  cardImageC: {
    width: '100%', // Ensures image covers the entire width of the card
    height: 235, // Adjust the height of the card as needed
  },
  cardImage: {
    width: '100%', // Ensures image covers the entire width of the card
    height: 225, // Adjust the height of the card as needed
  },
  iconGrid: {
    flexGrow: 1, 
    paddingBottom: 10,
  },
});
