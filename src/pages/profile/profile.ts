
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  nickname: '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.nickname = this.navParams.get('nickname');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  botonHome() {

    this.navCtrl.push(HomePage,{nickname: this.nickname});

  }

  botonLogOut(){

    this.navCtrl.push(LoginPage);
  
  }
  
}
