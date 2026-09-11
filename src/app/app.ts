import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './presentation/layout/header/header';
import { Footer } from './presentation/layout/footer/footer';
import { Toast } from './presentation/components/toast/toast';
import { ArticleState } from './presentation/state/article.state';
import { FavoriteState } from './presentation/state/favorite.state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  private readonly articleState = inject(ArticleState);
  private readonly favoriteState = inject(FavoriteState);

  ngOnInit(): void {
    void this.articleState.load();
    void this.favoriteState.load();
  }
}