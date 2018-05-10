import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

//Autentificación de los usuarios a la base de datos firebase
@Injectable()
export class AuthService 
{

  constructor(public afAuth: AngularFireAuth) 
  {  
  }
  //Metodo para el registro de usuario
  registerUser(email: string, pass: string)
  {
    console.log("registering user w8 plz...");
    return new Promise((resolve, reject)=>{
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(userData => resolve(userData), err => reject(err));
    });
  }
  //Metodo para el inicio de cesión de usuario
  login(email: string, pass: string)
  {
    return new Promise((resolve, reject)=>{
    this.afAuth.auth.signInWithEmailAndPassword(email, pass)
    .then(userData => resolve(userData), err => reject(err));
    });
  }

  getAuth()
  {
    return this.afAuth.authState.map(auth => auth);
  }

  //Metodo para el cierre de cesión de usuario
  logout()
  {
    return this.afAuth.auth.signOut;
  }

}
