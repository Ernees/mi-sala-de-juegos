export class Usuario {
    nombre: string; 
    apellido: string; 
    edad: number;
    email:string; 
    password:string;

    constructor(nombre: string, apellido: string, edad: number, email:string, password:string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email=email;
        this.password=password;
    }
}
