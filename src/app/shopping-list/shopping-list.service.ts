import {Ingredient} from '../common/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {

  ingredientesChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 1),
    new Ingredient('Tomatoes', 5)
  ];

  getShoppingListIngredients() {
    return this.ingredients.slice();
  }

  onAddNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientesChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    //Transform the list to simple elements
    this.ingredients.push(...ingredients);
    this.ingredientesChanged.next(this.ingredients.slice());
  }

}



