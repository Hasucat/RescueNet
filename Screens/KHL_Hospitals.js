import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Linking, Clipboard } from 'react-native';

const KHL_hospitals = [
    { name: "Ali Clinic", phone: ["+8803724066"] },
    { name: "Al- Faruq Health Centre", phone: ["+8803732083"] },
    { name: "Arogya Niketan", phone: ["+8803731366"] },
    { name: "Auro Diagnostic Complex", phone: ["+8803731744"] },
    { name: "Basundhara Diagnostic Centre", phone: ["+8803720075"] },
    { name: "Biswas Investigation Centre", phone: ["+8803763648"] },
    { name: "B.N.S.B. Eye Hospital", phone: ["+8803785889"] },
    { name: "City Nursing Home", phone: ["+8803724329"] },
    { name: "Community Eye Hospital", phone: ["+8803725355"] },
    { name: "C.S.S. Eye Hospital", phone: ["+8803731220", "+8803722355"] },
    { name: "C.T Imaging Centre Khulna Ltd.", phone: ["+8803731150"] },
    { name: "Cure Home General Hospital (Pvt) Ltd.", phone: ["+8803723542"] },
    { name: "Diabetic Hospital", phone: ["+8803721966"] },
    { name: "Diarrhoea Hospital", phone: ["+8803722556"] },
    { name: "Doctors Clinic", phone: ["+8803723215"] },
    { name: "Doctors Diagnostic Centre", phone: ["+8803723655"] },
    { name: "Doha Physiotherapy Centre", phone: ["+8803732355"] },
    { name: "Doulatpur Poly Clinic", phone: ["+8803774887"] },
    { name: "Dr. Amanullah Clinic", phone: ["+8803721283"] },
    { name: "Eye Hospital (Rupsha)", phone: ["+8803722355"] },
    { name: "Fair Health Clinic", phone: ["+8803761617"] },
    { name: "Fatema Health Care Centre (Pathology)", phone: ["+8803730265"] },
    { name: "Garib-e-Nawaj Clinic", phone: ["+8803720081", "+8803721784"] },
    { name: "Green Maternity Clinic", phone: ["+8803721016"] },
    { name: "I.D Hospital", phone: ["+8803774716"] },
    { name: "Jamuna Diagnostic Centre", phone: ["+8803760757", "+8803731771"] },
    { name: "Khan-A-Sabur Cancer Hospital & Research Institute", phone: ["+8803760607"] },
    { name: "Khulna Children's Nursing Home", phone: ["+8803723572"] },
    { name: "Khulna Clinic", phone: ["+8803730562"] },
    { name: "Khulna Diagnostic Centre", phone: ["+8803732228"] },
    { name: "Khulna Disabled Hospital", phone: ["+8803761486"] },
    { name: "Khulna Maternity & Health Centre", phone: ["+8803731533"] },
    { name: "Khulna Medical College Emergency", phone: ["+8803761509"] },
    { name: "Khulna Medical College Hospital", phone: ["+8803761531", "+8803761509"] },
    { name: "Khulna Pain Centre", phone: ["+8803720415", "+8803720711"] },
    { name: "Khulna Pangu (Dis-Able) Hospital", phone: ["+8803721019"] },
    { name: "Khulna Police Hospital", phone: ["+8803723505"] },
    { name: "Khulna Sadar Hospital", phone: ["+8803723876", "+8803723433"] },
    { name: "Khulna Sergical Clinic", phone: ["+8803722568", "+8803724450"] },
    { name: "Khulna Surgical & Medical Hospital (Pvt) Ltd.", phone: ["+8803723966", "+8803724450", "+8803722568"] },
    { name: "Khulna Shishu Hospital", phone: ["+8803724275"] },
    { name: "Khulna Skin Care Centre", phone: ["+8803730166"] },
    { name: "Khulna T.B Clinic", phone: ["+8803731105", "+8803761105"] },
    { name: "Khulna T.B Hospital", phone: ["+8803762552", "+8803774552"] },
    { name: "Khalishpur Clinic", phone: ["+8803762109", "+8803761637"] },
    { name: "Kinder Clinic", phone: ["+8803732212", "+8803725552"] },
    { name: "Lab- Tec Diagnostic Centre", phone: ["+8803724246"] },
    { name: "Linda Clinic", phone: ["+8803724066"] },
    { name: "Marie Stopes", phone: ["+8803721902"] },
    { name: "Matri Mangol Clinic", phone: ["+8803721688", "+8803762109"] },
    { name: "Maternity Hospital (Headquarter)", phone: ["+8803722556", "+8803720444"] },
    { name: "Medical College Hospital (Emergency)", phone: ["+8803761509", "+8803761531"] },
    { name: "Medicare Diogonastic Centre", phone: ["+8803722678"] },
    { name: "Mery Stop Clinic", phone: ["+8803731190"] },
    { name: "Metropolitan Clinic", phone: ["+8803723075"] },
    { name: "Mishu Clinic", phone: ["+8803721270"] },
    { name: "Mohanagar Diogonastic Clinic", phone: ["+8803723852"] },
    { name: "Monisha Clinic", phone: ["+8803760977"] },
    { name: "Nabila Clinic", phone: ["+8803730950"] },
    { name: "Nahar Clinic", phone: ["+8803731478", "+8803720740"] },
    { name: "Nargis Memorial Clinic", phone: ["+8803723499", "+8803720379"] },
    { name: "Nazma Clinic", phone: ["+8803725042"] },
    { name: "Niramoy Clinic", phone: ["+8803730220"] },
    { name: "Padma Diagnostic Centre", phone: ["+8803724907"] },
    { name: "Popular Nursing Home", phone: ["+8803761456"] },
    { name: "Pyramid Clinic", phone: ["+8803783238"] },
    { name: "Quior Home", phone: ["+8803723542"] },
    { name: "Railway Hospital", phone: ["+8803723231"] },
    { name: "Raj Surgical Clinic", phone: ["+8803720782"] },
    { name: "Rangdhanu Diagnostic Complex", phone: ["+8803731658"] },
    { name: "Sadar Hospital", phone: ["+8803724525", "+8803720133"] },
    { name: "Samela Memorial Clinic", phone: ["+8803760956"] },
    { name: "Sandhani Diagnostic Complex", phone: ["+8803724819"] },
    { name: "Seba Clinic", phone: ["+8803724267", "+8803724269"] },
    { name: "Sent Martins Pathological Laboratory", phone: ["+8803724065"] },
    { name: "Setu Diagnostic Centre", phone: ["+8803730310"] },
    { name: "Shatadal Clinic", phone: ["+8803724930"] },
    { name: "Shapla Clinic", phone: ["+8803724857"] },
    { name: "Standard Pathology", phone: ["+8803725848"] },
    { name: "St. Martin Pathology", phone: ["+8803724065"] },
    { name: "Sundarban Diagnostic Centre", phone: ["+8803722079"] },
    { name: "Tot Pathology", phone: ["+8803725141"] },
    { name: "Upasam Hospital", phone: ["+8803720778"] },
    { name: "Ultra Diagnostic Complex", phone: ["+8803720600", "+8803722369"] }
  ];
  
  
  const KHL_Hospitals = () => {
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

  const filteredHospitals = KHL_hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <ImageBackground
      source={require('../assets/dashboard.png')}
      style={styles.backgroundImage}
    >
      <ImageBackground
        source={require('../assets/blue.jpeg')} 
        style={styles.headerBackground} 
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Khulna Hospitals</Text>
        </View>
      </ImageBackground>
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
                backgroundColor: index % 2 === 0 ? 'rgba(221, 240, 250, 1)' : 'rgba(200, 238, 215, 1)'
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

export default KHL_Hospitals;

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
    marginLeft: -15.6, 
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
    marginTop: -16,
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