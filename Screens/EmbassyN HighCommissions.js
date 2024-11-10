import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, ImageBackground, Modal, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Clipboard } from 'react-native';

const EmbassyN_HighCommissions = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const embassies = [
        {
          name: "Australian High Commission",
          contact: [
            "Address: 184 Gulshan Avenue, Gulshan, Dhaka-1212",
            "Tel: 8813101-5",
            "Fax: 880-2-8811125",
            "Email: dima-dhaka@dfat.gov.au",
            "Website: www.bangladesh.embassy.gov.au"
          ]
        },
        {
          name: "Commission of the European Communities",
          contact: [
            "Address: House # 7, Road # 84, Gulshan, Dhaka - 1212",
            "Tel: 8824730-32, 9862826-32",
            "Fax: 880-2-8823118"
          ]
        },
        {
          name: "Consulate of the Republic of Singapore",
          contact: [
            "Address: House # 15, Road # 68/A, Gulshan - 2, Dhaka - 1212",
            "Tel: 9880404, 9880337",
            "Fax: 880-2-9883666"
          ]
        },
        {
          name: "Embassy of Sweden",
          contact: [
            "Address: House # 1, Road # 52, Gulshan, Dhaka - 1212",
            "Tel: 8824761, 8824762, 8824763, 8824764",
            "Fax: 880-2-8823948"
          ]
        },
        {
          name: "Embassy of Switzerland",
          contact: [
            "Address: House # 31 - B, Road # 18, Banani, Dhaka - 1212",
            "Tel: 8812874, 8812875, 8812876",
            "Fax: 880-2-8823872",
            "Email: vertretung@dha.rep.admin.ch"
          ]
        },
        {
          name: "Embassy of the Arab Republic of Egypt",
          contact: [
            "Address: House No. NE(N) 9, Road No. 9, Gulshan, Dhaka-1212",
            "Tel: 8858737-9",
            "Fax: 880-02-8858747"
          ]
        },
        {
          name: "Embassy of the Democratic People's Republic of Korea",
          contact: [
            "Address: House # 5/A, Road # 54, Gulshan 2, Dhaka-1212",
            "Tel: 8811893-9",
            "Fax: 880-2-8810813"
          ]
        },
        {
          name: "Embassy of the Federal Republic of Germany",
          contact: [
            "Address: 178, Gulshan Avenue, Gulshan, Dhaka-1212",
            "Tel: 8853521-24",
            "Fax: 880-2-8853260"
          ]
        },
        {
          name: "Embassy of the Holy See (Vatican)",
          contact: [
            "Address: United Nations Road No. 2, Baridhara, Dhaka-1212",
            "Tel: 8822018, 8822143",
            "Fax: 880-2-8823574"
          ]
        },
        {
          name: "Embassy of the Islamic Republic of Iran",
          contact: [
            "Address: House # 7, Road # 6, UN Road, Baridhara, Dhaka-1212",
            "Tel: 8825896, 8825948, 9896754",
            "Fax: 880-2-8828780"
          ]
        },
        {
          name: "Embassy of the Islamic State of Afghanistan",
          contact: [
            "Address: House No CWN (C) 2A, Road No. 24, Gulshan, Dhaka-1212",
            "Tel: 9895994, 9895819",
            "Fax: 880-2-9884767"
          ]
        },
        {
          name: "Embassy of the Kingdom of Morocco",
          contact: [
            "Address: House # 44, United Nations Road, Baridhara, Dhaka-1212",
            "Tel: 8823176, 9880329",
            "Fax: 880-2-8810018"
          ]
        },
        {
          name: "Embassy of the Republic of France",
          contact: [
            "Address: Road No. 108, House No. 18, Gulshan, Dhaka-1212",
            "Tel: 8813812-4, 9883851",
            "Fax: 880-2-8823612"
          ]
        },
        {
          name: "Embassy of the Republic of Indonesia",
          contact: [
            "Address: Plot # 14, Road # 53, Gulshan 2, Dhaka-1212",
            "Tel: 9881640-1, 8812260",
            "Fax: 880-2-8825391"
          ]
        },
        {
          name: "Embassy of the Republic of Italy",
          contact: [
            "Address: Plot # 2 & 3, Road # 74/79, Gulshan, Dhaka-1212",
            "Tel: 8822781-3 (PABX), 9882802, 8826359",
            "Fax: 880-2-8822578",
            "Email: ambdhaka@citechco.net"
          ]
        },
        {
          name: "Embassy of the Republic of Poland",
          contact: [
            "Address: House # 12 A, Road # 86, Banani, Dhaka - 1213",
            "Tel: 8825895",
            "Fax: 880-2-8827568"
          ]
        },
        {
          name: "Embassy of the Republic of Korea",
          contact: [
            "Address: 4, Madani Avenue, Baridhara, Dhaka-1212",
            "Tel: 8812088-90, 8812041",
            "Fax: 880-2-8813871"
          ]
        },
        {
          name: "Embassy of the Republic of Philippines",
          contact: [
            "Address: House # 6, Road # 101, Dhaka-1212",
            "Tel: 9881640",
            "Fax: 880-2-9881644"
          ]
        },
        {
          name: "Embassy of the Russian Federation",
          contact: [
            "Address: House # NE(J) 9, Road # 79, Dhaka -1212",
            "Tel: 8828147, 9881680, 9896286",
            "Fax: 880-2-8823735",
            "Email: royak5@hotmail.com"
          ]
        },
        {
          name: "Embassy of the State of Kuwait",
          contact: [
            "Address: House # SE(B) - 5, 25 South Link Road, Gulshan, Dhaka-1212",
            "Tel: 8822700-3",
            "Fax: 880-2-8823753"
          ]
        },
        {
          name: "Embassy of the State of Palestine",
          contact: [
            "Address: House # 15/A, Road # 35, Gulshan, Dhaka-1212",
            "Tel: 9893895-6",
            "Fax: 880-2-8823517"
          ]
        },
        {
          name: "Embassy of the Union of Myanmar",
          contact: [
            "Address: House # NE(L)-3, Road 84, Gulshan, Dhaka-1212",
            "Tel: 9896298, 9896373",
            "Fax: 880-2-8823740"
          ]
        },
        {
          name: "High Commission for the Islamic Republic of Pakistan",
          contact: [
            "Address: House # NE(C) 2, Road # 71, Gulshan, Dhaka-1212",
            "Tel: 8825388-9",
            "Fax: 880-2-8850673"
          ]
        },
        {
          name: "High Commission of Brunei Darussalam",
          contact: [
            "Address: House 26, Road 6, Baridhara, Dhaka-1212",
            "Tel: 8819552, 8813304",
            "Fax: 880-2-8819551"
          ]
        },
        {
          name: "High Commission of India",
          contact: [
            "Address: House # 2, Road # 2, Gulshan-1, Dhaka-1212",
            "Tel: 9888789, 9888791, 8820243-7",
            "Fax: 880-2-9893050, 8817487"
          ]
        },
        {
          name: "High Commission of Malaysia",
          contact: [
            "Address: House # 19, Road # 6, Baridhara, Dhaka-1212",
            "Tel: 8827759-60, 9891651, 9885543",
            "Fax: 880-2-8827761, 8823115"
          ]
        },
        {
          name: "Royal Bhutanese Embassy",
          contact: [
            "Address: House # 12, Road No. 107, Gulshan 2, Dhaka-1212",
            "Tel: 8826863, 8827160, 8821160",
            "Fax: 880-2-8823939"
          ]
        },
        {
          name: "Royal Danish Embassy",
          contact: [
            "Address: House # 1, Road No. 51, Gulshan, Dhaka-1212",
            "Tel: 8822499, 8822599, 8822699, 8821799",
            "Fax: 880-2-8823638",
            "Email: info@danishembassybd.com"
          ]
        },
        {
          name: "Royal Nepalese Embassy",
          contact: [
            "Address: United Nations Road - 2, Baridhara, Dhaka-1212",
            "Tel: 9892568, 9892490",
            "Fax: 880-2-8826401",
            "Email: rnedhaka@bdmail.net"
          ]
        },
        {
          name: "Royal Netherlands Embassy",
          contact: [
            "Address: House # 49, Road # 90, Gulshan, Dhaka-1212",
            "Tel: 8822715-8",
            "Fax: 880-2-8823326",
            "Email: nlgovdha@citechco.net"
          ]
        },
        {
          name: "Royal Norwegian Embassy",
          contact: [
            "Address: Road # 111, House # 9, Gulshan, Dhaka-1212",
            "Tel: 8823880, 8823065, 8816273",
            "Fax: 880-2-8823661"
          ]
        },
        {
          name: "The Canadian High Commission",
          contact: [
            "Address: House No. 16/A, Road No. 48, Gulshan, Dhaka-1212",
            "Tel: 9887091-7",
            "Fax: 88-02-8823043",
            "Email: dhaka@dfait-maeci.gc.ca"
          ]
        },
        {
          name: "The Embassy of the People's Republic of China",
          contact: [
            "Address: Plot No. 2 & 4, Road No. 3, Block-1, Baridhara, Dhaka",
            "Tel: 8824862, 8824164",
            "Visa Section: 8856064",
            "Economic Section: 8823313",
            "Fax: 880-2-8823004, 9880188",
            "Email: chinaemb@bdmail.net"
          ]
        },
        {
          name: "The Embassy of the Republic of Korea",
          contact: [
            "Address: 4, Madani Avenue, Baridhara, Dhaka-1212",
            "Tel: 8812088-90, 8812041",
            "Fax: 880-2-8813871"
          ]
        },
        {
          name: "The Embassy of the Republic of Indonesia",
          contact: [
            "Address: Plot # 14, Road # 53, Gulshan 2, Dhaka-1212",
            "Tel: 9881640-1, 8812260",
            "Fax: 880-2-8825391"
          ]
        },
        {
          name: "The Embassy of the Republic of Korea",
          contact: [
            "Address: 4, Madani Avenue, Baridhara, Dhaka-1212",
            "Tel: 8812088-90, 8812041",
            "Fax: 880-2-8813871"
          ]
        },
        {
          name: "Embassy of the Socialist Republic of Vietnam",
          contact: [
            "Address: House # 8, Road # 51, Gulshan - 2, Dhaka - 1212",
            "Tel: 8854051, 8854052",
            "Fax: 880-2-8854051",
            "Email: vietnam@citech-bd.com"
          ]
        },
        {
          name: "Embassy of the State of Qatar",
          contact: [
            "Address: House # 1, Road # 108, Gulshan, Dhaka - 1212",
            "Tel: 8819930, 9887429",
            "Fax: 880-2-9896071"
          ]
        },
        {
          name: "High Commission of the Democratic Socialist Republic of Sri Lanka",
          contact: [
            "Address: House # 4A, Road # 113, Gulshan, Dhaka - 1212",
            "Tel: 9896353, 8810779",
            "Fax: 880-2-8823971"
          ]
        },
        {
          name: "Royal Embassy of Saudi Arabia",
          contact: [
            "Address: House # 05 (NE) L, Road # 83, Gulshan, Dhaka - 1212",
            "Tel: 8829125, 8829128, 8829129, 8826989",
            "Fax: 880-2-8823616"
          ]
        },
        {
          name: "Royal Thai Embassy",
          contact: [
            "Address: House # 14, Road # 11, Baridhara, Dhaka - 1212",
            "Tel: 8812795, 8812796, 8813260, 8813261",
            "Fax: 880-2-8854280"
          ]
        },
        {
          name: "The Embassy of the Union of Myanmar",
          contact: [
            "Address: House # NE(L)-3, Road 84, Gulshan, Dhaka-1212",
            "Tel: 9896298, 9896373",
            "Fax: 880-2-8823740"
          ]
        },
        {
          name: "The People's Bureau of the Great Socialist People's Libyan Arab Jamahiriya",
          contact: [
            "Address: House # 17, Road # 7, Baridhara, Dhaka-1212",
            "Tel: 9895808-9",
            "Fax: 880-2-8823417"
          ]
        },
      ];
      
    
    // Filter embassies based on the search query
    const filteredEmbassies = embassies.filter(embassy =>
        embassy.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                            placeholder="Search by embassy name..."
                            placeholderTextColor="#4a4a4a"
                            onChangeText={text => setSearchQuery(text)}
                            value={searchQuery}
                        />
                    </View>
                    <ScrollView style={styles.outputContainer}>
                        {filteredEmbassies.length > 0 ? (
                            filteredEmbassies.map((embassy, index) => (
                                <View key={index} style={styles.embassyItem}>
                                    <View style={styles.embassyNameBox}>
                                        <Text style={styles.embassyName}>{embassy.name}</Text>
                                    </View>
                                    {embassy.contact.map((info, idx) => (
                                        <TouchableOpacity key={idx} onLongPress={() => handleLongPress(info)}>
                                            <Text style={styles.embassyInfo}>• {info}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noResults}>No results found.</Text>
                        )}
                    </ScrollView>

                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Copy selected text:</Text>
                                <TextInput
                                    style={styles.selectedTextInput}
                                    value={selectedText}
                                    editable={false} // Make it non-editable but selectable
                                    selectTextOnFocus
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                                        <Text style={styles.buttonText}>Copy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
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

const styles = StyleSheet.create({
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
    outputContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.30)', // Semi-transparent background
        borderRadius: 12,
        padding: 12,
    },
    embassyItem: {
        marginBottom: 6,
        marginTop: 9,
        padding: 10,
        paddingBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.78)', // Semi-transparent background for each embassy item
        borderRadius: 15,
        shadowColor: '#00594A',
        shadowOffset: { width: -0.21, height: 1 },
        shadowOpacity: 0.84,
        shadowRadius: 3,
        elevation: 6,
    },
    embassyNameBox: {
        backgroundColor: '#005a49',  // Background color of the box around the name
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'center',  // Center the box within the card
        marginBottom: 21,
        width: '87%',
    },
    embassyName: {
        color: 'white',  // Text color white
        fontSize: 15,    // Font size
        fontWeight: 'bold',  // Font weight
        textAlign: 'center',  // Center the text inside the box
    },
    embassyInfo: {
        fontSize: 16,
        color: '#333',
    },
    noResults: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20.7,
        fontWeight: 'bold',
        letterSpacing: 0.21,
        marginTop: 60,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
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
    selectedTextInput: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    copyButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        marginHorizontal: 5,
        marginTop: 10,
    },
    cancelButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#F44336',
        borderRadius: 8,
        marginHorizontal: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default EmbassyN_HighCommissions;

