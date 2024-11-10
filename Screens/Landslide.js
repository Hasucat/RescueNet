import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Landslide = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Monitor weather reports, warnings, and updates from local authorities for signs of potential landslides.", checked: false },
        { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, and important documents.", checked: false },
        { title: "Strengthen your home’s foundation and secure outdoor items that may cause hazards during a landslide.", checked: false },
        { title: "Know evacuation routes, emergency shelters, and meeting points in case of landslide risk.", checked: false },
        { title: "Identify areas prone to landslides around your home and stay informed on any geological risks.", checked: false },
        { title: "Prepare for secondary hazards like flooding, power outages, or road blockages from landslides.", checked: false }
      ]);

  // Define content for each tab
  const content = {
    Before: [
        { title: "Monitor weather reports, warnings, and updates from local authorities for signs of potential landslides.", checked: false },
        { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, and important documents.", checked: false },
        { title: "Strengthen your home’s foundation and secure outdoor items that may cause hazards during a landslide.", checked: false },
        { title: "Know evacuation routes, emergency shelters, and meeting points in case of landslide risk.", checked: false },
        { title: "Identify areas prone to landslides around your home and stay informed on any geological risks.", checked: false },
        { title: "Prepare for secondary hazards like flooding, power outages, or road blockages from landslides.", checked: false }
      ],
      During: [
        { title: "Listen to a battery-powered radio or phone for updates on landslide activity and evacuation orders.", checked: false },
        { title: "Have your emergency supplies on hand and use them as needed during the event.", checked: false },
        { title: "Evacuate immediately if ordered to do so by authorities, and seek shelter in a safe location away from potential landslide areas.", checked: false },
        { title: "Stay away from unstable slopes, cliffs, and areas prone to landslides or debris flow.", checked: false },
        { title: "Stay indoors, away from windows, doors, and outer walls, in a safe location.", checked: false },
        { title: "Be vigilant for changing weather conditions, and follow evacuation or safety instructions if needed.", checked: false }
      ],
      After: [
        { title: "Continue to listen to official guidance and updates for recovery and safety instructions.", checked: false },
        { title: "Ensure you have essential items for the recovery period, including first aid supplies, food, and communication devices.", checked: false },
        { title: "Inspect your home for damage, including cracks, flooding, or structural damage caused by the landslide.", checked: false },
        { title: "Follow evacuation instructions if necessary, and avoid returning to affected areas until deemed safe by authorities.", checked: false },
        { title: "Avoid areas with loose debris, unstable slopes, or damaged infrastructure to prevent injury or further damage.", checked: false },
        { title: "Monitor ongoing risks, such as additional landslides, flooding, or aftershocks, and follow safety protocols.", checked: false }
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
      <ImageBackground source={require('../assets/landslide.jpeg')} style={styles.image}>
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

export default Landslide;

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
