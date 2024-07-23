// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStory = async () => {
        setLoading(true);
        const apiUrl = 'http://apihub.p.appply.xyz:3300/chatgpt';
        const payload = {
            messages: [
                { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                { role: "user", content: `Create a fairy tale with these elements: Hero: ${hero}, Villain: ${villain}, Plot: ${plot}` }
            ],
            model: "gpt-4o"
        };
        try {
            const response = await axios.post(apiUrl, payload);
            const { response: storyText } = response.data;
            setStory(storyText);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Hero"
                        value={hero}
                        onChangeText={setHero}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Villain"
                        value={villain}
                        onChangeText={setVillain}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Plot"
                        value={plot}
                        onChangeText={setPlot}
                    />
                    <Button title="Generate Story" onPress={fetchStory} />
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Text style={styles.storyText}>{story}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: 30,
    },
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        marginBottom: 10,
        width: '100%',
    },
    storyText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'justify',
    },
});

export default App;