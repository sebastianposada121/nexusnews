import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { ArticleCategory } from '../../../core/domain/models/article';
import { ArticleState } from '../../state/article.state';

@Component({
  selector: 'app-article-form',
  imports: [ReactiveFormsModule],
  templateUrl: './article-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleForm {
  readonly created = output<void>();

  private readonly fb = inject(FormBuilder);
  private readonly articleState = inject(ArticleState);

  protected readonly articleForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    category: ['Tecnología' as ArticleCategory, Validators.required],
    author: ['', Validators.required],
    image: ['', [Validators.required, Validators.pattern('https?://.+')]],
    summary: ['', [Validators.required, Validators.minLength(10)]],
    content: ['', [Validators.required, Validators.minLength(20)]],
    isFeatured: [false]
  });

  protected async submit(): Promise<void> {
    if (this.articleForm.invalid) {
      return;
    }
    const value = this.articleForm.getRawValue();
    const success = await this.articleState.create({
      title: value.title ?? '',
      category: value.category as ArticleCategory,
      author: value.author ?? '',
      image: value.image ?? '',
      summary: value.summary ?? '',
      content: value.content ?? '',
      isFeatured: value.isFeatured ?? false
    });
    if (success) {
      this.articleForm.reset({ category: 'Tecnología' as ArticleCategory, isFeatured: false });
      this.created.emit();
    }
  }
}