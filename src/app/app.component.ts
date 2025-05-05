import { Component, inject } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { DbService } from './services/db.service';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'primer-tp';
  dataBaseService = inject(DbService);
  authService = inject(AuthService);
}
