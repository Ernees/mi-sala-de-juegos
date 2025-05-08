import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent {
  baraja = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  mazo: number[] = [];
  cartaActual: number = 0;
  supabase = inject(AuthService);
  db = inject(DbService);
  mensaje = "";
  juegoTerminado = false;
  aciertos = 0;
  errores = 0;
  resultado = "";
  mensajeFinal = "";

  constructor() {
    this.empezarJuego();
  }

  empezarJuego() {
    this.mazo = this.baraja.sort(() => Math.random() - 0.5);
    this.cartaActual = this.mazo.pop() || 0;
    this.mensaje = "";
    this.juegoTerminado = false;
    this.aciertos = 0;
    this.errores = 0;
    this.mensajeFinal = "";
  }

  elegir(opcion: string) {
    if (this.mazo.length === 0) {
      this.terminarJuego();
      return;
    }

    const siguienteCarta = this.mazo.pop() || 0;

    if (opcion === "mayor" && siguienteCarta > this.cartaActual) {
      this.mensaje = "Acertaste!";
      this.aciertos++;
    } else if (opcion === "menor" && siguienteCarta < this.cartaActual) {
      this.mensaje = "Acertaste!";
      this.aciertos++;
    } else {
      this.mensaje = `Erraste. Era ${siguienteCarta}`;
      this.errores++;
    }

    this.cartaActual = siguienteCarta;

    if (this.mazo.length === 0) {
      this.terminarJuego();
    }
  }

  async terminarJuego() {
    this.juegoTerminado = true;
    if (this.aciertos > this.errores) {
      this.mensajeFinal = "Ganaste la partida =)";
      this.resultado = "ganado";
    } else if (this.aciertos < this.errores) {
      this.mensajeFinal = "Perdiste la partida =(";
      this.resultado = "perdido";
    } else {
      this.mensajeFinal = "Empate =|";
      this.resultado = "empatado";
    }
    const cartasAcertadas = this.aciertos;
    const cartasErradas = this.errores;
    const resultado: string = this.resultado;

    //guardo los datos antes guardados
    const user = await this.supabase.getDatosUsuarioActual();
    if (!user) return;
    
    const datosPartida = {
      id_usuario: user.id,
      aciertos: cartasAcertadas,
      errores: cartasErradas,
      resultado: resultado
    };
  
    console.log("Datos de la partida:", datosPartida);
    this.db.guardarPartidaMm(datosPartida);
  }
}