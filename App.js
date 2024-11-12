import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import SplashScreen from './Screens/SplashScreen';
import AuthScreen from './Screens/AuthScreen';
import DosAndDonts from './Screens/DosAndDonts';
import Rescue from './Screens/Rescue';
import UserDashboard from './UserDashboard';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
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
import EmergencyContacts from './Screens/EmergencyContacts';
import Helplines from './Screens/Helplines';
import Hospitals from './Screens/Hospitals';
import Media from './Screens/Media';
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
import BangladeshEmergencies from './Screens/BangladeshEmergencies';
import BangladeshDailies from './Screens/BangladeshDailies';
import RABContacts from './Screens/RABContacts';
import NGOs from './Screens/NGOs';
import Pharmacy from './Screens/Pharmacy';
import EmbassyN_HighCommissions from './Screens/EmbassyN HighCommissions';
import BloodBanks from './Screens/BloodBanks';
import VolunteerSection from './Screens/VolunteerSection';
import Guides from './Screens/Guides';
import MediaContacts from './Screens/MediaContacts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        {/* Inside UserDashboard */}
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ headerShown: false  }} />
        <Stack.Screen name="Rescue" component={Rescue} options={{ headerShown: false   }} />
        <Stack.Screen name="Donation" component={Donation} options={{ title: "Donation" }} />
        <Stack.Screen name="EmergencyList" component={EmergencyList} options={{ title: "Emergency List" }} />
        
        {/* Inside Sidebar */}
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ title: "Update Profile" }} />
        <Stack.Screen name="RelevantLink" component={RelevantLink} options={{ title: "Relevant Link" }} />
        <Stack.Screen name="About" component={About} options={{ title: "About" }} />
        <Stack.Screen name="Survey" component={Survey} options={{ title: "Survey" }} />
        <Stack.Screen name="Tutorial" component={Tutorial} options={{ title: "Tutorial" }} />

        {/* Inside Donation */}
        <Stack.Screen name="Funding" component={Funding} options={{ title: "Funding" }} />
        <Stack.Screen name="FoodBank" component={FoodBank} options={{ title: "FoodBank" }} />
        <Stack.Screen name="Clothing" component={Clothing} options={{ title: "Clothing" }} />

        {/* Inside Emergency Data */}
        <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} options={{ title: "Important Contacts" }} />
        <Stack.Screen name="DosAndDonts" component={DosAndDonts} options={{ title: "Do's & Don'ts" }} />

        {/* Inside Emergency Contacts */}
        <Stack.Screen name="Helplines" component={Helplines} options={{ title: "Helpline Section" }} />
        <Stack.Screen name="Hospitals" component={Hospitals} options={{ title: "Hospital Section" }} />
        <Stack.Screen name="Media" component={Media} options={{ title: "Media Section" }} />

        {/* Inside helpline */}
        <Stack.Screen name="BangladeshEmergencies" component={BangladeshEmergencies} options={{ title: "BD Emergency Contacts" }} />
        <Stack.Screen name="RABContacts" component={RABContacts} options={{ title: "RAB Contacts" }} />
        <Stack.Screen name="NGOs" component={NGOs} options={{ title: "NGO Contacts" }} />

        {/* Inside hospitals */}
        <Stack.Screen name="BloodBanks" component={BloodBanks} options={{ title: "Blood Banks" }} />
        <Stack.Screen name="Pharmacy" component={Pharmacy} options={{ title: "24/7 Pharmacy Contacts" }} />

        {/* Inside media */}
        <Stack.Screen name="BangladeshDailies" component={BangladeshDailies} options={{ title: "BD Newspapers" }} />
        <Stack.Screen name="EmbassyN_HighCommissions" component={EmbassyN_HighCommissions} options={{ title: "Embassies' Contacts" }} />
        <Stack.Screen name="MediaContacts" component={MediaContacts} options={{ title: "Media Contacts" }} />
        
        
        {/* Inside volunteers */}
        <Stack.Screen name="VolunteerSection" component={VolunteerSection} options={{ title: "Volunteers Section" }} />
        <Stack.Screen name="VolunteerRegistration" component={VolunteerRegistration} options={{ title: "Volunteer Registration" }} />
        <Stack.Screen name="VolunteerDashboard" component={VolunteerDashboard} options={{ title: 'Volunteer Dashboard' }}/>


        {/* Inside volunteers */}
        <Stack.Screen name="Guides" component={Guides} options={{ title: "Disaster Guides" }} />

        {/* Inside Dos and Donts */}
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

        
      </Stack.Navigator>

      {/* Toast for Toast Msgs */}
      <Toast />
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