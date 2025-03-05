import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Earthquake = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([]);

  const content = {
    Before: [
      { title: "Stock up on water, food, medications, flashlight, batteries, first aid kit, and important documents.", checked: false },
      { title: "Anchor heavy furniture and appliances to walls. Secure shelves and heavy items that could fall during shaking.", checked: false },
      { title: "Establish a meeting point for your family and ensure everyone knows how to exit the home safely.", checked: false },
      { title: "Inspect your home for any weak areas (e.g., cracks in the foundation) and make necessary repairs.", checked: false },
      { title: "Identify safe spots in your home (e.g., under sturdy furniture, away from windows).", checked: false },
      { title: "Practice “Drop, Cover, and Hold On” with your family so everyone knows what to do.", checked: false }
    ],
    During: [
      { title: "Drop to the ground, Cover your head and neck, and Hold On to something sturdy until shaking stops.", checked: false },
      { title: "Stay inside. Move away from windows, glass, and exterior walls. Avoid doorways.", checked: false },
      { title: "Stay clear of shelves, cabinets, and other objects that could fall or move during the shaking.", checked: false },
      { title: "Move away from buildings, trees, utility poles, and vehicles that could collapse or fall.", checked: false },
      { title: "Stop in a safe area away from overpasses, bridges, and power lines. Stay in the vehicle until shaking stops.", checked: false },
      { title: "After the main quake, expect aftershocks. Drop, cover, and hold on again if they occur.", checked: false }
    ],
    After: [
      { title: "Check yourself and others for injuries. Provide first aid if necessary and seek medical help if needed.", checked: false },
      { title: "Check for structural damage, gas leaks, and exposed electrical wires. If you suspect gas leaks, turn off the main gas valve and leave the house.", checked: false },
      { title: "Tune into radio or emergency services for updates and instructions. Follow evacuation orders if necessary.", checked: false },
      { title: "Stay clear of fallen power lines, debris, and unsafe structures. Do not re-enter buildings until authorities declare them safe.", checked: false },
      { title: "Aftershocks can occur for hours or days. Be prepared to drop, cover, and hold on again.", checked: false },
      { title: "Assist neighbors, especially the elderly or those with disabilities. Provide basic needs like food, water, and shelter if possible.", checked: false }
    ]
  };

  // Load checkbox states from AsyncStorage
  useEffect(() => {
    const loadCheckboxes = async () => {
      try {
        const storedData = await AsyncStorage.getItem(`checkboxes_${selectedTab}`);
        if (storedData) {
          setCheckboxes(JSON.parse(storedData));
        } else {
          setCheckboxes(content[selectedTab]); // Default values if no saved state
        }
      } catch (error) {
        console.error("Error loading checkbox data", error);
      }
    };
    loadCheckboxes();
  }, [selectedTab]);

  // Save checkbox states to AsyncStorage
  const handleCheckboxToggle = async (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
    try {
      await AsyncStorage.setItem(`checkboxes_${selectedTab}`, JSON.stringify(updatedCheckboxes));
    } catch (error) {
      console.error("Error saving checkbox state", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/earthquake.jpeg')} style={styles.image}>
        <TouchableOpacity style={styles.backButton}>
          {/* Back button can be implemented here */}
        </TouchableOpacity>
      </ImageBackground>

      {/* Tabs */}
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

      {/* Checklist Content */}
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>For Community</Text>
          {checkboxes.map((item, index) => (
            <CheckBox
              key={index}
              title={item.title}
              checked={item.checked}
              onPress={() => handleCheckboxToggle(index)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Earthquake;

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});