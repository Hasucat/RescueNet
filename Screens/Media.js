import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Media = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.iconGrid}>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('BangladeshDailies')}>
            <Image source={require('../assets/BDDailies_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('NGOs')}>
            <Image source={require('../assets/NGO_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('EmbassyN_HighCommissions')}>
            <Image source={require('../assets/Embassy_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('MediaContacts')}>
            <Image source={require('../assets/Channels_.webp')} style={styles.cardImage} />
          </TouchableOpacity>
        </ScrollView>
      
    </View>
  );
};

export default Media;

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

