import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CATEGORIES } from '../../../core/domain/models/category';
import { ArticleState } from '../../state/article.state';
import { ArticleCard } from '../../components/article-card/article-card';
import { CategoryCard } from '../../components/category-card/category-card';
import { HeroBanner } from '../../components/hero-banner/hero-banner';
import { Testimonials } from '../../components/testimonials/testimonials';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, ArticleCard, CategoryCard, HeroBanner, Testimonials],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  protected readonly articleState = inject(ArticleState);

  protected readonly categories = CATEGORIES;
  protected readonly heroArticles = this.articleState.featuredArticles;
  protected readonly articles = this.articleState.articles;
  protected readonly currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}