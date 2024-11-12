import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Hospitals = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
        <ScrollView contentContainerStyle={styles.iconGrid}>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('HospitalContacts')}>
            <Image source={require('../assets/Hospital_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('BloodBanks')}>
            <Image source={require('../assets/Blood_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Pharmacy')}>
            <Image source={require('../assets/Pharmacy_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

        </ScrollView>
     
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#31505e',
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

