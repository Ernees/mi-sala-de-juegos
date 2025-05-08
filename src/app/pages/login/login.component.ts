import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formulario : FormGroup
  authService = inject(AuthService);
  mensajeError = signal("");
  constructor()
  {
    this.formulario = new FormGroup({
      mail: new FormControl<string>("", {validators: [Validators.minLength(3), Validators.maxLength(25), Validators.required, Validators.email]}),
      password: new FormControl<string>("", {validators: [Validators.minLength(3), Validators.maxLength(15), Validators.required]})
    })
  }

  async iniciarSesion()
  {
    if (!this.formulario.valid) return;

    const mail = this.formulario.value.mail;
    const password = this.formulario.value.password;
    const { data, error } = await this.authService.iniciarSesion(mail, password);
    console.log("entre a iniciar sesiion", data, "error: ", error);
    if (error) {
      this.mensajeError.set(String(error));
    } else {
      console.log('Usuario guardado:', data);
      this.mensajeError.set("");
      this.formulario.reset();
    }
    this.authService.router.navigateByUrl("/bienvenida");
  }
  
  

  get mail() { 
    return this.formulario.get('mail'); 
  }
  get password() { 
    return this.formulario.get('password'); 
  }

}
