import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import{ProfilePage} from '../../pages/profile/profile';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad(){
  this.DisplayMap();  
  
}
  DisplayMap() {
    let location = new google.maps.LatLng(-17.378276, -66.149843);

    const options = {
      center: location,
      zoom: 18,
      streetViewControl: false,
      mapTypeId: 'roadmap'
    };

    const map = new google.maps.Map(this.mapRef.nativeElement, options);
   

  }

  addMarker(position, map){

    return new google.maps.Marker({
      position,
      map
    });

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
