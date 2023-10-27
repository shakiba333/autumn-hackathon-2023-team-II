import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import RecipeList from '../../components/RecipeList';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API } from '@env';
import LoadingDots from "react-native-loading-dots";

export default function HomeScreen() {
  console.log("dotenv " + process.env.REACT_APP_EDAMAM_APPLICATION_ID)

  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const foodItems = ['chicken', 'pasta', 'salad', 'sushi', 'pizza', 'burger', 'soup', 'taco', 'sandwich', 'steak'];
  const randomFood = foodItems[Math.floor(Math.random() * foodItems.length)];
  let randomNumber = Math.floor(Math.random() * 20);
  randomNumber = randomNumber < 4 ? 4 : randomNumber;
  const navigation = useNavigation();

  const iconName = "more-horiz"
  const iconColor = "red"


  useEffect(() => {
    const edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${randomFood}&app_id=41abb1f4&app_key=375f32061b6e7ab61e5b1808f4469c1e`;
    axios.get(edamamApiUrl)
      .then(response => {
        const recipeData = response.data.hits || [];
        const sliceEnd = randomNumber;
        const sliceStart = randomNumber - 4;
        setRecipes(recipeData.slice(sliceStart, sliceEnd));
        setTimeout(()=> setIsLoading(false), 4000)
        // setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Image source={require('../../assets/meal-logo.png')} style={styles.loadingLogo} />
        <View style={styles.dotsWrapper}>
            <LoadingDots colors={['#FFF', '#FFF', '#FFF', '#FFF']}  size={10}/>
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
          <Image source={require('../../assets/meal-logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>Welcome! {process.env.REACT_APP_API}</Text>
          <RecipeList recipes={recipes} iconColor={iconColor} iconName={iconName} />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cravings')}>
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
      backgroundColor: '#EAA237',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
      flexDirection: 'column'
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: "100%",
    height: '100%',
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    margin: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 10
  },
  button: {
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
    fontWeight: '600',
  },
});
