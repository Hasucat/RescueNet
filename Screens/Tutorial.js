import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, Text, View, Linking, TouchableOpacity, Image } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from 'react-native-vector-icons';

const Tutorial = () => {
  const handleLinkClick = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const youtubeThumbnails = {
    flood: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', // Placeholder
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
                  source={require('../assets/header.jpg')}
                  style={styles.headerBackground}
                >
                  <View style={styles.header}>
                    <Text style={styles.headerTitle}>Tutorial</Text>
                  </View>
                </ImageBackground>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Flood Resources</Text>

                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://www.youtube.com/watch?v=pi_nUPcQz_A')}
                  >
                    <Image
                      source={{ uri: youtubeThumbnails.flood }}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Flood Safety Tips</Text>
                  </TouchableOpacity>

                  <Text style={styles.sectionTitle}>Earthquake Resources</Text>

                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://www.youtube.com/watch?v=BLEPakj1YTY')}
                  >
                    <Image
                      source={{ uri: youtubeThumbnails.earthquake }}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Earthquake Preparedness</Text>
                  </TouchableOpacity>

                  <Text style={styles.sectionTitle}>Cyclone Resources</Text>

                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://www.youtube.com/watch?v=B9qR2e3xyJo')}
                  >
                    <Image
                      source={{ uri: youtubeThumbnails.cyclone }}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Cyclone Safety Tips</Text>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#540620',
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
    height: 200,
  },
  videoTitle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
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
