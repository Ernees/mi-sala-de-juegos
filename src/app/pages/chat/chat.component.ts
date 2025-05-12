import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Mensaje } from '../../classes/mensaje';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../classes/usuario';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  db = inject(DbService);
  authService = inject(AuthService);
  chat = signal<Mensaje[]>([]);
  usuarioActual = signal<Usuario | null>(null);
  mensajeControl = new FormControl('');

  async ngOnInit() {
    const user = await this.authService.getDatosUsuarioActual();
    this.usuarioActual.set(user);
  }
  constructor(){
    // Traer inicalmente
    this.db.traer().then((response) => {
      if(response !== null) {
        this.chat.set([...response]);
      }
    })

    // detectar cambios
    this.db.canal.on("postgres_changes", { event: "INSERT", schema: 'public', table: 'chat',
    }, async (payload) => {
      const array: Mensaje[] = this.chat();
      const nuevoMensaje = payload.new as Mensaje;
      // select de la tabla usuarios
      const {data: usuario, error} = await this.db.supabase
      .from("registros")
      .select("*")
      .eq("id", nuevoMensaje.id_usuario) 
      .single();
      //asigno al mensaje el usuario actualizado
      nuevoMensaje.registros = usuario;
      array.push(nuevoMensaje);
      this.chat.set([...array]);
    });
    
    this.db.canal.subscribe();
    
  }

  async enviarMensaje() {
    //guardo los datos antes guardados
    const mensaje = this.mensajeControl.value;
    const user = await this.authService.getDatosUsuarioActual();
    if (!user) return;
    
    const datosChat = {
      mensaje:mensaje,
      id_usuario:user.id
    };
    this.db.guardarChat(datosChat);
    this.mensajeControl.reset();
  }
  //unsuscribe en el ngdestroy
  ngOnDestroy(){
    this.db.canal.unsubscribe();
  }
}