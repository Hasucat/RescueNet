import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen';
import AuthScreen from './Screens/AuthScreen';
import DosAndDonts from './Screens/DosAndDonts';
import Rescue from './Screens/Rescue';
import UserDashboard from './UserDashboard';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import ImportantContacts from './Screens/ImportantContacts';
import VolunteerRegistration from './Screens/VolunteerRegistration';
import MapScreen from './Screens/MapScreen';
import VolunteerDashboard from './Screens/VolunteerDashboard';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ headerShown: false  }} />
        <Stack.Screen name="Rescue" component={Rescue} options={{ headerShown: false   }} />
        <Stack.Screen name="DosAndDonts" component={DosAndDonts} options={{ title: "Do's & Don'ts" }} />
        <Stack.Screen name="ImportantContacts" component={ImportantContacts} options={{ title: "Important Contacts" }} />
        <Stack.Screen name="VolunteerRegistration" component={VolunteerRegistration} options={{ title: "Volunteer Registration" }} />
        
         {/* Map Screen for location selection */}
         <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ title: 'Select Location' }} // Show title for map screen
        />

        {/* Volunteer Dashboard */}
        <Stack.Screen
          name="VolunteerDashboard"
          component={VolunteerDashboard}
          options={{ title: 'Volunteer Dashboard' }} // Show title for volunteer dashboard
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});