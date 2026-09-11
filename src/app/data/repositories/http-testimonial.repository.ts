import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { Testimonial } from '../../core/domain/models/testimonial';
import type { TestimonialRepository } from '../../core/domain/repositories/testimonial.repository';
import { API_BASE_URL } from '../../infrastructure/http/api-base-url';

@Injectable()
export class HttpTestimonialRepository implements TestimonialRepository {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${API_BASE_URL}/testimonials`);
  }
}
