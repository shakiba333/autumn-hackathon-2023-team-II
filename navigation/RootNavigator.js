import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
WebBrowser.maybeCompleteAuthSession();

function Navigation() {
  const [userInfo, setUserInfo] = React.useState(null);
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

async function handleSignInWithGoogle() {
const user = await AsyncStorage.getItem('@user');
if (!user) {
  if (response?.type === 'success') {
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
}

async function handleLogout() {
  await AsyncStorage.removeItem("@user");
  setUserInfo(null);
}

  return (
    
    
        <NavigationContainer>
        {userInfo ?
          <HomeStack /> : <AuthStack />}
        </NavigationContainer>
    
    
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navigation;

