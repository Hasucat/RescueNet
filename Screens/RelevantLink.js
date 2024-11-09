import React from 'react';
import { ScrollView,ImageBackground, StyleSheet, Text, View ,Linking} from 'react-native';
import { Keyboard, TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import { Entypo} from 'react-native-vector-icons';

const RelevantLink = () => {
    const handleLinkClick = (url) => {
        Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
    };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView>
      <ImageBackground
        source={require('../assets/background.png')} 
        style={styles.backgroundImage}
        resizeMode="cover" 
      >
      <View style={styles.container}>
            <View style={styles.cardContainer}>
            <ImageBackground
                source={require('../assets/card_back.png')} // Background for the card
                style={styles.cardBackground} 
                resizeMode="cover"
            >             
              <ImageBackground
                source={require('../assets/header.jpg')} 
                style={styles.headerBackground} 
              >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Relevant Links</Text>
                </View>
                </ImageBackground>
      <View style={styles.section}>

       <TouchableOpacity style={styles.menuItem}  onPress={() => handleLinkClick('https://live7.bmd.gov.bd/')}>
    <View style={styles.iconTextContainer}>
      <Entypo name="link" size={30} color="#589ea3" />
      <Text style={styles.menuText}>Bangladesh Meteorological Department </Text>
    </View>
  </TouchableOpacity>
 
      <TouchableOpacity style={styles.menuItem}  onPress={() => handleLinkClick('http://www.ffwc.gov.bd/')}>
    <View style={styles.iconTextContainer}>
    <Entypo name="link" size={30} color="#589ea3" />
      <Text style={styles.menuText}>Flood Forecasting & Warning Centre</Text>
    </View>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.menuItem}  onPress={() => handleLinkClick('https://www.windy.com/?23.702,90.374,5')}>
    <View style={styles.iconTextContainer}>
    <Entypo name="link" size={30} color="#589ea3" />
      <Text style={styles.menuText}>WindMap & Weather Forecast</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity style={styles.menuItem}  onPress={() => handleLinkClick('https://modmr.gov.bd/')}>
    <View style={styles.iconTextContainer}>
    <Entypo name="link" size={30} color="#589ea3" />
      <Text style={styles.menuText}>Ministry of Disaster Management and Relief</Text>
    </View>
  </TouchableOpacity>

  <TouchableOpacity  style={styles.menuItem}  onPress={() => handleLinkClick('https://www.bamis.gov.bd/bulletin/district/')}>
    <View style={styles.iconTextContainer}>
    <Entypo name="link" size={30} color="#589ea3" />
      <Text style={styles.menuText}>BAMIS</Text>
    </View>
  </TouchableOpacity>

      </View>
      </ImageBackground>
      </View>
        </View>
      </ImageBackground>
        </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RelevantLink;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    marginTop: 8,
  },
  cardContainer: {
    width: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, 
    marginBottom: 30,
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '104%',
    marginBottom: 10,
  },
  headerBackground: {
    width: '100%', 
    height: 90,   
    justifyContent: 'center', 
    alignItems: 'center',  
    marginBottom: 10,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: -18,
  },
  iconTextContainer: {
    flexDirection: 'row',     // Align icon and text in a row
    alignItems: 'center', 
        // Center vertically
  },
  menuIcon: { 
    position: 'absolute',
     left: 20,
      top: 90 ,
      marginRight: 20,
      color: '#000',
      
  },
  menuText: { 
    color: '#3c05e3', 
    fontSize: 14, 
    marginVertical: 10,
    marginLeft: 15, 
 },
  menuItem: {
    padding: 15,
    borderBottomColor: '#ddd',
    marginLeft: 10, 
  },
  section: {
    marginBottom: 20,
  },
  
});