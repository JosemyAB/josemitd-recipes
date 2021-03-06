import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Recipe} from '../recipes/recipe-list/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-3df37.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
      //{params: new HttpParams().set('auth', token)});

    const req = new HttpRequest('PUT', 'https://ng-recipe-book-3df37.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
      {
        reportProgress: true,
        params: new HttpParams().set('auth', token)});

    return this.http.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get<Recipe[]>('https://ng-recipe-book-3df37.firebaseio.com/recipes.json')
    //{params: new HttpParams().set('auth', token)}
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
