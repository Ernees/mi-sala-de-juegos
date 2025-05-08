import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formulario : FormGroup
  authService = inject(AuthService);
  dbService = inject(DbService);
  constructor()
  {
    this.formulario = new FormGroup({
      nombre: new FormControl<string>("", { validators: [Validators.minLength(3), Validators.maxLength(15), Validators.required] }),
      apellido: new FormControl<string>("", {validators: [Validators.minLength(3), Validators.maxLength(15), Validators.required]}),
      edad: new FormControl<number>(0,{validators: [Validators.min(18), Validators.max(80), Validators.required]}),
      mail: new FormControl<string>("", {validators: [Validators.minLength(3), Validators.maxLength(25), Validators.required, Validators.email]}),
      password: new FormControl<string>("", {validators: [Validators.minLength(3), Validators.maxLength(15), Validators.required]})
    })
  }

  async guardarDatos() {
    if (this.formulario.invalid) return;

    const nombre = this.formulario.value.nombre;
    const apellido = this.formulario.value.apellido;
    const edad = this.formulario.value.edad;
    const email = this.formulario.value.mail;
    const password = this.formulario.value.password;

    const {data, error} = await this.authService.crearCuenta(email, password);
    const id = data.user?.id;
    if (error != null)
      { 
      console.error('Error al Crear la cuenta:', error);
    }else{
      const { data, error } = await this.dbService.insertarUsuario({ id, nombre, apellido, edad, email});
      if (error) {
        console.error('Error al guardar en Supabase:', error);
      } else {
        console.log('Usuario guardado:', data);
        this.authService.router.navigateByUrl("/bienvenida");
        this.formulario.reset();
      }
    }
  }


  get nombre() { 
    return this.formulario.get('nombre'); 
  }
  get apellido() { 
    return this.formulario.get('apellido'); 
  }
  get edad() { 
    return this.formulario.get('edad'); 
  }
  get mail() { 
    return this.formulario.get('mail'); 
  }
  get password() { 
    return this.formulario.get('password'); 
  }
  
}
