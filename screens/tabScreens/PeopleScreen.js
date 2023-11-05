import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LoadingDots from "react-native-loading-dots";
import { useFocusEffect } from "@react-navigation/native";
import { addFriend, getAllProfiles, deleteFriend } from "../../services/profile";
import { getUser, getAllUsers } from "../../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';

const PeopleScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState(null);
  const [userFriends, setUserFriends] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      const getProfiles = async () => {
        try {
          const token = await AsyncStorage.getItem("@user");
          const googleInfo = JSON.parse(token);
          const userAccount = await getUser(googleInfo.email);
          setUser(userAccount)
          const allUsers = await getAllUsers()
          setUserFriends(userAccount.profile.friends)
          const filteredUsers = allUsers.filter((user) => user._id !== userAccount._id);
          setPeople(filteredUsers)
        } catch (err) {
          console.log("error with users:", err);
        }
      }
      getProfiles()
    }, [])
  );


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleAddFriend = async (person) => {
    try {
      const updatedUserFriends = [...userFriends, person._id];
      setUserFriends(updatedUserFriends);
      await addFriend(user._id, person._id);
    } catch (error) {
      console.error("Error adding a friend:", error);
    }
  };

  const handleDeleteFriend = async (person) => {
    try {
      const updatedUserFriends = userFriends.filter((friendId) => friendId !== person._id);
      setUserFriends(updatedUserFriends);
      await deleteFriend(user._id, person._id);
    } catch (error) {
      console.error("Error adding a friend:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Find People</Text>
        <View
          style={[
            styles.inputContainer,
            { borderBottomColor: isFocused ? "rgb(149, 184, 57)" : "#000" },
          ]}
        >
          <TextInput
            style={[styles.searchInput, isFocused && { outline: "none" }]}
            placeholder="Search people"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity>
            <Icon name="search" size={20} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.recipeContainer}>
          {isLoading ? (
            <View style={styles.dotsWrapper}>
              <LoadingDots
                colors={["#95B839", "#95B839", "#95B839", "#95B839"]}
                size={10}
              />
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollPeopleContainer}>
              {people && people.map((person, index) => (
                <Pressable key={index} 
                  style={({ pressed }) => [
                    styles.personContainer,
                    {
                      backgroundColor: pressed ? "#f0f0f0" : "transparent",
                    },
                  ]}
                  onPress={() =>
                    userFriends.includes(person._id)
                      ? handleDeleteFriend(person)
                      : handleAddFriend(person)
                  }
                >
                  <View style={styles.personInfo}>
                    <Image source={require('../../assets/images/placeholder.png')} style={styles.personImage}/>
                    <Text style={styles.personLabel}>{person.name}</Text>
                  </View>
                  {userFriends.includes(person._id) ? (
                    <AntDesign name="checkcircle" size={24} color="green" />
                  ) : (
                    <AntDesign name="adduser" size={24} color="black" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    flexDirection: "column",
  },
  dotsWrapper: {
    width: 100,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  header: {
    color: "#000",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    marginTop: 30,
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    width: 250,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    color: "#777",
  },
  recipeContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  scrollPeopleContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300, 
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  personInfo: {
    flexDirection: "row",
    gap: 20,
    alignItems: 'center' 
  },
  personImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  personLabel: {
      fontSize: 18,
      fontFamily: 'Poppins',
      fontWeight: '500',
      color: '#000'
  }
});

export default PeopleScreen;
