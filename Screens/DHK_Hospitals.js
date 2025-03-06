import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Linking, Clipboard } from 'react-native';


// Dhaka General Hospitals
const DHK_hospitals = [
    { name: "Al-Baraka Kidney Hospital", phone: ["+88029350884", "+88029351164"] },
    { name: "Al-Biruni Hospital", phone: ["+880298118905", "+88029115958"] },
    { name: "Al-Manar Hospital", phone: ["+88029121387", "+88029121588"] },
    { name: "Al-Markajul Islamic Hospital", phone: ["+88029129426", "+88029129217"] },
    { name: "Al-Maghraby Eye Hospital", phone: ["+88029135451", "+88028114142"] },
    { name: "Al-Rajhi Hospital (Pvt.) Ltd", phone: ["+88028119229", "+88029117775"] },
    { name: "Al-Raji Hospital Ltd.", address: "Farmgate, Dhaka", phone: ["+88028119229", "+88029117775"] },
    { name: "Anjuman-e-Mofidul Islam", phone: ["+88029336611", "+8802248166", "+8802239808"] },
    { name: "Apollo Hospitals", address: "Plot 81, Block E, Bashundhara R/A, Dhaka - 1229", phone: [] },
    { name: "Aroggaya Niketan", phone: ["+88029333730"] },
    { name: "Aysha Memorial Specialized Hospital", address: "74F/74F Peacock Square, Air Port Road, Mohakhali, Dhaka", phone: ["+88029122689", "+88029131742"] },
    { name: "Bangkok Hospital", phone: ["+88029139777", "+88029134982", "+88028111154"] },
    { name: "BARDEM (Shahbag Avenue)", phone: ["+88028616641", "+88028616650"] },
    { name: "Bangladesh Diabetic Society", phone: ["+88029661551", "+88028616641"] },
    { name: "Bangladesh Diagnostic & Medical Center", phone: ["+88029335838", "+88028322249"] },
    { name: "Bangladesh Medical College", address: "House# 33/35, Road# 14/A, (New) Dhanmondi R/A, Dhaka", phone: ["+88029118202", "+88028115843"] },
    { name: "BDF Hospital", phone: ["+88028113431", "+88028323730"] },
    { name: "BIRDEM", address: "Shahbagh, Dhaka", phone: ["+88029661551", "+88028616641"] },
    { name: "B.N.S. Eye Dhaka", phone: ["+88028014476"] },
    { name: "Central Hospital", address: "House# 2, Road# 5, Green Road, Dhanmondi, Dhaka-1205", phone: ["+88029660015", "+88028619321"] },
    { name: "China-Bangla Hospital", phone: ["+88028913674", "+88028913606"] },
    { name: "China-Bangla (JV) Ltd.", address: "House#15, Shayesta Khan Avenue, Sector# 4, Dhaka", phone: ["+88028913674", "+88028913606"] },
    { name: "Cholera Hospital", phone: ["+8802600171", "+8802600178"] },
    { name: "Christian Medical Hospital", phone: ["+88029886298", "+88028813375"] },
    { name: "City Hospital (Pvt) Ltd.", address: "69/1, Public College Goli, Panthapath, Dhaka", phone: ["+88028617852"] },
    { name: "CMH (Dhaka)", phone: ["+88029871469"] },
    { name: "Compath Clinic", phone: ["+88028617844", "+88029660086", "+8802508651"] },
    { name: "Comfort Diagnostic Centre", phone: ["+88028616045", "+88029660111"] },
    { name: "Cosmopolitan", phone: ["+8802601774"] },
    { name: "Crescent Hospital & Diagnostic Complex Ltd.", address: "22/2 Babar Road, (Opposite of Sohrarwardi Hospital), Mirpur Road, Dhaka", phone: ["+88028119775", "+88029117524"] },
    { name: "Dhaka ENT Hospital", address: "Dhanmondi, Dhaka", phone: ["+88028613936", "+88028617593"] },
    { name: "Dhaka Eye Hospital, BNSB", address: "Mirpur-1, Dhaka", phone: ["+88028014476"] },
    { name: "Dhaka Shishu Hospital", address: "Sher-E-Bangla Nagar, Dhaka-1207", phone: ["+88028116061", "+88028114571"] },
    { name: "Dhaka Medical College", phone: ["+88025001216", "+880250502529"] },
    { name: "Dhaka Monorog Clinic", phone: ["+88029005050"] },
    { name: "Dipham R & S Centre", phone: ["+88028117772-3", "+88029125811"] },
    { name: "Dushtha Shasthya Hospital (D.S.K)", address: "21/1 Khilji Road, Mohammadpur, Dhaka-1207", phone: ["+88028124952"] },
    { name: "Enayet Hospital", phone: ["+8802509313", "+8802509586"] },
    { name: "Fire Service for Ambulance", phone: ["+88029555555", "+88029556666"] },
    { name: "Gana Shasthya Nagar Hospital", address: "House# 14/E, Road# 6, Dhanmondi, Dhaka-1205", phone: ["+88028617208"] },
    { name: "Gene Cure Health Care Ltd.", address: "37 Kemal Ataturk Avenue, Banani, Dhaka-1213", phone: ["+88028853707"] },
    { name: "Green Hospital", address: "House# 31, Road# 6, Dhanmondi, Dhaka", phone: ["+88028612412"] },
    { name: "Gulshan Mother & Child Clinic", phone: ["+88028822738", "+88028812992"] },
    { name: "Heart Hospital", phone: ["+88029801874", "+88029803302"] },
    { name: "Holy Family Red Crescent Hospital", address: "Eskaton, Dhaka", phone: ["+88028311721"] },
    { name: "Hospital for Infection Disease", phone: ["+8802602429"] },
    { name: "ICDDRB", address: "Mohakhali, Dhaka", phone: ["+88028811751"] },
    { name: "ICDDRB (Ambulance)", phone: ["+88028811751"] },
    { name: "ICDDRB (Director)", phone: ["+88028823031"] },
    { name: "IPGMR", phone: ["+88028614545", "+88028614001"] },
    { name: "Islamia Eye Hospital", address: "Farmgate, Dhaka", phone: ["+88028112856", "+88029119315"] },
    { name: "Islami Bank Hospital", phone: ["+88028317090", "+88028321495"] },
    { name: "Ibn Sina Clinic", phone: ["+88028119513"] },
    { name: "Ibn Sina Hospital at Sankar", address: "House #68, Road #15/A, Dhanmondi R/A, Dhaka 1209", phone: ["+88028119513", "+88028113709"] },
    { name: "Ibn Sina Hospital Fouad Al Khatib Unit", address: "2/2, Kallyanpur Bus Stand, Mirpur Road, Dhaka 1207", phone: ["+88029007188", "+88029004317"] },
    { name: "Ibn Sina Diagnostic & Imaging Center", address: "House 48, Road-9/A, Dhanmondi R/A, Dhaka", phone: ["+88029126625", "+88029128835"] },
    { name: "Ibn Sina Medical Imaging Center", address: "House 58, Road-2/A, Dhanmondi R/A, Dhaka", phone: ["+88029663289", "+88029666497"] },
    { name: "Judi Maternity", phone: ["+88029113322"] },
    { name: "Labaid Cardiac Hospital", address: "House # 1, Road # 4, Dhanmondi, Dhaka - 1205", phone: ["+88028610793", "+88029670210"] },
    { name: "Labaid Specialized Hospital", address: "House # 1, Road # 4, Dhanmondi", phone: ["+88028610793", "+88029670210"] },
    { name: "Lion Eye Hospital", phone: ["+88029129127"] },
    { name: "Marks ENT Clinic & General Hospital", address: "Mirpur, Dhaka", phone: ["+88029872241", "+88029871527"] },
    { name: "Maternity Hospital (Azimpur)", phone: ["+8802503329"] },
    { name: "Medi Aid Clinic", phone: ["+88029112076", "+88028118456"] },
    { name: "Medistone Clinic", phone: ["+8802405092"] },
    { name: "Mirpur General Hospital", phone: ["+88029007873", "+88028015444"] },
    { name: "Mitford Hospital", phone: ["+88027319002-6"] },
    { name: "Monowara General Hospital", phone: ["+8802239446", "+8802244717"] },
    { name: "Medinova Medical Services", address: "House# 71/A, Road#5/A, Dhanmondi, Dhaka-1209", phone: ["+88028620353", "+88028618583"] },
    { name: "Modern Clinic of Surgery & Midwifery", address: "Gulshan, Dhaka", phone: ["+88029883948"] },
    { name: "Monowara Hospital (Pvt) Ltd.", address: "Siddheswari, Dhaka", phone: ["+88028318135", "+88028319802"] },
    { name: "National Heart Foundation Hospital", address: "Plot# 7/2, Section# 2, Mirpur, Dhaka", phone: ["+88028010491", "+88028014914"] },
    { name: "National Heart Institute", address: "Shyamoli, Dhaka", phone: ["+88029122560", "+88028114089"] },
    { name: "National Institute of Cardiac Vascular Disease", address: "Sher-E-Bangla Nagar, Dhaka", phone: ["+88029122560"] },
    { name: "National Medical Institute Hospital", phone: ["+8802237300", "+8802233469"] },
    { name: "Nibedita Shishu Hospital Ltd.", address: "Wari, Dhaka", phone: ["+88027119473"] },
    { name: "Orthopedic Hospital", phone: ["+88029112150"] },
    { name: "Paltan Poly Clinic", phone: ["+88029557385"] },
    { name: "Peeriess Diagnostic Treatment Centre", phone: ["+88029550441"] },
    { name: "P.G. Hospital (BSMMU)", address: "Shahbag, Dhaka", phone: ["+88028614001", "+88028614545"] },
    { name: "Railway Hospital", phone: ["+8802409341-9"] },
    { name: "Rajdhani Clinic", phone: ["+8802413525"] },
    { name: "Retina Eye Centre (Clinic)", phone: ["+88029884588", "+88029884566"] },
    { name: "Rusmono Clinic", phone: ["+8802418268", "+8802418205"] },
    { name: "Royal Hospital (Pvt) Ltd.", phone: ["+88028313096"] },
    { name: "Salimullah Medical College Hospital", phone: ["+88027319002-6"] },
    { name: "Samorita Hospital Ltd.", address: "89/1 Panthapath, Dhaka-1215", phone: ["+88029131901", "+88029129971"] },
    { name: "Sclavo Medical Centre", phone: ["+88029351404", "+88028311830", "+8802418409"] },
    { name: "Shahid Suhrawardy Hospital", address: "Sher-E-Bangla Nagar, Dhaka", phone: ["+88029130800", "+88029122560"] },
    { name: "Shahid Suhrawardi Emergency", phone: ["+88029130050"] },
    { name: "Shefa Nursing Home", phone: ["+88029111758"] },
    { name: "Shishu Hospital", phone: ["+88028116061-2", "+88029119119"] },
    { name: "Shumana Clinic", phone: ["+8802245534"] },
    { name: "South Asia Hospital Ltd.", address: "25 Green Road, Panthapath, Dhaka-1205", phone: ["+88028616565", "+88029665852"] },
    { name: "S.P.R.C Hospital", address: "New Eskaton Road, Dhaka", phone: ["+88029339089", "+88029342744"] },
    { name: "Square Hospitals Ltd.", address: "18/F West Panthopath, Dhaka 1205", phone: ["+88028129334", "+88029146248"] },
    { name: "Stone Crash Hospital", address: "Dhanmondi, Dhaka", phone: ["+8802503948", "+88028618388"] },
    { name: "T.B. Hospital", address: "Mohakhali", phone: ["+8802608031-4"] },
    { name: "The Eye Clinic", phone: ["+88029333238"] },
    { name: "Trauma Centre", phone: ["+8802327257", "+88028116969"] },
    { name: "Universal Medical Hospital", address: "Nurer Chala, Beside Kolotan Public School, Notun Bazar, Dhaka", phone: ["+88028813375"] },
    { name: "Uttara Central Hospital", address: "Sector 1, Uttara, Dhaka", phone: ["+88028911551"] },
    { name: "Uttara Heart Centre Pvt. Ltd.", phone: ["+88029118138", "+88028911875"] },
    { name: "Women & Children’s Hospital & Research Centre", phone: ["+88029115458", "+88029121077"] },
    { name: "Yamagata Dhaka Friendship Hospital", phone: ["+88029129354"] },
    { name: "Z.H. Sikder Women's Medical College & Hospital", address: "Monica Estate (Western Side of Dhanmondi), Dhaka-1209", phone: ["+88028115951", "+88028113313"] }
  ];

// Dhaka Dental Hospitals
const dentals = [
    { 
      name: "Adventist Dental Clinic", 
      address: "House-3/A, Road No-94 Gulshan-2, Dhaka, 1212", 
      phone: ["+880288822529"]
    },
    { 
      name: "Aiko Dental Clinic", 
      address: "House # 150, Road # 10, Block -E, Banani, Dhaka 1213", 
      phone: ["+88029885426", "01819249262"]
    },
    { 
      name: "Bangladesh Dental College", 
      address: "Road : 25 old, Dhanmondi, Dhaka", 
      phone: []
    },
    { 
      name: "Bikalpa Specialized Dental Clinic", 
      address: "152/2/A-2 Panthapath, Green Road More, Dhanmondi, Dhaka, 1205", 
      phone: ["+88029120229", "+88029135627"]
    },
    { 
      name: "City Dental College & Hospital", 
      address: "1085/1 Malibagh, Chowdhurypara, Dhaka-1219", 
      phone: ["+88029341662-4", "+88029338470"]
    },
    { 
      name: "Dent Care", 
      address: "House # 35 (2nd floor), Road # 2, Dhanmondi R/A, Dhaka, 1205", 
      phone: ["+88029669197", "0191349537"]
    },
    { 
      name: "Dental Surgery & Orthodontics", 
      address: "103, Elephant Road, (1st Floor), Dhaka, 1205", 
      phone: ["+88028612355"]
    },
    { 
      name: "Euro Asian Dental Care", 
      address: "House # NWF-12B, Road # 55, Gulshan-2, Dhaka, 1212", 
      phone: ["+88029896422", "+88028617834"]
    },
    { 
      name: "Family Dentistry", 
      address: "House # 1, Road # 1, Block-C, Dhaka 1213", 
      phone: ["+88028822527", "+88028811130"]
    },
    { 
      name: "Hohnson’s Place", 
      address: "House # 52, Road # 11, Block # F, Banani, Dhaka", 
      phone: ["+88028822849", "+88028826789", "+8802604415"]
    },
    { 
      name: "Intimate Dental Care", 
      address: "House # 17/1, Road # 3/A, Dhanmondi R/A, Dhaka, 1205", 
      phone: ["+88028612136"]
    },
    { 
      name: "Japan-Bangla Friendship Orthodontic Dental Care", 
      address: "House # 69/E, Road # 6-A, Dhanmondi R/A, Dhaka, 1205", 
      phone: ["+88029135524", "+88028112792"]
    },
    { 
      name: "Khandaker Dental Care", 
      address: "90, New Elephant Road, Dhanmondi, Dhaka, 1205", 
      phone: ["+88028611570"]
    },
    { 
      name: "Md. Nurul Alam Buiyan", 
      address: "Mohuripara, North Agrabad, Chittagong", 
      phone: ["031-501816"]
    },
    { 
      name: "Metropolitan Dental Clinic", 
      address: "43 Sonargaon Road, Hatirpul, Dhaka, 1205", 
      phone: ["+88028625317", "01711335979"]
    },
    { 
      name: "Montys Dental Clinic", 
      address: "43 Sonargaon Road, Hatirpool, Dhaka, 1205", 
      phone: ["+88029661535", "+88028613056"]
    },
    { 
      name: "Opian Dental Care", 
      address: "House # 27, Road # 14A (Old-25), Dhanmondi R/A, Dhaka", 
      phone: ["+88029114531"]
    },
    { 
      name: "Pioneer Dental College & Hospital", 
      address: "111, Malibagh, DIT Road, Dhaka", 
      phone: ["+88029340203", "+88029340204"]
    }
  ];
  

const DHK_Hospitals = () => {
  const [searchGeneral, setSearchGeneral] = useState('');
  const [searchDental, setSearchDental] = useState('');

  const handleMakeCall = (number) => {
    const url = `tel:${number}`;
    Linking.openURL(url).catch(err =>
      console.error('Failed to open dialer:', err)
    );
  };

  const handleCopyNotification = (text) => {
    Clipboard.setString(text);  // Copy text to Clipboard
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Copied to Clipboard!',
      text2: `You can now share: ${text}`,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const filteredGeneralHospitals = DHK_hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchGeneral.toLowerCase()) ||
    (hospital.address && hospital.address.toLowerCase().includes(searchGeneral.toLowerCase()))
  );

  const filteredDentalHospitals = dentals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchDental.toLowerCase()) ||
    (hospital.address && hospital.address.toLowerCase().includes(searchDental.toLowerCase()))
  );

  return (
    <ImageBackground
      source={require('../assets/dashboard.png')} // Ensure correct path
      style={styles.backgroundImage}
    >
        <ImageBackground
            source={require('../assets/blue.jpeg')} 
            style={styles.headerBackground} 
            >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dhaka Hospitals</Text>
            </View>
        </ImageBackground>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for General Hospitals"
        value={searchGeneral}
        onChangeText={text => {
          setSearchGeneral(text);
          setSearchDental('');  // Clear dental search when general search is used
        }}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for Dental Hospitals"
        value={searchDental}
        onChangeText={text => {
          setSearchDental(text);
          setSearchGeneral('');  // Clear general search when dental search is used
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* General Hospitals Section */}
        {searchGeneral && filteredGeneralHospitals.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>General Hospitals</Text>
            {filteredGeneralHospitals.map((hospital, index) => (
              <View
                key={index}
                style={[styles.cardContainer, {
                  backgroundColor: index % 2 === 0 ? 'rgba(210, 245, 245, 1)' : 'rgba(210, 250, 220, 1)'   // Alternating colors
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
            ))}
          </>
        )}
  
        {/* Dental Hospitals Section */}
        {searchDental && filteredDentalHospitals.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Dental Hospitals</Text>
            {filteredDentalHospitals.map((hospital, index) => (
              <View
                key={index}
                style={[styles.cardContainer, {
                  backgroundColor: index % 2 === 0 ? 'rgba(230, 255, 235, 1)' : 'rgba(250, 255, 220, 1)'   // Alternating colors
                }]}
              >
                <Text style={styles.office}>{hospital.name}</Text>
                {hospital.address && (
                  <View style={styles.contactBox}>
                    <Text style={styles.contactLabel}>Address:</Text>
                    <TouchableOpacity
                      onLongPress={() => handleCopyNotification(hospital.address)}
                    >
                      <Text style={styles.contactNumber}>{hospital.address}</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
            ))}
          </>
        )}
  
        {/* No Results Text */}
        {(filteredGeneralHospitals.length === 0 && searchGeneral) && <Text style={styles.noResultsText}>No Results Found</Text>}
        {(filteredDentalHospitals.length === 0 && searchDental) && <Text style={styles.noResultsText}>No Results Found</Text>}
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ImageBackground>
  );
  
};

export default DHK_Hospitals;

const styles = StyleSheet.create({
  headerBackground: {
    width: '95%', 
    height: 81,   
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 17.4,   
    marginBottom: 42,
    marginTop: 10,
    marginHorizontal:20,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: -12, 
    marginBottom: 15,
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
    marginTop: -24,
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
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    marginTop: -22,
    textAlign: 'left',
    letterSpacin: 0.84,
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
