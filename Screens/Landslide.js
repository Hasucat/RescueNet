import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Landslide = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState({});

  // Define content for each tab
  const content = {
    Before: [
      { title: "Monitor weather reports, rainfall levels, and geological alerts to detect early signs of landslide risk." },
      { title: "Prepare an emergency kit with essentials such as food, water, medications, flashlight, batteries, and copies of important documents." },
      { title: "Strengthen retaining walls, slope stabilization measures, and secure loose outdoor objects that may be affected by heavy rain." },
      { title: "Identify and familiarize yourself with evacuation routes, safe zones, and emergency shelters in case of a landslide." },
      { title: "Assess and map areas around your home prone to landslides, and take necessary precautions to reinforce vulnerable spots." },
      { title: "Plan for possible secondary impacts such as mudslides, flooding, and road obstructions, and ensure access to alternative routes." }
    ],    
    During: [
      { title: "Listen to a battery-powered radio or phone for updates on landslide activity and evacuation orders." },
      { title: "Have your emergency supplies on hand and use them as needed during the event." },
      { title: "Evacuate immediately if ordered to do so by authorities, and seek shelter in a safe location away from potential landslide areas." },
      { title: "Stay away from unstable slopes, cliffs, and areas prone to landslides or debris flow." },
      { title: "Stay indoors, away from windows, doors, and outer walls, in a safe location." },
      { title: "Be vigilant for changing weather conditions, and follow evacuation or safety instructions if needed." }
    ],
    After: [
      { title: "Continue to listen to official guidance and updates for recovery and safety instructions." },
      { title: "Ensure you have essential items for the recovery period, including first aid supplies, food, and communication devices." },
      { title: "Inspect your home for damage, including cracks, flooding, or structural damage caused by the landslide." },
      { title: "Follow evacuation instructions if necessary, and avoid returning to affected areas until deemed safe by authorities." },
      { title: "Avoid areas with loose debris, unstable slopes, or damaged infrastructure to prevent injury or further damage." },
      { title: "Monitor ongoing risks, such as additional landslides, flooding, or aftershocks, and follow safety protocols." }
    ]
  };

  // Fetch stored checkbox states from AsyncStorage
  useEffect(() => {
    const loadCheckboxes = async () => {
      try {
        const storedCheckboxes = await AsyncStorage.getItem('checkboxStates');
        if (storedCheckboxes) {
          setCheckboxes(JSON.parse(storedCheckboxes));
        }
      } catch (error) {
        console.error("Error loading checkbox states", error);
      }
    };
    loadCheckboxes();
  }, []);

  // Save checkbox states to AsyncStorage
  const saveCheckboxes = async (newCheckboxes) => {
    try {
      await AsyncStorage.setItem('checkboxStates', JSON.stringify(newCheckboxes));
    } catch (error) {
      console.error("Error saving checkbox states", error);
    }
  };

  // Update checkboxes when tab changes
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  // Toggle checkbox state
  const handleCheckboxToggle = (tab, index) => {
    const newCheckboxes = { ...checkboxes };
    const currentState = newCheckboxes[tab] || {};
    currentState[index] = !currentState[index];
    newCheckboxes[tab] = currentState;

    setCheckboxes(newCheckboxes);
    saveCheckboxes(newCheckboxes);
  };

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {content[selectedTab].map((item, index) => (
          <CheckBox
            key={index}
            title={item.title}
            checked={checkboxes[selectedTab]?.[index] || false}
            onPress={() => handleCheckboxToggle(selectedTab, index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/landslide.jpeg')} style={styles.image}>
        <TouchableOpacity style={styles.backButton}>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.tabsContainer}>
        {['Before', 'During', 'After'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.activeTabText,
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {renderContent()}
        </ScrollView>
      </View>
    </View>
  );
};

export default Landslide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#2f515c',
    marginTop: 5,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#691b38',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#691b38',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  checklistContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});