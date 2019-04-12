import {HttpClient, HttpRequest} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from '../store/recipes.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {Store} from '@ngrx/store';
import * as fromRecipes from '../store/recipes.reducers';

export class RecipesEffect {

  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-3df37.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      });
    }),
    map((recipes) => {
        // Inicializa los ingreciones si están vacíos
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.FETCH_RECIPES,
          payload: recipes
        };
      }
    ));

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES)
    , withLatestFrom(this.store.select('recipes'))
    , switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-3df37.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
    })
  );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipes.FeatureState>) {
  }
}
