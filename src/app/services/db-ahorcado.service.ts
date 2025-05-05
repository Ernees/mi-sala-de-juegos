import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DbAhorcadoService {

  supabase: SupabaseClient<any, "public", any>;

  constructor() {
    this.supabase = createClient("https://mvlwoqefaopnsgjinxxz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12bHdvcWVmYW9wbnNnamlueHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxMzcsImV4cCI6MjA2MTA3NjEzN30.mum7sFoaLM3gWtiEmM0UvCl8vSD09KWNanyTLnnzYHY")
  }

}
