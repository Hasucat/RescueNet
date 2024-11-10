import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Clipboard, Keyboard, ImageBackground } from 'react-native';

const NGOs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const ngos = [
        {
          name: "BRAC",
          contact: [
            "Address: 66, Mohakhali C/A, Dhaka-1212",
            "Tel: 9881265, 8824051"
          ]
        },
        {
          name: "CARITAS-BANGADESH",
          contact: [
            "Address: 2, Outer Circular Road, Shantibagh, Dhaka-1217",
            "GPO Box No: 994",
            "Tel: 8315405-09",
            "Fax: 88028314993",
            "Email: caritasb@citecho.net"
          ]
        },
        {
          name: "CARE",
          contact: [
            "Address: House # 59/A, Road # 7/A, Dhanmondi R/A, Dhaka-1209",
            "Tel: 9112315, 8114207",
            "Fax: 8114183",
            "Email: carehiv@bangla.net",
            "Website: http://www.carebd.org"
          ]
        },
        {
          name: "Center for Human Development",
          contact: [
            "Address: 2nd Fl, C Block, 28/1 Indira Road, Tejgaon, Dhaka, Bangladesh",
            "Tel: +8801190111258",
            "Email: chd@live.com.bd, mail_chd@yahoo.com",
            "Website: http://www.chd.live.com.bd"
          ]
        },
        {
          name: "Centre For Mass Education In Science (CMES)",
          contact: [
            "Address: House # 828, Road # 19(old), Dhanmondi R/A, Dhaka-1209",
            "Tel: 8111898",
            "Fax: 88028013559",
            "Email: cmes@citechco.net"
          ]
        },
        {
          name: "Enfants Du Monde (EDM)",
          contact: [
            "Address: House # 12, Road # 15(New), Dhanmondi R/A, Dhaka - 1209",
            "Tel: 9116943, 8114392, 8114394, 9114133",
            "GPO Box: 986, Dhaka-1000",
            "Fax: 88028112838",
            "Email: edmbd@bdonline.com"
          ]
        },
        {
          name: "Heed Bangladesh",
          contact: [
            "Address: Main Road, Plot: 19, Section: 11, Block – A, Mirpur, Dhaka-1216",
            "PO Box: 5052, New Market, Dhaka-1205",
            "Tel: 8012423, 8012764, 9002690",
            "Email: elgin@dhaka.agni.com"
          ]
        },
        {
          name: "Helen Keller International",
          contact: [
            "Address: House No: 40A, Road No. 14A, Dhanmondi R/A, Dhaka – 1209",
            "PO Box: 6066, Gulshan, Dhaka-1212",
            "Tel: 8114234, 8116156"
          ]
        },
        {
          name: "International Development Enterprises",
          contact: [
            "Address: House # 92/A, Masjid Road, Old DOHS, Banani 1213"
          ]
        },
        {
          name: "International Voluntary Services (IVS)",
          contact: [
            "Address: House# 6/4, Block-F, Lalmatia, Dhaka-1207",
            "Tel: 9112830",
            "Fax: 8117746",
            "Email: maivasban@citechco.net"
          ]
        },
        {
          name: "ISDE Bangladesh",
          contact: [
            "Address: House #339 Road # 14 Block-B Chandgaon R/A, Chittagong-4212, Bangladesh",
            "Tel: +880-31-671727, +880-044333-82351",
            "Fax: +880-31-610774",
            "Email: isdebangladesh@yahoo.com",
            "Website: http://www.isdebd.org"
          ]
        },
        {
          name: "Juba Jibon Unnayan Samity",
          contact: [
            "Address: 48/A, Lake Circus, Kalabagan, Dhaka-1205",
            "Fax: 8113095"
          ]
        },
        {
          name: "Koinonia",
          contact: [
            "Address: Plot# 32, Mollika Housing Society Limited, Section # 7, Mirpur, Dhaka-1216",
            "Tel: 8012145, 8015056",
            "Fax: 8013031",
            "Email: koinonia@bdonline.com"
          ]
        },
        {
          name: "Manabik Shahajya Sangssta (MSS)",
          contact: [
            "Address: 11/16, Iqbal Road, Mohammadpur, Dhaka-1207",
            "Tel: 8123713",
            "Fax: 9120323",
            "Email: manabik@bangla.net"
          ]
        },
        {
          name: "Marie Stopes Clinic Society (MSCS)",
          contact: [
            "Address: 759, Satmasjid Road, Dhanmondi, Dhaka-1209",
            "Tel: 8117673, 9121208",
            "Fax: 8117673",
            "Email: mscs@drik.bgd.tooinet.org"
          ]
        },
        {
          name: "Nari Maitree (NM)",
          contact: [
            "Address: 345/2, East Goran, Dhaka-1219"
          ]
        },
        {
          name: "Nari Unnayan Samity (NMS)",
          contact: [
            "Address: 30/A, Road# 04, sector # 03, Uttara Model Town, Dhaka-1230",
            "Tel: 8912840",
            "Fax: 8914006"
          ]
        },
        {
          name: "NGO Forum For Drinking Water Supply & Sanitation",
          contact: [
            "Address: 4/5, Block-E, Laimatia, Dhaka-1207",
            "Tel: 8119597, 8119599",
            "Fax: 8117924",
            "Email: ngo@bangla.net"
          ]
        },
        {
          name: "Organization For Mothers And Infants (OMI)",
          contact: [
            "Address: 8/12 (1st Floor), Block- B, Lalmatia, Dhaka-1207",
            "Tel: 8115793",
            "Fax: 8113095",
            "Email: imaomi@bdmail.net"
          ]
        },
        {
          name: "Oxfam",
          contact: [
            "Address: House # 157, Road# 12, Block-E, Banani, Dhaka-1213",
            "Tel: 8824440",
            "Fax: 8823572",
            "Email: oxfambd@bangla.net"
          ]
        },
        {
          name: "Proshika",
          contact: [
            "Address: 1/1 GA, Section-2, Mirpur-2, Dhaka-1216",
            "Tel: 8013398, 8015812",
            "Fax: 880-2-8015811"
          ]
        },
        {
          name: "International Urban Planning Organization (IUPO)",
          contact: [
            "Address: 396/1, Monipur, Kazipara, Mirpur-2, Dhaka-1216, Bangladesh",
            "Tel: 0182881956",
            "Email: iupo@post.com",
            "Website: http://www.iupo.org"
          ]
        }
      ];
      
      

    // Filter NGOs based on the search query
    const filteredNGOs = ngos.filter(ngo =>
        ngo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle long press on contact info to show modal
    const handleLongPress = (text) => {
        setSelectedText(text);
        setModalVisible(true);
    };

    const copyToClipboard = () => {
        const contentToCopy = selectedText.split(':')[1]?.trim(); // Extract content after colon
        if (contentToCopy) {
            Clipboard.setString(contentToCopy); // Copy to clipboard
            alert('Text copied to clipboard!');
        }
        setModalVisible(false); // Close modal after copying
    };

    return (
        <ImageBackground source={require('../assets/dashboard5.png')} style={styles.backgroundImage}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by NGO name..."
                            placeholderTextColor="#4a4a4a"
                            onChangeText={text => setSearchQuery(text)}
                            value={searchQuery}
                        />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {filteredNGOs.length > 0 ? (
                            filteredNGOs.map((ngo, index) => (
                                <View 
                                    key={index} 
                                    style={[
                                        styles.ngoContainer,
                                        { backgroundColor: index % 2 === 0 ? 'rgba(173, 216, 245, 0.81)'  // Light ocean blue
                                                                            : 'rgba(200, 250, 250, 0.81)'  // Light sky blue
                                                                            }
                                    ]}
                                >
                                    <View style={styles.ngoHeader}>
                                        <Text style={styles.ngoName}>
                                            {ngo.name}
                                        </Text>
                                    </View>
                                    {ngo.contact.map((info, idx) => (
                                        <TouchableOpacity key={idx} onLongPress={() => handleLongPress(info)}>
                                            <Text style={styles.contactInfo}>• {info}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noResultsText}>
                                No results found.
                            </Text>
                        )}
                    </ScrollView>

                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}>Copy selected text:</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={selectedText}
                                    editable={false} // Make it non-editable but selectable
                                    selectTextOnFocus
                                />
                                <View style={styles.modalActions}>
                                    <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                                        <Text style={styles.buttonText}>Copy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                        <Text style={styles.buttonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

// Styles specific to this component
const styles = {
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.30)', // Slight transparent background to match the container style
        borderRadius: 12,
        padding: 12,
    },
    ngoContainer: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 15,
        marginTop: 6,
        shadowColor: '#00594A',
        shadowOffset: { width: -0.21, height: 3 },
        shadowOpacity: 0.90,
        shadowRadius: 6,
        elevation: 9,
    },
    ngoHeader: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#00594a',
        paddingVertical: 3,
        paddingHorizontal: 9,
        alignSelf: 'center',
        marginBottom: 21,
        width: '87%',
    },
    ngoName: {
        color: '#005a49',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contactInfo: {
        fontSize: 16,
        color: '#333',
    },
    noResultsText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 60,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 7.5,
    },
    modalInput: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    copyButton: {
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#F44336',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
};

export default NGOs;

