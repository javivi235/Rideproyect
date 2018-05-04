import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import{ProfilePage} from '../pages/profile/profile';

export const firebasConfig = {
  apiKey: "AIzaSyCd73spCngujttVcS9Dga6akanUBHe89vo",
  authDomain: "liftapp-f892f.firebaseapp.com",
  databaseURL: "https://liftapp-f892f.firebaseio.com",
  projectId: "liftapp-f892f",
  storageBucket: "liftapp-f892f.appspot.com",
  messagingSenderId: "870835801913"
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
