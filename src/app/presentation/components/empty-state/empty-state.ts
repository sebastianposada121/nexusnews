import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyState {
  readonly icon = input<'search' | 'star'>('search');
  readonly title = input.required<string>();
  readonly description = input('');
  readonly actionLabel = input('');
  readonly action = output<void>();
}