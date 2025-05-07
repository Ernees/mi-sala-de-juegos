import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase: SupabaseClient<any, 'public', any>;
  user = signal<User | null>(null);
  router = inject(Router);


  constructor() {
    this.supabase = createClient(
      'https://mvlwoqefaopnsgjinxxz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12bHdvcWVmYW9wbnNnamlueHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxMzcsImV4cCI6MjA2MTA3NjEzN30.mum7sFoaLM3gWtiEmM0UvCl8vSD09KWNanyTLnnzYHY');
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        this.user.set(null);
        this.router.navigateByUrl("/bienvenida");
        return;
      }
      
      this.supabase.auth.getUser().then(({ data, error }) => {
        this.user.set(data.user);
        this.router.navigateByUrl("/bienvenida");
      });
    });
  }

  // Crear cuenta
  async crearCuenta(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    console.log("Error al crear la cuenta: ", error);
    return  {data,error};
  }

  // Iniciar sesion
  async iniciarSesion(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    if(error){
      console.log("Error al Iniciar sesion: ", error);
    }
    return { data, error };
  }
  
  // Cerrar la sesion
  async cerrarSesion() {
    const { error } = await this.supabase.auth.signOut();
    console.log("error en cerrar sesion",error);
  }

  async getDatosUsuarioActual() {
    const { data: { user }, error: authError } = await this.supabase.auth.getUser();

    if (authError || !user) {
      console.error('Error al obtener usuario de Auth:', authError?.message);
      return null;
    }
  
    const { data, error } = await this.supabase
      .from('registros')
      .select('*')
      .eq('id', user.id)
      .single();
  
    if (error) {
      console.error('Error al obtener datos del usuario:', error.message);
      return null;
    }
  
    return data;
  }
  
}
