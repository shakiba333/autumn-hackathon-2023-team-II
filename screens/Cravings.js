import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

function Cravings({ navigation }) {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const mealTypes = [
    { label: "Breakfast", },
    { label: "Brunch",  },
    { label: "Lunch/Dinner",  },
    { label: "Snack", },
    { label: "Teatime",  },
  ];

  useEffect(() => {
    console.log(selectedMeal);
  }, [selectedMeal]);

  const handleMealSelection = (mealType) => {
    setSelectedMeal(mealType.label);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          {/* <Image source={mealType.image} style={styles.buttonImage} /> */}
          <Text style={styles.buttonLabel}>{mealType.label}</Text>
        </TouchableOpacity>
      ))}
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
  },
  mealButton: {
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "lightblue",
  },
  buttonImage: {
    width: 24,
    height: 24,
  },
  buttonLabel: {
    fontSize: 16,
    color: '#FFF',
    fontStyle: 'normal',
    fontWeight: '500',
    fontFamily: 'Poppins'
  },
});

export default Cravings;
