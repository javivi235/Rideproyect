import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import{ProfilePage} from '../../pages/profile/profile';
import { Geolocation } from '@ionic-native/geolocation';
import {FirebasedatabaseLift} from '../../components/components-firebase/components-firebase'
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { importExpr, variable } from '@angular/compiler/src/output/output_ast';
import {Coche} from '../../models/coche';
import {matchPoint} from '../../models/matchpoint';
import 'firebase/firestore';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//Mapa obtenido del html

  @ViewChild('map') mapRef: ElementRef;
  //el mapa y un marcador
  map : any;
  marker: any;
  pasajeros : any[];
  //el nickname de usuario y la variable booleana que determina los botones que deben aparecer en pantalla
  nickname = "";
  disabledtrip = false;
  aux = 'nel'

  constructor(public navCtrl: NavController,public navParams: NavParams, private geolocation: Geolocation, public alertCtrl: AlertController) {
  
    this.nickname = this.navParams.get('nickname');
    console.log(this.nickname);
  }
  ionViewDidLoad(){
    //inicializando la base de datos
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
    
    var alertct1 = this.alertCtrl;
    
    firebase.database().ref('viaje en curso').on('value', function(snapshot) {
     
      snapshot.forEach(function(childSnapshot) {
        const latlng = {lat: childSnapshot.child('matchpoint').child('latitud').exportVal(), lng: childSnapshot.child('matchpoint').child('longitud').exportVal()} 
        var marcador = new google.maps.Marker({
          position: latlng,
          map: map,
          draggable: false,
          label: childSnapshot.key,
        
        });
        var alertct2 = alertct1;
        
        marcador.addListener('click', function() {
          
          var alertct = alertct2; 
          
          let confirm = alertct.create({
            title: 'Deseas dar un aventon?',
            message: 'Quieres acercar a ' + childSnapshot.child('nickname').exportVal() + ' a la upb?',
            buttons: [
              {
                text: 'Si',
                handler: () => {
                  let prompt = alertct.create({
                    title: 'Datos de tu carro',
                    inputs: [
                      {
                        name: 'marca',
                        placeholder: 'marca'
                      },
                      {
                        name: 'placa',
                        placeholder: 'placa'
                      },
                      {
                        name: 'color',
                        placeholder: 'color'
                      }
                    ],
                    buttons: [
                      {
                        text: 'Cancel',
                        handler: data => {
                          console.log('Cancel clicked');
                        }
                      },
                      {
                        text: 'Save',
                        handler: data => {
                          console.log('Saved clicked');
                        }
                      }
                    ]
                  });
                  prompt.present();
                  
                }
              },
              {
                text: 'No',
                handler: () => {
                
                }
              }
            ]
          });
          confirm.present();      
          
        });
        
        return false;

        });
    });

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
    
  }
  botonLift(){

    this.map.setCenter(this.marker.getPosition());
    console.log("buscando aventon: " + this.nickname);
    //creando un viaje en la base de datos
    firebase.database().ref('viaje en curso').child(this.nickname).set({
      nickname: this.nickname,
      nombre: 'javi',
      telefono: '76199970',
      matchpoint: {
        latitud: this.marker.getPosition().lat(),
        longitud: this.marker.getPosition().lng()   
      }
    });
  
    //cambiando el marcador a fijo 
    this.marker.setDraggable(false);
  }

  botonLogOut(){

   firebase.auth().signOut().then((resp) => {
    this.navCtrl.push(LoginPage);
   }, (err) => {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'ha ocurrido un error.',
      buttons: ['OK']
    });
    alert.present();
   });
    
  }
  botonPerfil(){

    this.navCtrl.push(ProfilePage, {nickname: this.nickname});
  
  }
  botonCancel(){
    //eliminando el viaje de la base de datos
    let confirm = this.alertCtrl.create({
      title: 'Estas seguro?',
      message: 'Deseas cancelar el viaje??',
      buttons: [
        {
          text: 'Si',
          handler: () => {
          
            firebase.database().ref('viaje en curso').child(this.nickname).remove();
            this.disabledtrip = false;
          }
        },
        {
          text: 'No',
          handler: () => {
          
          }
        }
      ]
    });
    confirm.present();
  }

}
