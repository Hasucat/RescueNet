import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DosAndDonts = () => {
  const navigation = useNavigation();

  const handleNavigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
       <View style={styles.backgroundContainer}>
        <View style={styles.cardContainer}>
          {/* Card 1 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Cyclone')}>
            <ImageBackground source={require('../assets/cyclone.png')} style={styles.cardImage} resizeMode="cover">
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Flood')}>
            <ImageBackground source={require('../assets/flood.png')} style={styles.cardImage} resizeMode="cover">
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Earthquake')}>
            <ImageBackground source={require('../assets/earthquake.png')} style={styles.cardImage} resizeMode="cover">
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 4 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Tsunami')}>
            <ImageBackground source={require('../assets/tsunami.png')} style={styles.cardImage}  resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>
          
          {/* Card 5 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Landslide')}>
            <ImageBackground source={require('../assets/landslide.png')} style={styles.cardImage} resizeMode="cover">            
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 6 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Drought')}>
            <ImageBackground source={require('../assets/drought.png')} style={styles.cardImage} resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 7 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Hurricane')}>
            <ImageBackground source={require('../assets/hurricane.png')} style={styles.cardImage} resizeMode="cover">            
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 8 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Wildfire')}>
            <ImageBackground source={require('../assets/wildfire.png')} style={styles.cardImage} resizeMode="cover">              
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 9 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('HighTide')}>
            <ImageBackground source={require('../assets/hightide.png')} style={styles.cardImage} resizeMode="cover">            
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 10 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Lightning')}>
            <ImageBackground source={require('../assets/lightning.png')} style={styles.cardImage} resizeMode="cover">            
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 11 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('RoadAccident')}>
            <ImageBackground source={require('../assets/roadacc.png')} style={styles.cardImage} resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 12 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Fire')}>
            <ImageBackground source={require('../assets/fire.png')} style={styles.cardImage} resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 13 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('CyberCrime')}>
            <ImageBackground source={require('../assets/cybercrime.png')} style={styles.cardImage} resizeMode="cover">             
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 14 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Robbery')}>
            <ImageBackground source={require('../assets/robbery.png')} style={styles.cardImage} resizeMode="cover">
            </ImageBackground>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
};

export default DosAndDonts;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#3d586e', // Teal color for the background
    paddingHorizontal: 10,
    paddingVertical: 22,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 0, // Remove any default padding
    margin: 0, 
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%', // 3 cards per row
    height: 150,  // Adjust as needed
    marginBottom: 20,
    marginTop: -13,
    borderRadius: 0,
    borderWidth: 4,   // Set the border width
    borderColor: '#657b9c', // Set the border color
    overflow: 'hidden',
    padding: 0,
    marginHorizontal:8,
    
  },
  cardImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // 3 cards per row
    height: 155,  // Adjust as needed
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
