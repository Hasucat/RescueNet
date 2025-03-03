import React, { useState, useEffect } from 'react';
import { ImageBackground,StyleSheet, View, Text, ScrollView } from 'react-native';

const FoodBank = () => {
    const [foodData, setFoodData] = useState({
      drinks: 70,   // Example values
      dryFood: 50,  // You can update these dynamically
      meals: 90,
    });
  
    const renderFoodBar = (percentage) => {
        return (
            <View style={styles.barContainer}>
            <View style={[styles.foodBar, { width: `${percentage}%` }]} />
            </View>
        );
    };

 
  return (
    <View style={{ flex: 1 }}>
    {/* Header Section */}
    <ImageBackground
      source={require('../assets/blue.jpeg')} // Replace with your header image
      style={styles.header}
    >
      <Text style={styles.headerText}>FOOD BANK</Text>
    </ImageBackground>
    
    
    <ImageBackground
        source={require('../assets/dashboard.png')} // Background image for the icons
        style={styles.contentBackground}
        resizeMode="cover" // Makes the image cover the entire background
      >
        
    <ImageBackground
        source={require('../assets/foodbank.png')} // Replace with your card background image
        style={styles.authBoxImage}
      >
    <View style={styles.authBox}>
        
        
        <View style={styles.foodSection}>
          <Text style={styles.foodCategory}>Drinks:</Text>
          {renderFoodBar(foodData.drinks)}
          <Text style={styles.foodPercentage}>{foodData.drinks}%</Text>
        </View>

        <View style={styles.foodSection}>
          <Text style={styles.foodCategory}>Dry Food:</Text>
          {renderFoodBar(foodData.dryFood)}
          <Text style={styles.foodPercentage}>{foodData.dryFood}%</Text>
        </View>

        <View style={styles.foodSection}>
          <Text style={styles.foodCategory}>Meals:</Text>
          {renderFoodBar(foodData.meals)}
          <Text style={styles.foodPercentage}>{foodData.meals}%</Text>
        </View>
      </View>
      </ImageBackground>
    </ImageBackground>
    </View>
  );
};

export default FoodBank;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      background: {
        flex: 1,
        resizeMode: 'cover', // This will adjust the image aspect ratio
        justifyContent: 'center',
      },
      header: {
        backgroundColor: '#1188ae', // Purple background color
        height: 95, // Adjust height to your design
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      headerText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
      },
      contentBackground: {
        flex: 1, // Make it cover the remaining space after the header
        paddingHorizontal: 0,
        justifyContent: 'center',
        paddingVertical: 50, // Padding around the icons and button
      },
      authBox: {
        width: '80%',
        height: '100',
        padding: 40,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 10,
        marginLeft: 30,
        marginBottom: 50,
      },
      authBoxImage: {
        width: '100%',  // Width of the food card
        height: 570,  // Adjust height based on your layout
        marginVertical: 60,  // Vertical spacing around the card
        alignSelf: 'center',  // Center the card horizontally
        resizeMode: 'cover',  // Adjust how the image fits within its container
        overflow: 'hidden',  // Ensure content doesn’t exceed the rounded edges
      },
      
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
  foodSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 40,
  },
  foodCategory: {
    fontSize: 28,
   marginLeft: -40,
   
  },
  foodPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  barContainer: {
    width: '60%',  // Adjust the width of the bar container
    height: 25,    // Height of the bar
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10, // Space between bars and percentage
  },
  foodBar: {
    height: '100%',
    backgroundColor: '#4caf50',  // Bar color
    borderRadius: 10,
  },
});