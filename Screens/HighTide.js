import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const HighTide = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Stay updated on tide schedules and listen for any warnings about unusually high tides or storm surges from local authorities.", checked: false },
    { title: "Have a kit ready with essentials like drinking water, food, flashlights, first aid supplies, and important documents in waterproof containers.", checked: false },
    { title: "Identify higher ground and safe evacuation routes, especially if you live in a flood-prone area. Share the plan with household members.", checked: false },
    { title: "Remove or anchor outdoor furniture, boats, and other loose items that could be carried away by rising waters.", checked: false },
    { title: "If possible, use sandbags or temporary barriers to prevent water from entering lower levels of your home.", checked: false },
    { title: "Consider shutting off gas and electrical power to lower levels of your home if flooding is expected.", checked: false }
  ]);

  // Define content for each tab
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
      { title: "If evacuation orders are issued, leave immediately and follow designated routes to avoid flooded areas.", checked: false },
      { title: "Avoid the beach, shorelines, and flooded areas, as high tides and storm surges can produce strong currents and dangerous waves.", checked: false },
      { title: "Even shallow water can sweep away vehicles; don’t attempt to drive through water-covered roads.", checked: false },
      { title: "High tides can damage or expose electrical lines, so maintain a safe distance from potential hazards.", checked: false },
      { title: "Floodwaters may contain debris, contaminants, or hidden hazards, so keep everyone away from these areas.", checked: false },
      { title: "Continue to monitor emergency broadcasts and alerts for any changes in the tide levels or additional warnings.", checked: false }
    ],
    After: [
      { title: "Ensure it's safe to return to affected areas, as receding tides can leave unstable ground and hidden hazards.", checked: false },
      { title: "Check for structural damage, electrical issues, or water damage inside your home and around the property.", checked: false },
      { title: "Floodwaters may still be contaminated or contain debris, making it unsafe to cross.", checked: false },
      { title: "Any items that came into contact with floodwater, such as food or porous materials, should be discarded to avoid health risks.", checked: false },
      { title: "Notify authorities if you encounter downed power lines, broken pipes, or damaged roads, as these may pose hazards to the community.", checked: false },
      { title: "Remove standing water and disinfect surfaces to prevent mold and bacterial growth. Allow belongings to dry thoroughly before reuse.", checked: false }
    ]
  };

  // Update checkboxes when tab changes
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    setCheckboxes(content[tab]);
  };

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {checkboxes.map((item, index) => (
          <CheckBox
            key={index}
            title={item.title}
            checked={item.checked}
            onPress={() => {
              // Toggle checkbox state
              const newCheckboxes = [...checkboxes];
              newCheckboxes[index].checked = !newCheckboxes[index].checked;
              setCheckboxes(newCheckboxes);
            }}
          />
        ))}
      </View>
    );
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
