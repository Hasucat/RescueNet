import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Media = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.iconGrid}>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('BangladeshDailies')}>
            <Image source={require('../assets/newspaper.png')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('EmbassyN_HighCommissions')}>
            <Image source={require('../assets/emabassy.png')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('MediaContacts')}>
            <Image source={require('../assets/channels.png')} style={styles.cardImage} />
          </TouchableOpacity>
        </ScrollView>
      
    </View>
  );
};

export default Media;

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
        padding: 1,
        marginBottom: 5,
        borderRadius: 1, // Rounded corners
        backgroundColor: "transparent",
        borderColor:'#000',
        borderWidth:4,
        marginTop:30,
        
      },
      cardImage: {
        width: '101%',
        height: 160,
       
      },
});

