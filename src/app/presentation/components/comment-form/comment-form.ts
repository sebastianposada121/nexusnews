import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { CommentState } from '../../state/comment.state';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-comment-form',
  imports: [],
  templateUrl: './comment-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentForm {
  readonly articleId = input.required<string>();

  private readonly commentState = inject(CommentState);
  private readonly toast = inject(ToastService);

  protected async publish(input: HTMLTextAreaElement): Promise<void> {
    const text = input.value.trim();
    if (!text) {
      return;
    }
    await this.commentState.add(this.articleId(), text);
    input.value = '';
    this.toast.show('Comentario publicado', 'success');
  }
}