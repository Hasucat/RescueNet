import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HighTide = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkedItems, setCheckedItems] = useState([]);

  // Define content for each tab
  const content = {
    Before: [
      { title: "Check weather forecasts and tidal predictions to stay informed about potential high tides and related hazards in your area." },
      { title: "Elevate or move outdoor items such as furniture, plants, and vehicles that could be damaged by flooding to higher ground." },
      { title: "Ensure your property is properly sealed to prevent water intrusion—check for cracks, gaps, and weak spots in doors, windows, and foundations." },
      { title: "Stock up on emergency supplies, including bottled water, non-perishable food, flashlights, extra batteries, first aid kits, and important documents in a waterproof container." },
      { title: "Clear drainage systems like gutters, downspouts, and storm drains to prevent water from pooling around your home." },
      { title: "Create an evacuation plan that includes transportation routes to higher ground, and make sure all family members are aware of it." }
    ],
    During: [
      { title: "If evacuation orders are issued, leave immediately and follow designated routes to avoid flooded areas." },
      { title: "Avoid the beach, shorelines, and flooded areas, as high tides and storm surges can produce strong currents and dangerous waves." },
      { title: "Even shallow water can sweep away vehicles; don't attempt to drive through water-covered roads." },
      { title: "High tides can damage or expose electrical lines, so maintain a safe distance from potential hazards." },
      { title: "Floodwaters may contain debris, contaminants, or hidden hazards, so keep everyone away from these areas." },
      { title: "Continue to monitor emergency broadcasts and alerts for any changes in the tide levels or additional warnings." }
    ],
    After: [
      { title: "Ensure it's safe to return to affected areas, as receding tides can leave unstable ground and hidden hazards." },
      { title: "Check for structural damage, electrical issues, or water damage inside your home and around the property." },
      { title: "Floodwaters may still be contaminated or contain debris, making it unsafe to cross." },
      { title: "Any items that came into contact with floodwater, such as food or porous materials, should be discarded to avoid health risks." },
      { title: "Notify authorities if you encounter downed power lines, broken pipes, or damaged roads, as these may pose hazards to the community." },
      { title: "Remove standing water and disinfect surfaces to prevent mold and bacterial growth. Allow belongings to dry thoroughly before reuse." }
    ]
  };

  // Update checkboxes when tab changes
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const handleCheckboxChange = async (tab, index) => {
    const itemKey = `${tab}-${index}`;
    const updatedCheckedItems = [...checkedItems];
    const itemIndex = updatedCheckedItems.findIndex(item => item.key === itemKey);

    if (itemIndex !== -1) {
      updatedCheckedItems.splice(itemIndex, 1);
    } else {
      updatedCheckedItems.push({ key: itemKey, checked: true });
    }

    setCheckedItems(updatedCheckedItems);
    await AsyncStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
  };

  const loadCheckedItems = async () => {
    const storedCheckedItems = await AsyncStorage.getItem('checkedItems');
    if (storedCheckedItems) {
      setCheckedItems(JSON.parse(storedCheckedItems));
    }
  };

  useEffect(() => {
    loadCheckedItems();
  }, []);

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {content[selectedTab].map((item, index) => {
          const itemKey = `${selectedTab}-${index}`;
          const isChecked = checkedItems.some(checkedItem => checkedItem.key === itemKey);

          return (
            <CheckBox
              key={index}
              title={item.title}
              checked={isChecked}
              onPress={() => handleCheckboxChange(selectedTab, index)}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/hightide.jpeg')} style={styles.image}>
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

export default HighTide;

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