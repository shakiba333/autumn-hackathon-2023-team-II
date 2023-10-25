import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.subtitleText}>Ready to plan a meal?</Text>
      <Button
        title="Let's collabor-eat"
        onPress={() => {
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
