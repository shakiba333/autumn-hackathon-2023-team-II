import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RecipeList from "../components/RecipeList";
import axios from "axios";
import { getUser } from "../services/user";
import {
  postMeal,
  findMealByEdamamId,
  deleteMealByEdamamId,
} from "../services/meal";
import { updateGroupMeals } from "../services/group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import LoadingScreen from "./LoadingScreen";

function Suggestions({ selectedMeal, selectedFriends }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const iconName = "add-circle";
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [shouldPostMeal, setShouldPostMeal] = useState(false);
  const [shouldDeleteMeal, setShouldDeleteMeal] = useState(false);
  const [saveFormattedMeal, setSaveFormattedMeal] = useState({
    api_id: "",
    uri: "",
    label: "",
    cuisineType: [],
    numberOfIngredients: 0,
    totalTime: 0,
    shareAs: "",
    image: ""
  });
  const [deleteMeal, setDeleteMeal] = useState();

  useEffect(() => {
    console.log("selected was", selectedMeal);
    console.log(selectedFriends)
    let edamamApiUrl;
    const edamamAppId = process.env.REACT_APP_EDAMAM_APP_ID;
    const edamamApiKey = process.env.REACT_APP_EDAMAM_API_KEY;
    if (selectedMeal === "Teatime") {
      edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=tea&app_id=${edamamAppId}&app_key=${edamamApiKey}`;
    } else if (selectedMeal === "Brunch") {
      edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=brunch&app_id=${edamamAppId}&app_key=${edamamApiKey}`;
    } else if (selectedMeal === "Lunch/Dinner") {
      edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=lunch&app_id=${edamamAppId}&app_key=${edamamApiKey}`;
    } else {
      edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=steak%20bites&app_id=${edamamAppId}&app_key=${edamamApiKey}&mealType=${selectedMeal}`;
    }
    axios
      .get(edamamApiUrl)
      .then((response) => {
        const recipeData = response.data.hits || [];
        if (recipeData.length < 6) {
          setRecipes(recipeData);
        } else {
          let randomNumber = Math.floor(Math.random() * recipeData.length);
          randomNumber = randomNumber < 4 ? 4 : randomNumber;
          const sliceEnd = randomNumber;
          const sliceStart = randomNumber - 4;
          setRecipes(recipeData.slice(sliceStart, sliceEnd));
        }
        setTimeout(() => setIsLoading(false), 3000);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (shouldPostMeal) {
      postMeal(saveFormattedMeal);
      handleUpdateGroup(saveFormattedMeal.api_id);
    }
  }, [saveFormattedMeal, shouldPostMeal]);

  useEffect(() => {
    const deleteAndHandleUpdate = async () => {
      if (shouldDeleteMeal) {
        await handleUpdateGroup(deleteMeal);
        await deleteMealByEdamamId(deleteMeal);
      }
    };

    deleteAndHandleUpdate();
  }, [deleteMeal, shouldDeleteMeal]);

  const handleUpdateGroup = async (edamamId) => {
    const token = await AsyncStorage.getItem("@user");
    if (token) {
      const googleInfo = JSON.parse(token);
      const userToken = await getUser(googleInfo.email);
      const personalGroupId = userToken.profile.groups[0]._id;
      const meal = await findMealByEdamamId(edamamId);
      await updateGroupMeals(personalGroupId, meal?._id);
    }
  };

  const handleRecipeSelect = (recipe) => {
    const index = selectedRecipes.findIndex(
      (selectedRecipe) => selectedRecipe.recipe.uri === recipe.recipe.uri
    );
    if (index === -1) {
      setSelectedRecipes([...selectedRecipes, recipe]);
      setSaveFormattedMeal((prevSaveFormattedMeal) => {
        return {
          api_id: recipe.recipe.uri ? recipe.recipe.uri.split("_")[1] : "",
          uri: recipe.recipe.uri,
          label: recipe.recipe.label,
          cuisineType: recipe.recipe.cuisineType,
          numberOfIngredients: recipe.recipe.ingredients.length,
          totalTime: recipe.recipe.totalTime,
          shareAs: recipe.recipe.shareAs,
          image: recipe.recipe.image,
        };
      });
      setShouldPostMeal(true);
    } else {
      const newSelectedRecipes = [...selectedRecipes];
      setDeleteMeal((prevDeleteMeal) => {
        return selectedRecipes[index].recipe.uri.split("_")[1];
      });
      newSelectedRecipes.splice(index, 1);
      setSelectedRecipes(newSelectedRecipes);
      setShouldDeleteMeal(true);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Meal Suggestions</Text>
      <RecipeList
        recipes={recipes}
        iconName={iconName}
        onSelect={handleRecipeSelect}
        selectedRecipes={selectedRecipes}
      />
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontSize: 24,
    margin: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },

  button: {
    flexDirection: "row",
    backgroundColor: "rgb(149, 184, 57)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    maxWidth: "max-content",
    marginVertical: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    fontWeight: "600",
  },
});

export default Suggestions;
