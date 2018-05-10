import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { User } from '../../modelos/user';
import { last } from '@angular/router/src/utils/collection';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

public firstname: '';
public lastname: '';
public cell: number;
public username: '';
public email: '';
public password: '';

  constructor(public authService: AuthService, public router: Router) 
  {
   //firebase.initializeApp(environment.firebaseConfig);
  }
  ngOnInit() 
  {
  }

  //verifica en consola si el usuario se registra correctamente
  onSubmitAddUser()
  {

    //var contra = this.password
    var authService = this.authService;
    var router = this.router;
   
    const newUser = new User(this.username, this.firstname, this.lastname, this.email, this.cell, this.password);
    
    firebase.database().ref('usuarios').child(newUser.username).once('value', function(snapshot)
  {
    if(snapshot.exists())
    {
      console.log("Usuario ya existente");
    }
    else 
    {
      console.log(newUser.email);
      console.log(newUser.password)
      console.log("registrando usuario");
      authService.registerUser(newUser.email, newUser.password)
    .then((res) => {router.navigate(['/privado']);
  }).catch((err) => {
    console.log("no se pudo registrar al usuario");
    console.log(err);
  });
      firebase.database().ref('usuarios').child(newUser.username).set(
      {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        cell: newUser.cell,
        score: newUser.score
      });
    }
  });
  }
}
