import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import AddMembersScreen from "./AddMembersScreen";
import { Ionicons } from '@expo/vector-icons';
import Suggestions from "./Suggestions";
import { getUserProfile } from "../services/profile";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Cravings({ navigation }) {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [userProfile, setUserProfile] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([])
  
  const mealTypes = [
    { label: "Breakfast", image: require('../assets/images/breakfast.jpg') },
    { label: "Brunch", image: require('../assets/images/brunch.jpg') },
    { label: "Lunch/Dinner", image: require('../assets/images/linner.jpg') },
    { label: "Snack", image: require('../assets/images/snack.jpg') },
    { label: "Teatime", image: require('../assets/images/teatime.jpg') },
  ];
  
  useFocusEffect(
    React.useCallback(() => {
      const getProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("@user");
          const googleInfo = JSON.parse(token);
          const userProfile = await getUserProfile(googleInfo.email);
          setUserProfile(userProfile)
          setUserFriends(userProfile.friends)
        } catch (err) {
          console.log("error with profile:", err);
        }
      }
      getProfile()
    }, [])
  );

  const handleMealSelection = (mealType) => {
    console.log(mealType.label);
    setSelectedMeal(mealType.label);
    setCurrentStep(currentStep + 1);
  };

  const getSuggestions = () => {
    setCurrentStep(currentStep + 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      {currentStep === 1 && (
        <>
          <Text style={styles.heading}>What type of meal are we having?</Text>
          {mealTypes.map((mealType, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.mealButton,
                selectedMeal === mealType.label && styles.selectedMealButton
              ]}
              onPress={() => handleMealSelection(mealType)}
            >
              <Text style={styles.buttonLabel}>{mealType.label}</Text>
              <Image source={mealType.image} style={styles.buttonImage} />
            </TouchableOpacity>
          ))}
        </>
      )}
      {currentStep === 2 && (
        <>
          <AddMembersScreen friends={userFriends} selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends} />
          <TouchableOpacity style={styles.submitButton} onPress={() => getSuggestions()}>
            <Text style={styles.submitButtonText}>Get Suggestions</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </>
      )}
      {currentStep === 3 && <Suggestions selectedMeal={selectedMeal} selectedFriends={selectedFriends} />}
    </SafeAreaView>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#FFF'
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 700,
    width: 200, 
    textAlign: 'center',
  },
  mealButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    height: 56,
    width: 305,
    paddingHorizontal: 16,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: 'rgb(182,126,41)'
  },
  selectedMealButton: {
    backgroundColor: "rgb(149, 184, 57)"
  },
  buttonImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    objectFit: 'fill'
  },
  buttonLabel: {
    fontSize: 16,
    color: '#FFF',
    fontStyle: 'normal',
    fontWeight: '500',
    fontFamily: 'Poppins'
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: 'rgb(149, 184, 57)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    maxWidth: 'max-content',
    marginVertical: 20
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
    fontWeight: '600',
  },
});

export default Cravings;
