import * as firebase from 'firebase';

export class AuthService {
  token: string;

  singinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  singupUser(email: string, password: string) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then((response) => {
        return firebase.auth().currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        this.token = token;
      });
    return this.token;
  }
}
