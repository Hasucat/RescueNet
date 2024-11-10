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
import Donation from './Screens/Donation';
import Funding from './Screens/Funding';
import FoodBank from './Screens/FoodBank';
import Clothing from './Screens/Clothing';
import RelevantLink from './Screens/RelevantLink';
import About from './Screens/About';
import Survey from './Screens/Survey';
import Tutorial from './Screens/Tutorial';
import UpdateProfile from './Screens/UpdateProfile';
import EmergencyList from './Screens/EmergencyList';
import VolunteerRegistration from './Screens/VolunteerRegistration';
import MapScreen from './Screens/MapScreen';
import VolunteerDashboard from './Screens/VolunteerDashboard';
import Cyclone from './Screens/Cyclone';
import Flood from './Screens/Flood';
import Earthquake from './Screens/Earthquake';
import Tsunami from './Screens/Tsunami';
import Landslide from './Screens/Landslide';
import Drought from './Screens/Drought';
import Hurricane from './Screens/Hurricane';
import Wildfire from './Screens/Wildfire';
import HighTide from './Screens/HighTide';
import Lightning from './Screens/Lightning';
import RoadAccident from './Screens/RoadAccident';
import Fire from './Screens/Fire';
import CyberCrime from './Screens/CyberCrime';
import Robbery from './Screens/Robbery';
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
        <Stack.Screen name="Donation" component={Donation} options={{ title: "Donation" }} />
        <Stack.Screen name="EmergencyList" component={EmergencyList} options={{ title: "EmergencyList" }} />
        <Stack.Screen name="Funding" component={Funding} options={{ title: "Funding" }} />
        <Stack.Screen name="FoodBank" component={FoodBank} options={{ title: "FoodBank" }} />
        <Stack.Screen name="Clothing" component={Clothing} options={{ title: "Clothing" }} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ title: "Update Profile" }} />
        <Stack.Screen name="RelevantLink" component={RelevantLink} options={{ title: "Relevant Link" }} />
        <Stack.Screen name="About" component={About} options={{ title: "About" }} />
        <Stack.Screen name="Survey" component={Survey} options={{ title: "Survey" }} />
        <Stack.Screen name="Tutorial" component={Tutorial} options={{ title: "Tutorial" }} />
        <Stack.Screen name="VolunteerRegistration" component={VolunteerRegistration} options={{ title: "Volunteer Registration" }} />
        <Stack.Screen name="Cyclone" component={Cyclone} options={{ title: "Cyclone" }} />
        <Stack.Screen name="Flood" component={Flood} options={{ title: "Flood" }} />
        <Stack.Screen name="Earthquake" component={Earthquake} options={{ title: "Earthquake" }} />
        <Stack.Screen name="Tsunami" component={Tsunami} options={{ title: "Tsunami" }} />
        <Stack.Screen name="Landslide" component={Landslide} options={{ title: "Landslide" }} />
        <Stack.Screen name="Drought" component={Drought} options={{ title: "Drought" }} />
        <Stack.Screen name="Hurricane" component={Hurricane} options={{ title: "Hurricane" }} />
        <Stack.Screen name="Wildfire" component={Wildfire} options={{ title: "Wildfire" }} />
        <Stack.Screen name="HighTide" component={HighTide} options={{ title: "HighTide" }} />
        <Stack.Screen name="Lightning" component={Lightning} options={{ title: "Lightning" }} />
        <Stack.Screen name="RoadAccident" component={RoadAccident} options={{ title: "RoadAccident" }} />
        <Stack.Screen name="Fire" component={Fire} options={{ title: "Fire" }} />
        <Stack.Screen name="CyberCrime" component={CyberCrime} options={{ title: "CyberCrime" }} />
        <Stack.Screen name="Robbery" component={Robbery} options={{ title: "Robbery" }} />


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