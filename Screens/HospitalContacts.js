import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native';

const HospitalContacts = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/dashboard5.png')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.iconGrid}>
        <View style={styles.container}>
          <View style={styles.iconGrid}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate('DHK_Hospitals')}
            >
              <ImageBackground
                source={require('../assets/header.jpg')}
                style={styles.cardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <Text style={styles.cardText}>Dhaka</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate('CTG_Hospitals')}
            >
              <ImageBackground
                source={require('../assets/header.jpg')}
                style={styles.cardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <Text style={styles.cardText}>Chittagong</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate('KHL_Hospitals')}
            >
              <ImageBackground
                source={require('../assets/header.jpg')}
                style={styles.cardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <Text style={styles.cardText}>Khulna</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate('BGR_Hospitals')}
            >
              <ImageBackground
                source={require('../assets/header.jpg')}
                style={styles.cardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <Text style={styles.cardText}>Bogra</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate('XYZ_Hospitals')}
            >
              <ImageBackground
                source={require('../assets/header.jpg')}
                style={styles.cardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                <Text style={styles.cardText}>Others</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HospitalContacts;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  iconGrid: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 22.5,
  },
  iconContainer: {
    width: '228%',
    height: 78,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.96,
    shadowRadius: 3,
    elevation: 7.5,
    borderColor: 'transparent',
    borderWidth: 4,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  cardText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
