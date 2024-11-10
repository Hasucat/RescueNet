import React from 'react';
import { ScrollView, View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, Clipboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { Linking } from 'react-native';


const BangladeshEmergencies = () => {
  const emergencyContacts = [
    { 
      causeFor: 'Government Helpline Number', 
      numberFor: '109', 
      description: 'Helpline for violence against women and prevention of child marriage', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'Anti-Corruption Helpline', 
      numberFor: '106', 
      description: 'Report corruption incidents to relevant authorities', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'Disaster Early Warning System', 
      numberFor: '1090', 
      description: 'Toll-free IVR system by the Ministry of Disaster Management for early disaster warnings and weather updates', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'National Emergency Hotline', 
      numberFor: '999', 
      description: 'Immediate access to police, fire, and medical services', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'National Hotline', 
      numberFor: '333', 
      description: 'Assistance for social issues, including COVID-19 queries, child marriage, and harassment cases', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'Helpline for Violence Against Women', 
      numberFor: '10921', 
      description: 'Service for victims with links to doctors, counselors, legal experts, and police', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'Government Fire Services', 
      numberFor: '16163 / 02223355555', 
      description: 'Access to emergency fire services across Bangladesh', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'Ain o Salish Kendra (ASK)', 
      numberFor: '01724415677', 
      description: 'Legal assistance, emergency shelter, and mental health support (Available 9 am - 5 pm)', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'Government Legal Aid Helpline', 
      numberFor: '16430', 
      description: 'Toll-free helpline for legal assistance', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'BTRC Customer Complaint Hotline', 
      numberFor: '100', 
      description: '24/7 hotline for telecom service complaints', 
      contactText: 'Make a Call :' 
    },
    { 
      causeFor: 'Drug Control Hotline', 
      numberFor: '01908888888', 
      description: 'Report drug-related issues and access services', 
      contactText: 'Make a Call :' 
    }
  ];

  // Function to copy number to clipboard and show a toast message
  const handleCopyToClipboard = (numberFor) => {
    Clipboard.setString(numberFor); // Copy number to clipboard
    Toast.show({
      type: 'success', // Type of the toast (success, error, info, etc.)
      position: 'bottom', // Position of the toast (top, bottom)
      text1: 'Copied to Clipboard!', // Main message
      text2: `You can now share the number: ${numberFor}`, // Additional message
      visibilityTime: 3000, // Duration in milliseconds for which the toast will be visible
      autoHide: true, // Automatically hides after visibilityTime
    });
  };

  // Function to initiate a call
  const handleMakeCall = (numberFor) => {
    const url = `tel:${numberFor}`;
    Linking.openURL(url).catch((err) => 
      console.error('Failed to open dialer:', err)
    );
  };

  return (
    <ImageBackground
      source={require('../assets/dashboard5.png')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {emergencyContacts.map((contact, index) => (
          <View 
            key={index} 
            style={[
              styles.cardContainer,
              { backgroundColor: index % 2 === 0 ? 'rgba(174, 219, 251, 0.78)' : 'rgba(200, 225, 225, 0.78)' } // Alternate background colors
            ]}
          >
            <Text style={styles.cause}>{contact.causeFor}</Text>
            <View style={styles.contactHeader}>
              <View style={styles.numberBox}>
                <TouchableOpacity onLongPress={() => handleCopyToClipboard(contact.numberFor)}>
                  <Text style={styles.number}>{contact.numberFor}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.phonecallBox}>
                <Text style={styles.contactText}>{contact.contactText}</Text>
                <TouchableOpacity onPress={() => handleMakeCall(contact.numberFor)}>
                  <Image source={require('../assets/phone.gif')} style={styles.phoneIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>{contact.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default BangladeshEmergencies;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    backgroundColor: '#AEDBFB', // Card background color
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 18,
  },
  cause: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 12.6,
    fontWeight: '900',
    fontStyle: 'normal',
    color: 'rgba(1, 87, 102, 1)', // Color for the emergency number
    marginBottom: 15,
    marginTop: -6,
    letterSpacing: 0.39,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.21)',
    padding: 9,
    borderRadius: 10,
  },
  numberBox: {
    backgroundColor: 'transparent',
    width: '100%',
    marginLeft: 3,
    marginRight: 6,
    maxWidth: '57%',
    overflow: 'hidden', // Prevent overflow of text
    textOverflow: 'ellipsis', // Add ellipsis for very long text
  },
  number: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#006D5B', // Color for the Cause Title
    marginLeft: 10,
  },
  phonecallBox: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    width: '40%',
    marginRight: 24,
    backgroundColor: 'transparent',
  },
  contactText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333', // Color for the "Make a Call" text
    marginTop: -3,
  },
  phoneIcon: {
    width: 57,
    height: 57,
    marginTop: 6,
  },
  descriptionBox: {
    backgroundColor: 'rgba(1, 85, 68, 0.57)', // White box for description
    borderRadius: 5,
    padding: 6,
    marginTop: 5,
  },
  description: {
    fontSize: 13.8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // Black text for the description
    letterSpacing: 0.6,
  },
});

