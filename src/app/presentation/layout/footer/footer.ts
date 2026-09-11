import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import type { ArticleCategory } from '../../../core/domain/models/article';
import { ArticleState } from '../../state/article.state';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  private readonly articleState = inject(ArticleState);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  protected filterByCategory(category: ArticleCategory): void {
    this.articleState.setCategory(category);
    void this.router.navigate(['/noticias']);
  }

  protected subscribeNewsletter(): void {
    this.toast.show('¡Gracias por suscribirte a nuestro boletín!', 'success');
  }
}