import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import{ProfilePage} from '../../pages/profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  botonRide(){
    console.log("Dispuesto a llevar a alguien");

  }
  botonLift(){
    console.log("buscando aventon");
  }
  botonLogOut(){
    this.navCtrl.push(LoginPage);
  }
  botonPerfil(){
    this.navCtrl.push(ProfilePage);
  }

}
