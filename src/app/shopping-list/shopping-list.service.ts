import {Ingredient} from '../common/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {

  ingredientesChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 1),
    new Ingredient('Tomatoes', 5)
  ];

  addIngredients(ingredients: Ingredient[]) {
    // Transform the list to simple elements
    this.ingredients.push(...ingredients);
    this.ingredientesChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngr: Ingredient) {
    this.ingredients[index] = newIngr;
    this.ingredientesChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientesChanged.next(this.ingredients.slice());
  }

}



