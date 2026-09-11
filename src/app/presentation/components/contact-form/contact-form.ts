import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  protected readonly submitted = signal(false);
  protected readonly contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  protected submit(): void {
    if (this.contactForm.invalid) {
      return;
    }
    this.submitted.set(true);
    this.contactForm.reset({ name: '', email: '', subject: '', message: '' });
    this.toast.show('¡Mensaje enviado con éxito!', 'success');
  }

  protected reset(): void {
    this.submitted.set(false);
  }
}