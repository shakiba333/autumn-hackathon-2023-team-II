import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { getUser } from '../services/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfilePreferences } from '../services/profile' 

function PreferencesScreen({ onComplete }) {
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);
  const [selectedDietLabels, setSelectedDietLabels] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDishTypes, setSelectedDishTypes] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);


  const dietLabels = ["Balanced", "High-Fiber", "High-Protein", "Low-Carb", "Low-Fat", "Low-Sodium"];
  const healthLabels = ["Vegetarian", "Vegan", "Pescatarian", "Peanut-Free", "Dairy-Free", "Alcohol-Free", "Wheat-Free"];
  const cuisineType = ["American", "Asian", "British", "Caribbean", "Chinese", "Italian", "Mexican", "Japanese", "Indian"];
  const dishType = ["Biscuits and Cookies", "Bread", "Cereals", "Desserts", "Drinks", "Main Course"]


  const toggleSelection = (label, step) => {
  
    switch (step) {
      case 1:
        if (selectedDietLabels.includes(label)) {
            setSelectedDietLabels((prev) => prev.filter((item) => item !== label));
          } else {
            setSelectedDietLabels((prev) => [...prev, label]);
          }
        break;
      case 2:
        if (selectedHealthLabels.includes(label)) {
            setSelectedHealthLabels((prev) => prev.filter((item) => item !== label));
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
} 

const handleFinishSelections = async () => {

    const preferences = {
      diet: selectedDietLabels,
      health: selectedHealthLabels,
      cuisine: selectedCuisines,
      dish: selectedDishTypes,
    }
    try {
      const token = await AsyncStorage.getItem('@user');
      if (token) {
          const googleInfo = JSON.parse(token);
          const userToken = await getUser(googleInfo.email)
          console.log(userToken)
          await updateProfilePreferences(userToken.profile?._id, preferences)
      }
      onComplete()
    } catch (err) {
      console.log('error', err)
    }

};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.sectionHeader}>Step {currentStep} of 4</Text>
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
    alignItems: 'center',
    backgroundColor: '#FFF',
    gap: 30,
    paddingTop: 20
  },
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: '#8ABB00',
  },
  labelHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: '#424242',
    fontFamily: 'Poppins'
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
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000'
  },
  nextButton: {
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
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
    fontWeight: '600',
  },
  finishButton: {
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
  finishButtonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
    fontWeight: '600',
  },
});

export default PreferencesScreen;
