import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public logged: boolean;
  public userName: string;
  public userEmail: string;

  constructor(public authService: AuthService) 
  { 

  }

  /*Si un usuario esta logeado se usa un boolean para impedir el uso 
   de botones de navegacion (bugueado) */ 
  ngOnInit() 
  {
    this.authService.getAuth().subscribe(auth =>{
      if (auth)
      {
        this.logged = true;
        this.userName = auth.displayName;
        this.userEmail = auth.email;
      }
      else
      {
        this.logged = false;
      }
    });
  }
  onClickLogout()
  {
    this.authService.logout();
  }
}
