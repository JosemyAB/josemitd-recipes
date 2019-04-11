import {Ingredient} from '../../common/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';


export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
};

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 50)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {...ingredient, ...action.payload.ingredient};
      const allIngredients = [...state.ingredients];
      allIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: [...state.ingredients, allIngredients]
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: oldIngredients
      };
    default:
      return state;
  }
}
