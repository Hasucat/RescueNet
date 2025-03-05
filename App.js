import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import UserDashboard from './dashboards/UserDashboard';
import About from './Screens/About';
import AuthScreen from './Screens/AuthScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import BangladeshDailies from './Screens/BangladeshDailies';
import BangladeshEmergencies from './Screens/BangladeshEmergencies';
import BloodBanks from './Screens/BloodBanks';
import Clothing from './Screens/Clothing';
import CTG_Hospitals from './Screens/CTG_Hospitals';
import CyberCrime from './Screens/CyberCrime';
import Cyclone from './Screens/Cyclone';
import DHK_Hospitals from './Screens/DHK_Hospitals';
import DisasterAlertScreen from './Screens/DisasterAlerts';
import Donation from './Screens/Donation';
import DosAndDonts from './Screens/DosAndDonts';
import Drought from './Screens/Drought';
import Earthquake from './Screens/Earthquake';
import EmbassyN_HighCommissions from './Screens/EmbassyN HighCommissions';
import EmergencyContacts from './Screens/EmergencyContacts';
import EmergencyList from './Screens/EmergencyList';
import Fire from './Screens/Fire';
import Flood from './Screens/Flood';
import FoodBank from './Screens/FoodBank';
import Funding from './Screens/Funding';
import Guides from './Screens/Guides';
import Helplines from './Screens/Helplines';
import HighTide from './Screens/HighTide';
import HospitalContacts from './Screens/HospitalContacts';
import Hospitals from './Screens/Hospitals';
import Hurricane from './Screens/Hurricane';
import KHL_Hospitals from './Screens/KHL_Hospitals';
import Landslide from './Screens/Landslide';
import Lightning from './Screens/Lightning';
import MapScreen from './Screens/MapScreen';
import Media from './Screens/Media';
import MediaContacts from './Screens/MediaContacts';
import NGOs from './Screens/NGOs';
import Pharmacy from './Screens/Pharmacy';
import RABContacts from './Screens/RABContacts';
import RelevantLink from './Screens/RelevantLink';
import Rescue from './Screens/Rescue';
import RescueRequests from './Screens/RescueRequests';
import RoadAccident from './Screens/RoadAccident';
import Robbery from './Screens/Robbery';
import ShelterContacts from './Screens/ShelterContacts';
import SplashScreen from './Screens/SplashScreen';
import Survey from './Screens/Survey';
import Tsunami from './Screens/Tsunami';
import Tutorial from './Screens/Tutorial';
import UpdateProfile from './Screens/UpdateProfile';
import UserStatus from './Screens/UserStatus';
import VolunteerDashboard from './dashboards/VolunteerDashboard';
import VolunteerRegistration from './Screens/VolunteerRegistration';
import VolunteerSection from './Screens/VolunteerSection';
import VolunteerStatus from './Screens/VolunteerStatus';
import Wildfire from './Screens/Wildfire';
import XYZ_Hospitals from './Screens/XYZ_Hospitals';
import OtherDonations from './Screens/OtherDonations';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: "Forgot Password" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        {/* Inside UserDashboard */}
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ headerShown: false  }} />
        <Stack.Screen name="Rescue" component={Rescue} options={{ headerShown: false   }} />
        <Stack.Screen name="Donation" component={Donation} options={{ title: "Donation" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="EmergencyList" component={EmergencyList} options={{ title: "Emergency List"  ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />
        <Stack.Screen name="DosAndDonts" component={DosAndDonts} options={{ title: "Do's & Don'ts" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="DisasterAlerts" component={DisasterAlertScreen} options={{ title: "Disaster Alerts",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />

        {/* Inside Sidebar */}
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ title: "Update Profile" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="RelevantLink" component={RelevantLink} options={{ title: "Relevant Link" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="About" component={About} options={{ title: "About" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Survey" component={Survey} options={{ title: "Survey" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Tutorial" component={Tutorial} options={{ title: "Tutorial" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />

        {/* Inside Donation */}
        <Stack.Screen name="Funding" component={Funding} options={{ title: "Funding" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="FoodBank" component={FoodBank} options={{ title: "FoodBank" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Clothing" component={Clothing} options={{ title: "Clothing",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />

        {/* Inside Emergency Data */}
        <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} options={{ title: "Important Contacts" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />
        <Stack.Screen name="ShelterContacts" component={ShelterContacts} options={{ title: "Shelter Sites",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />


        {/* Inside Emergency Contacts */}
        <Stack.Screen name="Helplines" component={Helplines} options={{ title: "Helpline Section" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Hospitals" component={Hospitals} options={{ title: "Hospital Section",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />
        <Stack.Screen name="Media" component={Media} options={{ title: "Media Section" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />

        {/* Inside helpline */}
        <Stack.Screen name="BangladeshEmergencies" component={BangladeshEmergencies} options={{ title: "BD Emergency Contacts" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="RABContacts" component={RABContacts} options={{ title: "RAB Contacts",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />
        <Stack.Screen name="NGOs" component={NGOs} options={{ title: "NGO Contacts" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />

        {/* Inside hospitals */}
        <Stack.Screen name="BloodBanks" component={BloodBanks} options={{ title: "Blood Banks" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Pharmacy" component={Pharmacy} options={{ title: "24/7 Pharmacy Contacts",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />
        <Stack.Screen name="HospitalContacts" component={HospitalContacts} options={{ title: "Hospital Contacts" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />

        {/* Inside media */}
        <Stack.Screen name="BangladeshDailies" component={BangladeshDailies} options={{ title: "BD Newspapers" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="EmbassyN_HighCommissions" component={EmbassyN_HighCommissions} options={{ title: "Embassies' Contacts" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="MediaContacts" component={MediaContacts} options={{ title: "Media Contacts" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        
        {/* Inside HospitalContacts */}
        <Stack.Screen name="DHK_Hospitals" component={DHK_Hospitals} options={{ title: "Dhaka Hospitals" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="KHL_Hospitals" component={KHL_Hospitals} options={{ title: "Khulna Hospitals" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="CTG_Hospitals" component={CTG_Hospitals} options={{ title: "Chattogram Hospitals" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="XYZ_Hospitals" component={XYZ_Hospitals} options={{ title: "Other Hospitals" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        {/* Inside volunteers */}
        <Stack.Screen name="VolunteerSection" component={VolunteerSection} options={{ title: "Volunteers Section" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="VolunteerRegistration" component={VolunteerRegistration} options={{ title: "Volunteer Registration" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="VolunteerDashboard" component={VolunteerDashboard} options={{ title: 'Volunteer Dashbaord',headerStyle: { backgroundColor: "#40646b"},  headerTintColor: "#fff" ,headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },headerTitleAlign: 'center'}}/>


        {/* Inside volunteers */}
        <Stack.Screen name="Guides" component={Guides} options={{ title: "Disaster Guides" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />

        {/* Inside Dos and Donts */}
        <Stack.Screen name="Cyclone" component={Cyclone} options={{ title: "Cyclone",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />
        <Stack.Screen name="Flood" component={Flood} options={{ title: "Flood" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Earthquake" component={Earthquake} options={{ title: "Earthquake",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />
        <Stack.Screen name="Tsunami" component={Tsunami} options={{ title: "Tsunami" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Landslide" component={Landslide} options={{ title: "Landslide" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Drought" component={Drought} options={{ title: "Drought" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Hurricane" component={Hurricane} options={{ title: "Hurricane",headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff" }} />
        <Stack.Screen name="Wildfire" component={Wildfire} options={{ title: "Wildfire" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="HighTide" component={HighTide} options={{ title: "HighTide" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Lightning" component={Lightning} options={{ title: "Lightning" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="RoadAccident" component={RoadAccident} options={{ title: "RoadAccident" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Fire" component={Fire} options={{ title: "Fire" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="CyberCrime" component={CyberCrime} options={{ title: "CyberCrime" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        <Stack.Screen name="Robbery" component={Robbery} options={{ title: "Robbery" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />

         {/* Map Screen for location selection */}
         <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ title: 'Select Location' }} // Show title for map screen
        />
         {/* User Status Screen */}
        <Stack.Screen name="UserStatus" component={UserStatus} options={{ title: "Rescue Request Status" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        {/* Volunteer Status Screen */}
        <Stack.Screen name="VolunteerStatus" component={VolunteerStatus} options={{ title: "Volunteer Response Status" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        
        <Stack.Screen name="RescueRequests" component={RescueRequests} options={{ title: "Rescue Requests" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />
        
        <Stack.Screen name="OtherDonations" component={OtherDonations} options={{ title: "Other Donations" ,headerStyle: { backgroundColor: "#40646b" },  headerTintColor: "#fff"}} />

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