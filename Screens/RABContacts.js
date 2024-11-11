import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Linking } from 'react-native';
import { Directions } from 'react-native-gesture-handler';

const rabs = [
    {
        office: "RAB HQ",
        assignedFor: ['Any information from all over the country'],
        Tel: '+880-2-8961105',
        Fax: '+880-2-8962884',
        Email: '',
    },
    {
        office: "RAB-1",
        assignedFor: ['Gulshan', 'Badda', 'Cantonment', 'Airport', 'Uttara Thana areas'],
        Tel: ['+880-2-8963419', '+880-2-8963420', '+880-2-8962221'],
        Fax: '+880-2-8963418',
        Email: 'rab1bd@yahoo.com',
    },
    {
        office: "RAB-2",
        assignedFor: ['Ramna', 'Dhanmondi', 'Lalbagh', 'Kotawali', 'Hazaribagh', 'Kamrangichor', 'Thana areas'],
        Tel: ['+880-2-8363764', '+880-2-8363718'],
        Fax: '+880-2-8363763',
        Email: 'rab2bd@yahoo.com',
    },
    {
        office: "RAB-3",
        assignedFor: ['Sutrapur', 'Motijheel', 'Demra', 'Khilgaon', 'Shempur', 'Sabujbagh', 'Sylhet city areas'],
        Tel: ['+880-2-7174687', '+880-821-810333'],
        Fax: '+88-02-7174686',
        Email: 'rab3bd@yahoo.com',
    },
    {
        office: "RAB-4",
        assignedFor: ['Tejgaon', 'Mohammadpur', 'Kafrul', 'Pallabi', 'Mirpur', 'Savar', 'Dhamrai', 'Keranigonj', 'Nawabgonj', 'Dohar Thana areas'],
        Tel: '+880-2-8059254',
        Fax: '+880-2-8059253',
        Email: 'bdrab4@yahoo.com',
    },
    {
        office: "RAB-5",
        assignedFor: ['Rajshahi Divisional area'],
        Tel: '+880-721-750770',
        Fax: '+880-721-750770',
        Email: 'rab5bd@yahoo.com',
    },
    {
        office: "RAB-6",
        assignedFor: ['Khulna Divisional area'],
        Tel: '+880-41-861276',
        Fax: '+880-41-861277',
        Email: 'rab6bd@yahoo.com',
    },
    {
        office: "RAB-7",
        assignedFor: ['Chittagong Divisional area'],
        Tel: '+880-31-800074',
        Fax: '+880-31-80007',
        Email: 'rab7bd@yahoo.com',
    },
    {
        office: "RAB-8",
        assignedFor: ['Barisal Division area', 'Dohar', 'Nobabgonj', 'Dhamrai thana (Dhaka district)', 'Faridpur', 'Soriatpur', 'Madaripur', 'Munshigonj', 'Manikgonj district (11 districts)'],
        Tel: ['+880-831-71778', '+88-0171800442', '+88-0173460808'],
        Fax: '+880-43171774',
        Email: '',
    },
    {
        office: "RAB-9",
        assignedFor: ['Sylhet Division', 'Brahmanbaria', 'Narshindi', 'Kishorgonj', 'Netrokona', 'Mymenshing', 'Gazipur', 'Tangail', 'Jamalpur', 'Sherpur district (13 districts)'],
        Tel: ['+880-821-761446', '+88-011605372'],
        Fax: '+880-821810400',
        Email: '',
    },
    {
        office: "RAB-10",
        assignedFor: ['Demra', 'Shutrapur', 'Shampur', 'Kotoali thana', 'Sodor', 'Bondor', 'Fotulla', 'Shiddirgonj thana of Narayangonj district'],
        Tel: '+880-2-7518674',
        Mobile: '+88-0174088005',
        Fax: '+880-2-7518681',
        Email: '',
    }
];


const RABContacts = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleMakeCall = (number) => {
        const url = `tel:${number}`;
        Linking.openURL(url).catch(err =>
            console.error('Failed to open dialer:', err)
        );
    };

    const handleCopyNotification = (text) => {
        Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Copied to Clipboard!',
            text2: `You can now share: ${text}`,
            visibilityTime: 3000,
            autoHide: true,
        });
    };

    const filteredRABs = rabs.filter(rab =>
        rab.assignedFor.some(area =>
            area.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <ImageBackground
            source={require('../assets/dashboard5.png')}
            style={styles.backgroundImage}
        >
            <TextInput
                style={styles.searchInput}
                placeholder="Search by area like 'Ramna'"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredRABs.length > 0 ? (
                    filteredRABs.map((rab, index) => (
                        <View
                            key={index}
                            style={[
                                styles.cardContainer,
                                { backgroundColor: index % 2 === 0 ? 'rgba(200, 225, 225, 0.8)' : 'rgba(200, 225, 225, 0.8)' }
                            ]}
                        >
                            <Text style={styles.office}>{rab.office}</Text>
    
                            <View style={styles.contactBox}>
                                <Text style={styles.contactLabel}>Telephone:</Text>
                                {Array.isArray(rab.Tel) ? rab.Tel.map((number, i) => (
                                    <View key={i} style={styles.contactWrapper}>
                                        <TouchableOpacity 
                                            onPress={() => handleMakeCall(number)}
                                            onLongPress={() => handleCopyNotification(number)}
                                        >
                                            <Text style={styles.contactNumber}>{number}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )) : (
                                    <TouchableOpacity 
                                        onPress={() => handleMakeCall(rab.Tel)}
                                        onLongPress={() => handleCopyNotification(rab.Tel)}
                                    >
                                        <Text style={styles.contactNumber}>{rab.Tel}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

    
                            <View style={styles.contactBox}>
                                <Text style={styles.contactLabel}>Fax:</Text>
                                <TouchableOpacity 
                                    onPress={() => handleCopyNotification(rab.Fax)}
                                    onLongPress={() => handleCopyNotification(rab.Fax)}
                                >
                                    <Text style={styles.contactNumber}>{rab.Fax}</Text>
                                </TouchableOpacity>
                            </View>
    
                            <View style={styles.contactBox}>
                                <Text style={styles.contactLabel}>Email:</Text>
                                <TouchableOpacity onLongPress={() => handleCopyNotification(rab.Email)}>
                                    <Text style={styles.contactNumber}>{rab.Email || 'Not available'}</Text>
                                </TouchableOpacity>
                            </View>
    
                            <View style={styles.assignBox}>
                                <Text style={styles.assignedForLabel}>Assigned Areas:</Text>
                                <View style={styles.assignedForBox}>
                                    <Text style={styles.assignedAreaText}>
                                        {rab.assignedFor.join(', ')}
                                    </Text>
                                </View>
                            </View>
    
                            <View style={styles.callicon}>
                                <Text style={styles.contactText}>Make  a Call: </Text>
                                <TouchableOpacity onPress={() => handleMakeCall(Array.isArray(rab.Tel) ? rab.Tel[0] : rab.Tel)}>
                                    <Image source={require('../assets/phone.gif')} style={styles.phoneIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : searchQuery ? (
                    <Text style={styles.noResultsText}>No Results Found</Text>
                ) : null}
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </ImageBackground>
    );
    
};

export default RABContacts;



const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#31505e',
    },
    searchInput: {
        width: '90%',
        padding: 10,
        margin: 15,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        color: '#333333',
        fontSize: 16,
        position: 'relative',
    },
    cardContainer: {
        width: '90%',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 24,
        alignItems: 'left',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.84,
        shadowRadius: 6,
        elevation: 18,
    },
    office: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004d4d',
        marginBottom: 15,
        textAlign: 'left',
    },
    contactBox: {
        flexDirection: 'column', // Update to column for vertical stacking
        alignItems: 'flex-start', // Align numbers to the start
        width: '100%',
        marginBottom: 5,
    },
    contactWrapper: {
        marginBottom: 5, // Ensures space between telephone numbers
        flexDirection: 'column',
    },    
    contactLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
    },
    contactNumber: {
        fontSize: 14,
        color: '#004c5c',
        marginTop: 2.5,
        marginBottom: 2.5,
        marginLeft: 60,
        fontWeight: '600',
    },
    assignedFor: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'left',
    },
    assignedForLabel: {
        fontWeight: '900',
        color: '#004c5c',
        alignSelf: 'flex-start', 
        marginLeft: 0, 
        marginBottom: 5, 
    },
    assignBox: {
        marginVertical: 10,
    },
    assignedForBox: {
        backgroundColor: '#004c5c',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 5,
    },
    assignedAreaText: {
        color: '#ffffff',
        fontSize: 14,
        textAlign: 'left',
    },     
    callicon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginTop: 3,
        width: '100%',
        marginTop: 4,
    },
    contactText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333333', // Color for the "Make a Call" text
        position: 'relative',
        left: 12, 
    },
    phoneIcon: {
        width: 40,
        height: 40,
        position: 'relative',
        right: 54,
    },
    noResultsText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '660',
        marginTop: 60,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});

