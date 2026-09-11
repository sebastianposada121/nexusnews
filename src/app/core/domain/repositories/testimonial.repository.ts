import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import type { Testimonial } from '../models/testimonial';

export interface TestimonialRepository {
  getAll(): Observable<Testimonial[]>;
}

export const TESTIMONIAL_REPOSITORY = new InjectionToken<TestimonialRepository>(
  'TESTIMONIAL_REPOSITORY'
);
