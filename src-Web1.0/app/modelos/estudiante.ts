import * as firebase from 'firebase';

export class Estudiante {

    nombre: string;
    apellido: string;
    codigo: number;
    email: string;
    celular: number;
    username: string;
    password: string;

    constructor(nombre: string, apellido: string, codigo: number,
        email: string, celular: number, username: string,
        password: string ) {

            this.nombre = nombre;
            this.apellido = apellido;
            this.codigo = codigo;
            this.email = email;
            this.celular = celular;
            this.username = username;
            this.password = password;
    }
}