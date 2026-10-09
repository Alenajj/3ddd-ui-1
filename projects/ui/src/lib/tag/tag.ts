import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';

/**
 * Тег — переключаемый фильтр или ключевое слово (Figma: Tag).
 *
 * ```html
 * <div class="ui-tag-row">
 *   <button ui-tag [attr.aria-pressed]="loft" (click)="loft = !loft">Лофт</button>
 *   <a ui-tag href="/tags/chelini">chelini</a>
 * </div>
 * ```
 * Выбранный тег — `aria-pressed="true"`. В ките тег без иконки; при необходимости
 * `<ui-icon>` можно поставить перед текстом — он возьмёт цвет текста.
 */
@Component({
  selector: 'button[ui-tag], a[ui-tag]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()' },
  template: '<ng-content />',
  styleUrl: '../../styles/components/tag.css',
})
export class UiTag {
  /** desktop — 28, поля 6/8; mobile — 36, поля 10/12. Текст на обоих — label/md-strong (14/16 Medium). */
  readonly size = input<'desktop' | 'mobile'>('desktop');

  protected readonly classes = computed(() =>
    this.size() === 'mobile' ? 'ui-tag ui-tag--mobile text-label-md-strong' : 'ui-tag text-label-md-strong',
  );
}
