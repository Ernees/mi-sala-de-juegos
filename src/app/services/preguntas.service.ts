import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private apiUrl = 'https://the-trivia-api.com/v2/questions?limit=5';
  http = inject(HttpClient)

  obtenerPreguntas(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map((data) => data.map(p => ({ ...p, opciones: this.mezclar([p.correctAnswer, ...p.incorrectAnswers])})))
  );
}


  private mezclar(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
