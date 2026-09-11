import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'danger';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly message = signal<string>('');
  readonly type = signal<ToastType>('info');
  private readonly timeoutId: ReturnType<typeof setTimeout> | undefined;

  show(message: string, type: ToastType = 'info'): void {
    this.message.set(message);
    this.type.set(type);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    setTimeout(() => {
      if (this.message() === message) {
        this.message.set('');
      }
    }, 3500);
  }

  hide(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.message.set('');
  }
}