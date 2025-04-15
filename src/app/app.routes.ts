import { Routes } from '@angular/router';
import { SobreMiComponent } from './pages/sobre-mi/sobre-mi.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';


export const routes: Routes = [
    {
        path:"sobre-mi",
        component:SobreMiComponent
    },
    {
        path:"registro",
        component:RegistroComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"bienvenida",
        component:BienvenidaComponent
    },



];
