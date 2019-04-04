import {Recipe} from './recipe-list/recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../common/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [new Recipe('Test Recipe', 'Test Description',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4KaZ5MO1e-wpUwC0AjULvPxFVPYvSPoMsV9gF2H7SLjKt8NBZ',[
      new Ingredient('Bread', 1),
      new Ingredient('Fish', 6)
    ]),
    new Recipe('Test Recipe B', 'Test Description B',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4KaZ5MO1e-wpUwC0AjULvPxFVPYvSPoMsV9gF2H7SLjKt8NBZ',[
        new Ingredient('Meat', 2),
        new Ingredient('Tomatoes', 5)
      ])];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    // Returns a copy
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    console.log('service:' + index);
    return this.recipes.slice()[index];
  }

}
