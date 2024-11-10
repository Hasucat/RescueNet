import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const ImportantContacts = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/dashboard5.png')}
        style={styles.contentBackground}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.iconGrid}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('BangladeshEmergencies')}>
            <Image source={require('../assets/BDEmergency_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('RABContacts')}>
            <Image source={require('../assets/RAB_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Hospitals')}>
            <Image source={require('../assets/Hospital_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Pharmacy')}>
            <Image source={require('../assets/Pharmacy_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('BloodBanks')}>
            <Image source={require('../assets/Blood_.webp')} style={styles.cardImage} />
          </TouchableOpacity>

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
      </ImageBackground>
    </View>
  );
};

export default ImportantContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentBackground: {
    flex: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
    paddingVertical: 36,
  },
  iconGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 270,
    padding: 30,
    marginBottom: 45,
    backgroundColor: "transparent",
    border: 'none',
  },
  cardImage: {
    width: '81%',
    height: 248,
    borderRadius: 10,
  },
});

