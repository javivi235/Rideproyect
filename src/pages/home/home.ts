import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { LoginPage } from '../login/login';
import{ProfilePage} from '../../pages/profile/profile';
import { Geolocation } from '@ionic-native/geolocation';
import {FirebasedatabaseLift} from '../../components/components-firebase/components-firebase'
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { importExpr, variable } from '@angular/compiler/src/output/output_ast';
import { google } from 'google-maps';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

//Mapa obtenido del html

  @ViewChild('map') mapRef: ElementRef;
  //el mapa y un marcador
  public static map : any;
  public static marker: any;
  public static matchmarker: any;
  public static pasajeros : google.maps.Marker[];
  //el nickname de usuario y la variable booleana que determina los botones que deben aparecer en pantalla
  public static nickname = "";
  public static disabledtrip = false;
  public static tripinit = true;
  public static geolocation;
  public static alertCtrl;
  public static match = null;
  public static directionsService = new google.maps.DirectionsService;
  public static directionsDisplay = new google.maps.DirectionsRenderer;
  public static upb = {lat: -17.398910,lng: -66.217353};
  public static navCtrl : any;

  constructor(public navCtrl: NavController,public navParams: NavParams, private geolocation: Geolocation, public alertCtrl: AlertController) {
    
  }
  
  ionViewDidLoad(){
    //inicializando la base de datos
    HomePage.navCtrl = this.navCtrl;
    HomePage.pasajeros = [];
    HomePage.geolocation = this.geolocation;
    HomePage.alertCtrl = this.alertCtrl;
    HomePage.nickname = this.navParams.get('nickname');
    console.log('Home page did load, user: ' + HomePage.nickname);
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

    HomePage.map = new google.maps.Map(this.mapRef.nativeElement, options);
    
    HomePage.directionsDisplay.setMap(HomePage.map);

    HomePage.marker = new google.maps.Marker({

     
        position: location,
        map: HomePage.map,
        draggable: true,
        label: 'you'

      });
    HomePage.matchmarker = new google.maps.Marker({
      position: location,
      map: null,
      label: 'match'
    });


    HomePage.mostrarSolicitudes(HomePage.map);
    
    });

  }
  static clearMap(){
      HomePage.pasajeros.forEach(function(element){
        element.setMap(null);
      });
      HomePage.pasajeros = [];
      HomePage.directionsDisplay.setMap = null;
      HomePage.directionsDisplay = new google.maps.DirectionsRenderer;
      HomePage.directionsDisplay.setMap(HomePage.map);
      HomePage.directionsDisplay.set('directions', null); 
      
      console.log('Mapa limpio');

    }

  static mostrarSolicitudes(map: any){

    firebase.database().ref('viaje en curso').on('value', function(snapshot) {
    
      HomePage.clearMap();
      var index = -1;
     snapshot.forEach(function(childSnapshot) {
        if((!childSnapshot.child('match').exists()) && (childSnapshot.key !== HomePage.nickname) && !HomePage.disabledtrip){
       //se pone un marcador por cada viaje encontrado en la posicion matchpoint que fue determinada por el que lo solicita
        index = index + 1;
       const latlng = {lat: childSnapshot.child('matchpoint').child('latitud').exportVal(), lng: childSnapshot.child('matchpoint').child('longitud').exportVal()} 
        HomePage.pasajeros.push(new google.maps.Marker({
          position: latlng,
          map: map,
          draggable: false,
          label: childSnapshot.key,
        }));
          HomePage.pasajeros[index].addListener('click', function(){
         HomePage.liftUser(childSnapshot.key, childSnapshot.child('nombre').exportVal(), childSnapshot.child('telefono').exportVal());
          });
        }
        return false;

     });


    });
    

  }

  changeTrip(){
    
    HomePage.disabledtrip = !HomePage.disabledtrip;
  
  }

  static calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination, matchpoint) {
    console.log('creando ruta');
    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: [
        {location: matchpoint,
        stopover: true}
      ],
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  getDisableTrip(){
    return HomePage.disabledtrip;
  }

  static matchdata(user: string, firstname:string, telefono:string, marca: string, placa: string, color:string){
      
//    Modificando los datos 

    
      HomePage.clearMap();
      HomePage.match = user;
      firebase.database().ref('viaje en curso').child(user).once('value', function(snapshot){
        HomePage.matchmarker.setMap(HomePage.map);
        const position = {
          lat: snapshot.child('matchpoint').child('latitud').exportVal(),
          lng: snapshot.child('matchpoint').child('longitud').exportVal()
        };
        HomePage.matchmarker.setPosition(position);
        HomePage.matchmarker.setLabel('MatchPoint');
        
      });
        var infowindow = new google.maps.InfoWindow({
          content: '<h6>nickname: '+  HomePage.match+'<h6>' +
                    '<h6>nombre: ' + firstname +'<h6>'+
                    '<h6>telefono: '+ telefono + '<h6>'
        });
        HomePage.matchmarker.addListener('click', function(){
          infowindow.open(HomePage.map,HomePage.matchmarker);
        });  
      
    
      firebase.database().ref('usuarios').child(HomePage.nickname).once('value', function(usersnapshot){

      firebase.database().ref('viaje en curso').child(user).update({

        match: {
          nickname: usersnapshot.key,
          telefono: usersnapshot.child('cell').exportVal(),
          nombre: usersnapshot.child('firstname').exportVal(),
          apellido: usersnapshot.child('lastname').exportVal(),
          coche: {
            
            placa: placa,
            marca: marca,
            color: color
        
          }
        }

      });
      firebase.database().ref('viaje en curso').child(usersnapshot.key).set({
        match: {
          nickname: user,
          nombre: firstname,
          telefono: telefono
        }                           
      });
      let watch = HomePage.geolocation.watchPosition();
      
      watch.subscribe((data) => {
        
       
        HomePage.marker.setPosition({lat: Number(data.coords.latitude).valueOf(), lng: Number(data.coords.longitud).valueOf()});


        var intervalo = setInterval(() =>{
          console.log('linea 238'); 
          firebase.database().ref('viaje en curso').child(user).once('value', function(snapshot){
            if(snapshot.child('match').exists()){

              var position = {
                lat: Number(data.coords.latitude).valueOf(),
                lng: Number(data.coords.longitude).valueOf()
              }
              HomePage.marker.setPosition(position);
              firebase.database().ref('viaje en curso').child(user).child('match').update({

        
              position: {
              latitud: position.lat,
              longitud: position.lng,

            }
              });
              HomePage.map.setCenter(position);
            } else {
              HomePage.clearMap();
              HomePage.disabledtrip = false;
              HomePage.match = null; 
              clearInterval(intervalo);
              
            }

        });
          },1000);
          firebase.database().ref('viaje en curso').child(user).child('matchpoint').once('value', function(snapshot){
            HomePage.calculateAndDisplayRoute(HomePage.directionsService, HomePage.directionsDisplay, {lat: Number(data.coords.latitude).valueOf(),
              lng: Number(data.coords.longitude).valueOf()}, HomePage.upb, {lat: Number(snapshot.child('latitud').exportVal()).valueOf(),
            lng: Number(snapshot.child('longitud').exportVal()).valueOf()});
         //  console.log(snapshot.child('latitud').exportVal() + ' MAS '
          //      + snapshot.child('longitud').exportVal());
              
          });
          
        });
                          


    });

  }
  

  static liftUser(user: string, firstname: string, telefono: string){
   
    
    console.log('marcador de usuario: ' + user + ' clickeado');
    let confirm = HomePage.alertCtrl.create({
      title: 'Deseas dar un aventon?',
      message: 'Quieres acercar a ' + user + ' a la upb?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('NO clicked');
          }
        },
        {
          text: 'SI',
          handler: () => {

          //recopilando datos del vehiculo
            let prompt = HomePage.alertCtrl.create({
              title: 'Datos del vehiculo',
              inputs: [
                {
                  name: 'marca',
                  placeholder: 'Marca'
                },
                {
                  name: 'placa',
                  placeholder: 'Placa'
                },
                {
                  name: 'color',
                  placeholder: 'Color'
                },
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
                    HomePage.disabledtrip = !HomePage.disabledtrip;
                    HomePage.clearMap(); 
                    console.log('Saved clicked');
                  //  Pasando el username del pasajero y los datos del coche
                   HomePage.tripinit = false;
                  HomePage.matchdata(user, firstname, telefono, data.marca, data.placa, data.color);

                  }
                }
              ]
            });
            prompt.present();
          
          }
        }
      ]
    });
    confirm.present();

  }


  botonLift(){

    HomePage.clearMap();
    HomePage.marker.setLabel('MatchPoint');   
    this.changeTrip();
    HomePage.map.setCenter(HomePage.marker.getPosition());
    console.log("buscando aventon: " + HomePage.nickname);
    //creando un viaje en la base de datos
    firebase.database().ref('viaje en curso').child(HomePage.nickname).set({
      nickname: HomePage.nickname,
      nombre: 'javi',
      telefono: '76199970',
      fecha:   new Date().toISOString(),
      matchpoint: {
        latitud: HomePage.marker.getPosition().lat(),
        longitud: HomePage.marker.getPosition().lng()   
      }
    });
    firebase.database().ref('viaje en curso').child(HomePage.nickname).child('match').child('nickname').on('value', function(snapshot) {
      if(snapshot.exists()){
        HomePage.match = snapshot.exportVal();
      }
    firebase.database().ref('viaje en curso').child(HomePage.nickname).child('match').child('position').on('value', function(snapshot) {
      if(snapshot.exists()){
        HomePage.tripinit = false;
        const position = {
          lat: Number(snapshot.child('latitud').exportVal()).valueOf(),
          lng: Number(snapshot.child('longitud').exportVal()).valueOf()
        };
        HomePage.matchmarker.setPosition(position);
        HomePage.matchmarker.setMap(HomePage.map);
        HomePage.matchmarker.setLabel(HomePage.match);
      
        } else if(HomePage.matchmarker.getMap() !== null) {

          HomePage.clearMap();
          HomePage.disabledtrip = false;
                       
        
        }
    });
    
    });
    


    var inter= setInterval(function(){
      
        console.log('linea 399');
        if(HomePage.matchmarker.getMap() !== null) {
          
           firebase.database().ref('viaje en curso').child(HomePage.nickname).child('match').once('value', function(snapshot){
             var infowindow = new google.maps.InfoWindow({
        
                 content: '<h6>Nickname: '+HomePage.match+'<h6>' +
                          '<h6>Nombre: ' +snapshot.child('nombre').exportVal() +'<h6>'+
                          '<h6>Telefono: '+ snapshot.child('telefono').exportVal() + '<h6>'+
                          '<h6> auto: ' + snapshot.child('coche').child('marca').exportVal() + ', ' + snapshot.child('coche').child('color').exportVal() +'<h6>'+
                           '<h6> placa: ' + snapshot.child('coche').child('placa').exportVal() + '<h6>'

             });
             HomePage.matchmarker.addListener('click', function(){
              infowindow.open(HomePage.map, HomePage.matchmarker);
              });
          });
          
          HomePage.calculateAndDisplayRoute(HomePage.directionsService, HomePage.directionsDisplay, HomePage.matchmarker.getPosition(), HomePage.upb, HomePage.marker.getPosition());
          
          clearInterval(inter);
        }else if(HomePage.disabledtrip === false){
          clearInterval(inter);
        }
  
      
    }, 1000);
    
    //cambiando el marcador a fijo 
    HomePage.marker.setDraggable(false);
  }
  getTripinit(){
    return HomePage.tripinit;
  }
  botonLogOut(){

   firebase.auth().signOut().then((resp) => {
    this.navCtrl.setRoot(LoginPage);
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

    this.navCtrl.push(ProfilePage, {nickname: HomePage.nickname});
  
  }
  botonCancel(){
    //eliminando el viaje de la base de datos
    console.log('metodo boton x: ' + HomePage.tripinit);
    if(HomePage.tripinit){
    let confirm = this.alertCtrl.create({
      title: 'Estas seguro?',
      message: 'Deseas cancelar el viaje??',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            
            this.changeTrip();
            HomePage.marker.setDraggable(true);
            HomePage.marker.setLabel('you');
            firebase.database().ref('viaje en curso').child(HomePage.nickname).remove();
            if(HomePage.match !== null){

            firebase.database().ref('viaje en curso').child(HomePage.match).remove();
            
            }
            HomePage.clearMap();
            
            HomePage.disabledtrip = false;
            HomePage.matchmarker.setMap(null);
            HomePage.directionsDisplay.setMap(null);
            HomePage.navCtrl.setRoot(HomePage, {nickname: HomePage.nickname});
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
  HomePage.mostrarSolicitudes(HomePage.map)
  } else {
    console.log('guardando viaje');
    let confirm = HomePage.alertCtrl.create({
      title: 'Ha llegado al destino?',
      buttons: [
        { text: 'No',
        handler: () => {
          }
        },
        { text: 'SI',
        handler: () => {
          firebase.database().ref('viaje en curso').child(HomePage.nickname).once('value', function(usnapshot){

            firebase.database().ref('viaje en curso').child(HomePage.match).once('value', function(msnapshot){

              if(usnapshot.exists() && msnapshot.exists()){

              firebase.database().ref('viajes finalizados').push().set({

                usuario1: usnapshot.exportVal(),
                usuario2: msnapshot.exportVal() 

              });
              firebase.database().ref('viaje en curso').child(HomePage.nickname).remove();
              firebase.database().ref('viaje en curso').child(HomePage.match).remove();
               
            }
            
            });
  

          });
          

          }
        },
      ] 
    });
    confirm.present();
    HomePage.clearMap();
  }
  }
}
