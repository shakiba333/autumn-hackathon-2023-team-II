import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
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
    <>
    {userInfo ?
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Home" component={HomeScreen} set options={{ headerShown: false }}/>               
          </Stack.Navigator>
        </NavigationContainer>
    : (
      <View style={styles.centeredContainer}>
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
      )}
    </>
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

