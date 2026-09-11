import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import type { Testimonial } from '../../core/domain/models/testimonial';
import { TestimonialUseCases } from '../../core/use-cases/testimonial.usecases';

@Injectable({ providedIn: 'root' })
export class TestimonialState {
  private readonly testimonialUseCases = inject(TestimonialUseCases);

  readonly testimonials = signal<Testimonial[]>([]);
  readonly loading = signal(false);

  async load(): Promise<void> {
    this.loading.set(true);
    try {
      this.testimonials.set(await firstValueFrom(this.testimonialUseCases.getAll()));
    } finally {
      this.loading.set(false);
    }
  }
}