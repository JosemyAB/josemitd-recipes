import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import {map, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';


@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP))
    .pipe(map((action: AuthActions.TrySignup) => {
      return action.payload;
    }), switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }), switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }), mergeMap((token: string) => {
      return [{
        type: AuthActions.SIGNUP
      },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }];
    }));

  constructor(private actions$: Actions) {}

}
