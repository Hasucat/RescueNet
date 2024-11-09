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
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page1')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 1</Text>
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page2')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 2</Text>
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page3')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 3</Text>
            </ImageBackground>
          </TouchableOpacity>

          {/* Card 4 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page4')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 4</Text>
            </ImageBackground>
          </TouchableOpacity>

          {/* Repeat similar blocks for Cards 5 to 15 */}
          
          {/* Card 5 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 6 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 6</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 7 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 8 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 9 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 10 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 11 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 12 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 13 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
            </ImageBackground>
          </TouchableOpacity>
          {/* Card 14 */}
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('Page5')}>
            <ImageBackground source={require('../assets/alerts.png')} style={styles.cardImage}>
              <Text style={styles.cardText}>Card 5</Text>
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
    backgroundColor: '#008080', // Teal color for the background
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
    borderRadius: 5,
    overflow: 'hidden',
    padding: 2,
    marginHorizontal:8,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
