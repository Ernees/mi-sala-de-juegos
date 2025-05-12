import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
})
export class PreguntadosComponent {
  preguntas= signal< any[]>([]);
  preguntaService = inject(PreguntasService);
  auth = inject(AuthService);
  db = inject(DbService);
  actual = 0;
  correctas = 0;
  mostrarResultado = false;
  mensajeFinal = '';
  resultado = '';

  ngOnInit() {
    this.preguntaService.obtenerPreguntas().subscribe((preguntas) => {
      this.preguntas.set(preguntas);
      console.log(this.preguntas())
    });
  }

  responder(opcion: string) {
    const pregunta = this.preguntas()[this.actual];
    console.log(pregunta.correctAnswer);
    if (opcion === pregunta.correctAnswer) {
      this.correctas++;
    }

    this.actual++;
    if (this.actual >= this.preguntas().length) {
      this.terminarJuego();
    }
  }
  reiniciar() {
    this.actual = 0;
    this.correctas = 0;
    this.mostrarResultado = false;
    this.preguntaService.obtenerPreguntas().subscribe((preguntas) => {
      this.preguntas.set(preguntas);
      console.log(this.preguntas())
    });
  }

  async terminarJuego() {
    this.mostrarResultado = true;
    const incorrectas = this.preguntas().length - this.correctas;
    if (this.correctas > incorrectas) {
      this.mensajeFinal = 'Ganaste la partida =)';
      this.resultado = 'ganado';
    } else if (this.correctas < incorrectas) {
      this.mensajeFinal = 'Perdiste la partida =(';
      this.resultado = 'perdido';
    }
    const preguntasCorrectas = this.correctas;
    const preguntasIncorrectas = incorrectas;
    const resultado: string = this.resultado;
    
    //guardo los datos antes guardados
    const user = await this.auth.getDatosUsuarioActual();
    if (!user) return;
    
    const datosPartida = {
      id_usuario: user.id,
      correctas: preguntasCorrectas,
      incorrectas: preguntasIncorrectas,
      resultado: resultado,
    };
    
    console.log('Datos de la partida:', datosPartida);
    this.db.guardarPartidaPreguntados(datosPartida);
    this.db.guardarResultadoGeneral("preguntados", resultado, user.id);
  }
}
