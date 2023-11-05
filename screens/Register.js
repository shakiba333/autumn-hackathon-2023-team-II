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


import { Firebase, db } from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

// const loadFonts = async () => {
//   await useFonts({
//     Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//   });
// };

// loadFonts();

const auth = getAuth();
const provider = new GoogleAuthProvider();


export default function Register() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signupError, setSignupError] = React.useState("");
  const [user, setUser] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const navigation = useNavigation();

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const userInfo = result.user;
        console.log(userInfo)
        setUser(userInfo);
        

        // AsyncStorage.setItem('@user', JSON.stringify(userInfo)).then(() => {
        //   // Data stored successfully, you can navigate to the user's screen or perform other actions here
        // }).catch((error) => {
        //   // Handle the error if AsyncStorage fails
        // });

        // IdP data available using getAdditionalUserInfo(result)
        // ...

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

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "users"));
  //       const users = [];

  //       querySnapshot.forEach((documentSnapshot) => {
  //         users.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //         });
  //       });

  //       setUsers(users);
  //       // setLoading(false);
  //     } catch (error) {
  //       // Handle errors here, e.g., set an error state
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData(); // Call the async function here

  // }, []);

  const onHandleSignup = async () => {
    try {
      setloading(true);
      if (email !== "" && password !== "" ) {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (response) => {
            const uid = response.user.uid;
            const data = {
              
              email: email,
              uid: uid,
              id: users.length + 1,
            };

            setUser(response.user)

            const userRef = addDoc(collection(db, "users"), data);
            // userRef.doc(uid).set(data);
            console.log(data)
            AsyncStorage.setItem('@user', JSON.stringify(data)).then(() => {
              // Data stored successfully, you can navigate to the user's screen or perform other actions here
            }).catch((error) => {
              // Handle the error if AsyncStorage fails
              console.error('Error storing data in AsyncStorage:', error);
            });
          }
        );
      } else {
        setSignupError("Please enter all the fields");
      }
    } catch (error) {
      setSignupError(error.message);
    }

    return setloading(false);
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
          <Image
            source={require("../assets/meal-logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.mainHeader}>Create new account</Text>
        

        <View style={styles.inputField}>
          <TextInput
           style={styles.textInput}
            placeholder="Enter email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <MaterialIcons name="mail-outline" size={24} color="gray" />
        </View>

        <View style={styles.inputField}>
          <TextInput
           style={styles.textInput}
            placeholder="Enter password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <MaterialIcons name="mail-outline" size={24} color="gray" />
        </View>

        {loading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.login} onPress={onHandleSignup}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        )}
        <View><Text>OR</Text></View>

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

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
         
        >
          <Text>Have an account already? Login</Text>
        </TouchableOpacity>
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