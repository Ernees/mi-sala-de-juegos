import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const logeadoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  console.log(authService.user)
  console.log(!authService.getDatosUsuarioActual)
  if (!authService.user()) {
    // authService.router.navigate(['/bienvenida']);
    console.log("me deja")
    return true;
  }
  console.log("NO me deja")
  return false;
  
};
