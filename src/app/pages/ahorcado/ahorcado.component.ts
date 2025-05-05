import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-ahorcado',
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  palabra: string = '';
  supabase = inject(AuthService)
  dbAhorcado = inject(DbService);
  letrasAdivinadas: Set<string> = new Set();
  letrasErroneas: Set<string> = new Set();
  letras: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  maxIntentos: number = 0;
  
  palabras: string[] = [
    'ELEFANTE',
    'CAFETERA',
    'MISTERIO',
    'AVIONETA',
    'ZAPATILLA',
    'GIRASOL',
    'ESCALERA',
    'PIRAMIDE',
    'TIBURON',
    'NARANJA',
    'HELADERA',
    'MURCIELAGO',
    'RELOJ',
    'TRUENO',
    'BIBLIOTECA',
    'VAMPIRO',
    'TARDE',
    'CASCADA',
    'TREN',
    'LINTERNA'
  ];

  constructor(){
    this.elegirPalabraAleatoria();
    this.maxIntentos = this.palabra.length
    
  }

  adivinar(letra: string) {
    if (this.palabra.includes(letra)) {
      this.letrasAdivinadas.add(letra);
    } else {
      this.letrasErroneas.add(letra);
    }
  }

  elegirPalabraAleatoria() {
    const indice = Math.floor(Math.random() * this.palabras.length);
    this.palabra = this.palabras[indice];
  }
  
  get palabraOculta(): string {
    return this.palabra
      .split('')
      .map((l) => (this.letrasAdivinadas.has(l) ? l : '_'))
      .join(' ');
  }

  get intentos(): number {
    return this.letrasErroneas.size;
  }

  get juegoPerdido(): boolean {
    return this.intentos >= this.maxIntentos;
  }

  get juegoGanado(): boolean {
    return this.palabra.split('').every((l) => this.letrasAdivinadas.has(l));
  }

  async resetearJuego() {
    //recolecto los datos de la partida jugada
    const totalLetrasSeleccionadas = this.letrasAdivinadas.size + this.letrasErroneas.size;
    const arrayLetrasCorrectas = Array.from(this.letrasAdivinadas);
    const arrayLetrasIncorrectas = Array.from(this.letrasErroneas);
    const palabra = this.palabra;
    const intentos = this.intentos;
    const resultado: string = this.juegoGanado ? 'ganado' : 'perdido';
    //reseteo los datos para empezar una partida nueva
    this.letrasAdivinadas.clear();
    this.letrasErroneas.clear();
    this.elegirPalabraAleatoria();
    //guardo los datos antes guardados
    const user = await this.supabase.getDatosUsuarioActual();
    if (!user) return;
    
    const datosPartida = {
      id:user.id,
      usuario: user.nombre,
      palabra: palabra,
      letras_adivinadas: arrayLetrasCorrectas,
      letras_erroneas: arrayLetrasIncorrectas,
      intentos: intentos,
      resultado: resultado,
      letras_seleccionadas_total: totalLetrasSeleccionadas
    };
  
    console.log('Datos de la partida:', datosPartida);
    this.dbAhorcado.guardarPartida(datosPartida);
  }
}
