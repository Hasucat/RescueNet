import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Linking, Clipboard } from 'react-native';

const XYZ_hospitals = [
    { name: "Adhunic Sadar Hospital", district: "Feni", phone: ["+880-33174866"] },
    { name: "Baptist Mission", district: "Feni", phone: ["+880-33174176"] },
    { name: "Diabetic Hospital", district: "Feni", phone: ["+880-33174870"] },
    { name: "Feni Medical College Hospital", district: "Feni", phone: ["+880-33173085"] },
    { name: "Meri Stop Clinic", district: "Feni", phone: ["+880-33173380"] },
    { name: "T.B. Clinic", district: "Feni", phone: ["+880-33174137"] },

    { name: "Hospital Enquiry", district: "Cox`s Bazar", phone: ["+880-584"] },

    { name: "I.D Hospital", district: "Sylhet", phone: ["+880-821716602"] },
    { name: "Maternity Hospital", district: "Sylhet", phone: ["+880-821716214"] },
    { name: "Medical College", district: "Sylhet", phone: ["+880-821717055", "+880-821717051"] },
    { name: "Sadar Hospital", district: "Sylhet", phone: ["+880-821717061", "+880-821717062", "+880-821717063", "+880-821717064", "+880-821717065"] },

    { name: "Hospital Enquiry", district: "Faridpur", phone: ["+880-3152"] },
    { name: "Red Crescent Enquiry", district: "Faridpur", phone: ["+880-2539"] },

    { name: "Hospital Enquiry", district: "Kushtia", phone: ["+880-3049"] },

    { name: "Medical College - PABX", district: "Mymensingh", phone: ["+880-5702", "+880-5703", "+880-5704", "+880-5705"] },

    { name: "Red Crescent Hospital", district: "Barisal", phone: ["+880-2343"] },
    { name: "Sadar Hospital Enquiry", district: "Barisal", phone: ["+880-2101"] },

    { name: "Hospital Enquiry", district: "Bogra", phone: ["+880-516333"] },

    { name: "General Hospital", district: "Comilla", phone: ["+880-515022"] },

    { name: "Ad-Deen Hospital", district: "Jessore", phone: ["+880-5172803-6"] },
    { name: "Daratana Hospital", district: "Jessore", phone: ["+880-513812"] },
    { name: "Diabetic Hospital Jessore", district: "Jessore", phone: ["+880-516273"] },
    { name: "Dipa Clinic", district: "Jessore", phone: ["+880-515140"] },
    { name: "Fatima Hospital", district: "Jessore", phone: ["+880-515056"] },
    { name: "Garib Shah Private Hospital", district: "Jessore", phone: ["+880-5172524"] },
    { name: "General Pathology & Diagnostic Centre", district: "Jessore", phone: ["+880-515615"] },
    { name: "Hasina Clinic & Nursing Home", district: "Jessore", phone: ["+880-515737"] },
    { name: "Janaseba Complex & Pathological Laboratory", district: "Jessore", phone: ["+880-513664"] },
    { name: "Jessor Eye Clinic", district: "Jessore", phone: ["+880-515990"] },
    { name: "Mother & Child Health Care", district: "Jessore", phone: ["+880-513138"] },
    { name: "Nova Medical Centre", district: "Jessore", phone: ["+880-5172233"] },
    { name: "P.K.S. Clinic", district: "Jessore", phone: ["+880-515001"] },
    { name: "Police Hospital Jessor", district: "Jessore", phone: ["+880-5176191"] },
    { name: "Prime Diagnostic Complex", district: "Jessore", phone: ["+880-516277"] },
    { name: "Sadar Hospital", district: "Jessore", phone: ["+880-515056"] },
    { name: "T.B. Clinic", district: "Jessore", phone: ["+880-5176779"] },
    { name: "T.B. Hospital Jessore", district: "Jessore", phone: ["+880-516779"] },
    { name: "Unique Diagnostic", district: "Jessore", phone: ["+880-515030"] },
    { name: "Uttara Private Hospital", district: "Jessore", phone: ["+880-516347"] },

    { name: "Hospital", district: "Noakhali", phone: ["+880-3216027"] },
    { name: "T.B Hospital Enquire", district: "Noakhali", phone: ["+880-3215560", "+880-3215220"] },

    { name: "Medical College Enquire", district: "Rajshahi", phone: ["+880-721774354"] },
    { name: "Sadar Hospital", district: "Rajshahi", phone: ["+880-721779155"] },
    { name: "TB Hospital", district: "Rajshahi", phone: ["+880-721779133"] },

    { name: "General Hospital", district: "Dinajpur", phone: ["+880-5314023"] },
    { name: "Police Hospital", district: "Dinajpur", phone: ["+880-5313283"] },

    { name: "Hospital Enquiry", district: "Chandpur", phone: ["+880-8413022"] },

    { name: "General Hospital", district: "Pabna", phone: ["+880-7315077"] },
    { name: "Mental Hospital", district: "Pabna", phone: ["+880-7315581"] },
    { name: "Sadar Hospital Enquire", district: "Pabna", phone: ["+880-7316112"] },
    { name: "T.B Clinic", district: "Pabna", phone: ["+880-7315588"] },

    { name: "Adhunic Hospital", district: "Laxmipur", phone: ["+880-381663"] },
    { name: "Sadar Hospital", district: "Laxmipur", phone: ["+880-381211"] },

    { name: "Medical Emergency", district: "Rangpur", phone: ["+880-5213063"] },
    { name: "Sadar Hospital", district: "Rangpur", phone: ["+880-5213043"] },

    { name: "Hospital Enquiry", district: "Tangail", phone: ["+880-9213038"] },

    { name: "Hospital Enquiry", district: "Rangamati", phone: ["+880-3512220", "+880-3513122"] },

    { name: "B.A.V.S Hospital", district: "Natore", phone: ["+880-7712373"] },
    { name: "Baptist Med Mission Hospital", district: "Natore", phone: ["+880-7712386"] },
    { name: "Diabetic Hospital", district: "Natore", phone: ["+880-7716714"] },
    { name: "Mahmood Clinic", district: "Natore", phone: ["+880-7712778"] },
    { name: "Police Hospital", district: "Natore", phone: ["+880-7716968"] },
    { name: "Sadar Hospital", district: "Natore", phone: ["+880-7716912"] },
    { name: "T.B. Clinic", district: "Natore", phone: ["+880-7712326"] }
];

const XYZ_Hospitals = () => {
  const [search, setSearch] = useState('');

  const handleMakeCall = (number) => {
    const url = `tel:${number}`;
    Linking.openURL(url).catch(err => console.error('Failed to open dialer:', err));
  };

  const handleCopyNotification = (text) => {
    Clipboard.setString(text);
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Copied to Clipboard!',
      text2: `You can now share: ${text}`,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const filteredHospitals = XYZ_hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(search.toLowerCase()) ||
    hospital.district.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <ImageBackground source={require('../assets/dashboard.png')} style={styles.backgroundImage}>
      <ImageBackground source={require('../assets/blue.jpeg')} style={styles.headerBackground}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Other Hospitals</Text>
        </View>
      </ImageBackground>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by 'Hospital name' or 'District name'"
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital, index) => (
            <View
              key={index}
              style={[styles.cardContainer, {
                backgroundColor: index % 2 === 0 ? 'rgba(221, 250, 255, 0.8)' : 'rgba(245, 255, 250, 0.8)'
              }]}
            >
              {/* Hospital Name */}
              <Text style={styles.office}>{hospital.name}</Text>

              {/* District Information */}
              <View style={styles.infoRow}>
                <Text style={styles.DistcontactText}>District:</Text>
                <Text style={styles.contactNumber}>{hospital.district}</Text>
              </View>

              {/* Contact Information */}
              <View style={styles.infoRow}>
                <Text style={styles.contactText}>Telephone:</Text>
                <View style={styles.phoneNumbers}>
                  {hospital.phone.map((number, i) => (
                    <TouchableOpacity key={i} onPress={() => handleMakeCall(number)} onLongPress={() => handleCopyNotification(number)}>
                      <Text style={styles.contactNumber}>{number}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Call Icon */}
              <View style={styles.infoRow}>
                <Text style={styles.contactText}>Make a Call:</Text>
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

export default XYZ_Hospitals;

const styles = StyleSheet.create({
  headerBackground: {
    width: '95%', 
    height: 81,   
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 17.4,  
    marginBottom: 42,
    marginTop: 10,
    marginHorizontal: 20,
  },
  header: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: -13.5, 
    marginBottom: 15,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
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
  },
  searchInput: {
    width: '90%',
    padding: 10,
    marginTop: -12,
    marginBottom: 30,
    margin: 15,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    color: '#333333',
    fontSize: 15,
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
    textAlign: 'center',
  },
  contactBox: {
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 14.1,
    fontWeight: 'bold',
    color: '#00796b',
  },
  contactWrapper: {
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 14,
    color: '#004d4d',
    fontWeight: '800',
    marginLeft: 84
  },
  contactText: {
    fontSize: 14,
    color: '#00796b',
    fontWeight: 'bold',
  },
  DistcontactText: {
    fontSize: 14,
    color: '#00796b',
    fontWeight: 'bold',
    marginTop: 18
  },
  phoneIcon: {
    width: 27,
    height: 27,
    marginLeft: 147
  },
  noResultsText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 60,
  },
  
});
