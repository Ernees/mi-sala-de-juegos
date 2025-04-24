import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  httpclient = inject(HttpClient);
  datosCliente = signal<any>(null);

  constructor() {}

  traerDatos()
  {
    const peticion: Observable<any> = this.httpclient.get<any>("https://api.github.com/users/Ernees");
    const suscripcion: Subscription = peticion.subscribe((respuesta) => {
      this.datosCliente.set(respuesta); 
      suscripcion.unsubscribe();
    });
  }

}

