import React, { useEffect } from 'react';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);  // Splash screen duration

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground 
      source={require('../assets/RESCUENET.png')} // Replace with your background image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  }
});

export default SplashScreen;
