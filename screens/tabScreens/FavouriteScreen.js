import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteFavoriteMeal, getUserFavorites } from "../../services/group";
import { getUser } from "../../services/user";

const FavouriteScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const iconName = "favorite-border";
  const iconColor = "black";

  useFocusEffect(
    React.useCallback(() => {
      const getFavorites = async () => {
        const token = await AsyncStorage.getItem("@user");
        try {
          if (token) {
            const googleInfo = JSON.parse(token);
            const userToken = await getUser(googleInfo.email);
            setUser(userToken);
            const personalGroupId = userToken.profile.groups[0]._id;
            const favoriteRecipes = await getUserFavorites(personalGroupId);
            setRecipes(favoriteRecipes);
            setIsLoading(false);
          }
        } catch (err) {
          console.log("error:", err);
          setIsLoading(false);
        }
      };
      getFavorites();
    }, [])
  );

  const deleteFavorite = async (mealId) => {
    const groupId = user.profile.groups[0]._id;
    try {
      await deleteFavoriteMeal(groupId, mealId);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== mealId)
      );
    } catch (err) {
      console.log("error deleting favorite:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Saved Recipes</Text>
        <View style={styles.recipeContainer}>
          {isLoading ? (
            <Text>So empty ...</Text>
          ) : (
            recipes.map((recipe, index) => (
              <View
                style={[
                  styles.recipeItem,
                  { backgroundImage: `url(${recipe.image})` },
                ]}
                key={index}
              >
                {/* <View style={styles.recipeItem} key={index} > */}
                <View style={styles.recipeCuisine}>
                  <View style={styles.recipeCuisineLeft}>
                    <Text style={styles.recipeCuisineName}>
                      {recipe.cuisineType}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.recipeCuisineRight}
                    onPress={() => deleteFavorite(recipe._id)}
                  >
                    <Ionicons
                      name={"star-sharp"}
                      size={16}
                      color={"rgb(149, 184, 57)"}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.recipeDetails}>
                  <Text style={styles.recipeDetailsLabel}>{recipe.label}</Text>
                  <Text style={styles.recipeDetailsInfo}>
                    {recipe.numberOfIngredients} Ingredients |{" "}
                    {recipe.totalTime} min
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cravings")}
        >
          <Text style={styles.buttonText}>Plan Next Meal</Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
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
  recipeContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  recipeItem: {
    height: "149.25px",
    width: "200px",
    justifyContent: "center",
    backgroundColor: "lightgray",
    margin: 10,
    borderRadius: 10,
    flexDirection: "column",
    backgroundSize: "cover",
  },
  recipeDetails: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  recipeCuisine: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeCuisineName: {
    color: "#FFF",
    fontFamily: "Poppins",
    fontSize: 14,
    textTransform: "capitalize",
  },
  recipeCuisineLeft: {
    backgroundColor: "rgba(48, 48, 48, 0.30)",
    backdropFilter: "blur(2.5px)",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: "max-content",
    borderRadius: 4,
  },
  recipeCuisineRight: {
    width: 22,
    height: 22,
    borderRadius: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  recipeDetailsLabel: {
    fontWeight: 700,
    color: "#FFF",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
  recipeDetailsInfo: {
    fontWeight: 400,
    color: "#FFF",
  },
  scrollRecipeContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
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
