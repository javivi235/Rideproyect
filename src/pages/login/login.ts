import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import {FirebasedatabaseLift, firebasConfig} from '../../components/components-firebase/components-firebase';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @Input('username') username: string;
  @Input('pass') pass: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    FirebasedatabaseLift.getInstance();
  
  }
  
  botonlogin(){
    console.log('boton log in presionado');
   const clave = this.pass;
   const nickname = this.username;
   const navct = this.navCtrl;
   const alct = this.alertCtrl;
    
    if(nickname !== undefined && clave !== undefined) {
    firebase.database().ref('Usuarios').child(this.username).child('email').on('value', function(snapshot) {

      if(snapshot.exportVal() === null) {
        
        let alert = alct.create({
          title: 'Error',
          subTitle: 'Usuario no encontrado',
          buttons: ['OK']
        });
        alert.present();

      } else{
        firebase.auth().signInWithEmailAndPassword(snapshot.exportVal(), clave).then((resp) => {
      
          console.log('success');
          navct.push(HomePage,{nickname: nickname});
        
        }, (err) => {
          let alert = alct.create({
            title: 'Error',
            subTitle: 'Contraseña incorrecta',
            buttons: ['OK']
          });
          alert.present();
        });
      }
    });
  } else{
      let alert1 = alct.create({
        title: 'Error',
        subTitle: 'Rellene todos los campos',
        buttons: ['OK']
      });
      alert1.present();
  }    
      
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
      FirebasedatabaseLift.getInstance();

  }

}
