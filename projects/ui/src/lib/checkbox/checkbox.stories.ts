import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { UiCheckbox } from './checkbox';

const meta: Meta<UiCheckbox> = {
  title: 'Выбор/Checkbox',
  tags: ['autodocs'],
  component: UiCheckbox,
  decorators: [moduleMetadata({ imports: [UiCheckbox] })],
  parameters: {
    docs: {
      description: {
        component:
          'Флажок. Figma: **Checkbox**, **Checkbox / With Label**. Квадрат 20, скругление 6. ' +
          'Пустой — рамка `icon/muted` и подложка `fill/ghost-hover`; Hover — `fill/active` с рамкой `fill/accent-soft-hover`; выбранный — `fill/accent` (blue/400). ' +
          'Подпись 16/20 Medium через 10, длинная переносится.',
      },
    },
  },
  args: { checked: false, indeterminate: false, disabled: false },
};
export default meta;
type Story = StoryObj<UiCheckbox & { label: string }>;

export const Playground: Story = {
  args: { label: 'Современный' },
  render: (args) => ({
    props: args,
    template: `<ui-checkbox [(checked)]="checked" [indeterminate]="indeterminate" [disabled]="disabled">{{ label }}</ui-checkbox>`,
  }),
};

/** Состояния из кита. Hover показан принудительно. */
export const States: Story = {
  name: 'Состояния',
  parameters: { pseudo: { hover: ['.is-hover .ui-checkbox'] }, controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(6, max-content); gap: 8px 32px; align-items: center">
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Default</span>
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Hover</span>
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Checked</span>
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Indeterminate</span>
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Disabled</span>
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Disabled checked*</span>
        <ui-checkbox aria-label="Default" />
        <ui-checkbox aria-label="Hover" class="is-hover" />
        <ui-checkbox aria-label="Checked" [checked]="true" />
        <ui-checkbox aria-label="Indeterminate" indeterminate />
        <ui-checkbox aria-label="Disabled" disabled />
        <ui-checkbox aria-label="Disabled checked" disabled [checked]="true" />
      </div>
      <p class="text-caption-md" style="color: var(--color-text-subtle); margin-top: 16px">* выбранного Disabled в ките нет — нарисован по аналогии.</p>`,
  }),
};

/** С подписью: как в фильтрах каталога, шаг 12. */
export const WithLabel: Story = {
  name: 'С подписью',
  parameters: { pseudo: { hover: ['.is-hover .ui-checkbox'] }, controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 196px">
        <ui-checkbox [checked]="true">Современный</ui-checkbox>
        <ui-checkbox class="is-hover">Классический</ui-checkbox>
        <ui-checkbox>Скандинавский стиль с длинной подписью</ui-checkbox>
        <ui-checkbox disabled>Недоступно</ui-checkbox>
      </div>`,
  }),
};
