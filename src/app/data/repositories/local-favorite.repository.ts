import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import type { FavoriteRepository } from '../../core/domain/repositories/favorite.repository';

const STORAGE_KEY = 'nexus_favorites';

@Injectable()
export class LocalFavoriteRepository implements FavoriteRepository {
  getAll(): Observable<string[]> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return of(Array.isArray(parsed) ? parsed : []);
    } catch {
      return of([]);
    }
  }

  save(ids: string[]): Observable<void> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // almacenamiento no disponible
    }
    return of(undefined);
  }
}