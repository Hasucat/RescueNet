import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

const ImportantContacts = () => {
  const contacts = [
    { place: 'Motijheel', phone_no: '+880 1234 567890' },
    { place: 'Uttara', phone_no: '+880 1234 567891' },
    { place: 'Chattogram', phone_no: '+880 1234 567892' },
    { place: 'Cox\'s Bazar', phone_no: '+880 1234 567893' },
    { place: 'Khulna', phone_no: '+880 1234 567894' },
    { place: 'Barishal', phone_no: '+880 1234 567895' },
    { place: 'Rajshahi', phone_no: '+880 1234 567896' },
    { place: 'Sylhet', phone_no: '+880 1234 567897' },
    { place: 'Noakhali', phone_no: '+880 1234 567898' },
    { place: 'Patuakhali', phone_no: '+880 1234 567899' },
    { place: 'Barguna', phone_no: '+880 1234 567800' },
    { place: 'Bhola', phone_no: '+880 1234 567801' },
    { place: 'Lakshmipur', phone_no: '+880 1234 567802' },
    { place: 'Chandpur', phone_no: '+880 1234 567803' },
    { place: 'Sirajganj', phone_no: '+880 1234 567804' },
    { place: 'Gaibandha', phone_no: '+880 1234 567805' },
    { place: 'Kurigram', phone_no: '+880 1234 567806' },
    { place: 'Satkhira', phone_no: '+880 1234 567807' },
    { place: 'Bagerhat', phone_no: '+880 1234 567808' },
    { place: 'Jashore', phone_no: '+880 1234 567809' },
    { place: 'Shariatpur', phone_no: '+880 1234 567810' },
    { place: 'Madaripur', phone_no: '+880 1234 567811' },
    { place: 'Pirojpur', phone_no: '+880 1234 567812' },
    { place: 'Kurigram', phone_no: '+880 1234 567813' },
    { place: 'Rangpur', phone_no: '+880 1234 567814' },
    { place: 'Kishoreganj', phone_no: '+880 1234 567815' },
    { place: 'Narail', phone_no: '+880 1234 567816' },
    { place: 'Gopalganj', phone_no: '+880 1234 567817' },
    { place: 'Munshiganj', phone_no: '+880 1234 567818' },
    { place: 'Tangail', phone_no: '+880 1234 567819' }
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('../assets/background.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.cardContainer}>
            <ImageBackground
              source={require('../assets/card_back.png')}
              style={styles.cardBackground}
              resizeMode="cover"
            >
              <ImageBackground
                source={require('../assets/header.jpg')}
                style={styles.headerBackground}
              >
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Emergency Contacts</Text>
                </View>
              </ImageBackground>

              {/* Contacts List */}
              <View style={styles.section}>
                {contacts.map((contact, index) => (
                  <View key={index} style={styles.contactRow}>
                    <Text style={styles.place}>{contact.place}</Text>
                    <Text style={styles.phoneNo}>{contact.phone_no}</Text>
                  </View>
                ))}
              </View>
            </ImageBackground>
          </View>
        </ImageBackground>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ImportantContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30,
  },
  cardBackground: {
    width: '100%',
    height: '104%',
    justifyContent: 'center',
  },
  headerBackground: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  place: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  phoneNo: {
    fontSize: 18,
    color: '#555',
  },
});