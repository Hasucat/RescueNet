import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Wildfire = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Ensure everyone in your household knows the evacuation routes, communication plan, and meeting points.", checked: false },
    { title: "Prepare a kit with essentials like water, non-perishable food, first aid supplies, flashlights, and important documents.", checked: false },
    { title: "Clear gutters, roofs, and surroundings of dry leaves and debris. Maintain a defensible space by removing flammable plants and materials.", checked: false },
    { title: "Sign up for emergency alerts from local agencies, and monitor weather conditions and fire risks in your area.", checked: false },
    { title: "Use fire-resistant materials for roofs, windows, and vents. Install smoke detectors and fire extinguishers.", checked: false },
    { title: "Safeguard important documents digitally, such as IDs, insurance, and medical records.", checked: false }
  ]);

  // Define content for each tab
  const content = {
    Before: [
      { title: "Monitor weather reports, warnings, and updates from local authorities.", checked: false },
      { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, and important documents.", checked: false },
      { title: "Strengthen windows, doors, and roof, and remove or secure outdoor items that can become hazards.", checked: false },
      { title: "Know evacuation routes, emergency shelters, and meeting points.", checked: false },
      { title: "Be aware of areas prone to flooding and secure your home against potential water intrusion.", checked: false },
      { title: "Safeguard important documents digitally, such as IDs, insurance, and medical records.", checked: false }
    ],
    During: [
      { title: "Follow local authorities' instructions and leave as soon as advised.", checked: false },
      { title: "Use N95 masks if available, and stay indoors with windows and doors shut if not in immediate danger.", checked: false },
      { title: "Keep the fuel tank full and park in an open space facing out, ready to leave quickly.", checked: false },
      { title: "Don't Use Indoor Fans or AC. Air systems can pull in smoke from the outside.", checked: false },
      { title: "Visibility is drastically reduced, so avoid traveling through heavy smoke when possible.", checked: false },
      { title: "Keep away from fire zones and do not block access for emergency responders.", checked: false }
    ],
    After: [
      { title: "Look for hazards like fallen power lines, hot spots, or structural damage.", checked: false },
      { title: "Use masks, gloves, and sturdy shoes while inspecting or cleaning up.", checked: false },
      { title: "Replenish your emergency kit, and consider upgrades for future preparedness.", checked: false },
      { title: "Avoid Charred or Fallen Trees. These could be unstable and pose a risk of falling.", checked: false },
      { title: "Inspect any home equipment or electronics for damage before use and Don't Drink Tap Water; It may be contaminated.", checked: false },
      { title: "Don't Discard Damaged Belongings Hastily. Some items may be salvageable or required for insurance claims.", checked: false }
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

export default Wildfire;

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
