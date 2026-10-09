import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, computed, input } from '@angular/core';
import { UiIcon } from '../icon/icon';

/**
 * Пункт меню, выпадающего списка и фильтров (Figma: Menu Item / Unified).
 *
 * ```html
 * <nav class="ui-menu-list">
 *   <a ui-menu-item tone="accent" href="/catalog/chairs" [selected]="true" [counter]="12">Кресла</a>
 *   <button ui-menu-item chevron [expanded]="open" (click)="open = !open">Мебель</button>
 * </nav>
 * ```
 * Размер пункта — только его содержимое; подсветка выходит за него (Medium 12/8, Large 16/12).
 * Шаг между пунктами задаёт список: `.ui-menu-list` (16) или `.ui-menu-list--large` (24).
 * Иконку кладите внутрь как `<ui-icon>` перед текстом.
 */
@Component({
  selector: 'button[ui-menu-item], a[ui-menu-item], label[ui-menu-item]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [UiIcon],
  host: {
    '[class]': 'classes()',
    '[attr.aria-current]': 'selected() ? "true" : null',
    '[attr.aria-expanded]': 'chevron() ? (expanded() ? "true" : "false") : null',
  },
  templateUrl: './menu-item.html',
  styleUrl: '../../styles/components/menu-item.css',
})
export class UiMenuItem {
  /** neutral — обычный пункт; accent — синий пункт-ссылка. */
  readonly tone = input<'neutral' | 'accent'>('neutral');
  /** medium — подсветка 36 в высоту; large — 44 (телефон). */
  readonly size = input<'medium' | 'large'>('medium');
  /** Выбранный пункт (Active в ките), ставит aria-current. */
  readonly selected = input(false, { transform: booleanAttribute });
  /** Шеврон справа: вправо, или вниз при expanded. */
  readonly chevron = input(false, { transform: booleanAttribute });
  readonly expanded = input(false, { transform: booleanAttribute });
  /** Число справа (Counter / Big в ките). */
  readonly counter = input<number | string | null>();
  /** Растянуть на ширину списка: шеврон и счётчик уходят вправо. */
  readonly fill = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() =>
    [
      'ui-menu-item',
      `ui-menu-item--${this.tone()}`,
      this.size() === 'large' ? 'ui-menu-item--large' : '',
      this.fill() ? 'ui-menu-item--fill' : '',
      'text-label-lg',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
