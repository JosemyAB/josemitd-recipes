import {Recipe} from './recipe-list/recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [new Recipe('Test Recipe', 'Test Description',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4KaZ5MO1e-wpUwC0AjULvPxFVPYvSPoMsV9gF2H7SLjKt8NBZ'),
    new Recipe('Test Recipe B', 'Test Description B',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4KaZ5MO1e-wpUwC0AjULvPxFVPYvSPoMsV9gF2H7SLjKt8NBZ')];

  getRecipes() {
    // Returns a copy
    return this.recipes.slice();
  }

}
