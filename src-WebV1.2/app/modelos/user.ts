import * as firebase from 'firebase';
export class User
{
    firstname: string;
    lastname: string;
    username: string;
    cell: number;
    email: string;
    password: string;
    score: number;

    constructor(username:string, firstname:string, lastname:string, email:string, cell:number, password:string)
    {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.cell = cell;
        this.password = password;
        this.score = 5;
    }
}