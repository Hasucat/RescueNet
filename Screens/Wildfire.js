import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wildfire = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkedItems, setCheckedItems] = useState({}); // To store only checked items

  // Define content for each tab
  const content = {
    Before: [
      { title: "Stay informed about fire danger levels by monitoring alerts and warnings from local fire departments and emergency services.", id: 'before_1' },
      { title: "Create a defensible space around your home by clearing dry vegetation, dead leaves, and flammable materials from the yard.", id: 'before_2' },
      { title: "Install fire-resistant roofing, siding, and windows to reduce the risk of fire spread to your home.", id: 'before_3' },
      { title: "Ensure access to water sources like hoses, pools, or water tanks, and ensure fire extinguishers are accessible.", id: 'before_4' },
      { title: "Establish an evacuation plan, including multiple routes to safer areas and designate an emergency meeting point.", id: 'before_5' },
      { title: "Safeguard important documents, such as IDs, insurance policies, and medical records, in a fireproof and waterproof container.", id: 'before_6' }
    ],
    During: [
      { title: "Follow local authorities' instructions and leave as soon as advised.", id: 'during_1' },
      { title: "Use N95 masks if available, and stay indoors with windows and doors shut if not in immediate danger.", id: 'during_2' },
      { title: "Keep the fuel tank full and park in an open space facing out, ready to leave quickly.", id: 'during_3' },
      { title: "Don't Use Indoor Fans or AC. Air systems can pull in smoke from the outside.", id: 'during_4' },
      { title: "Visibility is drastically reduced, so avoid traveling through heavy smoke when possible.", id: 'during_5' },
      { title: "Keep away from fire zones and do not block access for emergency responders.", id: 'during_6' }
    ],
    After: [
      { title: "Look for hazards like fallen power lines, hot spots, or structural damage.", id: 'after_1' },
      { title: "Use masks, gloves, and sturdy shoes while inspecting or cleaning up.", id: 'after_2' },
      { title: "Replenish your emergency kit, and consider upgrades for future preparedness.", id: 'after_3' },
      { title: "Avoid Charred or Fallen Trees. These could be unstable and pose a risk of falling.", id: 'after_4' },
      { title: "Inspect any home equipment or electronics for damage before use and Don't Drink Tap Water; It may be contaminated.", id: 'after_5' },
      { title: "Don't Discard Damaged Belongings Hastily. Some items may be salvageable or required for insurance claims.", id: 'after_6' }
    ]
  };

  useEffect(() => {
    // Load saved checkbox states from AsyncStorage
    const loadCheckedItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem('checkedItems');
        if (savedItems) {
          setCheckedItems(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error('Error loading checked items:', error);
      }
    };
    loadCheckedItems();
  }, []);

  useEffect(() => {
    // Save checked items to AsyncStorage whenever it changes
    const saveCheckedItems = async () => {
      try {
        await AsyncStorage.setItem('checkedItems', JSON.stringify(checkedItems));
      } catch (error) {
        console.error('Error saving checked items:', error);
      }
    };
    saveCheckedItems();
  }, [checkedItems]);

  // Update checkboxes when tab changes
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {content[selectedTab].map((item, index) => (
          <CheckBox
            key={item.id}
            title={item.title}
            checked={checkedItems[item.id] || false} // Check the item if it's in checkedItems
            onPress={() => {
              // Toggle checkbox state
              setCheckedItems(prevCheckedItems => {
                const newCheckedItems = { ...prevCheckedItems };
                if (newCheckedItems[item.id]) {
                  delete newCheckedItems[item.id]; // Uncheck item
                } else {
                  newCheckedItems[item.id] = true; // Check item
                }
                return newCheckedItems;
              });
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/wildfires.jpeg')} style={styles.image}>
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