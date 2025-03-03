import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, ImageBackground, Modal, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Clipboard } from 'react-native';

const BangladeshDailies = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const dailies = [
        { name: "Ajker Kagaj", contact: ["Phone: 9138245-52", "Website: http://www.ajkerkagoj.com/"] },
        { name: "Al-Mozadded", contact: ["Phone: 9113196, 9111051"] },
        { name: "Amader Shomoy", contact: ["Website: http://www.amadershomoy.com/"] },
        { name: "Amar Desh", contact: ["Website: http://amardeshbd.com/"] },
        { name: "Ananda Bazar", contact: ["Website: http://www.anandabazar.com/"] },
        { name: "Bangla Bazar Patrica", contact: ["Phone: 8813602"] },
        { name: "Bangladesh Observer", contact: ["Phone: 9555105-9", "Website: http://www.bdobserver.com/"] },
        { name: "Bangladesh Protidin", contact: ["Phone: 8321958, 9336436"] },
        { name: "BBC", contact: ["Website: http://www.bbc.co.uk/bengali"] },
        { name: "BDNEWS", contact: ["Website: http://www.bdnews24.com/"] },
        { name: "Bhorer Kagaj", contact: ["Phone: 9673224, 9660164", "Website: http://www.bhorerkagoj.net/"] },
        { name: "BOA", contact: ["Website: http://www.voanews.com/bangla"] },
        { name: "Daily Ajker Janagan", contact: ["Location: Gaibandha District", "Email: mail.badol@gmail.com"] },
        { name: "Daily Destiny", contact: ["Website: http://www.dainikdestiny.com/"] },
        { name: "Daily Dinkal", contact: ["Phone: 9881118, 9882002", "Website: http://www.daily-dinkal.com/"] },
        { name: "Daily Inqilab", contact: ["Phone: 7122771", "Website: http://www.ittefaq.com/"] },
        { name: "Daily Ittefaq", contact: ["Phone: 7122660", "Website: http://www.dailyinqilab.com/"] },
        { name: "Daily Janakantha", contact: ["Phone: 9347790", "Website: http://www.dailyjanakantha.com/"] },
        { name: "Daily Janata", contact: ["Phone: 8311058, 8311068"] },
        { name: "Daily Jugantor", contact: ["Website: http://www.jugantor.com/"] },
        { name: "Daily Manabzamin", contact: ["Phone: 9661122, 9669193", "Website: http://www.manabzamin.net/"] },
        { name: "Daily Nayadegonto", contact: ["Website: http://www.dailynayadiganta.com/"] },
        { name: "Daily Prothom Alo", contact: ["Phone: 8110078-81, 8124732", "Website: http://www.prothom-alo.com/"] },
        { name: "Daily Sangbad", contact: ["Phone: 9558147, 9558160", "Website: http://www.thedailysangbad.com/"] },
        { name: "Daily Sangram", contact: ["Phone: 9346448", "Website: http://www.dailysangram.com/"] },
        { name: "Desh Bangla", contact: ["Website: http://www.dailydeshbangla.com/"] },
        { name: "Dhaka Courier", contact: ["Phone: 8312024"] },
        { name: "Jai Jai Din", contact: ["Website: http://www.jaijaidin.com/"] },
        { name: "Khobarpatra", contact: ["Website: http://www.khabarpatra.net/"] },
        { name: "National Press Club", contact: ["Phone: 9563383, 9563395"] },
        { name: "Shamokal", contact: ["Website: http://www.shamokal.com/"] },
        { name: "Sylhet Protidin", contact: ["Website: http://www.sylhetprotidin.com/"] },
        { name: "The Daily Jugantor", contact: ["Phone: 7102701-5, 7101381", "Website: http://www.jugantor.com/"] },
        { name: "The Daily Manabzamin", contact: ["Phone: 9661122, 9669193", "Website: http://www.manabzamin.net/"] },
        { name: "The Daily Star", contact: ["Phone: 8124944, 8124966", "Website: http://www.thedailystar.net/"] },
        { name: "The Financial Express", contact: ["Phone: 9568158, 9553550-51", "Website: http://www.financialexpress-bd.com/"] },
        { name: "The Independent", contact: ["Phone: 9129938-42", "Website: http://www.independent-bangladesh.com/"] },
        { name: "The New Age", contact: ["Website: http://www.newagebd.com/"] },
        { name: "The New Nation", contact: ["Phone: 7122660", "Website: http://www.nation.ittefaq.com/"] },
        { name: "The News Today", contact: ["Phone: 9355567-8", "Website: http://www.newstoday-bd.com/"] }
    ];
    

    const filteredDailies = dailies.filter(daily =>
        daily.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLongPress = (text) => {
        setSelectedText(text);
        setModalVisible(true);
    };

    const handleTextSelection = (text) => {
        setSelectedText(text);
    };

    const copyToClipboard = () => {
        const contentToCopy = selectedText.split(':')[1]?.trim(); // Extract the content after the colon
        if (contentToCopy) {
            Clipboard.setString(contentToCopy); // Copy the extracted content to the clipboard
            alert('Text copied to clipboard!'); // Optional: Show an alert to confirm
        }
        setModalVisible(false); // Close the modal after copying
    };

    return (
        <ImageBackground source={require('../assets/dashboard.png')} style={styles.backgroundImage}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by daily name..."
                            placeholderTextColor="#4a4a4a"
                            onChangeText={text => setSearchQuery(text)}
                            value={searchQuery}
                        />
                    </View>
                    <ScrollView style={styles.outputContainer}>
                    {filteredDailies.length > 0 ? (
                        filteredDailies.map((daily, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dailyItem,
                                    { backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.78)' : 'rgba(210, 240, 250, 0.78)' }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dailyName,
                                        { color: index % 2 === 0 ? 'rgba(1, 87, 102, 1)' : 'rgba(0, 120, 150, 1)' }
                                    ]}
                                >
                                    {daily.name}
                                </Text>
                                {daily.contact.map((info, idx) => (
                                    <TouchableOpacity key={idx} onLongPress={() => handleLongPress(info)}>
                                        <Text style={styles.dailyInfo}>• {info}</Text>
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
                                {/* Use TextInput for better copying experience */}
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
        backgroundColor: '#fff',
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    outputContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.30)', // Semi-transparent white background with opacity 0.84
        borderRadius: 8, 
        padding: 12,
    },
    dailyItem: {
        marginBottom: 6,
        marginTop: 9,
        padding: 10,
        paddingBottom: 20,
        borderColor: '#403f3f',
        borderWidth: 2,
        borderRadius: 12,
        shadowColor: '#00594A',
        shadowOffset: { width: -0.21, height: 1 },
        shadowOpacity: 0.84,
        shadowRadius: 3,
        elevation: 6,
    },
    dailyName: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: -1.5,
        marginBottom: 9,
    },
    dailyInfo: {
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
    selectedText: {
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
        backgroundColor: '#f44336',
        borderRadius: 8,
        marginHorizontal: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default BangladeshDailies;

