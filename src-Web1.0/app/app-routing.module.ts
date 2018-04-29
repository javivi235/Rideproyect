import { NgModule } from '@angular/core';
/*Ficheros */
import { Routes, RouterModule } from '@angular/router';
/*para la pagina de home */
import {HomePageComponent} from './componentes/home-page/home-page.component';
/*Para la pagina de login */
import {LoginPageComponent} from './componentes/login-page/login-page.component';
/*para pagina de registro de nuevo usuarios */
import {RegisterPageComponent} from './componentes/register-page/register-page.component';
/*este se mostrara cuando el usuario acceda a la parte privada */
import {PrivadoPageComponent} from './componentes/privado-page/privado-page.component';
/*en caso de que solicite un url al navegador y no este controlada*/
import {NotFoundPageComponent} from './componentes/not-found-page/not-found-page.component';


const routes: Routes = [
  /*Dentro en path definimos la ruta que queremos,'' para Home dejamos en blanco/pasamos a un segundo parametro */
/*'component' que es donde pasaremos el componente que queremmos mostrar para esa ruta en especifico*/

{path: '', component: HomePageComponent},
{path: 'login', component: LoginPageComponent},
{path: 'register', component: RegisterPageComponent},
{path: 'privado', component: PrivadoPageComponent},
{path: '**', component: NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
