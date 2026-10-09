import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  HostAttributeToken,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Флажок с подписью или без (Figma: Checkbox, Checkbox / With Label).
 *
 * ```html
 * <ui-checkbox [(checked)]="modern">Современный</ui-checkbox>
 * <ui-checkbox formControlName="agree">Согласен с правилами</ui-checkbox>
 * <ui-checkbox [indeterminate]="some" aria-label="Выбрать все" />
 * ```
 * Внутри — настоящий `<input type="checkbox">`: клавиатура и скринридер работают как обычно.
 * Длинная подпись переносится и выравнивается по первой строке.
 */
@Component({
  selector: 'ui-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UiCheckbox), multi: true }],
  templateUrl: './checkbox.html',
  styleUrl: '../../styles/components/checkbox.css',
})
export class UiCheckbox implements ControlValueAccessor {
  /** Выбран. Двусторонняя привязка: `[(checked)]`. */
  readonly checked = model(false);
  /** Частично выбран (например, «выбрать все», когда выбрана часть). */
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly name = input<string>();
  readonly value = input<string>();
  /** Подпись для скринридера, если видимой подписи нет. */
  readonly ariaLabel = input<string>();
  /** Атрибут aria-label на самом <ui-checkbox> тоже переносится на <input>. */
  private readonly hostAriaLabel = inject(new HostAttributeToken('aria-label'), { optional: true });
  protected readonly inputAriaLabel = computed(() => this.ariaLabel() || this.hostAriaLabel || null);

  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  private onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  protected onToggle(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.checked.set(next);
    this.onChange(next);
  }

  writeValue(value: boolean | null): void {
    this.checked.set(!!value);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
  }
}
