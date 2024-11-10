import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const RoadAccident = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Regularly check and service brakes, tires, lights, and other safety features to reduce the risk of malfunction-related accidents.", checked: false },
    { title: "Ensure everyone in the vehicle is properly buckled up before driving, including in the back seats.", checked: false },
    { title: "Adhering to road regulations and speed limits reduces the risk of accidents, especially in hazardous weather.", checked: false },
    { title: "Refrain from using your phone, eating, or engaging in other distracting activities while driving.", checked: false },
    { title: "Adjust your speed and driving behavior according to current road conditions, like rain or fog.", checked: false },
    { title: "Never drive under the influence of alcohol, drugs, or medication that can impair your judgment or reaction time.", checked: false }
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
      <ImageBackground source={require('../assets/roadacc.png')} style={styles.image}>
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
