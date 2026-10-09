import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { UiIcon } from '../icon/icon';
import { UiButton, UiButtonVariant } from './button';

const VARIANTS: UiButtonVariant[] = [
  'primary', 'secondary', 'white-accent', 'soft', 'neutral', 'success',
  'danger', 'outline', 'white', 'ghost', 'inverse', 'on-image',
];

const meta: Meta<UiButton> = {
  title: 'Кнопки/Button',
  tags: ['autodocs'],
  component: UiButton,
  decorators: [moduleMetadata({ imports: [UiButton, UiIcon] })],
  parameters: {
    docs: {
      description: {
        component:
          'Кнопка-действие. Figma: **Button / ***, **Button Round / *** (секция Buttons). ' +
          'Одно главное действие на экран — `primary`. Иконка всегда цвета текста. ' +
          'Высота 36 на компьютере, сама становится 44 на экранах уже 768.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: ['desktop', 'mobile', 'big'] },
    shape: { control: 'inline-radio', options: ['rect', 'round'] },
  },
  args: { variant: 'primary', size: 'desktop', shape: 'rect', iconOnly: false, fullWidth: false },
};
export default meta;
type Story = StoryObj<UiButton & { label: string; disabled: boolean }>;

/** Поиграть со свойствами. */
export const Playground: Story = {
  args: { label: 'Скачать', disabled: false },
  render: (args) => ({
    props: args,
    template: `
      <button ui-button [variant]="variant" [size]="size" [shape]="shape" [fullWidth]="fullWidth" [disabled]="disabled">
        <ui-icon name="star" />{{ label }}<ui-icon name="chevron-down" />
      </button>`,
  }),
};

/** Все варианты в четырёх состояниях: Default, Hover, Active, Disabled. */
export const VariantsAndStates: Story = {
  name: 'Варианты и состояния',
  parameters: {
    pseudo: { hover: ['.is-hover'], active: ['.is-active'] },
    controls: { disable: true },
  },
  render: () => ({
    props: { variants: VARIANTS },
    template: `
      <table style="border-collapse: collapse">
        <thead>
          <tr class="text-caption-md" style="color: var(--color-text-subtle); text-align: left">
            <th style="padding: 8px">Вариант</th><th style="padding: 8px">Default</th><th style="padding: 8px">Hover</th>
            <th style="padding: 8px">Active</th><th style="padding: 8px">Disabled</th>
          </tr>
        </thead>
        <tbody>
          @for (v of variants; track v) {
            <tr [style.background]="v === 'inverse' || v === 'on-image' ? 'var(--color-fill-inverse)' : null">
              <th class="text-caption-md" style="padding: 8px; text-align: left; font-weight: 400"
                  [style.color]="v === 'inverse' || v === 'on-image' ? 'var(--color-text-inverse-muted)' : 'var(--color-text-subtle)'">{{ v }}</th>
              <td style="padding: 8px"><button ui-button [variant]="v"><ui-icon name="star" />Текст</button></td>
              <td style="padding: 8px"><button ui-button [variant]="v" class="is-hover"><ui-icon name="star" />Текст</button></td>
              <td style="padding: 8px"><button ui-button [variant]="v" aria-pressed="true"><ui-icon name="star" />Текст</button></td>
              <td style="padding: 8px"><button ui-button [variant]="v" disabled><ui-icon name="star" />Текст</button></td>
            </tr>
          }
        </tbody>
      </table>`,
  }),
};

/** Высота 36 (компьютер), 44 (телефон), 48 (Big, только круглая). */
export const Sizes: Story = {
  name: 'Размеры',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
        <button ui-button>Desktop 36</button>
        <button ui-button size="mobile">Mobile 44</button>
        <button ui-button shape="round">Round 36</button>
        <button ui-button shape="round" size="mobile">Round 44</button>
        <button ui-button shape="round" size="big">Показать ещё</button>
      </div>`,
  }),
};

/** Круглые кнопки: в ките только Primary и Neutral. */
export const Round: Story = {
  name: 'Круглые',
  parameters: { pseudo: { hover: ['.is-hover'] }, controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, max-content); gap: 16px; align-items: center">
        <button ui-button shape="round">Текст</button>
        <button ui-button shape="round" class="is-hover">Текст</button>
        <button ui-button shape="round" aria-pressed="true">Текст</button>
        <button ui-button shape="round" disabled>Текст</button>
        <button ui-button shape="round" variant="neutral">Текст</button>
        <button ui-button shape="round" variant="neutral" class="is-hover">Текст</button>
        <button ui-button shape="round" variant="neutral" aria-pressed="true">Текст</button>
        <button ui-button shape="round" variant="neutral" disabled>Текст</button>
      </div>`,
  }),
};

/** Иконки слева, справа и кнопка только с иконкой. */
export const Icons: Story = {
  name: 'С иконками',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap">
        <button ui-button variant="secondary"><ui-icon name="star" />В избранное</button>
        <button ui-button variant="neutral">Сортировка<ui-icon name="chevron-down" /></button>
        <button ui-button variant="neutral" iconOnly aria-label="Поиск"><ui-icon name="search" /></button>
        <button ui-button variant="outline" iconOnly aria-label="Закрыть"><ui-icon name="close" /></button>
        <button ui-button variant="neutral" iconOnly size="mobile" aria-label="Поиск"><ui-icon name="search" /></button>
      </div>`,
  }),
};

/** Ссылка, оформленная как кнопка, и кнопка во всю ширину. */
export const LinkAndFullWidth: Story = {
  name: 'Ссылка и во всю ширину',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px">
        <a ui-button variant="neutral" href="#">Все модели</a>
        <button ui-button size="mobile" fullWidth>Показать модели</button>
      </div>`,
  }),
};
