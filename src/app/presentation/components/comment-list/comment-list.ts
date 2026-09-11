import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ArticleComment } from '../../../core/domain/models/article-comment';

@Component({
  selector: 'app-comment-list',
  imports: [],
  templateUrl: './comment-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentList {
  readonly comments = input<ArticleComment[]>([]);
}