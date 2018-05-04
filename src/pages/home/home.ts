import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import{ProfilePage} from '../../pages/profile/profile';
import { Geolocation } from '@ionic-native/geolocation';
import {FirebasedatabaseLift} from '../../components/components-firebase/components-firebase'
import * as firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//Mapa obtenido del html

  @ViewChild('map') mapRef: ElementRef;
  map : any;
  marker: any;
 // directionsService: any = null;
 // directionsDisplay: any = null;
 // bounds: any = null;
 // myLatLng: any;
 // waypoints: any[];


  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  
 
  }
  ionViewDidLoad(){
    FirebasedatabaseLift.getInstance();
    this.DisplayMap();    

}
  DisplayMap() {

    //se crea una localizacion con lalitud y longitud
    this.geolocation.getCurrentPosition().then((resp) => {
      let location = new google.maps.LatLng( resp.coords.latitude, 
      resp.coords.longitude);
    
    //se declaran opciones en las que se establece el centro en la variable 
    //localizacion, se da un zoom, se desavilita en street view
    //y se elije el tipo de mapa roadmap.

    const options = {
      center: location,
      zoom: 18,
      streetViewControl: false,
      mapTypeId: 'roadmap',
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      rotateControl: false,
      fullscreenControl: false,
      
    };

    //se ponen las opciones

    const map = new google.maps.Map(this.mapRef.nativeElement, options);
   this.map = map;
    this.marker = this.addMarker(location, map);
    console.log(this.marker.getPosition());
    
  });
  
}

  addMarker(position, map){
    
    console.log('Agregando marcador');
    
      this.marker = new google.maps.Marker({
     
      position: position,
      map: map,
      draggable: true,
      label: 'you'
      

    }); 
      return this.marker;

  }

  botonRide(){
    //console.log(this.marker.getCurrentPosition);
    console.log("Dispuesto a llevar a alguien");

  }
  botonLift(){

    this.map.setCenter(this.marker.getPosition());
    console.log("buscando aventon");
    
  }

  botonLogOut(){

    this.navCtrl.push(LoginPage);
  
  }
  botonPerfil(){

    this.navCtrl.push(ProfilePage);
  
  }

}
