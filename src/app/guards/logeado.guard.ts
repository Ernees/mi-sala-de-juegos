import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const logeadoGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const { data } = await authService.supabase.auth.getSession();
  
  if (data.session) {
    authService.router.navigateByUrl("/bienvenido");
    return false;
  }
  console.log("Te dejo apsar")
  return true;
  
};
