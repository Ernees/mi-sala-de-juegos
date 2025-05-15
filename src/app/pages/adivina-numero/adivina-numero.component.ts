import { Component, inject } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adivina-numero',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './adivina-numero.component.html',
  styleUrl: './adivina-numero.component.css'
})
export class AdivinaNumeroComponent {
  db = inject(DbService);
  supabase = inject(AuthService);
  intento = new FormControl('');
  numeroSecreto: number = 0;
  mensaje = '';
  gano = false;
  maxIntentos = 5;
  historial: number[] = [];
  juegoTerminado = false;
  resultado = "";
  constructor(){
    this.empezarJuego();
  }
  empezarJuego(){
    this.juegoTerminado = false;
    this.historial = [];
    this.mensaje = "";
    this.resultado = "";
    this.gano = false;
    this.generarNumero(); 
  }
  generarNumero(){
    this.numeroSecreto = Math.floor(Math.random() * 20) + 1;
    console.log(this.numeroSecreto);
  }
  intentar() {
    const intent = Number(this.intento.value);
    this.historial.push(intent);

    if (intent === this.numeroSecreto) {
      this.mensaje = 'Ganaste!=)';
      this.gano = true;
      this.terminarJuego();
    } else if (this.historial.length >= this.maxIntentos) {
      this.mensaje = `Perdiste =( El numero era: ${this.numeroSecreto}`;
      this.terminarJuego();
    } else if (intent < this.numeroSecreto) {
      this.mensaje = "Muy bajo ";
    } else {
      this.mensaje = "Muy alto";
    }
  }

  async terminarJuego() { 
    this.juegoTerminado = true;
    
    if (this.gano){
       this.resultado = "ganado"
    }else{
      this.resultado = "perdido"
    }
    const user = await this.supabase.getDatosUsuarioActual();
    if (!user) return;

    const datosPartida = {
      id_usuario: user.id,
      resultado: this.resultado,
      numero: this.numeroSecreto,
      intentos: this.historial.length
    };

    console.log('Datos de la partida:', datosPartida);
    this.db.guardarPartidaAdivina(datosPartida);
    this.db.guardarResultadoGeneral("adivina-numero", this.resultado, user.id);
    this.intento.reset();
  }
}
