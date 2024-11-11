import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Alert, ImageBackground, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback, View, Text } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { auth, db } from "./../firebase"; // Import auth and db
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

const Survey = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [disasters, setDisasters] = useState([]);
  const [usage, setUsage] = useState("");
  const [navigationEase, setNavigationEase] = useState("");
  const [uiSatisfaction, setUiSatisfaction] = useState("");
  const [notificationsEffectiveness, setNotificationsEffectiveness] = useState("");
  const [preparedness, setPreparedness] = useState("");
  const [emergencyContactsEffectiveness, setEmergencyContactsEffectiveness] = useState("");
  const [tutorialEffectiveness, setTutorialEffectiveness] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const currentUser = auth.currentUser;

  const handleSubmit = async () => {
    if (!age || !gender || !disasters.length || !usage || !preparedness) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    const surveyData = {
      userId: currentUser.uid,
      age,
      gender,
      disasters,
      usage,
      navigationEase,
      uiSatisfaction,
      notificationsEffectiveness,
      preparedness,
      emergencyContactsEffectiveness,
      tutorialEffectiveness,
      suggestions,
    };

    try {
      await setDoc(doc(db, "surveys", currentUser.uid), surveyData);
      Alert.alert("Success", "Survey submitted successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/background.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              <ImageBackground
                source={require('../assets/header2.jpg')}
                style={styles.headerBackground}
              >
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>RescueNet Survey</Text>
                </View>
              </ImageBackground>

              {/* Age Question */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>What's your age?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setAge} value={age}>
                  <RadioButton.Item label="Less than 18" value="less than 18" />
                  <RadioButton.Item label="18-30" value="18-30" />
                  <RadioButton.Item label="31-45" value="31-45" />
                  <RadioButton.Item label="45-60" value="45-60" />
                  <RadioButton.Item label="60+" value="60+" />
                </RadioButton.Group>
              </View>

              {/* Gender Question */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>What's your gender?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setGender} value={gender}>
                  <RadioButton.Item label="Male" value="male" />
                  <RadioButton.Item label="Female" value="female" />
                </RadioButton.Group>
              </View>

              {/* Disasters Likely to Happen */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>Which of the following disasters are more likely to happen in your area?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                {["Earthquake", "Flood", "Fire", "Tornado", "Hurricane", "Landslide", "Tsunami", "Volcanic Eruption", "Wildfire", "Pandemic", "Other"].map(option => (
                  <RadioButton.Item
                    key={option}
                    label={option}
                    status={disasters.includes(option) ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setDisasters(prevState =>
                        prevState.includes(option)
                          ? prevState.filter(item => item !== option)
                          : [...prevState, option]
                      );
                    }}
                  />
                ))}
              </View>

              {/* Frequency of Using RescueNet */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>How frequently do you use RescueNet for updates?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setUsage} value={usage}>
                  <RadioButton.Item label="Daily" value="daily" />
                  <RadioButton.Item label="Once a week" value="once a week" />
                  <RadioButton.Item label="Only when disaster happens" value="only during disaster" />
                </RadioButton.Group>
              </View>

              {/* App Navigation Ease */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>How easy is the app to navigate?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setNavigationEase} value={navigationEase}>
                  <RadioButton.Item label="Very Easy" value="very easy" />
                  <RadioButton.Item label="Easy" value="easy" />
                  <RadioButton.Item label="Neutral" value="neutral" />
                  <RadioButton.Item label="Difficult" value="difficult" />
                  <RadioButton.Item label="Very Difficult" value="very difficult" />
                </RadioButton.Group>
              </View>

              {/* UI Satisfaction */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>How satisfied are you with the user interface?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setUiSatisfaction} value={uiSatisfaction}>
                  <RadioButton.Item label="Very Satisfied" value="very satisfied" />
                  <RadioButton.Item label="Satisfied" value="satisfied" />
                  <RadioButton.Item label="Neutral" value="neutral" />
                  <RadioButton.Item label="Dissatisfied" value="dissatisfied" />
                  <RadioButton.Item label="Very Dissatisfied" value="very dissatisfied" />
                </RadioButton.Group>
              </View>

              {/* Notifications Effectiveness */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>How effective are the notifications from the app considering live disasters?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setNotificationsEffectiveness} value={notificationsEffectiveness}>
                  <RadioButton.Item label="Very Effective" value="very effective" />
                  <RadioButton.Item label="Effective" value="effective" />
                  <RadioButton.Item label="Neutral" value="neutral" />
                  <RadioButton.Item label="Ineffective" value="ineffective" />
                  <RadioButton.Item label="Very Ineffective" value="very ineffective" />
                </RadioButton.Group>
              </View>

              {/* Preparedness Question */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>Does the app help you to be prepared before, during, and after a disaster?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setPreparedness} value={preparedness}>
                  <RadioButton.Item label="Yes" value="yes" />
                  <RadioButton.Item label="No" value="no" />
                  <RadioButton.Item label="Maybe" value="maybe" />
                </RadioButton.Group>
              </View>

              {/* Emergency Contacts Effectiveness */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>How effective are the emergency contacts list?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setEmergencyContactsEffectiveness} value={emergencyContactsEffectiveness}>
                  <RadioButton.Item label="Very Effective" value="very effective" />
                  <RadioButton.Item label="Effective" value="effective" />
                  <RadioButton.Item label="Neutral" value="neutral" />
                  <RadioButton.Item label="Ineffective" value="ineffective" />
                  <RadioButton.Item label="Very Ineffective" value="very ineffective" />
                </RadioButton.Group>
              </View>

              {/* Tutorial Effectiveness */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>How effective are the tutorial videos?</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.radioGroup}>
                <RadioButton.Group onValueChange={setTutorialEffectiveness} value={tutorialEffectiveness}>
                  <RadioButton.Item label="Very Effective" value="very effective" />
                  <RadioButton.Item label="Effective" value="effective" />
                  <RadioButton.Item label="Neutral" value="neutral" />
                  <RadioButton.Item label="Ineffective" value="ineffective" />
                  <RadioButton.Item label="Very Ineffective" value="very ineffective" />
                </RadioButton.Group>
              </View>

              {/* Suggestion Box */}
              <View style={styles.horizontalLine} />
              <Text style={styles.question}>Other Suggestions</Text>
              <View style={styles.horizontalLine} />
              <TextInput
                style={styles.input}
                placeholder="Your suggestions here"
                value={suggestions}
                onChangeText={setSuggestions}
                multiline
              />

              {/* Submit Button */}
              <ImageBackground
                source={require('../assets/update.gif')}
                style={styles.registerBackground}
              >
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
              </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flexgrow: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2a4e61',
   
  },
  cardContainer: {
    width: '100%', 
    backgroundColor: '#fff',
    padding: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, 
  },
  headerBackground: {
    width: '100%', 
    height: 90,   
    justifyContent: 'center', 
    alignItems: 'center',  
    marginBottom: 10,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 25,
    marginTop: 10,
    fontWeight: '900',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#416c87',
  },
  section: {
    marginBottom: 20, // Adds space between sections
  },
  radioGroup: {
    marginBottom: 15,
  },
  checkboxGroup: {
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  horizontalLine: {
    height: 2,
    backgroundColor: '#ccc',
    marginBottom: 15, // Adjust space below the line if needed
  },
  registerBackground: {
    width: '100%', 
    height: 100,   
    justifyContent: 'center', 
    alignItems: 'center',  
    marginBottom: 10,
  },
});

export default Survey;
