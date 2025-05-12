import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  httpClient = inject(HttpClient)
  preguntas = signal<any>(null);

getPreguntasPorCategoria(nombreCategoria: string) {
  const categoriasMap: { [key: string]: number } = {
    'conocimiento-general': 9,
    'deportes': 21,
    'geografia': 22,
    'historia': 23
  };

  const categoriaId = categoriasMap[nombreCategoria];
  const url = `https://opentdb.com/api.php?amount=5&category=${categoriaId}&difficulty=medium&type=multiple`;

  const peticion: Observable<any> = this.httpClient.get<any>(url);
  const suscripcion: Subscription = peticion.subscribe((respuesta) => {
    this.preguntas.set(respuesta);
    suscripcion.unsubscribe();
  });
}

}