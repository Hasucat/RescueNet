import React from 'react';
import { ScrollView,ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const DosAndDonts = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView>
      <ImageBackground
        source={require('../assets/background.png')} 
        style={styles.backgroundImage}
        resizeMode="cover" 
      >
      {/* Dos Section */}
      <View style={styles.container}>
            <View style={styles.cardContainer}>
            <ImageBackground
    source={require('../assets/card_back.png')} // Background for the card
    style={styles.cardBackground} 
    resizeMode="cover"
  ><ImageBackground
      source={require('../assets/header.jpg')} 
      style={styles.headerBackground} 
    >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Do's</Text>
                </View>
                </ImageBackground>
      <View style={styles.section}>
        
        <Text style={styles.listItem}>✔ Stay calm and focused during the disaster.</Text>
        <Text style={styles.listItem}>✔ Follow evacuation orders from authorities.</Text>
        <Text style={styles.listItem}>✔ Have an emergency kit with essential supplies like water, food, and medications.</Text>
        <Text style={styles.listItem}>✔ Stay informed through official news channels and alerts.</Text>
        <Text style={styles.listItem}>✔ Help others, especially the elderly and disabled, in case of evacuation.</Text>
      </View>
      </ImageBackground>
      </View>
      <View style={styles.cardContainer}>
            <ImageBackground
    source={require('../assets/card_back.png')} // Background for the card
    style={styles.cardBackground} 
    resizeMode="cover"
  ><ImageBackground
      source={require('../assets/header.jpg')} 
      style={styles.headerBackground} 
    >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Dont's</Text>
                </View>
                </ImageBackground>
      <View style={styles.section}>
        
        <Text style={styles.listItem}>✖ Don't ignore official warnings or evacuation orders.</Text>
        <Text style={styles.listItem}>✖ Don't use elevators during an earthquake or fire.</Text>
        <Text style={styles.listItem}>✖ Don't block escape routes with personal belongings and try to have second escape route.</Text>
        <Text style={styles.listItem}>✖ Don't go near fallen power lines or gas lines.</Text>
        <Text style={styles.listItem}>✖ Don't panic. Staying calm is key to survival.</Text>
      </View>
      </ImageBackground>
      </View>
            
        </View>
      </ImageBackground>
        </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default DosAndDonts;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
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
    marginBottom: 30,
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '104%',
    marginBottom: 10,
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
    fontSize: 26,
    marginTop: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e6a86',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 10,
  },
});