import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Fire = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Place smoke alarms on every level of your home, especially near bedrooms, and test them monthly. Replace batteries at least once a year.", checked: false },
    { title: "Make sure everyone knows at least two exits from each room and establish a safe meeting point outside.", checked: false },
    { title: "Choose fire-resistant materials for home furnishings and building materials when possible, especially for roofs and exterior walls.", checked: false },
    { title: "Place fire extinguishers in high-risk areas, like the kitchen and garage, and ensure household members know how to use them.", checked: false },
    { title: "Don't plug too many devices into one outlet, and check cords for fraying or wear to prevent electrical fires.", checked: false },
    { title: "Keep fuels, cleaning agents, and other flammable items in a cool, well-ventilated area away from heat sources.", checked: false }
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
      { title: "If there's smoke, crawl close to the ground to avoid inhaling toxic fumes, and exit the building as quickly as possible.", checked: false },
      { title: "Before opening any door, feel it with the back of your hand. If it's hot, don't open it; find another way out.", checked: false },
      { title: "In case of a fire, use stairs instead of elevators, as they may malfunction or open on a floor where fire is present.", checked: false },
      { title: "If safe to do so, close doors as you exit to help contain the fire and slow its spread.", checked: false },
      { title: "Focus solely on getting yourself and others to safety; belongings can be replaced, but lives cannot.", checked: false },
      { title: "Once outside, call emergency services. Provide clear information about the location and scale of the fire.", checked: false }
    ],
    After: [
      { title: "Do not re-enter the building until fire officials declare it safe, as there could be structural damage or lingering hot spots.", checked: false },
      { title: "Seek medical care for anyone who may have inhaled smoke or sustained injuries, as smoke inhalation effects may not be immediately apparent.", checked: false },
      { title: "Take photos or videos of the damage for insurance claims, but avoid disturbing the scene too much.", checked: false },
      { title: "Any food or items exposed to smoke, heat, or chemicals should be disposed of, as they could be unsafe.", checked: false },
      { title: "Hire professionals to assess structural damage, electrical wiring, and plumbing systems, as fire can compromise these areas.", checked: false },
      { title: "Fire events can be traumatic; seek emotional support for yourself or loved ones if needed to help with recovery and healing.", checked: false }
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
      <ImageBackground source={require('../assets/fire.png')} style={styles.image}>
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

export default Fire;

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
