import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RecipeList = ({ recipes, iconName, iconColor, onSelect }) => {
  
  return (
    <View style={styles.recipeListContainer}>
      {recipes.map((recipe, index) => (
        <View style={[styles.recipeItem, { backgroundImage: `url(${recipe.recipe.image})` }]} key={index}>
          <View style={styles.recipeCuisine}>
            <View style={styles.recipeCuisineLeft}>
              <Text style={styles.recipeCuisineName}>{recipe.recipe.cuisineType}</Text>
            </View>
            <TouchableOpacity style={styles.recipeCuisineRight} onPress={()=>onSelect(recipe)}>
                <MaterialIcons name={iconName} size={16} color={iconColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.recipeDetails}>
            <Text style={styles.recipeDetailsLabel}>{recipe.recipe.label}</Text>
            <Text style={styles.recipeDetailsInfo}>{recipe.recipe.ingredients.length} Ingredients | {recipe.recipe.totalTime} min</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  recipeListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  recipeItem: {
    height: '149.25px',
    width: '200px',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    margin: 10,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundSize: 'cover'
  },
  recipeDetails: {
    alignItems: 'flex-start', 
    justifyContent: 'flex-end',
    flex: 1, 
    paddingHorizontal: 10, 
    paddingBottom: 10,
  },
  recipeCuisine: {
    flex: 1, 
    paddingHorizontal: 10, 
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  recipeCuisineName: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    textTransform: 'capitalize'
  },
  recipeCuisineLeft: {
    backgroundColor: 'rgba(48, 48, 48, 0.30)',
    backdropFilter: 'blur(2.5px)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: 'max-content',
    borderRadius: 4
  },
  recipeCuisineRight: {
    width: 22, 
    height: 22, 
    borderRadius: 20, 
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeDetailsLabel: {
    fontWeight: 700,
    color: '#FFF',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  recipeDetailsInfo: {
    fontWeight: 400,
    color: '#FFF'
  }
});

export default RecipeList;
