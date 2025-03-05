import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cyclone = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([]);

  // Define content for each tab
  const content = {
    Before: [
      { title: "Monitor weather reports, warnings, and updates from local authorities." },
      { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, and important documents." },
      { title: "Strengthen windows, doors, and roof, and remove or secure outdoor items that can become hazards." },
      { title: "Know evacuation routes, emergency shelters, and meeting points." },
      { title: "Be aware of areas prone to flooding and secure your home against potential water intrusion." },
      { title: "Prepare for secondary hazards like landslides, storm surges, or power outages." }
    ],
    During: [
      { title: "Keep a battery-powered radio or phone handy for updates." },
      { title: "Have your supplies on hand and use them as needed." },
      { title: "Evacuate if ordered to do so by authorities, and stay safe in a designated shelter." },
      { title: "Stay away from floodwaters, as they can be dangerous and carry debris or hazards." },
      { title: "Stay indoors, away from windows and doors, in a safe location." },
      { title: "Be vigilant for changing weather conditions and follow evacuation instructions if needed." }
    ],
    After: [
      { title: "Continue to listen to official guidance for recovery and safety advice." },
      { title: "Ensure you have essential items for the recovery period, like first aid, food, and communication devices." },
      { title: "Inspect your home for damage and make temporary repairs if necessary." },
      { title: "Follow evacuation instructions for continued safety and recovery." },
      { title: "Avoid flooded areas to prevent further injury or contamination." },
      { title: "Monitor ongoing risks, such as continued flooding or aftershocks, and follow safety protocols." }
    ]
  };

  // Load saved checkbox states from AsyncStorage
  useEffect(() => {
    const loadCheckboxes = async () => {
      try {
        const savedCheckboxes = await AsyncStorage.getItem(`checkboxes_${selectedTab}`);
        if (savedCheckboxes) {
          setCheckboxes(JSON.parse(savedCheckboxes));
        } else {
          setCheckboxes(content[selectedTab].map(item => ({ ...item, checked: false })));
        }
      } catch (error) {
        console.error('Error loading checkboxes:', error);
      }
    };
    loadCheckboxes();
  }, [selectedTab]);

  // Save checkbox states when updated
  const handleCheckboxPress = async (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
    try {
      await AsyncStorage.setItem(`checkboxes_${selectedTab}`, JSON.stringify(updatedCheckboxes));
    } catch (error) {
      console.error('Error saving checkboxes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/cyclone.jpeg')} style={styles.image}>
        <TouchableOpacity style={styles.backButton}>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.tabsContainer}>
        {['Before', 'During', 'After'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
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
          <View style={styles.checklistContainer}>
            <Text style={styles.sectionTitle}>For Community</Text>
            {checkboxes.map((item, index) => (
              <CheckBox
                key={index}
                title={item.title}
                checked={item.checked}
                onPress={() => handleCheckboxPress(index)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Cyclone;

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