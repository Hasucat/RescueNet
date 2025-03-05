import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tsunami = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkedItems, setCheckedItems] = useState({});

  const content = {
    Before: [
      "Determine if you live in a tsunami-prone area (coastal regions) and understand the local evacuation routes.",
      "Have a kit with essentials like water, food, medications, flashlight, first aid supplies, and important documents.",
      "Plan and practice evacuation routes to higher ground or designated tsunami evacuation zones.",
      "Elevate appliances and valuables, and secure loose objects that may be swept away in the event of a tsunami.",
      "Sign up for tsunami warnings and alerts, and have a way to receive emergency notifications (radio, phone, or app).",
      "Be familiar with local tsunami evacuation plans, and communicate your plan with family, friends, and neighbors."
    ],
    During: [
      "Move to higher ground immediately if you feel the ground shake or hear a warning.",
      "Avoid coastal areas and stay away from water bodies.",
      "Follow evacuation routes and evacuate as soon as possible.",
      "Stay away from rivers and streams, as tsunami waves can travel up them.",
      "Listen for emergency alerts for further instructions and updates.",
      "Remain calm and assist others, especially the elderly and children."
    ],
    After: [
      "Stay on high ground until authorities declare it safe to return.",
      "Check for injuries and provide first aid as needed.",
      "Listen to official announcements for recovery guidance and safety instructions.",
      "Avoid flooded areas to prevent contamination and hazards.",
      "Inspect your home for structural damage, gas leaks, and electrical hazards.",
      "Be prepared for aftershocks or additional waves and remain vigilant for further warnings."
    ]
  };

  useEffect(() => {
    const loadCheckedItems = async () => {
      const storedCheckedItems = await AsyncStorage.getItem('checkedItems');
      if (storedCheckedItems) {
        setCheckedItems(JSON.parse(storedCheckedItems));
      }
    };
    loadCheckedItems();
  }, []);

  const handleCheckboxToggle = (index) => {
    const updatedCheckedItems = { ...checkedItems };
    const key = `${selectedTab}-${index}`;
    updatedCheckedItems[key] = !updatedCheckedItems[key];
    setCheckedItems(updatedCheckedItems);
    AsyncStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/tsunami.jpeg')} style={styles.image}>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
      </ImageBackground>

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

      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.checklistContainer}>
            <Text style={styles.sectionTitle}>For Community</Text>
            {content[selectedTab].map((title, index) => (
              <View key={index} style={styles.checkBoxWrapper}>
                <CheckBox
                  title={title}
                  checked={checkedItems[`${selectedTab}-${index}`] || false}
                  onPress={() => handleCheckboxToggle(index)}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Tsunami;

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
  checkBoxWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 5,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 16,
  },
});