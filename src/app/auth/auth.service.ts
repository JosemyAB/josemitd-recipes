import * as firebase from 'firebase';
import {error} from '@angular/compiler/src/util';

export class AuthService {

  singinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {console.log(response);})
      .catch((error) => {console.log(error);});
  }

  singupUser(email: string, password: string) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .catch((error) => {console.log(error)});
  }
}
