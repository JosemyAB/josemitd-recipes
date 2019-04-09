import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe-list/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-3df37.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get<Recipe[]>('https://ng-recipe-book-3df37.firebaseio.com/recipes.json')
      .pipe(map(
        (recipes: Recipe[]) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (data: Recipe[]) => {
          this.recipeService.setRecipes(data);
        }
      );
  }
}
