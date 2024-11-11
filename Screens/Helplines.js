import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Helplines = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.iconGrid}>
          
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('BangladeshEmergencies')}>
            <Image source={require('../assets/BDEmergency_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('RABContacts')}>
            <Image source={require('../assets/RAB_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

        </ScrollView>
    </View>
  );
};

export default Helplines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffee6',
  },

  iconGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 290,
    padding: 10,
    marginBottom: 25,
    backgroundColor: "transparent",
    border: 'none',
    marginTop:20,
    
  },
  cardImage: {
    width: '80%',
    height: 300,
   
  },
});

