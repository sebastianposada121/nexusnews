import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { TestimonialState } from '../../state/testimonial.state';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Testimonials implements OnInit {
  private readonly testimonialState = inject(TestimonialState);

  protected readonly testimonials = this.testimonialState.testimonials;
  protected readonly loading = signal(true);

  ngOnInit(): void {
    void this.testimonialState.load().finally(() => this.loading.set(false));
  }

  protected stars(rating: number): number[] {
    return Array.from({ length: Math.max(0, Math.min(5, rating)) }, (_, i) => i + 1);
  }
}