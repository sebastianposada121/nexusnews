import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface FavoriteRepository {
  getAll(): Observable<string[]>;
  save(ids: string[]): Observable<void>;
}

export const FAVORITE_REPOSITORY = new InjectionToken<FavoriteRepository>('FAVORITE_REPOSITORY');