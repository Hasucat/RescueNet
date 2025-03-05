import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoadAccident = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([]);
  
  const content = {
    Before: [
      { title: "Monitor weather reports, warnings, and updates from local authorities.", checked: false },
      { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, and important documents.", checked: false },
      { title: "Strengthen windows, doors, and roof, and remove or secure outdoor items that can become hazards.", checked: false },
      { title: "Know evacuation routes, emergency shelters, and meeting points.", checked: false },
      { title: "Be aware of areas prone to flooding and secure your home against potential water intrusion.", checked: false },
      { title: "Prepare for secondary hazards like landslides, storm surges, or power outages.", checked: false }
    ],
    During: [
      { title: "Take a deep breath, check yourself and others for injuries, and stay aware of your surroundings.", checked: false },
      { title: "Activate your hazard lights to warn other drivers, especially if your vehicle is obstructing traffic.", checked: false },
      { title: "If you're able to, move the vehicle out of traffic to a safe spot. If not, remain inside the car with your seatbelt fastened.", checked: false },
      { title: "If it's dangerous to exit, stay inside the car until help arrives, as stepping out may expose you to oncoming traffic.", checked: false },
      { title: "Stick to the facts when discussing the incident with others, and avoid making statements about fault.", checked: false },
      { title: "Contact emergency services immediately, providing clear information on your location and the nature of the accident.", checked: false }
    ],
    After: [
      { title: "Seek medical attention for anyone injured, even if injuries seem minor, as some symptoms may appear later.", checked: false },
      { title: "Take photos or videos of the accident scene, vehicle damage, license plates, and any visible injuries for insurance and legal purposes.", checked: false },
      { title: "Gather contact details, insurance information, and vehicle details from other drivers involved.", checked: false },
      { title: "Limit discussions about the accident to prevent misunderstandings or complications, especially with witnesses or other drivers.", checked: false },
      { title: "Report the accident to your insurance provider as soon as possible, sharing all necessary documentation.", checked: false },
      { title: "Have your vehicle checked and repaired by a professional, even if the damage seems minor, as some issues may not be immediately visible.", checked: false }
    ]
  };

  // Load previously saved checked items from AsyncStorage
  const loadCheckedItems = async (tab) => {
    try {
      const savedChecks = await AsyncStorage.getItem(`checkedItems_${tab}`);
      if (savedChecks) {
        return JSON.parse(savedChecks);
      }
    } catch (error) {
      console.error('Error loading checked items:', error);
    }
    return [];
  };

  // Save checked items to AsyncStorage
  const saveCheckedItems = async (tab, checkedItems) => {
    try {
      await AsyncStorage.setItem(`checkedItems_${tab}`, JSON.stringify(checkedItems));
    } catch (error) {
      console.error('Error saving checked items:', error);
    }
  };

  useEffect(() => {
    const initializeTabData = async () => {
      const checkedItems = await loadCheckedItems(selectedTab);
      const updatedContent = content[selectedTab].map((item, index) => ({
        ...item,
        checked: checkedItems.some(checkedItem => checkedItem.index === index),
      }));
      setCheckboxes(updatedContent);
    };
    initializeTabData();
  }, [selectedTab]);

  const handleTabPress = async (tab) => {
    setSelectedTab(tab);
    const checkedItems = await loadCheckedItems(tab);
    const updatedContent = content[tab].map((item, index) => ({
      ...item,
      checked: checkedItems.some(checkedItem => checkedItem.index === index),
    }));
    setCheckboxes(updatedContent);
  };

  const handleCheckboxChange = async (index, checked) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = checked;
    setCheckboxes(newCheckboxes);

    const checkedItems = newCheckboxes
      .filter(item => item.checked)
      .map((item, idx) => ({ tab: selectedTab, index: idx, checked: true }));

    await saveCheckedItems(selectedTab, checkedItems);
  };

  const renderContent = () => (
    <View style={styles.checklistContainer}>
      <Text style={styles.sectionTitle}>For Community</Text>
      {checkboxes.map((item, index) => (
        <CheckBox
          key={index}
          title={item.title}
          checked={item.checked}
          onPress={() => handleCheckboxChange(index, !item.checked)}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/roadacc.jpeg')} style={styles.image}>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
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

export default RoadAccident;

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