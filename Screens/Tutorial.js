import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, Text, View, Linking, TouchableOpacity, Image } from 'react-native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import firstAid from '../assets/aidkit.png';
import disasterAid from '../assets/disaskit.png';
import prephome from '../assets/prephome.png';
import prepflood from '../assets/prepflood.png';
import prepearthquake from '../assets/prepearthquake.png';
import prephurricane from '../assets/prephurricane.png';
import preptsunami from '../assets/preptsunami.png';
import prepwildfire from '../assets/prepwildfire.png';
import prepheatwave from '../assets/prepheatwave.png';
import prepcybercrime from '../assets/prepcybercrime.png';
import terrorattack from '../assets/terrorattack.png';
import prepdrought from '../assets/prepdrought.png';
import prepfire from '../assets/prepfire.png';


const Tutorial = () => {
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
                  source={require('../assets/blue.jpeg')}
                  style={styles.headerBackground}
                >
                  <View style={styles.header}>
                    <Text style={styles.headerTitle}>Tutorial</Text>
                  </View>
                </ImageBackground>

                <View style={styles.section}>
                  {/* Card 1 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/aK9xrsK7vPg?si=4wS3PZWK7pC9s4Io')}
                  >
                    <Image
                      source={firstAid}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare a First Aid Kit</Text>
                  </TouchableOpacity>

                  {/* Card 2 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/UmiGvOha7As?si=z86XRF6nDzOpUcdz')}
                  >
                    <Image
                      source={disasterAid}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare a Disaster Kit</Text>
                  </TouchableOpacity>

                  {/* Card 3 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/qL5Y54o3ny8?si=xwMKXv9R0Nj9sT2k')}
                  >
                    <Image
                      source={prephome}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare Home for any  major disaster</Text>
                  </TouchableOpacity>

                   {/* Card 10 */}
                   <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/EHqXMxY4_Nk?si=aflASn3wpiB7aSYs')}
                  >
                    <Image
                      source={prepcybercrime}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Steps to protect against Cyber Attack</Text>
                  </TouchableOpacity>

                  {/* Card 11 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/hs2prs9xVk8?si=QOKBn4-d27l_srsN')}
                  >
                    <Image
                      source={terrorattack}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare for Terrorist Attack</Text>
                  </TouchableOpacity>


                  {/* Card 4 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/43M5mZuzHF8?si=Jkf9qT7AzZcfxY3S')}
                  >
                    <Image
                      source={prepflood}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare for Flood</Text>
                  </TouchableOpacity>

                  {/* Card 5*/}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/BLEPakj1YTY?si=ak6AGDMk3JnO8VHB')}
                  >
                    <Image
                      source={prepearthquake}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare for Earthquake</Text>
                  </TouchableOpacity>

                  {/* Card 6 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/xHRbnuB9F1I?si=JEf3515yzjni_1_1')}
                  >
                    <Image
                      source={prephurricane}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare for Hurricane</Text>
                  </TouchableOpacity>

                  {/* Card 7 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/m7EDddq9ftQ?si=xTxS_R97RrZiz1mV')}
                  >
                    <Image
                      source={preptsunami}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare for Tsunami</Text>
                  </TouchableOpacity>

                  {/* Card 8 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/_bNLtjHG9dM?si=wtrV0Ww-0xIvAfOE')}
                  >
                    <Image
                      source={prepwildfire}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare for Wildfire</Text>
                  </TouchableOpacity>

                  {/* Card 9 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/kwUMBVO-ar0?si=9fbFnmA1JVWO55XE')}
                  >
                    <Image
                      source={prepheatwave}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare for Heatwave</Text>
                  </TouchableOpacity>

                  {/* Card 9 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/apwK7Y362qU?si=wahwAorb3aBBQAG-')}
                  >
                    <Image
                      source={prepfire}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>What to do in Fire Accident</Text>
                  </TouchableOpacity>

                  {/* Card 8 */}
                  <TouchableOpacity
                    style={styles.videoThumbnailContainer}
                    onPress={() => handleLinkClick('https://youtu.be/yy4Jz_J_0r0?si=4OlP5G6Zi0sZsMyb')}
                  >
                    <Image
                      source={prepdrought}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.videoTitle}>Tips to prepare for Drought</Text>
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
    backgroundColor: '#a1c3c4',
   
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#f0efda',
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
    marginTop: -5,
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
    height: 160,
  },
  videoTitle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ab0314',
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
