import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Linking } from 'react-native';
import Toast from 'react-native-toast-message';

const shelters = [
    {
        shelterSiteName: "14no. Maddha Sonakur Govt. Primary School",
        address: "Kawkhali, Barisal",
        dist: "Pirojpur",
        googleMapLink: "",
        contactNumber: "01717113535"
    },
    {
        shelterSiteName: "Amua Kathalia",
        address: "Amua, P.O: Amua, Thana: Kathalia",
        dist: "Jhalokathi",
        googleMapLink: "https://maps.app.goo.gl/H7SLCB4YG3bwVRgJ7",
        contactNumber: "01711-219790"
    },
    {
        shelterSiteName: "Balipara East Charbaleshwar Government Primary School",
        address: "GX32+FC2 Village: purbo chorboleshwer, post-chondipur hat, Indurkani, Barisal",
        dist: "Pirojpur",
        googleMapLink: "https://g.co/kgs/EY4cpb4",
        contactNumber: ""
    },
    {
        shelterSiteName: "Barguna",
        address: "Krocke, P.O: Barguna, Thana: Barguna",
        dist: "Barguna",
        googleMapLink: "https://maps.app.goo.gl/FRyDYQSAgyK4DhwZ6",
        contactNumber: "01713950025"
    },
    {
        shelterSiteName: "Bashbaria Sitakunda",
        address: "Bashbaria, P.O: Bashbaria, Thana: Sitakunda",
        dist: "Chittagong",
        googleMapLink: "https://maps.app.goo.gl/ht8KnPeJiRX1Ep8v7",
        contactNumber: "01711-710123"
    },
    {
        shelterSiteName: "Betua Chokoria",
        address: "Betua, P.O: Shikdarpara, Thana: Chokoria",
        dist: "Cox’s Bazzar",
        googleMapLink: "https://maps.app.goo.gl/GPKuzeKq1WgxK8J17",
        contactNumber: "01713-602255"
    },
    {
        shelterSiteName: "Bodorpur Government Primary School",
        address: "8QRV+6MG, Indurkani, Barisal",
        dist: "Pirojpur",
        googleMapLink: "https://g.co/kgs/9hvgBFZ",
        contactNumber: ""
    },
    {
        shelterSiteName: "Boilchari Banshkhali",
        address: "Boilchari, P.O: Khan Bahadur Bazzar Boilchari, Thana: Bashkhali",
        dist: "Chittagong",
        googleMapLink: "https://maps.app.goo.gl/27vMW56gWVj4QQpn9",
        contactNumber: "01711-717333"
    },
    {
        shelterSiteName: "Charduani Pathorghata",
        address: "Charduani, P.O: Charduani, Thana: Pathorghata",
        dist: "Barguna",
        googleMapLink: "https://maps.app.goo.gl/t6TaT38gE16nWmQu8",
        contactNumber: "01713-950610"
    },
    {
        shelterSiteName: "Choto Biraljuri Government Primary School",
        address: "H3XG+P42, Z8717, Kawkhali, Bairsal",
        dist: "Pirojpur",
        googleMapLink: "https://g.co/kgs/7pcdUSH",
        contactNumber: ""
    },
    {
        shelterSiteName: "Choto Pathorghata",
        address: "Choto Pathorghata, P.O: Gudabasa, Thana: Pathorghata",
        dist: "Barguna",
        googleMapLink: "https://maps.app.goo.gl/S9LXtyzdUV28Bbdv8",
        contactNumber: "01713-959046"
    },
    {
        shelterSiteName: "Daudpur Chal Pakuria Government Primary School",
        address: "VHQC+3XX, Pirojpur Sadar",
        dist: "Pirojpur",
        googleMapLink: "https://maps.app.goo.gl/NRuufJ9aZMHGEEmL7",
        contactNumber: ""
    },
    {
        shelterSiteName: "Dechuaplang Ramu",
        address: "Dechuaplang, P.O: Raboha, Thana: Ramu",
        dist: "Cox’s Bazzar",
        googleMapLink: "https://maps.app.goo.gl/kpQbBVv2uDQ6eY1SA",
        contactNumber: "01713-605790"
    },
    {
        shelterSiteName: "Galachipa",
        address: "Ratondi, P.O: Galachipa, Thana: Galachipa",
        dist: "Patuakhali",
        googleMapLink: "https://maps.app.goo.gl/eNwG58BzrmnEyJcx6",
        contactNumber: "01713950455"
    },
    {
        shelterSiteName: "Habilashdeep Patia",
        address: "Habilashdeep, P.O: Pachuria, Thana: Patia",
        dist: "Chittagong",
        googleMapLink: "https://maps.app.goo.gl/wPyzghLvAxb1GMkU8",
        contactNumber: "01711-714290"
    },
    {
        shelterSiteName: "Hoglapasha",
        address: "Hoglapasha, P.O: Munsirhat, Thana: Pathorghata",
        dist: "Barguna",
        googleMapLink: "https://maps.app.goo.gl/MaTK48DyGJGqudrt8",
        contactNumber: "01713-962660"
    },
    {
        shelterSiteName: "Jugkhola Muria Government Primary School",
        address: "Pirajpur Pouroshobha, Pirojpur Sadar",
        dist: "Pirojpur",
        googleMapLink: "https://maps.app.goo.gl/xDFMnwrkJdjHDrhi6",
        contactNumber: "01720353800"
    },
    {
        shelterSiteName: "Jaldi Banshkhali",
        address: "Jaldi, P.O: Jaldi, Thana: Banshkhali",
        dist: "Chittagong",
        googleMapLink: "https://maps.app.goo.gl/g7VHgUjJhWBVSFHd7",
        contactNumber: "01711-716757"
    },
    {
        shelterSiteName: "Kabutarkhali Govt. Primary School",
        address: "7XR5+R63, Mathbaria, Barisal",
        dist: "Pirojpur",
        googleMapLink: "https://g.co/kgs/h1K4hvs",
        contactNumber: "01868-774872"
    },
    {
        shelterSiteName: "Kadamtala Barguna",
        address: "Dakhin Itbaria, P.O: Kadamtala Bazar, Thana: Barguna",
        dist: "Barguna",
        googleMapLink: "https://maps.app.goo.gl/uaQDsDkweu61YwhV6",
        contactNumber: "01713950085"
    },
    {
        shelterSiteName: "Kalipur Banshkhali",
        address: "Kalipur, P.O: Ezzatpur, Thana: Banshkhali",
        dist: "Chittagong",
        googleMapLink: "https://maps.app.goo.gl/27vMW56gWVj4QQpn9",
        contactNumber: "01711-715700"
    },
    {
        shelterSiteName: "Karerhat Mirsharai",
        address: "Karerhat, P.O: Karerhat, Thana: Mirsharai",
        dist: "Chittagong",
        googleMapLink: "https://maps.app.goo.gl/PE86V4ysy5w1yzko9",
        contactNumber: "01711-710566"
    },
    {
        shelterSiteName: "Karaibaria Amtoli",
        address: "Karaibaria, P.O: Karaibaria, Thana: Amtoli",
        dist: "Barguna",
        googleMapLink: "https://maps.app.goo.gl/Yn66GAP6ebjz4VKU6",
        contactNumber: "01713963280"
    },
    {
        shelterSiteName: "Keshorota Government Primary School",
        address: "Pirojpur Sadar",
        dist: "Pirojpur",
        googleMapLink: "https://maps.app.goo.gl/q3LS4RhgGJ4bnWow7",
        contactNumber: "01715384239"
    },
    {
        shelterSiteName: "Khutakhali Chokoria",
        address: "Khutakhali, P.O: Khutakhali, Thana: Chokoria",
        dist: "Cox’s Bazzar",
        googleMapLink: "https://maps.app.goo.gl/qDf4pKasfcNVWqR56",
        contactNumber: "01711-713628"
    },
    {
        shelterSiteName: "Mohipur Kalapara",
        address: "Bipinpur, P.O: Mohipur, Thana: Mohipur",
        dist: "Patuakhali",
        googleMapLink: "https://maps.app.goo.gl/JearQgF6PnrVnQTc6",
        contactNumber: "01713950525"
    },
    {
        shelterSiteName: "Nalibander Barguna",
        address: "Nali, P.O: Nalibander, Thana: Barguna",
        dist: "Barguna",
        googleMapLink: "https://maps.app.goo.gl/t35iFtofQBpxHUBd7",
        contactNumber: "01713950575"
    },
    {
        shelterSiteName: "Noli Chorokgachia Government Primary School",
        address: "Mathbaria, Barisal",
        dist: "Pirojpur",
        googleMapLink: "",
        contactNumber: "01321134001"
    },
    {
        shelterSiteName: "Paschim Kolaron Government Primary School",
        address: "Indurkani, Barisal",
        dist: "Pirojpur",
        googleMapLink: "",
        contactNumber: "01321134001"
    },
    {
        shelterSiteName: "Pekua Chokoria",
        address: "Pekua, P.O: Pekua chowmunihony, Thana: Pekua",
        dist: "Cox’s Bazzar",
        googleMapLink: "https://maps.app.goo.gl/HoGUA2FYQpfx9yLX7",
        contactNumber: "01711-716999"
    },
    {
        shelterSiteName: "Saherkhali Mirsharai",
        address: "Saherkhali, P.O: Saherkhali, Thana: Mirsharai",
        dist: "Chittagong",
        googleMapLink: "https://maps.app.goo.gl/qXQMTdc4AYV5VVLW6",
        contactNumber: "01711-714999"
    },
    {
        shelterSiteName: "Sanyasiguna Lalmohon",
        address: "Charfession, P.O: Lalmohon, Thana: Lalmohon",
        dist: "Bhola",
        googleMapLink: "https://maps.app.goo.gl/AqisLEGJu1nZ31GK7",
        contactNumber: "01715150911"
    },
    {
        shelterSiteName: "Sharikkati Kathalia",
        address: "Sharikkati, P.O: Shikdarpara, Thana: Kathalia",
        dist: "Jhalokathi",
        googleMapLink: "https://maps.app.goo.gl/hM3diEi7FJmYvuok7",
        contactNumber: "01721-021825"
    },
    {
        shelterSiteName: "Sonakata Kalapara",
        address: "Sonakata, P.O: Sonakata, Thana: Kalapara",
        dist: "Patuakhali",
        googleMapLink: "https://maps.app.goo.gl/cGkvoGEgEE36mSao9",
        contactNumber: "01713950610"
    }
];


const ShelterContacts = () => {
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredShelters = shelters.filter(shelter =>
        shelter.shelterSiteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shelter.dist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ImageBackground
            source={require('../assets/dashboard5.png')}
            style={styles.backgroundImage}
        >
            <TextInput
                style={styles.searchInput}
                placeholder="Search by shelter site name or district..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredShelters.length > 0 ? (
                    filteredShelters.map((shelter, index) => (
                        <View
                            key={index}
                            style={[
                                styles.cardContainer,
                                { backgroundColor: index % 2 === 0 ? 'rgba(235, 245, 255, 0.8)' : 'rgba(240, 255, 245, 0.8)' }
                            ]}
                        >
                            <Text style={styles.office}>{shelter.shelterSiteName}</Text>
                            
                            <View style={styles.contactBox}>
                                <Text style={styles.contactLabel}>Address:</Text>
                                <TouchableOpacity onPress={() => handleCopyNotification(shelter.address)}>
                                    <Text style={[styles.contactText, !shelter.address ? styles.notAvailableText : null]}>
                                        {shelter.address || "Not currently Available"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.contactBox}>
                                <Text style={styles.contactLabel}>District:</Text>
                                <TouchableOpacity onPress={() => handleCopyNotification(shelter.dist)}>
                                    <Text style={[styles.contactText, !shelter.dist ? styles.notAvailableText : null]}>
                                        {shelter.dist || "Not currently Available"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.contactBox}>
                                <Text style={styles.contactLabel}>Contact:</Text>
                                <TouchableOpacity onPress={() => handleCopyNotification(shelter.contactNumber)}>
                                    <Text style={[styles.contactText, !shelter.contactNumber ? styles.notAvailableText : null]}>
                                        {shelter.contactNumber || "Not currently Available"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.contactBox}>
                                <Text style={styles.contactLabel}>Google Map:</Text>
                                {shelter.googleMapLink ? (
                                    <TouchableOpacity onPress={() => Linking.openURL(shelter.googleMapLink)}>
                                        <Text style={[styles.contactText, { color: '#1e90ff', fontWeight: 700}]}>View on Map</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Text style={[styles.contactText, styles.notAvailableText]}>Not currently Available</Text>
                                )}
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

export default ShelterContacts;

const styles = StyleSheet.create({
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
        margin: 15,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        color: '#333333',
        fontSize: 16,
    },
    cardContainer: {
        width: '90%',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 8,
    },
    office: {
        fontSize: 20.4,
        fontWeight: 'bold',
        color: '#004d4d',
        marginBottom: 18,
    },
    contactBox: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 5,
    },
    contactLabel: {
        fontSize: 13.5,
        color: '#52767d',
        fontWeight: '900',
        letterSpacing: 0.81, 
        lineHeight: 15,
    },
    contactText: {
        fontSize: 12.9,
        color: '#004c5c',
        marginVertical: 3,
        marginLeft: 96,
        fontWeight: '700',
        lineHeight: 18,
    },
    notAvailableText: {
        color: '#659d93',
    },
    noResultsText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 60,
    },
});
