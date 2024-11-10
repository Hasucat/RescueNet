import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Hurricane = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Monitor weather reports, warnings, and updates from local authorities about the approaching hurricane.", checked: false },
    { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, important documents, and first aid supplies.", checked: false },
    { title: "Secure windows, doors, and roofs, and remove or secure outdoor items that can become projectiles in high winds.", checked: false },
    { title: "Know evacuation routes, emergency shelters, and meeting points in case of mandatory evacuation.", checked: false },
    { title: "Prepare your home by reinforcing structures and checking for vulnerabilities in windows, doors, and the roof.", checked: false },
    { title: "Fill bathtubs and containers with water for emergency use, as water systems may be affected.", checked: false }
  ]);

  // Define content for each tab
  const content = {
    Before: [
        { title: "Monitor weather reports, warnings, and updates from local authorities about the approaching hurricane.", checked: false },
        { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, important documents, and first aid supplies.", checked: false },
        { title: "Secure windows, doors, and roofs, and remove or secure outdoor items that can become projectiles in high winds.", checked: false },
        { title: "Know evacuation routes, emergency shelters, and meeting points in case of mandatory evacuation.", checked: false },
        { title: "Prepare your home by reinforcing structures and checking for vulnerabilities in windows, doors, and the roof.", checked: false },
        { title: "Fill bathtubs and containers with water for emergency use, as water systems may be affected.", checked: false }
      ],
      During: [
        { title: "Keep a battery-powered radio or phone handy for updates from authorities and emergency instructions.", checked: false },
        { title: "Stay indoors, away from windows, and seek shelter in a safe room or interior space.", checked: false },
        { title: "Evacuate if ordered to do so by authorities, and move to a designated shelter or higher ground if at risk of flooding.", checked: false },
        { title: "Avoid using electrical appliances and stay clear of downed power lines.", checked: false },
        { title: "Stay away from floodwaters, as they can carry debris and be hazardous.", checked: false },
        { title: "Be vigilant for changing weather conditions and follow evacuation instructions if necessary.", checked: false }
      ],
      After: [
        { title: "Continue to listen to official guidance for recovery, safety, and evacuation updates.", checked: false },
        { title: "Ensure you have essential items for recovery, like first aid supplies, food, and water.", checked: false },
        { title: "Inspect your home for damage, including structural issues, roof damage, and flooding, and make temporary repairs if necessary.", checked: false },
        { title: "Follow evacuation orders if necessary, and avoid returning to affected areas until authorities declare them safe.", checked: false },
        { title: "Avoid contact with floodwaters to prevent injury, contamination, or exposure to hazardous materials.", checked: false },
        { title: "Monitor for ongoing risks such as aftershocks, flooding, or additional storms, and follow recovery and safety protocols.", checked: false }
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
