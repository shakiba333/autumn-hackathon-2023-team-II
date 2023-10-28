import * as React from "react";
import { useNavigation } from "@react-navigation/native";

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




import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




// const loadFonts = async () => {
//   await useFonts({
//     Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//   });
// };

// loadFonts();

const auth = getAuth();


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
      await signInWithEmailAndPassword(auth, email, password).catch((error) =>
        setLoginError(error.message)
      );
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
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.mainHeader}>
              Collabor
              <Text style={{ color: "#EAAD37" }}>Eat</Text>
            </Text>
          </View>
          <View>
            <Text>Login</Text>

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
              <View>
                <Text>Loading</Text>
              </View>
            ) : (
              <TouchableOpacity onPress={onLogin}>
                <Text>Login</Text>
              </TouchableOpacity>
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
          <TouchableOpacity style={styles.button}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

export default Login

const styles = StyleSheet.create({
  
})
