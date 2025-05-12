import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  router = inject(Router);

  irAComponenteConocGral() {
      this.router.navigate(['/preguntados/conocimiento-general']);
  }
  irAComponenteDeportes() {
      this.router.navigate(['/preguntados/deportes']);
  }
  irAComponenteHistoria() {
      this.router.navigate(['/preguntados/historia']);
  }
  irAComponenteGeografia() {
      this.router.navigate(['/preguntados/geografia']);
  }
}