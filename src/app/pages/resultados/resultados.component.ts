import { Component, inject, signal } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Resultados } from '../../classes/resultado';
import { RankingUsuario } from '../../classes/ranking-usuario';

@Component({
  selector: 'app-resultados',
  imports: [],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  db = inject(DbService);
  ranking = signal<RankingUsuario[]>([]);

  async ngOnInit() {
    const { data } = await this.db.supabase
      .from('resultados')
      .select('id_usuario, resultado, registros(nombre)');
    const resultados = data as Resultados[];
    if (!data) return;

    const rankingMap = new Map<string, RankingUsuario>();

    for (const fila of resultados) {
      const usuarioId = fila.id_usuario!;
      const nombre = fila.registros?.nombre || 'Sin nombre';
      const puntos = fila.resultado === 'ganado' ? 3 : 0;

      if (!rankingMap.has(usuarioId)) {
        const nuevo = new RankingUsuario();
        nuevo.id_usuario = usuarioId;
        nuevo.nombre = nombre;
        nuevo.partidas = 1;
        nuevo.puntos = puntos;
        rankingMap.set(usuarioId, nuevo);
      } else {
        const actual = rankingMap.get(usuarioId)!;
        actual.partidas += 1;
        actual.puntos += puntos;
      }
    }
    const rankingFinal = Array.from(rankingMap.values()).sort((a, b) => b.puntos - a.puntos)

    this.ranking.set(rankingFinal);
  }
}
