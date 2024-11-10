import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Drought = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Monitor weather reports, drought warnings, and updates from local authorities.", checked: false },
        { title: "Prepare an emergency kit with water, food, medications, and important documents.", checked: false },
        { title: "Conserve water in daily activities and educate family members on water-saving techniques.", checked: false },
        { title: "Know alternative water sources and have a plan for water distribution if needed.", checked: false },
        { title: "Secure and protect crops, livestock, and other resources vulnerable to drought conditions.", checked: false },
        { title: "Plan for possible water rationing and understand local emergency plans for drought relief.", checked: false }
      ]);

  // Define content for each tab
  const content = {
    Before: [
        { title: "Monitor weather reports, drought warnings, and updates from local authorities.", checked: false },
        { title: "Prepare an emergency kit with water, food, medications, and important documents.", checked: false },
        { title: "Conserve water in daily activities and educate family members on water-saving techniques.", checked: false },
        { title: "Know alternative water sources and have a plan for water distribution if needed.", checked: false },
        { title: "Secure and protect crops, livestock, and other resources vulnerable to drought conditions.", checked: false },
        { title: "Plan for possible water rationing and understand local emergency plans for drought relief.", checked: false }
      ],
      During: [
        { title: "Keep a battery-powered radio or phone handy for updates on water shortages and drought relief efforts.", checked: false },
        { title: "Have your emergency supplies on hand, including extra water and food as needed.", checked: false },
        { title: "Follow local authorities' water rationing instructions and use water responsibly.", checked: false },
        { title: "Avoid outdoor water usage, such as watering plants or washing vehicles, to conserve water.", checked: false },
        { title: "Stay informed about drought updates, restrictions, and safety advice from authorities.", checked: false },
        { title: "Use alternative water sources if necessary, and reduce consumption to essential needs.", checked: false }
      ],
      After: [
        { title: "Continue to listen to official guidance for recovery, water management, and conservation efforts.", checked: false },
        { title: "Ensure you have essential recovery items, including water, food, and communication devices.", checked: false },
        { title: "Inspect your water resources for contamination and ensure safe water storage.", checked: false },
        { title: "Follow water usage guidelines to support recovery and avoid further strain on water systems.", checked: false },
        { title: "Avoid overuse of water resources to prevent further water shortages.", checked: false },
        { title: "Monitor for ongoing drought impacts, such as water restrictions or crop damage, and follow recovery protocols.", checked: false }
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
      <ImageBackground source={require('../assets/drought.jpeg')} style={styles.image}>
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

export default Drought;

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
