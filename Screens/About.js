import React from 'react';
import { ScrollView,ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const About = () => {
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
            >             
              <ImageBackground
                source={require('../assets/header.jpg')} 
                style={styles.headerBackground} 
              >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>About</Text>
                </View>
                </ImageBackground>
      <View style={styles.section}>
        
        <Text style={styles.listItem}>RescueNet revolutionizes disaster response by strategically deploying volunteers to where they are needed most.
It ensures aid  efficiently matched to affected locations, streamlining relief efforts.
The platform analyzes incident reports to optimize decision-making and resource allocation.
Personalized emergency alerts keep communities informed and prepared in real time.
Leveraging valuable community feedback, RescueNet guarantees effective and timely crisis management.
        </Text>
      </View>
      </ImageBackground>
      </View>       
        </View>
      </ImageBackground>
        </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default About;

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