import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { logeadoGuard } from './guards/logeado.guard';

export const routes: Routes = [
    {
        path:"sobre-mi",
        loadComponent: () => import("./pages/sobre-mi/sobre-mi.component").then((modulo) => modulo.SobreMiComponent)
    },
    {
        path:"registro",
        loadComponent: () => import("./pages/registro/registro.component").then((modulo) => modulo.RegistroComponent),
        // canActivate:[logeadoGuard]
        // canActivate:[authGuard]
    },
    {
        path:"login",
        loadComponent: () => import("./pages/login/login.component").then((modulo) => modulo.LoginComponent),
        // canActivate:[logeadoGuard]
        // canActivate:[authGuard]
    },
    {
        path:"bienvenida",
        loadComponent: () => import("./pages/bienvenida/bienvenida.component").then((modulo) => modulo.BienvenidaComponent)
        
    },
    {
        path:"ahorcado",
        loadComponent: () => import("./pages/ahorcado/ahorcado.component").then((modulo) => modulo.AhorcadoComponent),
        canActivate:[authGuard]
    },
    {
        path:"mayor-menor",
        loadComponent: () => import("./pages/mayor-menor/mayor-menor.component").then((modulo) => modulo.MayorMenorComponent),
        canActivate:[authGuard]
    },
    {
        path:"preguntados",
        loadComponent: () => import("./pages/preguntados/preguntados.component").then((modulo) => modulo.PreguntadosComponent),
        canActivate:[authGuard]
    },
];
