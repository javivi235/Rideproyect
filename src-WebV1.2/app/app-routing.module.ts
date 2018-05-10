import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
//para la pagina de home 
import {HomePageComponent} from './componentes/home-page/home-page.component';
//Para la pagina de login 
import {LoginPageComponent} from './componentes/login-page/login-page.component';
//para pagina de registro de nuevo usuarios
import {RegisterPageComponent} from './componentes/register-page/register-page.component';
//este se mostrara cuando el usuario acceda a la parte privada 
import {PrivadoPageComponent} from './componentes/privado-page/privado-page.component';
//en caso de que solicite un url al navegador y no este controlada
import {NotFoundPageComponent} from './componentes/not-found-page/not-found-page.component';
//para el muestreo de rutas en el mapa
import { MapPageComponent } from './componentes/map-page/map-page.component';




const routes: Routes = [
//Dentro en path definimos la ruta que queremos en el URL de la pagina

{path: '', component: HomePageComponent},
{path: 'login', component: LoginPageComponent},
{path: 'signin', component: RegisterPageComponent},
{path: 'privado', component: PrivadoPageComponent},
{path: 'mapa', component: MapPageComponent},
{path: '**', component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
