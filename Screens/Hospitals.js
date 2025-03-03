import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Hospitals = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
        <ScrollView contentContainerStyle={styles.iconGrid}>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('HospitalContacts')}>
            <Image source={require('../assets/bdhosp.png')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('BloodBanks')}>
            <Image source={require('../assets/bloodbank.png')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Pharmacy')}>
            <Image source={require('../assets/pharmacy.png')} style={styles.cardImage} />
          </TouchableOpacity>

        </ScrollView>
     
    </View>
  );
};

export default Hospitals;

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
        width: '70%',
        height: 190,
        padding: 5,
        marginBottom: 1,
        borderRadius: 1, // Rounded corners
        backgroundColor: "transparent",
        borderColor:'#000',
        borderWidth:4,
        marginTop:20,
        
      },
      cardImage: {
        width: '80%',
        height: 140,
       
      },
});

