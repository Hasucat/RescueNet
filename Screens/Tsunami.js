import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Tsunami = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Determine if you live in a tsunami-prone area (coastal regions) and understand the local evacuation routes.", checked: false },
    { title: "Have a kit with essentials like water, food, medications, flashlight, first aid supplies, and important documents.", checked: false },
    { title: "Plan and practice evacuation routes to higher ground or designated tsunami evacuation zones.", checked: false },
    { title: "Elevate appliances and valuables, and secure loose objects that may be swept away in the event of a tsunami.", checked: false },
    { title: "Sign up for tsunami warnings and alerts, and have a way to receive emergency notifications (radio, phone, or app).", checked: false },
    { title: "Be familiar with local tsunami evacuation plans, and communicate your plan with family, friends, and neighbors.", checked: false }
  ]);

  // Define content for each tab
  const content = {
    Before: [
        { title: "Determine if you live in a tsunami-prone area (coastal regions) and understand the local evacuation routes.", checked: false },
        { title: "Have a kit with essentials like water, food, medications, flashlight, first aid supplies, and important documents.", checked: false },
        { title: "Plan and practice evacuation routes to higher ground or designated tsunami evacuation zones.", checked: false },
        { title: "Elevate appliances and valuables, and secure loose objects that may be swept away in the event of a tsunami.", checked: false },
        { title: "Sign up for tsunami warnings and alerts, and have a way to receive emergency notifications (radio, phone, or app).", checked: false },
        { title: "Be familiar with local tsunami evacuation plans, and communicate your plan with family, friends, and neighbors.", checked: false }
      ],
      During: [
        { title: "Move to higher ground immediately if you feel the ground shake or hear a warning.", checked: false },
        { title: "Avoid coastal areas and stay away from water bodies.", checked: false },
        { title: "Follow evacuation routes and evacuate as soon as possible.", checked: false },
        { title: "Stay away from rivers and streams, as tsunami waves can travel up them.", checked: false },
        { title: "Listen for emergency alerts for further instructions and updates.", checked: false },
        { title: "Remain calm and assist others, especially the elderly and children.", checked: false }
      ],
      After: [
        { title: "Stay on high ground until authorities declare it safe to return.", checked: false },
        { title: "Check for injuries and provide first aid as needed.", checked: false },
        { title: "Listen to official announcements for recovery guidance and safety instructions.", checked: false },
        { title: "Avoid flooded areas to prevent contamination and hazards.", checked: false },
        { title: "Inspect your home for structural damage, gas leaks, and electrical hazards.", checked: false },
        { title: "Be prepared for aftershocks or additional waves and remain vigilant for further warnings.", checked: false }
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
      <ImageBackground source={require('../assets/tsunami.jpeg')} style={styles.image}>
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
