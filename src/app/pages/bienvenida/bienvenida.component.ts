import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {
  authService = inject(AuthService);

  cerrarSesion() {
    console.log("entre a cerrar sesion")
    this.authService.singOut();
  }
  // altaCuenta(){
  //   this.authService.crearCuenta("huertaernesto04@gmail.com", "123456789")
  // }

  // iniciarSesion(){
  //   this.authService.iniciarSesion("huertaernesto04@gmail.com", "123456789");
  // }

  // cerrarSesion(){
  //   this.authService.cerrarSesion();
  // }
}
