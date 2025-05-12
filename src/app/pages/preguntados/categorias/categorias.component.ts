import { Component, inject } from '@angular/core';
import { PreguntasService } from '../../../services/preguntas.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-categorias',
  imports: [],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  ruta = inject(ActivatedRoute);
  categoria: string = '';
  preguntas: any[] = [];
  preguntasService = inject(PreguntasService);
  preguntaActualIndex = 0;
  respuestas: string[] = [];
  respuestaCorrecta = '';
  puntaje = 0;
  usuario = 'UsuarioDemo';

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      const categoria = params['categoria'];
      this.preguntasService.getPreguntasPorCategoria(categoria);
    });  }

  setPreguntaActual() {
    const pregunta = this.preguntas[this.preguntaActualIndex];
    this.respuestaCorrecta = pregunta.correct_answer;
    this.respuestas = [...pregunta.incorrect_answers, pregunta.correct_answer].sort(() => Math.random() - 0.5);
  }

  responder(respuestaSeleccionada: string) {
    if (respuestaSeleccionada === this.respuestaCorrecta) {
      this.puntaje++;
    }

    this.preguntaActualIndex++;

    if (this.preguntaActualIndex < this.preguntas.length) {
      this.setPreguntaActual();
    } else {
      this.guardarResultado();
    }
  }

  guardarResultado() {
    const resultado = {
      usuario: this.usuario,
      puntaje: this.puntaje,
      total: this.preguntas.length
    };
    console.log('Resultado final:', resultado);
    //guardar en bd
  }
}
