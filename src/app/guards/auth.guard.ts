import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const { data } = await authService.supabase.auth.getSession();

  if (!data.session) {
    authService.router.navigateByUrl("/bienvenido");
    return false;
  }
  
  return true;
};
