import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Lightning = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkedItems, setCheckedItems] = useState([]);

  // Define content for each tab
  const content = {
    Before: [
      { title: "Identify safe indoor locations and review safety tips with everyone in your household. Stay informed about weather conditions by monitoring alerts." },
      { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, and important documents." },
      { title: "Strengthen windows, doors, and roof, and remove or secure outdoor items that can become hazards." },
      { title: "Know evacuation routes, emergency shelters, and meeting points." },
      { title: "Be aware of areas prone to flooding and secure your home against potential water intrusion." },
      { title: "Prepare for secondary hazards like landslides, storm surges, or power outages." }
    ],
    During: [
      { title: "Go indoors or into a hard-topped vehicle if you hear thunder; remember, if you can hear thunder, you’re close enough to be struck by lightning." },
      { title: "Avoid windows, plumbing, and electrical fixtures as these can conduct electricity." },
      { title: "Don't bathe, shower, or wash dishes during a storm, as water pipes can carry electricity." },
      { title: "Avoid using corded phones or electronics plugged into outlets, as they can conduct lightning." },
      { title: "Lightning can travel through the metal rebar in concrete structures, so stand clear." },
      { title: "Do not take shelter under trees, near poles, or in open fields, as lightning often strikes the tallest point in an area." }
    ],
    After: [
      { title: "Don't leave shelter immediately; wait at least 30 minutes after the last clap of thunder to ensure safety." },
      { title: "If someone has been struck, call emergency services and administer CPR if necessary—lightning strike victims can often be revived with prompt care." },
      { title: "Check your home for any signs of fire or electrical damage; look out for scorch marks or malfunctioning electronics." },
      { title: "Stay clear of any downed lines and report them to the authorities." },
      { title: "Avoid walking through or touching water outdoors, as it may still conduct electricity from any residual storm activity." },
      { title: "Check appliances and reset breakers if needed, but avoid using damaged devices until inspected by a professional." }
    ]
  };

  // Fetch previously saved checked items from AsyncStorage
  const loadCheckedItems = async () => {
    try {
      const savedCheckedItems = await AsyncStorage.getItem('checkedItems');
      if (savedCheckedItems) {
        const parsedItems = JSON.parse(savedCheckedItems);
        setCheckedItems(Array.isArray(parsedItems) ? parsedItems : []);
      }
    } catch (error) {
      console.log('Error loading checked items from AsyncStorage:', error);
    }
  };

  // Save checked items to AsyncStorage
  const saveCheckedItems = async (updatedCheckedItems) => {
    try {
      await AsyncStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
    } catch (error) {
      console.log('Error saving checked items to AsyncStorage:', error);
    }
  };

  // Update the selected tab and fetch the corresponding content
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  // Update the checked state for the checkbox and persist it
  const handleCheckboxToggle = (tab, index) => {
    const newCheckedItems = [...checkedItems];
    const itemIndex = newCheckedItems.findIndex(item => item.tab === tab && item.index === index);
    
    if (itemIndex === -1) {
      newCheckedItems.push({ tab, index, checked: true });
    } else {
      newCheckedItems[itemIndex].checked = !newCheckedItems[itemIndex].checked;
    }

    setCheckedItems(newCheckedItems);
    saveCheckedItems(newCheckedItems); // Save to AsyncStorage
  };

  // Initialize content and load checked items when the component mounts
  useEffect(() => {
    loadCheckedItems();
  }, []);

  // Function to check if a checkbox is checked
  const isChecked = (tab, index) => {
    return Array.isArray(checkedItems) && checkedItems.some(item => item.tab === tab && item.index === index && item.checked);
  };

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {content[selectedTab].map((item, index) => (
          <CheckBox
            key={index}
            title={item.title}
            checked={isChecked(selectedTab, index)}
            onPress={() => handleCheckboxToggle(selectedTab, index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/lightning.jpeg')} style={styles.image}>
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

export default Lightning;

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
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#2f515c',
    marginTop: 5,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#691b38',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#691b38',
  },
  scrollContainer: {
    flex: 1,
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