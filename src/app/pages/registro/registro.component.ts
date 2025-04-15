import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../classes/usuario';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formulario : FormGroup
  enviarUsuario = output<Usuario>();
  dbService = inject(DbService);
  constructor()
  {
    this.formulario = new FormGroup({
      nombre: new FormControl<string>("", { validators: [Validators.minLength(3), Validators.maxLength(15), Validators.required] }),
      apellido: new FormControl<string>("", {validators: [Validators.minLength(3), Validators.maxLength(15), Validators.required]}),
      edad: new FormControl<number>(0,{validators: [Validators.min(18), Validators.max(80), Validators.required]})
    })
  }
  mostrarFormulario(){
    console.log(this.formulario);
    console.log(this.formulario?.value);
  }
  validarFormulario(){
    console.log("Es válido: " + this.formulario?.valid);
  }

  async guardarDatos() {
    if (this.formulario.invalid) return;

    const nombre = this.formulario.value.nombre;
    const apellido = this.formulario.value.apellido;
    const edad = this.formulario.value.edad;

    const { data, error } = await this.dbService.insertarUsuario({ nombre, apellido, edad });

    if (error) {
      console.error('Error al guardar en Supabase:', error);
    } else {
      console.log('Usuario guardado:', data);
      this.formulario.reset();
    }
  }


  get nombre ()
  {
    return this.formulario.controls["nombre"].value;
  }
  get apellido ()
  {
    return this.formulario.controls["apellido"].value;
  }
  get edad() {
    return this.formulario.get('edad');
  }
}
