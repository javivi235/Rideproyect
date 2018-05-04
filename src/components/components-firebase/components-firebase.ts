import { Component } from '@angular/core';
import * as firebase from 'firebase';


/**
 * Generated class for the ComponentsFirebaseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.

 */

 
export const firebasConfig = {
  apiKey: "AIzaSyCd73spCngujttVcS9Dga6akanUBHe89vo",
  authDomain: "liftapp-f892f.firebaseapp.com",
  databaseURL: "https://liftapp-f892f.firebaseio.com",
  projectId: "liftapp-f892f",
  storageBucket: "liftapp-f892f.appspot.com",
  messagingSenderId: "870835801913"
}

 @Component({
  selector: 'components-firebase',
  templateUrl: 'components-firebase.html'
})
export class ComponentsFirebaseComponent {

  constructor() {
   
    

  }

}
export class FirebasedatabaseLift {
  firedatabase: FirebasedatabaseLift;
  //authService: AngularFireAuth; 

  public static firedatabase = new FirebasedatabaseLift();

  constructor(){
  
    firebase.initializeApp(firebasConfig);
    console.log('');

  }
  public static getInstance (): FirebasedatabaseLift {
  return this.firedatabase;

  }

}
