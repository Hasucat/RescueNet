import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const DosAndDonts = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Dos Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Do's</Text>
        <Text style={styles.listItem}>✔ Stay calm and focused during the disaster.</Text>
        <Text style={styles.listItem}>✔ Follow evacuation orders from authorities.</Text>
        <Text style={styles.listItem}>✔ Have an emergency kit with essential supplies like water, food, and medications.</Text>
        <Text style={styles.listItem}>✔ Stay informed through official news channels and alerts.</Text>
        <Text style={styles.listItem}>✔ Help others, especially the elderly and disabled, in case of evacuation.</Text>
      </View>

      {/* Don'ts Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Don'ts</Text>
        <Text style={styles.listItem}>✖ Don't ignore official warnings or evacuation orders.</Text>
        <Text style={styles.listItem}>✖ Don't use elevators during an earthquake or fire.</Text>
        <Text style={styles.listItem}>✖ Don't block escape routes with personal belongings.</Text>
        <Text style={styles.listItem}>✖ Don't go near fallen power lines.</Text>
        <Text style={styles.listItem}>✖ Don't panic. Staying calm is key to survival.</Text>
      </View>
    </ScrollView>
  );
};

export default DosAndDonts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e6a86',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 10,
  },
});
