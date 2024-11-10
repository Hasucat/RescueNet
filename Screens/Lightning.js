import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const Lightning = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([
    { title: "Identify safe indoor locations and review safety tips with everyone in your household. Stay informed about weather conditions by monitoring alerts.", checked: false },
    { title: "Bring in any objects that could attract lightning, such as metal tools, bikes, or lawn chairs, to reduce the risk of strikes near the house.", checked: false },
    { title: "Protect your electronics from power surges by unplugging computers, TVs, and appliances.", checked: false },
    { title: "Don't set up campsites or spend time in open areas where tall objects are nearby.", checked: false },
    { title: "Plan to avoid open water or damp ground if lightning is predicted, as water is a strong conductor of electricity.", checked: false },
    { title: "If you live in a high-risk area, consider lightning rods and surge protectors to help divert strikes safely.", checked: false }
  ]);

  // Define content for each tab
  const content = {
    Before: [
      { title: "Identify safe indoor locations and review safety tips with everyone in your household. Stay informed about weather conditions by monitoring alerts.", checked: false },
      { title: "Prepare an emergency kit with food, water, medications, flashlight, batteries, and important documents.", checked: false },
      { title: "Strengthen windows, doors, and roof, and remove or secure outdoor items that can become hazards.", checked: false },
      { title: "Know evacuation routes, emergency shelters, and meeting points.", checked: false },
      { title: "Be aware of areas prone to flooding and secure your home against potential water intrusion.", checked: false },
      { title: "Prepare for secondary hazards like landslides, storm surges, or power outages.", checked: false }
    ],
    During: [
      { title: "Go indoors or into a hard-topped vehicle if you hear thunder; remember, if you can hear thunder, you’re close enough to be struck by lightning.", checked: false },
      { title: "Avoid windows, plumbing, and electrical fixtures as these can conduct electricity.", checked: false },
      { title: "Don't bathe, shower, or wash dishes during a storm, as water pipes can carry electricity.", checked: false },
      { title: "Avoid using corded phones or electronics plugged into outlets, as they can conduct lightning.", checked: false },
      { title: "Lightning can travel through the metal rebar in concrete structures, so stand clear.", checked: false },
      { title: "Do not take shelter under trees, near poles, or in open fields, as lightning often strikes the tallest point in an area.", checked: false }
    ],
    After: [
      { title: "Don't leave shelter immediately; wait at least 30 minutes after the last clap of thunder to ensure safety.", checked: false },
      { title: "If someone has been struck, call emergency services and administer CPR if necessary—lightning strike victims can often be revived with prompt care.", checked: false },
      { title: "Check your home for any signs of fire or electrical damage; look out for scorch marks or malfunctioning electronics.", checked: false },
      { title: "Stay clear of any downed lines and report them to the authorities.", checked: false },
      { title: "Avoid walking through or touching water outdoors, as it may still conduct electricity from any residual storm activity.", checked: false },
      { title: "Check appliances and reset breakers if needed, but avoid using damaged devices until inspected by a professional.", checked: false }
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
      <ImageBackground source={require('../assets/lightning.png')} style={styles.image}>
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
