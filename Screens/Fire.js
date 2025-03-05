import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Fire = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([]);

  const content = {
    Before: [
      { title: "Monitor weather reports, fire danger warnings, and updates from local authorities about potential fire risks.", checked: false },
      { title: "Prepare an emergency kit with water, food, medications, flashlight, batteries, and important documents.", checked: false },
      { title: "Clear brush, dry leaves, and other flammable materials around your home, and create defensible space to prevent fire spread.", checked: false },
      { title: "Know multiple evacuation routes and have a pre-determined meeting point for family members.", checked: false },
      { title: "Check fire alarms, extinguishers, and fire hoses to ensure they are working properly, and educate everyone on fire safety." , checked: false },
      { title: "Create a fire-resistant barrier around your home, including firebreaks and fireproof landscaping." , checked: false }
    ],    
    During: [
      { title: "If there's smoke, crawl close to the ground to avoid inhaling toxic fumes, and exit the building as quickly as possible.", checked: false },
      { title: "Before opening any door, feel it with the back of your hand. If it's hot, don't open it; find another way out.", checked: false },
      { title: "In case of a fire, use stairs instead of elevators, as they may malfunction or open on a floor where fire is present.", checked: false },
      { title: "If safe to do so, close doors as you exit to help contain the fire and slow its spread.", checked: false },
      { title: "Focus solely on getting yourself and others to safety; belongings can be replaced, but lives cannot.", checked: false },
      { title: "Once outside, call emergency services. Provide clear information about the location and scale of the fire.", checked: false }
    ],
    After: [
      { title: "Do not re-enter the building until fire officials declare it safe, as there could be structural damage or lingering hot spots.", checked: false },
      { title: "Seek medical care for anyone who may have inhaled smoke or sustained injuries, as smoke inhalation effects may not be immediately apparent.", checked: false },
      { title: "Take photos or videos of the damage for insurance claims, but avoid disturbing the scene too much.", checked: false },
      { title: "Any food or items exposed to smoke, heat, or chemicals should be disposed of, as they could be unsafe.", checked: false },
      { title: "Hire professionals to assess structural damage, electrical wiring, and plumbing systems, as fire can compromise these areas.", checked: false },
      { title: "Fire events can be traumatic; seek emotional support for yourself or loved ones if needed to help with recovery and healing.", checked: false }
    ]
  };

  useEffect(() => {
    loadCheckboxes();
  }, [selectedTab]);

  const loadCheckboxes = async () => {
    try {
      const storedData = await AsyncStorage.getItem(`checkboxes_${selectedTab}`);
      if (storedData) {
        setCheckboxes(JSON.parse(storedData));
      } else {
        setCheckboxes(content[selectedTab]);
      }
    } catch (error) {
      console.error("Failed to load checkboxes", error);
    }
  };

  const handleCheckboxPress = async (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);

    try {
      await AsyncStorage.setItem(`checkboxes_${selectedTab}`, JSON.stringify(newCheckboxes));
    } catch (error) {
      console.error("Failed to save checkbox state", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/fire.jpeg')} style={styles.image}>
        <TouchableOpacity style={styles.backButton}>
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.tabsContainer}>
        {['Before', 'During', 'After'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.checklistContainer}>
            <Text style={styles.sectionTitle}>For Community</Text>
            {checkboxes.map((item, index) => (
              <CheckBox
                key={index}
                title={item.title}
                checked={item.checked}
                onPress={() => handleCheckboxPress(index)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Fire;

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