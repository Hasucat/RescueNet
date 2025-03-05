import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CyberCrime = () => {
  const [selectedTab, setSelectedTab] = useState('Before');
  const [checkboxes, setCheckboxes] = useState([]);
  
  // Define content for each tab
  const content = {
    Before: [
    { title: "Create strong passwords for each account, avoid using personal information, and change them regularly. Consider using a password manager for secure storage.", checked: false },
    { title: "Protect accounts with an extra layer of security by enabling 2FA, especially for sensitive accounts like email, banking, and social media.", checked: false },
    { title: "Regularly update operating systems, antivirus software, and applications to protect against known vulnerabilities.", checked: false },
    { title: "Avoid clicking on suspicious links or downloading attachments from unknown sources to reduce the risk of malware or phishing attacks.", checked: false },
    { title: "Be mindful of the information you share on social media or public websites to reduce the risk of identity theft.", checked: false },
    { title: "Regularly back up important files and data to a secure, external location to avoid data loss in case of a cyber attack.", checked: false }
    ],
    During: [
      { title: "If you suspect a device is compromised, immediately disconnect it from Wi-Fi or any network to prevent further spread.", checked: false },
      { title: "Change passwords for sensitive accounts, starting with email, banking, and any other critical accounts that might be affected.", checked: false },
      { title: "Report cyber crimes, such as identity theft or fraud, to local cyber crime units or law enforcement, providing details about the attack.", checked: false },
      { title: "If financial information may be compromised, contact your bank or credit card provider to monitor for fraudulent transactions.", checked: false },
      { title: "Review security alerts from affected services (e.g., emails or banking apps) and follow any specific guidance provided by the platforms.", checked: false },
      { title: "Don't respond to emails, messages, or calls from the attackers, as engaging may further expose you or validate your information.", checked: false }
    ],
    After: [
      { title: "Use reliable antivirus software to perform a thorough scan of affected devices to detect and remove malware.", checked: false },
      { title: "Update all passwords, enable 2FA on accounts that don't have it, and review recent logins or activity for any suspicious behavior.", checked: false },
      { title: "Keep an eye on bank accounts, credit card statements, and credit reports to catch any signs of identity theft or fraud.", checked: false },
      { title: "If personal information has been compromised, consider reaching out to identity theft protection services for monitoring and support.", checked: false },
      { title: "Learn more about cyber safety practices, and consider sharing information with family or friends to prevent future attacks.", checked: false },
      { title: "Keep records of the attack, including any losses and steps taken for recovery, as these may be needed for insurance claims or law enforcement.", checked: false }
    ]
  };

  // Update checkboxes when tab changes
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    setCheckboxes(content[tab]);
  };

  const handleCheckboxChange = async (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = !newCheckboxes[index].checked;
    setCheckboxes(newCheckboxes);
    await saveCheckboxesToStorage(newCheckboxes);
  };

  // Save the current state of checkboxes to AsyncStorage
  const saveCheckboxesToStorage = async (checkboxesToSave) => {
    try {
      const tabState = checkboxesToSave.map(item => item.checked);
      await AsyncStorage.setItem(selectedTab, JSON.stringify(tabState));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  // Load the state of checkboxes from AsyncStorage
  const loadCheckboxesFromStorage = async (tab) => {
    try {
      const savedState = await AsyncStorage.getItem(tab);
      if (savedState) {
        const checkedItems = JSON.parse(savedState);
        const updatedCheckboxes = content[tab].map((item, index) => ({
          ...item,
          checked: checkedItems[index] || false
        }));
        setCheckboxes(updatedCheckboxes);
      } else {
        setCheckboxes(content[tab]);
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
      setCheckboxes(content[tab]);
    }
  };

  // Load checkboxes on initial render and when tab changes
  useEffect(() => {
    loadCheckboxesFromStorage(selectedTab);
  }, [selectedTab]);

  const renderContent = () => {
    return (
      <View style={styles.checklistContainer}>
        <Text style={styles.sectionTitle}>For Community</Text>
        {checkboxes.map((item, index) => (
          <CheckBox
            key={index}
            title={item.title}
            checked={item.checked}
            onPress={() => handleCheckboxChange(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/cybercrime.jpeg')} style={styles.image}>
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

export default CyberCrime;

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