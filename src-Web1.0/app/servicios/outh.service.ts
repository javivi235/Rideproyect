import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class OuthService {

  constructor(
    public afAuth: AngularFireAuth

  ) { }

  //Métodos para los componentes

  //**Creación de Usuarios

  registerUser(nombre: string, apellido: string, codigo: number,
                email: string, celular: number, username: string,
                password: string ) {
    return new Promise((resolve, reject)  => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
      err => reject (err));
    });
  }



  logout() {
    return this.afAuth.auth.signOut();
  }

// These rules require authentication
 /* {
    "rules": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }*/

//Servicio categoría amplia
}
