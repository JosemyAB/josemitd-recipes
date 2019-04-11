import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {map} from 'rxjs-compat/operator/map';
import {switchMap} from 'rxjs-compat/operator/switchMap';
import {fromPromise} from 'rxjs-compat/observable/fromPromise';
import {mergeMap} from 'rxjs-compat/operator/mergeMap';


@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP))
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      return [{
        type: AuthActions.SIGNUP
      },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }];
    });

  @Effect()
  authSignin  = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN))
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/'])
      return [{
        type: AuthActions.SIGNIN
      },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }];
    });

  constructor(private actions$: Actions, private router: Router) {}

}
