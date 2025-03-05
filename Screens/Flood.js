import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Flood = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxStates, setCheckboxStates] = useState({ Before: [], During: [], After: [] });

  // Define content for each tab
  const content = {
    Before: [
      "Monitor weather forecasts and flood warnings from local authorities. Sign up for flood alerts, and understand the flood risk in your area.",
      "Prepare an emergency kit that includes essential items such as food, water, medications, a first aid kit, flashlight, batteries, and important documents in waterproof bags.",
      "If flooding is a risk, elevate electrical appliances, furniture, and other valuables to higher floors. Install sump pumps, check flood barriers, and seal any gaps where water could enter.",
      "Know your evacuation routes, and identify safe, elevated places to go in case of flooding. Arrange a meeting point for your family in case you’re separated.",
      "Be aware of flood-prone areas and avoid building or storing valuable items in these zones. Understand the flood risks in your community.",
      "Be aware of additional risks such as landslides, power outages, or exposure to contaminated water following a flood."
    ],
    During: [
      "Stay updated with emergency notifications through a battery-powered radio, phone, or alerts. Listen to evacuation orders and instructions.",
      "Keep your emergency kit accessible and use it as needed. Ensure you have enough supplies to last several days.",
      "Stay inside and move to higher ground if floodwaters start to rise. Avoid going outside unless absolutely necessary.",
      "Evacuate immediately if advised by authorities or if you feel that floodwaters are rising rapidly. Avoid driving through flooded areas.",
      "Stay away from floodwaters, as they can be fast-moving and carry dangerous debris, contaminants, and hidden hazards like downed power lines.",
      "Watch for rising water levels, collapsing structures, and potential health hazards like waterborne diseases. Follow evacuation or safety instructions as needed."
    ],
    After: [
      "Continue to follow official updates and recovery guidance. Watch out for additional rainfall, rising water, or secondary flooding.",
      "Have the essentials ready for recovery, such as first aid supplies, clean drinking water, and food if needed, while you assess the damage and seek assistance.",
      "Check your home for water damage, and take photographs for insurance claims. Make temporary repairs to prevent further water intrusion.",
      "Follow official instructions for returning to your home or moving to designated shelters for continued safety.",
      "Do not walk or drive through flooded areas. Floodwaters can be deeper and more dangerous than they appear. Wait until authorities declare it safe.",
      "Continue monitoring for secondary dangers like gas leaks, electrical issues, or mold growth. Follow proper sanitation procedures to avoid infection or contamination from floodwaters."
    ]
  };

  // Load checkbox states from AsyncStorage
  useEffect(() => {
    const loadCheckboxStates = async () => {
      try {
        const storedStates = await AsyncStorage.getItem('checkboxStates');
        if (storedStates) {
          setCheckboxStates(JSON.parse(storedStates));
        } else {
          // Initialize state if no stored data exists
          setCheckboxStates({
            Before: content.Before.map(() => false),
            During: content.During.map(() => false),
            After: content.After.map(() => false)
          });
        }
      } catch (error) {
        console.error("Error loading checkbox states:", error);
      }
    };

    loadCheckboxStates();
  }, []);

  // Save checkbox states to AsyncStorage
  const saveCheckboxStates = async (newStates) => {
    try {
      await AsyncStorage.setItem('checkboxStates', JSON.stringify(newStates));
    } catch (error) {
      console.error("Error saving checkbox states:", error);
    }
  };

  // Handle checkbox toggle
  const toggleCheckbox = (index) => {
    const updatedStates = { ...checkboxStates };
    updatedStates[selectedTab][index] = !updatedStates[selectedTab][index];
    setCheckboxStates(updatedStates);
    saveCheckboxStates(updatedStates);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/flood.jpeg')} style={styles.image}>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
      </ImageBackground>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['Before', 'During', 'After'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Checklist */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.checklistContainer}>
          <Text style={styles.sectionTitle}>For Community</Text>
          {content[selectedTab].map((item, index) => (
            <CheckBox
              key={index}
              title={item}
              checked={checkboxStates[selectedTab]?.[index] || false}
              onPress={() => toggleCheckbox(index)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Flood;

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