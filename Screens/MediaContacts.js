import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { Linking } from 'react-native';

const mediaContacts = [
    {
        name: "Bangladesh Television",
        contact: [
            "Address: Shamol Bangla Media Ltd. 110 Bir Uttam CR Datta Road, Noor Tower Dhaka -1205",
            "Tel: +88-02-9632030-45",
            "Email: social.bvtv@gmail.com",
            "Website: www.banglavision.tv"
        ]
    },
    {
        name: "NTV",
        contact: [
            "Address: BSEC Building (4th Floor), 102 Kazi Nazrul Islam Avenue, Karwan Bazar, Dhaka-1215",
            "Tel: +88029143381-5",
            "Fax: +88029143386-7"
        ]
    },    
    {
        name: "ATN Bangla",
        contact: [
            "Address: WASA Bhaban, 1st Floor, 98 Kazi Nazrul Islam Avenue, Kawran Bazar, Dhaka-1215, Bangladesh",
            "Tel: +8802-8189630-33, +8802-9139758-60, +8802-880-2-8189634",
            "Email: atn@dhaka.agni.com",
            "Website: www.atnbangla.tv"
        ]
    },
    {
        name: "Channel i",
        contact: [
            "Address: Impress Telefilm Ltd, 39-40, Shohid Tajuddin Ahmed Sarani, Tejgaon I/A, Dhaka 1208, Bangladesh",
            "Email: inews@ssibd.net, channeli@bdcom.com",
            "Tel: +88-02-8891160-65"
        ]
    },
    {
        name: "Somoy TV",
        contact: [
            "Address: Nasir Trade Centre, Level-9, 89, Bir Uttam CR Dutta Road, Dhaka 1205, Bangladesh",
            "Fax: +8802 9670057",
            "Tel: +88029670058",
            "Email: somoydigital@somoynews.tv"
        ]
    },
    {
        name: "Ntv",
        contact: [
            "Address: International Television Channel Ltd, BSEC Bhaban (6th Floor), 102, Kazi Nazrul Islam Avenue, Karwan Bazar, Dhaka-1215, Bangladesh",
            "Tel: +880-2-9143381 -5",
            "Email: info@ntvbd.com",
            "Fax: +880-2-9143386 -6",
            "Website: www.ntvbd.tv"
        ]
    },
    {
        name: "Banglavision",
        contact: [
            "Address: Shamol Bangla Media Ltd, Noor Tower, I/F, Free School Street, 110, Bir Uttam CR Datta Road,Dhaka-1205",
            "Email: newsroom@banglavision.tv",
            "Tel: +880-02-9632030-45",
            "Fax: +880-2-8653173",
            "Website: www.banglavision.tv"
        ]
    },
    {
        name: "Desh TV",
        contact: [
            "Address: Desh Television Limited, Karnaphuli Media Point, 70, Shahid Shangbadik Selina Parvin Sarak, West Malibagh, Mouchak, Dhaka-1217",
            "Email: web@desh.tv",
            "Tel: +880-2-8332958, +880-2-8332922",
            "Website: www.desh.tv"
        ]
    },
    {
        name: "Gazi TV",
        contact: [
            "Address: UCEP Cheyne Tower, 25 Shegun Bagicha, Dhaka- 1000, Bangladesh",
            "Tel: 02-8391021-5",
            "Website: http://www.gazitv.com"
        ]
    },
    {
        name: "Independent TV",
        contact: [
            "Address: Plot-140, 150 Tejgaon Industrial Area, Dhaka-1208",
            "Tel: 8879000",
            "Fax: 8879002",
            "Email: info@independent24.com"
        ]
    },
    {
        name: "Maasranga Television",
        contact: [
            "Address: 2 Bir Uttam Ziaur Rahman Road, Banani, Dhaka 1213",
            "Tel: 8815877",
            "Email: info@maasranga.tv",
            "Fax: 8715992"
        ]
    },
    {
        name: "Mohona Television",
        contact: [
            "Address: House # 08, Road # 04, Section # 7, Pallabi, Mirpur, Dhaka-1205",
            "Tel: 9005496",
            "Fax: 9011799, 9016595",
            "Email: info@mohonatv.com"
        ]
    },
    {
        name: "Asian TV",
        contact: [
            "Address: House # 60, Block # A, Road # 1, Niketon, Gulshan-1, Dhaka, Bangladesh",
            "Tel: +88 02 9852960-4",
            "Fax: 9852964",
            "Email: info@asiantvbd.tv",
            "Website: www.asiantvbd.tv"
        ]
    },
    {
        name: "Channel 16",
        contact: [
            "Address: B.T.M.C Bhabon (5th floor), 7-9 Kawranbazar, Dhaka-1215, Bangladesh",
            "Email: info@channel-16tv.com, insight.telecast@hotmail.com",
            "Website: www.channel-16tv.com",
            "Tel: +880-2-8189800",
            "Fax: +880-2-9142924"
        ]
    },
    {
        name: "Dipto TV",
        contact: [
            "Address: Plot # 7/A/GA Tejgaon Industrial Area (Near Karwan Bazar), Dhaka-1208",
            "Tel: +8802 9121056-7",
            "Fax: +8802 9121058"
        ]
    },
    {
        name: "Bangla TV UK",
        contact: [
            "Address: Unit-4,10-12 Marshgate Lane, Business Centre, London, E15 2NH",
            "Tel: +44 20 082212943",
            "Fax: +44 20 085556208"
        ]
    },
    {
        name: "Bijoy TV",
        contact: [
            "Address: Rahat Tower, 14 Link Road (8th Floor), Bangla Motor, Dhaka-1000"
        ]
    },
    {
        name: "Varendra TV",
        contact: [
            "Address: Ryhanul Islam- Laxmipur vatapara p/o-gpo-6000, P/S-Rajpara, Dist: Rajshahi, Bangladesh",
            "Phone: +88-01920721082- 01811757858"
        ]
    },
    {
        name: "Magic BanglaTV",
        contact: [
            "Address: Sikder Plaza, H-79, Block-M, 3rd floor, Banani Chairmanbari, Airport Road, Dhaka-1213",
            "Phone: 029872469, 01713025811, 01673585953"
        ]
    },
    {
        name: "Movie BanglaTV",
        contact: [
            "Address: 1, 1-M, Jalan 6/5, Taman Komarsial Park, Pandan Indah, Ampang 68000, Kuala Lumpur",
            "Phone: +601133839631"
        ]
    },
    {
        name: "Ntv Europe",
        contact: [
            "Address: Unit 6, Bow Exchange, 5 Yeo Street, London, E3 3QP",
            "Phone: +44 20 7537 1930",
            "Fax: +44 20 7537 1930"
        ]
    },
    {
        name: "NEWS24 TV",
        contact: [
            "Address: Plot No: 371/A, Block No: D, Bashundhara R/A, Baridhara, Dhaka -1229"
        ]
    },
    {
        name: "ATN News",
        contact: [
            "Address: Hasan Plaza, 53 Kazi Nazrul Islam Avenue, Karwan Bazar, (8th Floor), Dhaka-1215",
            "Tel: +880-2-8189214 -7",
            "E-mail: atnnews24@gmail.com",
            "Fax: +880-2-8189219",
            "Website: www.atnnewstv.com"
        ]
    },
    {
        name: "ETV",
        contact: [
            "Address: Jahangir Tower, 10, Kazi Nazrul Islam Avenue, Karwan Bazar, (7th Floor), Dhaka-1215, Bangladesh",
            "Tel: +880-2-9137556, +880-2-8216535-8, +880-2-8121260",
            "E-mail: info@ekushey-tv.com",
            "Fax: +880-2-8121270",
            "Website: www.ekushey-tv.com"
        ]
    },
    {
        name: "Rtv",
        contact: [
            "Address: BSEC Bhaban (6th Floor), 102, Kazi Nazrul Islam Avenue, Karwan Bazar, Dhaka-1215, Bangladesh",
            "Tel: +880-2-8159355 -59",
            "E-mail: info@rtvbd.tv",
            "Fax: +880-2-9130879",
            "Website: www.rtvbd.tv"
        ]
    },
    {
        name: "Boishakhi Television",
        contact: [
            "Address: Syed Grand Center, 32, Mohakhali C/A, Level-6, Dhaka-1212, Bangladesh",
            "Tel: +880-2-8837081-5",
            "Fax: +880-2-8837541",
            "E-mail: info@boishakhi.tv",
            "Website: www.boishakhi.tv"
        ]
    },
    {
        name: "Jamuna T.V",
        contact: [
            "Address: Jamuna Future Park Complex, KA-244, Progoti Sharani, Baridhara, Dhaka-1229, Bangladesh",
            "Tel: 8416060",
            "Fax: 8416067",
            "E-mail: news@jamuna.tv, info@jamuna.tv",
            "Website: www.jamuna.tv"
        ]
    },
    {
        name: "Channel 71",
        contact: [
            "Address: 57, Sohrawardi Avenue, Baridhara, Dhaka-1212",
            "Phone: +8809669710000",
            "E-mail: ekattortv@gmail.com",
            "Website: http://ekattor.tv"
        ]
    },
    {
        name: "Shomoy TV",
        contact: [
            "Address: Nasir Trade Center, 300/4, Bir Uttam C R Datto Road, Dhaka-1205, Bangladesh",
            "Phone: 9670058-65",
            "E-mail: info@somoynews.tv",
            "Fax: 9670056"
        ]
    },
    {
        name: "Channel 9",
        contact: [
            "Address: Virgo Media Limited, 340 Tejgao I/A, Dhaka – 1208, Bangladesh",
            "Phone: +88 02 9831121-6",
            "E-mail: info@channelninebd.tv"
        ]
    },
    {
        name: "My TV",
        contact: [
            "Address: 55, Bir Uttam C.R. Datta Road, Mujaffar Tower, Hatirpool, Dhaka-1000, Bangladesh",
            "Phone: 02-55128896-8, 9665924-5",
            "E-mail: info@mytvbd.tv, news@mytvbd.tv",
            "Fax: 9666016"
        ]
    },
    {
        name: "SA TV",
        contact: [
            "Address: House # 47, Road # 116, Gulshan-1, Dhaka - 1212",
            "Phone: +88 02 9894500",
            "Fax: +88 02 9895234",
            "Email: info@satv.tv",
            "Website: www.satv.tv"
        ]
    },
    {
        name: "Channel 24",
        contact: [
            "Address: Times Media Limited, 387 (South), Tejgaon I/A, Dhaka-1208",
            "Tel: +8802 55029724, 55029722-3",
            "Fax: +8802 817 0322",
            "E-Mail: info@channel24bd.tv, it@channel24bd.tv"
        ]
    },
    {
        name: "AL Dawah TV",
        contact: [
            "Address: Rupayan Trade Center, 114 Kazi Nazrul Islam Ave, Banglamotor, Dhaka"
        ]
    },
    {
        name: "Bangla21TV",
        contact: [
            "Address: Karoun Bazar, Dhaka-1216"
        ]
    },
    {
        name: "BanglaMusic TV",
        contact: [
            "Address: H-8, Road-2, Block-j, 7th floor, Baridhara, Dhaka-1219",
            "Phone: +8801622 000700"
        ]
    },
    {
        name: "Panvision TV",
        contact: [
            "Address: Baridhara, House-40, Road 1/A, Block-J, Dhaka-1212",
            "Phone: 04478008812, 04478008813"
        ]
    },
    {
        name: "IQRA Bangla TV",
        contact: [
            "Address: 60 A / B Dock Road, London E16 2AA",
            "Phone: +44 20 7084 7175"
        ]
    },
    {
        name: "NRB TV",
        contact: [
            "Address: 6 Ordway Road, Toronto, ON, M1K 4J4, Canada",
            "Phone: 416-262-9642, 647-557-2577"
        ]
    },
    {
        name: "Time Television",
        contact: [
            "Address: 36-50 38 Street, Astoria, NY 11101",
            "Phone: 1-844-846-3888",
            "Fax: 1-844-846-3888"
        ]
    },
    {
        name: "DesheBideshe TV",
        contact: [
            "Address: Metro Toronto, Canada"
        ]
    },
    {
        name: "Jamuna News",
        contact: [
            "Address: Jamuna Future Park Complex, KA-244, Progoti Shoroni, Baridhara, Dhaka-1229, Bangladesh",
            "Phone: +880 2 8416055-64",
            "Fax: +880 2 8416065",
            "Email: hello@jamuna.tv"
        ]
    }

];


const MediaContacts = () => {
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

    const filteredMedia = mediaContacts.filter(media =>
        media.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ImageBackground
            source={require('../assets/dashboard.png')}
            style={styles.backgroundImage}
        >
            
            <TextInput
                style={styles.searchInput}
                placeholder="Search by media name..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredMedia.length > 0 ? (
                    filteredMedia.map((media, index) => (
                        <View
                            key={index}
                            style={[
                                styles.cardContainer,
                                { backgroundColor: index % 2 === 0 ? 'rgba(235, 245, 255, 0.8)' : 'rgba(240, 255, 245, 0.8)' }
                            ]}
                        >
                            <Text style={styles.office}>{media.name}</Text>
                            
                            {media.contact.map((contact, i) => {
                                const [label, info] = contact.split(': '); // Separate label from information
                                return (
                                    <View key={i} style={styles.contactBox}>
                                        <Text style={styles.contactLabel}>{label}:</Text>
                                        <TouchableOpacity onPress={() => handleCopyNotification(info)}>
                                            <Text style={styles.contactText}>{info}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
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

export default MediaContacts;

const styles = StyleSheet.create({
    headerBackground: {
        width: '95%', 
        height: 81,   
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: 17.4,   
        marginBottom: 6,
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
        alignItems: 'center'
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
        fontSize: 16,
        marginBottom: 21,
        marginLeft:20,
    },
    cardContainer: {
        width: '90%',
        borderColor: '#403f3f',
        borderWidth: 2,
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 8,
        marginTop:-5,
    },
    office: {
        fontSize: 20.4,
        fontWeight: 'bold',
        color: '#004d4d',
        marginBottom: 18,
        fontWeight: '700',
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
        marginLeft: 78,
        fontWeight: '700',
        lineHeight: 18,
    },
    noResultsText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 60,
    },
});
