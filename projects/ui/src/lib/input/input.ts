import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UiIcon } from '../icon/icon';
import { UiIconName } from '../icon/icons';

let nextId = 0;

/**
 * Однострочное поле (Figma: Input).
 *
 * ```html
 * <ui-input label="Почта" placeholder="mail@example.ru" [(value)]="email" />
 * <ui-input label="Название" formControlName="title" hint="До 60 символов" clearable />
 * ```
 * Работает с `[(value)]`, `ngModel` и реактивными формами.
 * Заголовок над полем (label/md), подпись под полем (label/md) — стоит абсолютом и не двигает соседей.
 */
@Component({
  selector: 'ui-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [UiIcon],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UiInput), multi: true }],
  host: { class: 'ui-field' },
  templateUrl: './input.html',
  styleUrl: '../../styles/components/input.css',
})
export class UiInput implements ControlValueAccessor {
  /** Текст в поле. Двусторонняя привязка: `[(value)]`. */
  readonly value = model('');
  /** Заголовок над полем. */
  readonly label = input<string>();
  /** Подпись под полем. При invalid/valid красится в цвет статуса. */
  readonly hint = input<string>();
  readonly placeholder = input('');
  /** small — 36 (сам становится 44 ниже 768), mobile — всегда 44. */
  readonly size = input<'small' | 'mobile'>('small');
  readonly type = input('text');
  /** Иконка слева (например, `search`). */
  readonly icon = input<UiIconName>();
  /** Крестик очистки, когда в поле есть текст. */
  readonly clearable = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly valid = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Только чтение: текст без рамки. */
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly name = input<string>();
  readonly autocomplete = input<string>();
  /** id самого <input>, если нужен свой (например, для внешней ссылки). */
  readonly inputId = input<string>();

  private readonly formDisabled = signal(false);
  private readonly autoId = `ui-input-${nextId++}`;

  protected readonly controlId = computed(() => this.inputId() ?? this.autoId);
  protected readonly hintId = computed(() => `${this.controlId()}-hint`);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly boxClasses = computed(() =>
    [
      'ui-input',
      this.size() === 'mobile' ? 'ui-input--mobile' : '',
      this.value() ? 'ui-input--filled' : '',
      this.invalid() ? 'ui-input--invalid' : this.valid() ? 'ui-input--valid' : '',
      this.isDisabled() ? 'ui-input--disabled' : '',
      this.readonly() ? 'ui-input--readonly' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value.set(next);
    this.onChange(next);
  }

  protected clear(): void {
    this.value.set('');
    this.onChange('');
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
  }
}
