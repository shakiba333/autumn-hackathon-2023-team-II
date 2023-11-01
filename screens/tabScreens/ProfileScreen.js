import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingDots from "react-native-loading-dots";
import { getAuth, signOut } from "firebase/auth";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchUserToken = async () => {
      console.log("Fetching user token");
      try {
        const token = await AsyncStorage.getItem("@user");
        if (token) {
          const user = JSON.parse(token);
          setUser(user);
          setLoading(false);
          setFullName(user.name);
          setEmail(user.email);
        }
      } catch (error) {
        console.error("Error fetching user token:", error);
      }
    };

    fetchUserToken();
  }, []);

  const handleSave = () => {
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
  };

  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        AsyncStorage.removeItem("onboardingStatus");
        AsyncStorage.removeItem("@user");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Image
          source={require("../../assets/meal-logo.png")}
          style={styles.loadingLogo}
        />
        <View style={styles.dotsWrapper}>
          <LoadingDots colors={["#FFF", "#FFF", "#FFF", "#FFF"]} size={10} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={["#EAAD37", "rgba(255, 255, 255, 0.00)"]}
          style={styles.gradient}
        >
          <Text style={styles.header}>My Profile</Text>
          {/* Correct code once backend returns real user image */}
          {/* {user.picture ? (
            <Image source={{ uri: user.picture }} style={styles.userImage} />
          ) : (
            <Image source={require('../../assets/images/placeholder.png')} style={styles.userImage} />
          )} */}
          {/* the image below is temporary */}
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={styles.userImage}
          />
          <Pressable style={styles.signOutButton} onPress={handleSignOut}>
            <Text>Sign Out</Text>
          </Pressable>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "#EAA237",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    flexDirection: "column",
  },
  loadingLogo: {
    width: 250,
    height: 250,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    flexDirection: "column",
    alignItems: "center",
    gap: 40,
  },
  header: {
    color: "#000",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    marginTop: 30,
    fontSize: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 0,
  },
  inputContainer: {
    width: 300,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  label: {
    color: "#6B6B6B",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 14,
  },
  input: {
    width: "100%",
    color: "#303030",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 20,
    height: 28,
    borderBottomColor: "#434242",
    borderBottomWidth: 2,
    paddingBottom: 2,
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "rgb(149, 184, 57)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    width: 230,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    fontWeight: "600",
  },
});

export default ProfileScreen;
