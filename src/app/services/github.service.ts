import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  httpclient = inject(HttpClient);
  datosCliente:any;

  constructor() {}

  traerDatos()
  {
    const peticion: Observable<any> = this.httpclient.get<any>("https://api.github.com/users/Ernees");
    const suscripcion: Subscription = peticion.subscribe((respuesta) => {
      this.datosCliente = respuesta; 
      // console.log(this.datosCliente);
      // Cerrar la suscripción
      suscripcion.unsubscribe();
    });
  }

}

