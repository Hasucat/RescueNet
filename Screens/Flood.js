import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Flood = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Monitor weather forecasts and flood warnings from local authorities. Sign up for flood alerts, and understand the flood risk in your area.", checked: false },
    { title: "Prepare an emergency kit that includes essential items such as food, water, medications, a first aid kit, flashlight, batteries, and important documents in waterproof bags.", checked: false },
    { title: "If flooding is a risk, elevate electrical appliances, furniture, and other valuables to higher floors. Install sump pumps, check flood barriers, and seal any gaps where water could enter.", checked: false },
    { title: "Know your evacuation routes, and identify safe, elevated places to go in case of flooding. Arrange a meeting point for your family in case you’re separated.", checked: false },
    { title: "Be aware of flood-prone areas and avoid building or storing valuable items in these zones. Understand the flood risks in your community.", checked: false },
    { title: "Be aware of additional risks such as landslides, power outages, or exposure to contaminated water following a flood.", checked: false }
  ]);

  // Define content for each tab
  const content = {
    Before: [
      { title: "Monitor weather forecasts and flood warnings from local authorities. Sign up for flood alerts, and understand the flood risk in your area.onitor weather reports, warnings, and updates from local authorities.", checked: false },
      { title: "Prepare an emergency kit that includes essential items such as food, water, medications, a first aid kit, flashlight, batteries, and important documents in waterproof bags.", checked: false },
      { title: "If flooding is a risk, elevate electrical appliances, furniture, and other valuables to higher floors. Install sump pumps, check flood barriers, and seal any gaps where water could enter.", checked: false },
      { title: "Know your evacuation routes, and identify safe, elevated places to go in case of flooding. Arrange a meeting point for your family in case you’re separated.", checked: false },
      { title: "Be aware of flood-prone areas and avoid building or storing valuable items in these zones. Understand the flood risks in your community.", checked: false },
      { title: "Be aware of additional risks such as landslides, power outages, or exposure to contaminated water following a flood.", checked: false }
    ],
    During: [
      { title: "Stay updated with emergency notifications through a battery-powered radio, phone, or alerts. Listen to evacuation orders and instructions.", checked: false },
      { title: "Keep your emergency kit accessible and use it as needed. Ensure you have enough supplies to last several days.", checked: false },
      { title: "Stay inside and move to higher ground if floodwaters start to rise. Avoid going outside unless absolutely necessary.", checked: false },
      { title: "Evacuate immediately if advised by authorities or if you feel that floodwaters are rising rapidly. Avoid driving through flooded areas.", checked: false },
      { title: "Stay away from floodwaters, as they can be fast-moving and carry dangerous debris, contaminants, and hidden hazards like downed power lines.", checked: false },
      { title: "Watch for rising water levels, collapsing structures, and potential health hazards like waterborne diseases. Follow evacuation or safety instructions as needed.", checked: false }
    ],
    After: [
      { title: "Continue to follow official updates and recovery guidance. Watch out for additional rainfall, rising water, or secondary flooding.", checked: false },
      { title: "Have the essentials ready for recovery, such as first aid supplies, clean drinking water, and food if needed, while you assess the damage and seek assistance.", checked: false },
      { title: "Check your home for water damage, and take photographs for insurance claims. Make temporary repairs to prevent further water intrusion.", checked: false },
      { title: "Follow official instructions for returning to your home or moving to designated shelters for continued safety.", checked: false },
      { title: "Do not walk or drive through flooded areas. Floodwaters can be deeper and more dangerous than they appear. Wait until authorities declare it safe.", checked: false },
      { title: "Continue monitoring for secondary dangers like gas leaks, electrical issues, or mold growth. Follow proper sanitation procedures to avoid infection or contamination from floodwaters.", checked: false }
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
      <ImageBackground source={require('../assets/flood.jpeg')} style={styles.image}>
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
