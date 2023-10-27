import { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView, Text, TouchableOpacity, } from 'react-native'
import RecipeList from '../../components/RecipeList';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const FavouriteScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  const iconName = "favorite-border"
  const iconColor = "black"

  useEffect(() => {
    // retrieve favorites from backend
    // setIsLoading(false)
    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>
          Saved Recipes
        </Text>
        <View style={styles.recipeContainer}>
          {isLoading ? (
            <Text>So empty ...</Text>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollRecipeContainer}> 
              <RecipeList recipes={recipes} iconColor={iconColor} iconName={iconName} />
            </ScrollView> 
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
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    color: '#000',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: 30,
    fontSize: 20,
  },
  recipeContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  scrollRecipeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start'
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