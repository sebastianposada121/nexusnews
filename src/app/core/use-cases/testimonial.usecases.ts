import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import type { Testimonial } from '../domain/models/testimonial';
import { TESTIMONIAL_REPOSITORY } from '../domain/repositories/testimonial.repository';

@Injectable({ providedIn: 'root' })
export class TestimonialUseCases {
  private readonly testimonialRepository = inject(TESTIMONIAL_REPOSITORY);

  getAll(): Observable<Testimonial[]> {
    return this.testimonialRepository.getAll();
  }
}
