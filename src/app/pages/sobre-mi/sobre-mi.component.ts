import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-sobre-mi',
  imports: [FormsModule],
  templateUrl: './sobre-mi.component.html',
  styleUrl: './sobre-mi.component.css'
})
export class SobreMiComponent {
  githubService = inject(GithubService);

  ngOnInit()
  {
    this.githubService.traerDatos();
  }

}
