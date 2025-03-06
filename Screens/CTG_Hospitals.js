import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Linking, Clipboard } from 'react-native';

const CTG_hospitals = [
    { name: "C.M.H", phone: ["+880316815519", "+880316188514", "+88031680359"] },
    { name: "CTG Medical College Hospital", phone: ["+880316168915"] },
    { name: "Diabetic Hospital", phone: ["+88031617495"] },
    { name: "Eye Hospital Ctg", phone: ["+88031616625", "+880316157102", "+88031636061"] },
    { name: "Infection Diseases Hospital", phone: ["+88031751733"] },
    { name: "Lions Eye Hospital", phone: ["+88031616652"] },
    { name: "Memon Hospital & Maternity", phone: ["+88031617169"] },
    { name: "Pahartaly Hospital", phone: ["+88031615710"] },
    { name: "Panaroma Hospital", phone: ["+88031619921", "+88031630549"] },
    { name: "Police Hospital", phone: ["+88031616379"] },
    { name: "Port Hospital", phone: ["+880315050219"] },
    { name: "Railway Hospital", phone: ["+8803172012139", "+88031722220"] },
    { name: "Red Cross Maternity Hospital", phone: ["+88031631419", "+88031634545", "+88031636886", "+88031682186"] },
    { name: "Shishu Hospital", phone: ["+88031711236", "+88031720063"] },
    { name: "T.B Hospital (Fauzdar Hat)", phone: ["+88031751444"] },
    { name: "University Hospital", phone: ["+88031659071"] }
];

const CTG_Hospitals = () => {
  const [search, setSearch] = useState('');

  const handleMakeCall = (number) => {
    const url = `tel:${number}`;
    Linking.openURL(url).catch(err =>
      console.error('Failed to open dialer:', err)
    );
  };

  const handleCopyNotification = (text) => {
    Clipboard.setString(text); // Copy text to Clipboard
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Copied to Clipboard!',
      text2: `You can now share: ${text}`,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const filteredHospitals = CTG_hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <ImageBackground
      source={require('../assets/dashboard.png')}
      style={styles.backgroundImage}
    >
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search for Hospitals"
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital, index) => (
            <View
              key={index}
              style={[styles.cardContainer, {
                backgroundColor: index % 2 === 0 ? 'rgba(210, 240, 250, 1)' : 'rgba(230, 238, 215, 1)'
              }]}
            >
              <Text style={styles.office}>{hospital.name}</Text>
              <View style={styles.contactBox}>
                <Text style={styles.contactLabel}>Telephone:</Text>
                {hospital.phone.map((number, i) => (
                  <View key={i} style={styles.contactWrapper}>
                    <TouchableOpacity
                      onPress={() => handleMakeCall(number)}
                      onLongPress={() => handleCopyNotification(number)}
                    >
                      <Text style={styles.contactNumber}>{number}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={styles.callicon}>
                <Text style={styles.contactText}>Make a Call: </Text>
                <TouchableOpacity onPress={() => handleMakeCall(hospital.phone[0])}>
                  <Image source={require('../assets/phn.png')} style={styles.phoneIcon} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>No Results Found</Text>
        )}
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ImageBackground>
  );
};

export default CTG_Hospitals;

const styles = StyleSheet.create({
  headerBackground: {
    width: '95%', 
    height: 81,   
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 17.4,  
    marginBottom: 42,
    marginTop: 10,
    marginHorizontal:20
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: -12, 
    marginBottom: 15
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
    marginTop: -5,
    fontWeight: 'bold',
    marginBottom: -11.7
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 0,
  },
  searchInput: {
    width: '90%',
    padding: 10,
    margin: 15,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    color: '#333333',
    fontSize: 15,
    position: 'relative',
    marginTop: 8,
    marginBottom: 30,
  },
  cardContainer: {
    width: '90%',
    marginBottom: 15,
    borderColor: '#403f3f',
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
  },
  office: {
    fontSize: 17.1,
    fontWeight: '800',
    color: '#004d4d',
    marginBottom: 5,
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 15,
  },
  contactBox: {
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 14.1,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 1.2,
  },
  contactWrapper: {
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 14,
    color: '#004d4d',
    fontWeight: '800',
    marginBottom: 0.6,
    marginLeft: 81,
    width: '63%',
  },
  callicon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#00796b',
    marginRight: 10,
    fontWeight: 'bold',
  },
  phoneIcon: {
    width: 27,
    height: 27,
    marginLeft: 81,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 60,
  },
});
