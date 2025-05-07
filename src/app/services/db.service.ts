import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  supabase: SupabaseClient<any, "public", any>;

  constructor() {
    this.supabase = createClient("https://mvlwoqefaopnsgjinxxz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12bHdvcWVmYW9wbnNnamlueHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxMzcsImV4cCI6MjA2MTA3NjEzN30.mum7sFoaLM3gWtiEmM0UvCl8vSD09KWNanyTLnnzYHY")
  }
  async insertarUsuario(usuario: {id?:string; nombre: string; apellido: string; edad: number; email:string; }) {
    const { data, error } = await this.supabase
      .from("registros")
      .insert([usuario]);
      return { data, error };
  }
  async guardarPartidaAhorcado(partida: { 
    id?: string;
    usuario: string;               
    palabra: string;                
    letras_adivinadas: string[];    
    letras_erroneas: string[];      
    intentos: number;               
    resultado: string; 
    letras_seleccionadas_total: number;}) {
    const { data, error } = await this.supabase
      .from("puntajes_ahorcado")
      .insert([partida]);
      return { data, error };
  }
  async guardarPartidaMm(partida: { 
    id?: string;
    usuario: string;   
    aciertos: number;
    errores: number;
    resultado: string;
  }) {
    const { data, error } = await this.supabase
      .from("puntajes_mayor_menor")
      .insert([partida]);
      return { data, error };
  }
}
