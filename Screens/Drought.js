import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drought = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkedItems, setCheckedItems] = useState(new Set()); // Set to store checked item indices

  // Define content for each tab
  const content = {
      Before: [
        { title: "Stay informed by monitoring drought forecasts, water level reports, and updates from local weather authorities." },
        { title: "Create a family emergency plan focusing on water conservation and rationing during drought conditions." },
        { title: "Install water-saving devices like low-flow faucets and rainwater collection systems to reduce water usage." },
        { title: "Identify and secure alternative water sources such as wells, ponds, or water tankers for emergency use." },
        { title: "Protect crops and gardens by using mulch, setting up irrigation systems, and considering drought-resistant plants." },
        { title: "Educate your community on the importance of water conservation and ensure access to local water distribution points." }
      ],    
      During: [
        { title: "Keep a battery-powered radio or phone handy for updates on water shortages and drought relief efforts." },
        { title: "Have your emergency supplies on hand, including extra water and food as needed." },
        { title: "Follow local authorities' water rationing instructions and use water responsibly." },
        { title: "Avoid outdoor water usage, such as watering plants or washing vehicles, to conserve water." },
        { title: "Stay informed about drought updates, restrictions, and safety advice from authorities." },
        { title: "Use alternative water sources if necessary, and reduce consumption to essential needs." }
      ],
      After: [
        { title: "Continue to listen to official guidance for recovery, water management, and conservation efforts." },
        { title: "Ensure you have essential recovery items, including water, food, and communication devices." },
        { title: "Inspect your water resources for contamination and ensure safe water storage." },
        { title: "Follow water usage guidelines to support recovery and avoid further strain on water systems." },
        { title: "Avoid overuse of water resources to prevent further water shortages." },
        { title: "Monitor for ongoing drought impacts, such as water restrictions or crop damage, and follow recovery protocols." }
      ]
  };

  // Function to load saved checkbox states
  const loadCheckboxState = async () => {
    try {
      const storedState = await AsyncStorage.getItem(`checkboxState-${selectedTab}`);
      if (storedState) {
        setCheckedItems(new Set(JSON.parse(storedState))); // Use Set to track checked items
      }
    } catch (error) {
      console.error("Failed to load checkbox state:", error);
    }
  };

  // Function to save checkbox states
  const saveCheckboxState = async () => {
    try {
      await AsyncStorage.setItem(`checkboxState-${selectedTab}`, JSON.stringify([...checkedItems])); // Convert Set to array before saving
    } catch (error) {
      console.error("Failed to save checkbox state:", error);
    }
  };

  useEffect(() => {
    loadCheckboxState();
  }, [selectedTab]);

  useEffect(() => {
    saveCheckboxState();
  }, [checkedItems]); // Save whenever checkedItems change

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {content[selectedTab].map((item, index) => (
          <CheckBox
            key={index}
            title={item.title}
            checked={checkedItems.has(index)} // Check if the index is in the Set of checked items
            onPress={() => {
              const newCheckedItems = new Set(checkedItems); // Create a copy of the Set
              if (newCheckedItems.has(index)) {
                newCheckedItems.delete(index); // Uncheck if it's already checked
              } else {
                newCheckedItems.add(index); // Check if it's not already checked
              }
              setCheckedItems(newCheckedItems);
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