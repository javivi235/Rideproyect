import { Component, OnInit } from '@angular/core';
import { OuthService } from '../../servicios/outh.service';
@Component({
  selector: 'app-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.scss']
})
export class RegisComponent implements OnInit {
  public nombre: string;
  public apellido: string;
  public codigo: number;
  public email: string;
  public celular: number;
  public username: string;
  public password: string;
  constructor(
    public outhService: OuthService
  ) { }

  ngOnInit() {
  }
  onSubmitAddUser() {
    this.outhService.registerUser(this.nombre, this.apellido, this.codigo,
                        this.email, this.celular, this.username, this.password)
                        .then( (res) => {
                          console.log('Salió relativamente bien');
                          console.log(res);
                        }).catch( (err) => {
                          console.log(err);
                        });
  }
}
