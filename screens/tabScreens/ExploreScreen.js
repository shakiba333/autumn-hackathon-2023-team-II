import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import LoadingDots from "react-native-loading-dots";
import RecipeList from '../../components/RecipeList';
import { MaterialIcons } from '@expo/vector-icons';

const ExploreScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  let randomNumber = Math.floor(Math.random() * 20);
  randomNumber = randomNumber < 6 ? 6 : randomNumber;
  const iconName = "favorite-border"
  const iconColor = "black"

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchIconClick = async () => {
    setIsLoading(true)
    const edamamApiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=41abb1f4&app_key=375f32061b6e7ab61e5b1808f4469c1e`;
    try {
      const recipeData = await axios.get(edamamApiUrl);
      const recipes = recipeData.data.hits || [];
      const sliceEnd = randomNumber;
      const sliceStart = randomNumber - 6;
      setRecipes(recipes.slice(sliceStart, sliceEnd));
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>
          Find Recipes
        </Text>
        <View
          style={[
            styles.inputContainer,
            { borderBottomColor: isFocused ? 'rgb(149, 184, 57)' : '#000' },
          ]}
        >
          <TextInput
            style={[
              styles.searchInput,
              isFocused && { outline: 'none' },
            ]}
            placeholder="Search for recipes"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity onPress={handleSearchIconClick}>
            <Icon name="search" size={20} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.recipeContainer}>
          {isLoading ? (
            <View style={styles.dotsWrapper}>
                <LoadingDots colors={['#95B839', '#95B839', '#95B839', '#95B839']}  size={10}/>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollRecipeContainer}> 
              <RecipeList recipes={recipes} iconColor={iconColor} iconName={iconName} />
            </ScrollView> 
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    // backgroundColor: '#EAA237',
    // height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    flexDirection: 'column'
  },
  dotsWrapper: {
    width: 100,
  },
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#777',
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
  }
});

export default ExploreScreen;
