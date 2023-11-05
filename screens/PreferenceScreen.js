import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { getUser, postUser } from '../services/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfilePreferences } from '../services/profile' 

function PreferencesScreen({ onComplete }) {
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);
  const [selectedDietLabels, setSelectedDietLabels] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDishTypes, setSelectedDishTypes] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('')
  const [isFocused, setIsFocused] = useState(false);

  const dietLabels = ["Balanced", "High-Fiber", "High-Protein", "Low-Carb", "Low-Fat", "Low-Sodium"];
  const healthLabels = ["Vegetarian", "Vegan", "Pescatarian", "Peanut-Free", "Dairy-Free", "Alcohol-Free", "Wheat-Free"];
  const cuisineType = ["American", "Asian", "British", "Caribbean", "Chinese", "Italian", "Mexican", "Japanese", "Indian"];
  const dishType = ["Biscuits and Cookies", "Bread", "Cereals", "Desserts", "Drinks", "Main Course"]


  const toggleSelection = (label, step) => {
    switch (step) {
      case 1:
        if (selectedDietLabels.includes(label)) {
          setSelectedDietLabels((prev) =>
            prev.filter((item) => item !== label)
          );
        } else {
          setSelectedDietLabels((prev) => [...prev, label]);
        }
        break;
      case 2:
        if (selectedHealthLabels.includes(label)) {
          setSelectedHealthLabels((prev) =>
            prev.filter((item) => item !== label)
          );
        } else {
          setSelectedHealthLabels((prev) => [...prev, label]);
        }
        break;
      case 3:
        if (selectedCuisines.includes(label)) {
          setSelectedCuisines((prev) => prev.filter((item) => item !== label));
        } else {
          setSelectedCuisines((prev) => [...prev, label]);
        }
        break;
      case 4:
        if (selectedDishTypes.includes(label)) {
          setSelectedDishTypes((prev) => prev.filter((item) => item !== label));
        } else {
          setSelectedDishTypes((prev) => [...prev, label]);
        }
        break;
      default:
        return;
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

const handleFinishSelections = async () => {

    const preferences = {
      diet: selectedDietLabels,
      health: selectedHealthLabels,
      cuisine: selectedCuisines,
      dish: selectedDishTypes,
    }
    try {
      const token = await AsyncStorage.getItem("@user");
      if (token) {
        const account = JSON.parse(token);
        const userInfo = {
          googleId: account.uid,
          name: userName,
          email: account.email,
        }
        const userAccount = await postUser(userInfo)
        await updateProfilePreferences(userAccount.profile, preferences)
        onComplete()
      }
    } catch (error) {
      console.error("Error fetching user token:", error);
    }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.sectionHeader}>Step {currentStep + 1} of 5</Text>
          {currentStep === 0 && (
            <View
            style={[
              styles.inputContainer,
              { borderBottomColor: isFocused ? "rgb(149, 184, 57)" : "#000" },
            ]}
          >
            <TextInput
              style={[styles.searchInput, isFocused && { outline: "none" }]}
              placeholder="Enter Full Name"
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </View>
          )}
          {currentStep === 1 && (
            <>
                <Text style={styles.labelHeader}>Select your diet type</Text>
                {dietLabels.map((label, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                    styles.option,
                    ]}
                    onPress={() => toggleSelection(label, currentStep)}
                >
                    <Text style={styles.optionText}>{label}</Text>
                    {selectedDietLabels.includes(label) ? (
                        <Feather name="check-circle" size={20} color="#16A736" />
                        ) : (
                        <AntDesign name="pluscircleo" size={20} color="black" />
                    )}
                </TouchableOpacity>
                ))}
            </>
          )}
          {currentStep === 2 && (
            <>
                <Text style={styles.labelHeader}>Select your health labels</Text>
                {healthLabels.map((label, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                    styles.option,
                    ]}
                    onPress={() => toggleSelection(label, currentStep)}
                >
                    <Text style={styles.optionText}>{label}</Text>
                    {selectedHealthLabels.includes(label) ? (
                        <Feather name="check-circle" size={20} color="#16A736" />
                        ) : (
                        <AntDesign name="pluscircleo" size={20} color="black" />
                    )}
                </TouchableOpacity>
                ))}
            </>
          )}
          {currentStep === 3 && (
            <>
                <Text style={styles.labelHeader}>Select your preferred cuisines</Text>
                {cuisineType.map((label, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                    styles.option,
                    ]}
                    onPress={() => toggleSelection(label, currentStep)}
                >
                    <Text style={styles.optionText}>{label}</Text>
                    {selectedCuisines.includes(label) ? (
                        <Feather name="check-circle" size={20} color="#16A736" />
                        ) : (
                        <AntDesign name="pluscircleo" size={20} color="black" />
                    )}
                </TouchableOpacity>
                ))}
            </>
          )}
          {currentStep === 4 && (
            <>
                <Text style={styles.labelHeader}>Select your preferred dish type</Text>
                {dishType.map((label, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                    styles.option,
                    ]}
                    onPress={() => toggleSelection(label, currentStep)}
                >
                    <Text style={styles.optionText}>{label}</Text>
                    {selectedDishTypes.includes(label) ? (
                        <Feather name="check-circle" size={20} color="#16A736" />
                        ) : (
                        <AntDesign name="pluscircleo" size={20} color="black" />
                    )}
                </TouchableOpacity>
                ))}
            </>
          )}
          {currentStep < 4 && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setCurrentStep(currentStep + 1)}
            >
              <Text style={styles.nextButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
          {currentStep === 4 && (
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinishSelections}
              // onPress={onComplete}
            >
              <Text style={styles.finishButtonText}>Save Preferences</Text>
            </TouchableOpacity>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    gap: 30,
    paddingTop: 20,
  },
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#8ABB00",
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    width: 250,
    marginTop: 20,
  },
  labelHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#424242",
    fontFamily: "Poppins",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: 250,
    justifyContent: "space-between",
  },

  selectedOption: {
    backgroundColor: "lightblue",
  },
  optionText: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "#000",
  },
  nextButton: {
    flexDirection: "row",
    backgroundColor: "rgb(149, 184, 57)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    maxWidth: "max-content",
    marginVertical: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    fontWeight: "600",
  },
  finishButton: {
    flexDirection: "row",
    backgroundColor: "rgb(149, 184, 57)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    maxWidth: "max-content",
    marginVertical: 20,
  },
  finishButtonText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    fontWeight: "600",
  },
});

export default PreferencesScreen;
