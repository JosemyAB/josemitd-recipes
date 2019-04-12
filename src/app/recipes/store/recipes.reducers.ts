import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../store/app.reducers';

// Utilizado para lazy load
export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ]};

export function recipesReducers(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPES:
      // Coger el elemento
      const recipeToUpdate = state.recipes[action.payload.index];
      // Actualizarlo
      const updatedRecipe = {
        ...recipeToUpdate,
        ...action.payload.recipe
      };
      // Coger el listado
      const currentRecipes = [...state.recipes];
      // Actualizar el elemento
      currentRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: currentRecipes
      };
    case
    RecipesActions.DELETE_RECIPES:
      // Coger el ARray
      const allRecipes = [...state.recipes];
      allRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: allRecipes
      };
    default:
      return state;
  }
}
