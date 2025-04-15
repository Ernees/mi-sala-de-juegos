import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Usuario } from '../classes/usuario';
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  supabase: SupabaseClient<any, "public", any>;

  constructor() {
    this.supabase = createClient("https://cvpclptuaufsjxwlcodq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cGNscHR1YXVmc2p4d2xjb2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzA3OTYsImV4cCI6MjA2MDE0Njc5Nn0.pKfWDTatYxI1UYjd13EanWN5r_T49ZZzOEcXHXitoHQ")
  }
  async insertarUsuario(usuario: { nombre: string; apellido: string; edad: number }) {
    const { data, error } = await this.supabase
      .from("registros")
      .insert([usuario]);
      return { data, error };
  }


}
