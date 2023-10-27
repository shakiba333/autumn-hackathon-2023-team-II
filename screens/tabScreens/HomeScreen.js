import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import RecipeList from "../../components/RecipeList";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_API } from "@env";
import LoadingDots from "react-native-loading-dots";
import { postMeal, deleteMealByEdamamId } from "../../services/meal";
import { getAuth, signOut } from "firebase/auth";

export default function HomeScreen() {
  console.log("dotenv " + process.env.REACT_APP_EDAMAM_APPLICATION_ID);

  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const foodItems = [
    "chicken",
    "pasta",
    "salad",
    "sushi",
    "pizza",
    "burger",
    "soup",
    "taco",
    "sandwich",
    "steak",
  ];
  const randomFood = foodItems[Math.floor(Math.random() * foodItems.length)];
  let randomNumber = Math.floor(Math.random() * 20);
  randomNumber = randomNumber < 4 ? 4 : randomNumber;
  const navigation = useNavigation();

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
    date: "",
    time: "",
  });
  const [deleteMeal, setDeleteMeal] = useState();

  const iconName = "more-horiz";
  const iconColor = "red";

  const auth = getAuth();

  useEffect(() => {
    const edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${randomFood}&app_id=41abb1f4&app_key=375f32061b6e7ab61e5b1808f4469c1e`;
    axios
      .get(edamamApiUrl)
      .then((response) => {
        const recipeData = response.data.hits || [];
        const sliceEnd = randomNumber;
        const sliceStart = randomNumber - 4;
        setRecipes(recipeData.slice(sliceStart, sliceEnd));
        setTimeout(() => setIsLoading(false), 4000);
        // setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (shouldPostMeal) {
      postMeal(saveFormattedMeal);
    }
  }, [saveFormattedMeal, shouldPostMeal]);

  useEffect(() => {
    if (shouldDeleteMeal) {
      deleteMealByEdamamId(deleteMeal);
    }
  }, [deleteMeal, shouldDeleteMeal]);

  const handleRecipeSelect = (recipe) => {
    const index = selectedRecipes.findIndex(
      (selectedRecipe) => selectedRecipe.recipe.uri === recipe.recipe.uri
    );
    console.log(index);
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
          date: "",
          time: "",
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
  console.log(selectedRecipes);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Image
          source={require("../../assets/meal-logo.png")}
          style={styles.loadingLogo}
        />
        <View style={styles.dotsWrapper}>
          <LoadingDots colors={["#FFF", "#FFF", "#FFF", "#FFF"]} size={10} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={["#EAAD37", "rgba(255, 255, 255, 0.00)"]}
          style={styles.gradient}
        >
          <Pressable onPress={handleSignOut}><Text>Sign Out</Text></Pressable>
          <Image
            source={require("../../assets/meal-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerText}>
            Welcome! {process.env.REACT_APP_API}
          </Text>
          <RecipeList
            recipes={recipes}
            iconColor={iconColor}
            iconName={iconName}
            onSelect={handleRecipeSelect}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Cravings")}
          >
            <Text style={styles.buttonText}>Let's CollaborEat</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "#EAA237",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    flexDirection: "column",
  },
  loadingLogo: {
    width: 250,
    height: 250,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    flexDirection: "column",
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
  logo: {
    width: 250,
    height: 250,
    marginTop: 10,
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
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    fontWeight: "600",
  },
});
