import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Clipboard, Keyboard, ImageBackground } from 'react-native';

const Pharmacy = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const pharmacies = [
        {
            name: "24, Hour Pharmacy",
            contact: [
                "Address: House-14/E, Road-6, Dhanmondi, Dhaka.",
                "Tel: 9673512, 9673507"
            ]
        },
        {
            name: "A Am Store",
            contact: [
                "Address: Shahbagh Biponi Bitan, Dhaka."
            ]
        },
        {
            name: "Day Night Pharmacy",
            contact: [
                "Address: House 30, Road 14A, Dhanmondi, Dhaka."
            ]
        },
        {
            name: "Jonoprio",
            contact: [
                "Address: Shahbagh Biponi Bitan, Dhaka."
            ]
        },
        {
            name: "Lazz Pharma",
            contact: [
                "Address: 64/3, Lake Caircus Kalabagan, Dhaka.",
                "Tel: 9110864, 9117839"
            ]
        },
        {
            name: "Shifa Pharmacy",
            contact: [
                "Address: Alam Market, Gulshan-2, Dhaka.",
                "Tel: 9880820"
            ]
        }
    ];

    // Filter Pharmacies based on the search query
    const filteredPharmacies = pharmacies.filter(pharmacy =>
        pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                            placeholder="Search by Pharmacy name..."
                            placeholderTextColor="#4a4a4a"
                            onChangeText={text => setSearchQuery(text)}
                            value={searchQuery}
                        />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {filteredPharmacies.length > 0 ? (
                            filteredPharmacies.map((pharmacy, index) => (
                                <View 
                                    key={index} 
                                    style={[
                                        styles.bankContainer,
                                        { backgroundColor: index % 2 === 0 ? 'rgba(173, 216, 245, 0.81)'  // Light ocean blue
                                                                            : 'rgba(200, 250, 250, 0.81)'  // Light sky blue
                                                                            }
                                    ]}
                                >
                                    <View style={styles.bankHeader}>
                                        <Text style={styles.bankName}>
                                            {pharmacy.name}
                                        </Text>
                                    </View>
                                    {pharmacy.contact.map((info, idx) => (
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
        backgroundColor: '#31505e',
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
    bankContainer: {
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
    bankHeader: {
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
    bankName: {
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

export default Pharmacy;

