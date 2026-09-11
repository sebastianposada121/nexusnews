import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast {
  protected readonly toast = inject(ToastService);
  protected readonly message = this.toast.message;
  protected readonly type = this.toast.type;

  protected hide(): void {
    this.toast.hide();
  }

  protected toastClass(): string {
    switch (this.type()) {
      case 'success':
        return 'bg-emerald-600';
      case 'danger':
        return 'bg-rose-600';
      default:
        return 'bg-indigo-600';
    }
  }
}