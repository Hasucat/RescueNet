import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Hurricane = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkedItems, setCheckedItems] = useState({}); // Store only checked items {tab, index, checked}

  // Define content for each tab
  const content = {
    Before: [
      { title: "Track the hurricane's progress through reliable weather apps and news sources to stay informed about any changes." },
      { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, important documents, and first aid supplies." },
      { title: "Secure windows, doors, and roofs, and remove or secure outdoor items that can become projectiles in high winds." },
      { title: "Know evacuation routes, emergency shelters, and meeting points in case of mandatory evacuation." },
      { title: "Reinforce your home by installing storm shutters or plywood on windows and securing the roof to prevent damage from strong winds." },
      { title: "Fill bathtubs and containers with water for emergency use, as water systems may be affected." }
    ],
    During: [
      { title: "Keep a battery-powered radio or phone handy for updates from authorities and emergency instructions." },
      { title: "Stay indoors, away from windows, and seek shelter in a safe room or interior space." },
      { title: "Evacuate if ordered to do so by authorities, and move to a designated shelter or higher ground if at risk of flooding." },
      { title: "Avoid using electrical appliances and stay clear of downed power lines." },
      { title: "Stay away from floodwaters, as they can carry debris and be hazardous." },
      { title: "Be vigilant for changing weather conditions and follow evacuation instructions if necessary." }
    ],
    After: [
      { title: "Continue to listen to official guidance for recovery, safety, and evacuation updates." },
      { title: "Ensure you have essential items for recovery, like first aid supplies, food, and water." },
      { title: "Inspect your home for damage, including structural issues, roof damage, and flooding, and make temporary repairs if necessary." },
      { title: "Follow evacuation orders if necessary, and avoid returning to affected areas until authorities declare them safe." },
      { title: "Avoid contact with floodwaters to prevent injury, contamination, or exposure to hazardous materials." },
      { title: "Monitor for ongoing risks such as aftershocks, flooding, or additional storms, and follow recovery and safety protocols." }
    ]
  };

  // Load saved checkbox states from AsyncStorage
  useEffect(() => {
    const loadSavedStates = async () => {
      try {
        const savedStates = await AsyncStorage.getItem('checkedItems');
        if (savedStates) {
          setCheckedItems(JSON.parse(savedStates));
        }
      } catch (error) {
        console.error('Failed to load checked items', error);
      }
    };
    loadSavedStates();
  }, []);

  // Save checked items to AsyncStorage
  useEffect(() => {
    const saveCheckedItems = async () => {
      try {
        await AsyncStorage.setItem('checkedItems', JSON.stringify(checkedItems));
      } catch (error) {
        console.error('Failed to save checked items', error);
      }
    };
    saveCheckedItems();
  }, [checkedItems]);

  // Update checkboxes when tab changes
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {content[selectedTab].map((item, index) => (
          <CheckBox
            key={index}
            title={item.title}
            checked={checkedItems[selectedTab]?.[index] || false}
            onPress={() => {
              const updatedCheckedItems = { ...checkedItems };
              updatedCheckedItems[selectedTab] = {
                ...updatedCheckedItems[selectedTab],
                [index]: !updatedCheckedItems[selectedTab]?.[index]
              };
              setCheckedItems(updatedCheckedItems);
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/hurricane.jpeg')} style={styles.image}>
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
}

export default Hurricane;

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
  backText: {
    color: '#fff',
    fontSize: 24,
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
    borderRadius: 20, // Rounds the entire tab bar
    borderWidth: 5, // Border width for the tab bar
    borderColor: '#2f515c', // Border color for the tab bar (red color)
    marginTop: 5,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15, // Rounds each tab button
    backgroundColor: '#fff', 
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#691b38', // red color for active tab
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#691b38',
  },
  scrollContainer: {
    flex: 1, // This will allow ScrollView to take up remaining space
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