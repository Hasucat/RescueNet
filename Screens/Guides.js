import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity,ImageBackground, View, Alert, Image,ScrollView } from 'react-native';

const Guides = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.iconGrid}>
    <View style={styles.container}>
      
        <View style={styles.iconGrid}>
        
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('DosAndDonts')}>
            <Image source={require('../assets/dosdonts.png')} style={styles.cardImageD} />
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.iconContainerT} onPress={() => navigation.navigate('Tutorial')}>
            <Image source={require('../assets/tutorials.png')} style={styles.cardImageT} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainerR} onPress={() => navigation.navigate('RelevantLink')}>
            <Image source={require('../assets/revlinks.png')} style={styles.cardImage} />
            </TouchableOpacity>
        
        </View>
        
     </View>
     </ScrollView>
  );
};

export default Guides;

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
  
  iconContainerR: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 235, 
    padding: 10, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#fdfefe", // White background for card appearance
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
  cardImage: {
    width: '107%', // Ensures image covers the entire width of the card
    height: 215, // Adjust the height of the card as needed
  },
  cardImageD: {
    width: '103%', // Ensures image covers the entire width of the card
    height: 215, // Adjust the height of the card as needed
  },
  iconContainerT: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 245, 
    padding: 10, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#fdfefe", // White background for card appearance
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
  cardImageT: {
    width: '105%', // Ensures image covers the entire width of the card
    height: 235, // Adjust the height of the card as needed
  },
 
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Increased width to make icons wider
    height: 230, 
    padding: 5, // Increased padding inside the card
    marginBottom: 8, // Space between rows of icons
    backgroundColor: "#f8f7e8", // White background for card appearance
    borderRadius: 5, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.1, // Slight shadow for card effect
    shadowRadius: 4,
    elevation: 3, // Shadow effect for Android
    marginTop: 80,
    borderColor:'#000',
    borderWidth:4,
    marginHorizontal: 39,
    marginTop: 30,
    
  },
  iconGrid: {
    flexGrow: 1, 
    paddingBottom: 10,
    backgroundColor: '#31505e',
  },
});
