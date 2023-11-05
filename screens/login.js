import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";


import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";


import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";


// const loadFonts = async () => {
//   await useFonts({
//     Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//   });
// };

// loadFonts();

const auth = getAuth();
const provider = new GoogleAuthProvider();


export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const navigation = useNavigation();

  const handleGoogleAuth =  () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(userInfo)
        AsyncStorage.setItem('@user', JSON.stringify(userInfo)).then(() => {
          // Data stored successfully, you can navigate to the user's screen or perform other actions here
        }).catch((error) => {
          // Handle the error if AsyncStorage fails
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const onLogin = async () => {
    setloading(true);
  
    try {
      if (email !== "" && password !== "") {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user.user.email)
        const uid = user.user.uid;
        const userData = {
          googleId: user.user.uid,
          name: user.user.displayName,
          email: user.user.email,
          avatar: user.user.photoURL,
          // Add other user data as needed
        };

        setUser(user.user)
  
        // Save user data to local storage
        await AsyncStorage.setItem('@user', JSON.stringify(user));
  
        // After saving the user data, you can navigate to the user's screen or perform other actions
        // Here is where you would navigate to the user's screen or handle the successful login.
        // For example, you can use navigation libraries like React Navigation to navigate to another screen.
  
      } else {
        setLoginError("Please enter all the fields");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  
    setloading(false);
  };

  return (
    <LinearGradient
      colors={["rgb(228, 181, 92)", "white"]}
      style={{
        flex: 1,
        width: "100%",
        paddingHorizontal: 15,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.centeredContainer}>
        <View>
          {/* <TextInput style={styles.input} />
            <TextInput style={styles.input} /> */}
          {/* <TouchableOpacity style={styles.loginButton}>
                Log In
              </TouchableOpacity> */}
          <View>
            <Image
              source={require("../assets/meal-logo.png")}
              style={styles.logo}
            />
          </View>
          <View>
            <View style={styles.inputField}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor="#6B6B6B"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <MaterialIcons name="mail-outline" size={24} color="gray" />
            </View>

            <View style={styles.inputField}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#6B6B6B"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <MaterialIcons name="lock" size={24} color="gray" />
            </View>

            {loading ? (
              <View>
                <Text>Loading</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.login} onPress={onLogin}>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleAuth}
            >
              <Image
                source={require("../assets/images/googleIcon.png")}
                style={{ height: 20, width: 20, left: -10, marginRight: 10 }}
              />
              <Text>Sign In with Google</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{ textAlign: "center", marginBottom: 20, marginTop: 20 }}
          >
            New User?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.button}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainHeader: {
    fontSize: 44,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  logo: {
    height: 200,
    width: 200,
    marginLeft: 35,
    justifyContent: "center",  
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "rgb(149, 184, 57)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    color: "white",
  },

  loginButton: {
    flexDirection: "row",
    backgroundColor: "#EAAD37",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    color: "white",
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#eee",
    boxShadow:
      "0px 1px 1px 0px rgba(0, 0, 0, 0.17), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    color: "rgba(0, 0, 0, 0.54)",
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "SatushiMedium",
    color: "black",
    alignSelf: "center",
    paddingBottom: 24,
  },

  // input: {
  //   fontSize: 24,
  //   fontFamily: "SatushiRegular",
  // },

  login: {
    flexDirection: "row",
    backgroundColor: "#BC8738",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    color: "white",
    marginBottom: 20,
    marginTop: 20,
  },
  loginText: {
    color: "white",
  },
  textInput: {
    width: 40,
    height: 40,
    margin: 12,
    borderRadius: 10,
    padding: 10,
    width: 200,
    backgroundColor: "#EAEAEA",
    outlineStyle: "none",
  },
  inputField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 40,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.20)",
  },
});