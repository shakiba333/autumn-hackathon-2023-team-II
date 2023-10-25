import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#EAAD37", "rgba(255, 255, 255, 0.00)"]}
        style={{ flex: 1, width: "100%", paddingHorizontal: 15, flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <Image source={require('../../assets/meal-logo.png')} style={styles.logo}/>
        <Text style={styles.headerText}>Welcome!</Text>
        <View style={styles.divContainer}>
          <View style={styles.div}>
            <Text>Div 1</Text>
          </View>
          <View style={styles.div}>
            <Text>Div 2</Text>
          </View>
          <View style={styles.div}>
            <Text>Div 3</Text>
          </View>
          <View style={styles.div}>
            <Text>Div 4</Text>
          </View>
          <View style={styles.div}>
            <Text>Div 4</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Let's CollaborEat</Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    margin: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: "center"
  },
  logo: {
    width: 200, 
    height: 200,
  },
  divContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  div: {
    flexBasis: '45%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    margin: 10,
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'rgb(149, 184, 57)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    maxWidth: 'max-content'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
    fontWeight: '600'
  },
});
