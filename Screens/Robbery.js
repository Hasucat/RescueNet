import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Robbery = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([]); // Initialize with an empty array
  const [checkedItems, setCheckedItems] = useState({}); // Track checked items for optimization

  // Define content for each tab
  const content = {
    Before: [
      { title: "Install high-quality locks, deadbolts, and secure windows. Consider reinforced doors, bars on lower windows, and visible deterrents like security signs." },
      { title: "Install security cameras, alarm systems, and motion detectors, and make sure they’re operational and monitored." },
      { title: "Ensure your property is well-lit, especially entry points. Use motion-sensor lights outside to deter potential robbers." },
      { title: "Keep large amounts of cash or valuables in a safe or a secure location, such as a bank, rather than on your property." },
      { title: "Create a safety plan for what to do in case of a robbery and regularly review it with family members or employees." },
      { title: "Stay vigilant, and report any suspicious activity around your home or workplace to authorities." }
    ],
    During: [
      { title: "Remain calm, avoid sudden movements, and comply with the robber's demands to reduce the risk of escalation." },
      { title: "Avoid direct eye contact to prevent confrontation, but observe details about the robber, such as clothing, height, and distinguishing features." },
      { title: "Physical resistance can increase danger, especially if the robber is armed; focus on personal safety over protecting belongings." },
      { title: "If you have a silent alarm and it's safe to activate it without drawing attention, do so to alert authorities." },
      { title: "Keep communication to a minimum with the robber, only speaking when necessary to avoid provocation." },
      { title: "If possible, note the direction and method of the robber's escape (such as vehicle type and color) to report later." }
    ],
    After: [
      { title: "Once the robber has left and it's safe, call the police immediately to report the incident, providing as many details as possible." },
      { title: "Avoid touching anything that the robber may have touched, as this could compromise evidence." },
      { title: "Share any specific details about the robber's appearance, behavior, and escape route, as well as any accomplices if observed." },
      { title: "If you or anyone else was injured, seek medical help promptly, even if injuries seem minor." },
      { title: "Report the incident to your insurance company if property or valuables were stolen, providing necessary documentation." },
      { title: "Robberies can be traumatic; consider seeking emotional support or counseling for yourself or others involved if needed." }
    ]
  };

  // Function to handle tab change and load checkboxes
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    setCheckboxes(content[tab]);
  };

  // Load the previously checked items from AsyncStorage
  const loadCheckedItems = async () => {
    try {
      const storedCheckedItems = await AsyncStorage.getItem('checkedItems');
      if (storedCheckedItems) {
        setCheckedItems(JSON.parse(storedCheckedItems));
      }
    } catch (error) {
      console.error('Error loading checked items:', error);
    }
  };

  // Save the checked items to AsyncStorage
  const saveCheckedItems = async (updatedCheckedItems) => {
    try {
      await AsyncStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
    } catch (error) {
      console.error('Error saving checked items:', error);
    }
  };

  // Update checked items when a checkbox is toggled
  const handleCheckboxChange = (index) => {
    const newCheckedItems = { ...checkedItems };
    const currentStatus = newCheckedItems[`${selectedTab}-${index}`] || false;
    newCheckedItems[`${selectedTab}-${index}`] = !currentStatus;
    
    setCheckedItems(newCheckedItems);
    saveCheckedItems(newCheckedItems);
  };

  // UseEffect to load the checked items when the component mounts
  useEffect(() => {
    loadCheckedItems();
  }, []);

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {checkboxes.map((item, index) => (
          <CheckBox
            key={index}
            title={item.title}
            checked={checkedItems[`${selectedTab}-${index}`] || false}
            onPress={() => handleCheckboxChange(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/robbery.jpeg')} style={styles.image}>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
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
};

export default Robbery;

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