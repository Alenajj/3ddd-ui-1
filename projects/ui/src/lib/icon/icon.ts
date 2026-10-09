import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { UI_ICONS, UiIconName } from './icons';

/**
 * Иконка из кита. Рисуется цветом текста родителя (currentColor),
 * поэтому в кнопке, пункте меню и теге она сама меняет цвет вместе с текстом.
 *
 * Без `label` иконка декоративная и скрыта от скринридера.
 */
@Component({
  selector: 'ui-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-icon',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() || null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
  },
  templateUrl: './icon.html',
  styles: `
    :host { display: inline-flex; flex: none; }
    svg { display: block; }
  `,
})
export class UiIcon {
  /** Имя иконки из кита: `star`, `chevron-down`, `close`… */
  readonly name = input<UiIconName>();
  /** Размер в px. По умолчанию 20, как в ките. */
  readonly size = input(20);
  /** Подпись для скринридера, если иконка несёт смысл сама по себе. */
  readonly label = input<string>();

  protected readonly path = computed(() => {
    const name = this.name();
    return name ? UI_ICONS[name] : '';
  });
}
