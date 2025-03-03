import React, { useEffect, useState } from 'react';
import { View, Text, FlatList ,StyleSheet,StatusBar} from 'react-native';
import { db } from './../firebase'; // Import your Firestore instance from firebase.js
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; // Import Firestore functions

function DisasterAlertScreen() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const alertsCollection = collection(db, 'alerts'); // Use `db` instead of `firestore()`
        const alertsQuery = query(alertsCollection, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(alertsQuery, (querySnapshot) => {
            const alertsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate().toLocaleString(),
            }));
            setAlerts(alertsData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.alertItem}>
              <Text style={styles.alertText}>{item.message}</Text>
              <Text style={styles.timestampText}>{item.timestamp}</Text>
            </View>
          )}
        />
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',  // Dark background for contrast
      padding: 20,
    },
    headerText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Roboto',  // Font family to match UserDashboard
    },
    alertItem: {
      padding: 15,
      borderColor: '#000',
      borderRadius: 3,
      marginBottom: 10,
      backgroundColor: '#727e94',  // Slightly lighter background for alert item
      shadowColor: '#000',  // For subtle shadow effect
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
    alertText: {
      fontSize: 18,
      color: '#E0E0E0',  // Light gray for readability on dark background
      fontFamily: 'Roboto',
      marginBottom: 5,
    },
    timestampText: {
      fontSize: 12,
      color: 'black',
      fontFamily: 'Roboto',
    },
  });
  
export default DisasterAlertScreen;
