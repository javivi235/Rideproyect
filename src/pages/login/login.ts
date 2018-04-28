import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AngularFireAuth} from 'angularfire2/auth';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AngularFireAuth) {
  }
  botonlogin(){
    //console.log(this.email + ' ' + this.pass);
    //AIzaSyCIX2OMQdLI_KT-URPkXufyulPywuTniMk
    //this.auth.app.auth().signInWithEmailAndPassword(this.username, this.pass);
    //console.log(this.auth.app.auth().currentUser.uid);
    this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
