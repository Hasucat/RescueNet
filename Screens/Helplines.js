import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Helplines = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.iconGrid}>
          
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('BangladeshEmergencies')}>
            <Image source={require('../assets/BdNational.png')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('RABContacts')}>
            <Image source={require('../assets/Rab.png')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('NGOs')}>
            <Image source={require('../assets/ngo.png')} style={styles.cardImage} />
          </TouchableOpacity>

        </ScrollView>
    </View>
  );
};

export default Helplines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  iconGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    height: 180,
    padding: 5,
    marginBottom: 5,
    borderRadius: 1, // Rounded corners
    backgroundColor: "transparent",
    borderColor:'#000',
    borderWidth:4,
    marginTop:20,
    
  },
  cardImage: {
    width: '90%',
    height: 160,
   
  },
});

