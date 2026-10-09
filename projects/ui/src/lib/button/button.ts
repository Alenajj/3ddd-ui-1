import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, computed, input } from '@angular/core';

export type UiButtonVariant =
  | 'primary'
  | 'secondary'
  | 'white-accent'
  | 'soft'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'inverse'
  | 'on-image'
  | 'white'
  | 'ghost'
  | 'outline';

/** desktop 36 · mobile 44 · big 48 (только с shape="round"). */
export type UiButtonSize = 'desktop' | 'mobile' | 'big';

/**
 * Кнопка-действие (Figma: Button / *, Button Round / *).
 *
 * Ставится атрибутом на `<button>` или `<a>`, чтобы сохранить нативное поведение:
 * ```html
 * <button ui-button variant="primary">Скачать</button>
 * <a ui-button variant="neutral" href="/models">Все модели</a>
 * <button ui-button variant="neutral" iconOnly aria-label="Поиск"><ui-icon name="search" /></button>
 * ```
 * Иконки кладутся внутрь как `<ui-icon>` — они берут цвет текста кнопки.
 * Выбранное состояние (фильтр, переключатель) — атрибут `aria-pressed="true"`.
 */
@Component({
  selector: 'button[ui-button], a[ui-button]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
  },
  template: '<ng-content />',
  styleUrl: '../../styles/components/button.css',
})
export class UiButton {
  readonly variant = input<UiButtonVariant>('primary');
  readonly size = input<UiButtonSize>('desktop');
  /** round — скругление на всю высоту. В ките есть только у primary и neutral. */
  readonly shape = input<'rect' | 'round'>('rect');
  /** Кнопка без текста: только иконка. Обязательно добавьте aria-label. */
  readonly iconOnly = input(false, { transform: booleanAttribute });
  /** Растянуть на всю ширину контейнера. */
  readonly fullWidth = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(() =>
    [
      'ui-button',
      `ui-button--${this.variant()}`,
      this.size() !== 'desktop' ? `ui-button--${this.size()}` : '',
      this.shape() === 'round' ? 'ui-button--round' : '',
      this.iconOnly() ? 'ui-button--icon-only' : '',
      this.fullWidth() ? 'ui-button--full' : '',
      this.size() === 'big' ? 'text-label-xl' : 'text-label-lg',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
