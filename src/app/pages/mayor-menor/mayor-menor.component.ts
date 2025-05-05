import { Component } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  baraja: number[] = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  mazo: number[] = [];
  cartaActual: number | null = null;
  cartaSiguiente: number | null = null;
  mensaje = '';
  juegoTerminado = false;

  constructor() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.mazo = [...this.baraja];
    this.shuffle(this.mazo);
    this.cartaActual = this.mazo.pop()!;
    this.cartaSiguiente = null;
    this.mensaje = '';
    this.juegoTerminado = false;
  }

  shuffle(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  elegir(opcion: 'mayor' | 'menor') {
    if (!this.mazo.length) {
      this.mensaje = '¡No quedan más cartas!';
      this.juegoTerminado = true;
      return;
    }

    this.cartaSiguiente = this.mazo.pop()!;
    const gano =
      (opcion === 'mayor' && this.cartaSiguiente > this.cartaActual!) ||
      (opcion === 'menor' && this.cartaSiguiente < this.cartaActual!);

    if (gano) {
      this.mensaje = '¡Correcto!';
      this.cartaActual = this.cartaSiguiente;
      this.cartaSiguiente = null;
    } else {
      this.mensaje = `¡Perdiste! La carta era ${this.cartaSiguiente}`;
      this.juegoTerminado = true;
    }
  }
}