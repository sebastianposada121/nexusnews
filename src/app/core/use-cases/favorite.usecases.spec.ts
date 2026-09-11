import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { of } from 'rxjs';

import { FAVORITE_REPOSITORY } from '../domain/repositories/favorite.repository';
import { FavoriteUseCases } from './favorite.usecases';

describe('FavoriteUseCases', () => {
  it('agrega, alterna y remueve favoritos de forma inmutable', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FAVORITE_REPOSITORY,
          useValue: { getAll: () => of([]), save: () => of(undefined) }
        }
      ]
    });

    const useCases = TestBed.inject(FavoriteUseCases);

    const withOne = useCases.toggle([], 'art-1');
    expect(withOne).toEqual(['art-1']);

    const withTwo = useCases.toggle(withOne, 'art-2');
    expect(withTwo).toEqual(['art-1', 'art-2']);

    const removed = useCases.toggle(withTwo, 'art-1');
    expect(removed).toEqual(['art-2']);
    expect(removed).not.toBe(withTwo);
  });
});