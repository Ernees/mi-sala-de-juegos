import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { Mensaje } from '../classes/mensaje';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  supabase: SupabaseClient<any, "public", any>;
  canal: RealtimeChannel;

  constructor() {
    this.supabase = createClient("https://mvlwoqefaopnsgjinxxz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12bHdvcWVmYW9wbnNnamlueHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxMzcsImV4cCI6MjA2MTA3NjEzN30.mum7sFoaLM3gWtiEmM0UvCl8vSD09KWNanyTLnnzYHY")
    this.canal = this.supabase.channel('schema-db-changes');
  }
  async insertarUsuario(usuario: {id?:string; nombre: string; apellido: string; edad: number; email:string; }) {
    const { data, error } = await this.supabase
      .from("registros")
      .insert([usuario]);
      return { data, error };
  }





  async guardarPartidaAhorcado(partida: { 
    id_usuario: string;               
    palabra: string;                
    letras_adivinadas: string[];    
    letras_erroneas: string[];      
    intentos: number;               
    resultado: string; 
    letras_seleccionadas_total: number;}) {
    const { data, error } = await this.supabase
      .from("partidas_ahorcado")
      .insert([partida]);
      return { data, error };
  }






  async guardarPartidaMm(partida: { 
    id_usuario: string;   
    aciertos: number;
    errores: number;
    resultado: string;
  }) {
    const { data, error } = await this.supabase
      .from("partidas_mayor_menor")
      .insert([partida]);
      return { data, error };
  }






  async guardarChat(chat: { 
    mensaje:string|null;
    id_usuario?: string;
  }) {
    const { data, error } = await this.supabase
      .from("chat")
      .insert([chat]);
      return { data, error };
  }


  async crear(mensaje: string, id_usuario: number) {
    // mensaje
    await this.supabase
      .from('chat')
      .insert({ mensaje: mensaje, id_usuario: id_usuario });  
  }

  async traer() {
    const { data } = await this.supabase
      .from('chat')
      .select('id, created_at, mensaje, registros (id, nombre)');
    return data as Mensaje[];
  }

}
