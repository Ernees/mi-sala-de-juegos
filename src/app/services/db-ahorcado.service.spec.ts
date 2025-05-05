import { TestBed } from '@angular/core/testing';

import { DbAhorcadoService } from './db-ahorcado.service';

describe('DbAhorcadoService', () => {
  let service: DbAhorcadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbAhorcadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
