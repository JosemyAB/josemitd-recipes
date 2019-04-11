
import {Ingredient} from '../../common/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';



const initialState = {
  ingredients: [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 50)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    default:
      return state;
  }
}
