import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, Text, View, Linking, TouchableOpacity, Image } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import BMDThumbnail from '../assets/bmd.png';
import FFWCThumbnail from '../assets/ffwc.png';
import WINDYThumbnail from '../assets/windy.png';
import MODMRThumbnail from '../assets/modmr.png';
import BAMISThumbnail from '../assets/bamis.png';

const Tutorial = () => {
  const handleLinkClick = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const youtubeThumbnails = {
    BMD: '../assets/bmd.png', // Placeholder
    earthquake: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', // Placeholder
    cyclone: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', // Placeholder
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
                  source={require('../assets/blue.jpeg')}
                  style={styles.headerBackground}
                >
                  <View style={styles.header}>
                    <Text style={styles.headerTitle}>Relevant Links</Text>
                  </View>
                </ImageBackground>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Bangladesh Meteorological Departments (BMD) </Text>

                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://live7.bmd.gov.bd/')}
                  >
                    <Image
                      source={BMDThumbnail}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Weather Forecasts, Cyclone, Storm, Flood, Rainfall, Temperature, Climate, Marine Weather, Aviation Weather, Earthquake related information</Text>
                  </TouchableOpacity>

                  <Text style={styles.sectionTitle}>Flood Forecasting & Warning Centre (FFWC)</Text>

                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('http://www.ffwc.gov.bd/')}
                  >
                    <Image
                      source={FFWCThumbnail}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Flood Forecasts , Water Level Monitoring, Rainfall Data, Inundation Mapping, Risk and Impact Analysis, Seasonal Flood Outlooks related information</Text>
                  </TouchableOpacity>

                  <Text style={styles.sectionTitle}>WindMap & Weather Forecast </Text>

                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://www.windy.com/?23.702,90.374,5')}
                  >
                    <Image
                      source={WINDYThumbnail}
                      style={styles.thumbnailwindy}
                    />
                    <Text style={styles.videoTitle}>Weather Forecasts, Wind and Storm Tracking, Air Quality, Rainfall and Lightning Activity, Sea and Wave Conditions, Radar and Satellite Imagery related information</Text>
                  </TouchableOpacity>

                  <Text style={styles.sectionTitle}>Ministry of Disaster Management and Relief (MoDMR)</Text>

                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://modmr.gov.bd/')}
                  >
                    <Image
                      source={MODMRThumbnail}
                      style={styles.thumbnailmodmr}
                    />
                    <Text style={styles.videoTitle}>Disaster Preparedness, Relief Distribution, Recovery Initiatives, Risk Reduction, Disaster Warnings, Policies for Disaster Response, Training Resources, Resources on Cyclone Shelters, Flood Relief, and Emergency Contact information related information.</Text>
                  </TouchableOpacity>

                  <Text style={styles.sectionTitle}>Bangladesh Agro-Mateorological Information Service (BAMIS)</Text>

                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://www.bamis.gov.bd/bulletin/district/')}
                  >
                    <Image
                      source={BAMISThumbnail}
                      style={styles.thumbnailbamis}
                    />
                    <Text style={styles.videoTitle}>Agro-Meteorological Bulletins, Crop and Weather Data, Advisory Services, Monitoring and Tools, Climate and Crop Risk Information related information</Text>
                  </TouchableOpacity>
                </View>
              
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f7e8',
   
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#c9d5d6',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30,
    borderRadius: 2,
    borderColor: '#000',


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
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: -15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#ab0314',
  },
  videoThumbnailContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#787375',
  },
  thumbnail: {
    width: '100%',
    height: 180,
  },
  thumbnailwindy: {
    width: '100%',
    height: 100,
  },
  thumbnailmodmr: {
    width: '100%',
    height: 130,
  },
  thumbnailbamis: {
    width: '100%',
    height: 100,
  },
  videoTitle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default Tutorial;
