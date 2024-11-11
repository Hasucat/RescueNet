import React from 'react';
import { ScrollView,ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const About = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView>
      {/* Dos Section */}
      <View style={styles.container}>
                     
              <ImageBackground
                source={require('../assets/header.jpg')} 
                style={styles.headerBackground} 
              >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>About</Text>
                </View>
                </ImageBackground>
      <View style={styles.section}>

      <View style={styles.desc}>
                    <Text style={styles.description}>Description</Text>
                </View>
        
        <Text style={styles.listItem}>RescueNet transforms disaster response by deploying volunteers to areas in need, 
          ensuring efficient aid delivery. It optimizes decision-making and resource allocation through incident analysis. 
          With real-time alerts and community feedback, RescueNet ensures timely, effective crisis management.
        </Text>
      </View>

      <View style={styles.desc}>
                    <Text style={styles.description}>Developed by</Text>
                </View>

                <ImageBackground
                source={require('../assets/logo.gif')} 
                style={styles.logo} 
              >
                </ImageBackground>

         <View style={styles.footer}>
            <Text style={styles.footerText}>Version 2.8.9.2</Text>
          </View>

        </View>
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
    padding: 20,
    backgroundColor: '#f5f2df',
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
  desc: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  description: {
    color: '#708b91',
    fontSize: 18,
    marginTop: 3,
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
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 10,
  },
  footer: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 3,
    borderColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    fontWeight:'bold',
    color: '#3c415c',
  },
  logo: {
    width: '100%', 
    height: 350,   
    justifyContent: 'center', 
    alignItems: 'center',  
    marginBottom: 10,
  },
});