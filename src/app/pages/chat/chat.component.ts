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
    }, (payload) => {
      const array: Mensaje[] = this.chat();
      array.push(payload.new as Mensaje);
      this.chat.set([...array]);
    });

    this.db.canal.on("postgres_changes", { event: "INSERT", schema: 'public', table: 'registros',
    }, (payload) => {
      console.log("cambios")
    });
    
    this.db.canal.subscribe();
    
  }



  async enviarMensaje() {
    // const cartasAcertadas = this.aciertos;
    // const cartasErradas = this.errores;
    // const resultado: string = this.resultado;

    //guardo los datos antes guardados
    const mensaje = this.mensajeControl.value;
    const user = await this.authService.getDatosUsuarioActual();
    console.log(user)
    if (!user) return;
    
    const datosChat = {
      mensaje:mensaje,
      id_usuario:user.id
    };
  
    console.log("Datos del chat:", datosChat);
    this.db.guardarChat(datosChat);
    this.mensajeControl.reset();
  }



}