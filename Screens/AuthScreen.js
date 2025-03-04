import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth, db } from '../firebase';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  // New state for role selection. Default is "user"
  const [role, setRole] = useState('user');

  const navigation = useNavigation();

  // Check if user is authenticated and redirect based on role.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().isVolunteer) {
          navigation.replace('VolunteerDashboard');
        } else {
          navigation.replace('UserDashboard');
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        // Save extra user data (role) to Firestore.
        // The field isVolunteer is true if the user selected "volunteer", false otherwise.
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          isVolunteer: role === 'volunteer'
        });
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        // The onAuthStateChanged listener will redirect based on the role.
      })
      .catch((error) => Alert.alert('Error', error.message));
  };

  return (
    <ImageBackground
      source={require('../assets/LoginBackground.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.authBox}>
          <Text style={styles.headerText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>

          {/* Render the role picker only in sign-up mode */}
          {isSignUp && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Volunteer" value="volunteer" />
              </Picker>
            </View>
          )}

          <View style={styles.buttonContainer}>
            {isSignUp ? (
              <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setIsSignUp(!isSignUp)}
              style={styles.switchButton}
            >
              <Text style={styles.switchText}>
                {isSignUp
                  ? 'Already have an account? Login'
                  : 'Need an account? Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authBox: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: -1
  },
  input: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  pickerContainer: {
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    marginBottom: 10
  },
  picker: {
    height: 60,
    width: '100%'
  },
  buttonContainer: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0c3038',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 19
  },
  switchButton: {
    marginTop: 10
  },
  switchText: {
    color: '#0c3038',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700'
  }
});
