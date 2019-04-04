import {Ingredient} from '../common/ingredient.model';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ShoppingListService {

  ingredientesChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 1),
    new Ingredient('Tomatoes', 5)
  ];

  getShoppingListIngredients() {
    return this.ingredients.slice();
  }

  onAddNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientesChanged.emit(this.ingredients.slice());
  }

}



