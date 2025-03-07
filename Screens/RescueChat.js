import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    TextInput,
    View,
    LogBox,
    Button,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDv3YmWIYCaqopc2d9EFHBPuMmZv-a31uY",
    authDomain: "rescuenet-88f36.firebaseapp.com",
    projectId: "rescuenet-88f36",
    storageBucket: "rescuenet-88f36.appspot.com",
    messagingSenderId: "878850103950",
    appId: "1:878850103950:web:f58deff56a3a7f130b87df",
    measurementId: "G-NM3E67HEWN"
};


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreAllLogs([]);

const db = firebase.firestore();

const RescueChat = ({ route }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const { rescueId } = route.params; 
    // Reference to the Firestore collection for this rescueId
    const chatsRef = db.collection('rescues').doc(rescueId).collection('chats');

    useEffect(() => {
        readUser();
        const unsubscribe = chatsRef
            .orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                const messagesFirestore = querySnapshot
                    .docChanges()
                    .filter(({ type }) => type === 'added')
                    .map(({ doc }) => {
                        const message = doc.data();
                        return {
                            ...message,
                            createdAt: message.createdAt.toDate(),
                        };
                    });
                appendMessages(messagesFirestore);
            });
        return () => unsubscribe();
    }, [rescueId]);

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, messages)
            );
        },
        [messages]
    );

    async function readUser() {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }

    async function handlePress() {
        const _id = Math.random().toString(36).substring(7);
        const user = { _id, name };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }

    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m));
        await Promise.all(writes);
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter your name'
                    value={name}
                    onChangeText={setName}
                />
                <Button onPress={handlePress} title='💬 Enter chat room' />
            </View>
        );
    }

    return <GiftedChat messages={messages} user={user} onSend={handleSend} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
});

export default RescueChat;