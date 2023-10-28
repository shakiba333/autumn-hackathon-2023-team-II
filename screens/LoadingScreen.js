import React from "react";
import { SafeAreaView, Image, StyleSheet, Text, View } from "react-native";
import LoadingDots from "react-native-loading-dots";

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/meal-logo.png")} style={styles.logo} />
      <View style={styles.dotsWrapper}>
        <LoadingDots colors={["#FFF", "#FFF", "#FFF", "#FFF"]} size={10} />
      </View>
      <Text style={styles.text}>Cooking up your results...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#EAA237',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
      flexDirection: 'column',
      width: '100vw'
    },
    logo: {
      width: 250,
      height: 250,
    },
    text: {
        color: '#434242',
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: 500,
    },
    loadingScreen: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      dotsWrapper: {
        width: 100,
      },
});

export default LoadingScreen;
