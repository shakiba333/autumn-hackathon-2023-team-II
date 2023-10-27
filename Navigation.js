import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PreferencesScreen from "./screens/PreferenceScreen";
import AuthScreen from "./screens/AuthScreen";
import ExploreScreen from "./screens/tabScreens/ExploreScreen";
import HomeScreen from "./screens/tabScreens/HomeScreen";
import FavouriteScreen from "./screens/tabScreens/FavouriteScreen";
import Suggestions from "./screens/Suggestions";
import ProfileScreen from "./screens/tabScreens/ProfileScreen";
import Cravings from "./screens/Cravings";
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

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import { AppRegistry } from "react-native";
import { useFonts } from "expo-font";
import postUser from "./services/user";
import {Firebase, db} from './config/firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore"; 



// const loadFonts = async () => {
//   await useFonts({
//     Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//   });
// };

// loadFonts();

const auth = getAuth();

WebBrowser.maybeCompleteAuthSession();

function Navigation() {
  const [user, setUser ] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState(null);
  const [formattedInfo, setFormattedInfo] = React.useState({
    googleId: '',
    name: '',
    email: '',
    avatar: '',
  })
  const [showOnboarding, setShowOnboarding] = React.useState(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "356560269346-l8nhb3lgrdoefj5ga4kkkslh0pstah0a.apps.googleusercontent.com",
    iosClientId:
      "356560269346-aj6o16ra0ace2gat2o1hqrp9dnlbit5c.apps.googleusercontent.com",
    webClientId:
      "356560269346-8m1hnjk7mpb9cfgg7ip0c83g0jb3ni0c.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  React.useEffect(()=> {
    if(userInfo){
      setFormattedInfo({
        googleId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
      })
    }
  }, [userInfo]);
  userInfo && postUser(formattedInfo)
  
  // const saveGoogleUser = async () => {
  //   if(userInfo){
  //     setFormattedInfo({
  //       googleId: userInfo.id,
  //       name: userInfo.name,
  //       email: userInfo.email,
  //       avatar: userInfo.picture,
  //     })
  //     postUser(formattedInfo)
  //   }
  // }

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));     
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  async function handleLogout() {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
  }

  React.useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingStatus = await AsyncStorage.getItem("onboardingStatus");
      console.log("onboardingStatus:", onboardingStatus);
      setShowOnboarding(onboardingStatus !== "completed");
    };
    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem("onboardingStatus", "completed");
    setShowOnboarding(false);
  };

  const auth = getAuth();

  React.useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    let mount = true

    onAuthStateChanged(auth, async (authenticatedUser) => {
      if(mount) {
        await authenticatedUser ? setUser(authenticatedUser) : setUser(null)
        setIsLoading(false);
      }
    });

    return () => {
      mount = false
    }
  }, []);

  return (
    <>
      {user ? (
        <NavigationContainer>
          {showOnboarding ? (
            <PreferencesScreen onComplete={handleOnboardingComplete} />
          ) : (
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="TabGroup" component={TabGroup} />
             
            </Stack.Navigator>
          )}
        </NavigationContainer>
      ) : (
        <NavigationContainer>
 
              {/* <TouchableOpacity
                style={styles.googleButton}
                onPress={() => {
                  promptAsync();
                }}
              >
                <Image
                  source={require("./assets/images/googleIcon.png")}
                  style={{ height: 20, width: 20, left: -10, marginRight: 10 }}
                />
                <Text>Sign In with Google</Text>
              </TouchableOpacity> */}
              <Stack.Navigator headerMode="none">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
              {/* <Button
                title="Sign in with Google"
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              /> */}
             
        </NavigationContainer>
       
      )}
    </>
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

  inputContainer: {
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#2bced6",
  },

  // input: {
  //   fontSize: 24,
  //   fontFamily: "SatushiRegular",
  // },

  login: {
    marginBottom: 24,
    backgroundColor: "#2bced6",
    color: "#fff",
    fontSize: 20,
    fontFamily: "SatushiBlack",
  },
});

export default Navigation;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cravings" component={Cravings} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="Suggestions" component={Suggestions} />
    </Stack.Navigator>
  );
}

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "Favourite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{ marginBottom: -1 }}
            />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabel: "",
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const navigation = useNavigation();

  

  const onLogin = async () => {
    setloading(true);

    // try {
    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => setLoginError(error.message));
    } else {
      setLoginError("please enter all the fields");
    }
    // } catch (error) {
    // setLoginError(error.message);
    // }

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
              {/* <TextInput style={styles.input} />
            <TextInput style={styles.input} /> */}
              {/* <TouchableOpacity style={styles.loginButton}>
                Log In
              </TouchableOpacity> */}
              <View>
                <Image
                  source={require("./assets/images/logo.png")}
                  style={styles.logo}
                />
                <Text style={styles.mainHeader}>
                  Collabor
                  <Text style={{ color: "#EAAD37" }}>Eat</Text>
                </Text>
              </View>
    <View>
      
      <Text>
        Login
      </Text>

      <TextInput
       
        placeholder="Enter email"
       
        keyboardType="email-address"
       
       
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        
        placeholder="Enter password"
        
        value={password}
        onChangeText={(text) => setPassword(text)}
        
      />
      

      {loading ? (
        <View >
          <Text>Loading</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={onLogin} ><Text>Login</Text></TouchableOpacity>
        
      )}

      <Button
        onPress={() => navigation.navigate("Register")}
        title="Go to Signup"
        color="#2bced6"
      />
    </View>
     <Text
     style={{ textAlign: "center", marginBottom: 20, marginTop: 20 }}
   >
     New User?
   </Text>
   <TouchableOpacity style={styles.button}><Text>Sign Up</Text></TouchableOpacity>
 </View>
</View>
</LinearGradient>
  );
}

function Register() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signupError, setSignupError] = React.useState("");
  const [users, setUsers] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = [];
  
        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
        // setLoading(false);
      } catch (error) {
        // Handle errors here, e.g., set an error state
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // Call the async function here
  
  }, []);

 

  const onHandleSignup = async () => {
    try {
      setloading(true);
      if (email !== "" && password !== "" && name !== "") {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((response) => {
            const uid = response.user.uid;
            const data = {
              name: name,
              email: email,
              uid: uid,
              id: users.length + 1,
            };

            const userRef =  addDoc(collection(db, "users"), data);
            // userRef.doc(uid).set(data);
          });
      } else {
        setSignupError("Please enter all the fields");
      }
    } catch (error) {
      setSignupError(error.message);
    }

    return setloading(false);
  };

  return (
    <View>
      
      <Text>Create new account</Text>

      <TextInput
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        leftIcon="account"
        testID="fullName"
        placeholder="Enter Fullname"
        autoCapitalize="words"
        value={name}
        placeholderTextColor="slategray"
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        
        placeholder="Enter email"
        
        keyboardType="email-address"
        
        value={email}
        
        
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        
       
        placeholder="Enter password"
        
        value={password}
        
        onChangeText={(text) => setPassword(text)}
        
      />
      

      {loading ? (
        <View >
          <Text>Loading</Text>
        </View>
      ) : (
        <Button
          onPress={onHandleSignup}
          backgroundColor="#2bced6"
          title="Signup"
          tileColor="#fff"
          titleSize={20}
          containerStyle={{
            marginBottom: 24,
          }}
        />
      )}

      <Button
        onPress={() => navigation.navigate("Login")}
        title="Go to Login"
        color="#2bced6"
      />
    </View>
  );
}
