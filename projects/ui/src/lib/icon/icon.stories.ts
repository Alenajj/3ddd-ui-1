import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { UiIcon } from './icon';
import { UI_ICONS, UiIconName } from './icons';

const NAMES = Object.keys(UI_ICONS) as UiIconName[];

const meta: Meta<UiIcon> = {
  title: 'Основы/Icon',
  tags: ['autodocs'],
  component: UiIcon,
  decorators: [moduleMetadata({ imports: [UiIcon] })],
  parameters: {
    docs: {
      description: {
        component:
          'Иконка из кита (Figma: «Иконки кита», Icon / 20 / *). Рисуется цветом текста (`currentColor`), ' +
          'поэтому в кнопке, теге или пункте меню меняет цвет вместе с текстом во всех состояниях. ' +
          'Без `label` иконка декоративная и скрыта от скринридера. Набор пополняется вместе с компонентами.',
      },
    },
  },
  args: { name: 'star', size: 20 },
  argTypes: { name: { control: 'select', options: NAMES }, size: { control: 'inline-radio', options: [16, 20, 24] } },
};
export default meta;
type Story = StoryObj<UiIcon>;

export const Playground: Story = {
  render: (args) => ({ props: args, template: `<ui-icon [name]="name" [size]="size" />` }),
};

/** Все иконки, которые сейчас есть в библиотеке. */
export const All: Story = {
  name: 'Все иконки',
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { names: NAMES },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 24px">
        @for (n of names; track n) {
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 96px">
            <ui-icon [name]="n" />
            <span class="text-caption-md" style="color: var(--color-text-subtle)">{{ n }}</span>
          </div>
        }
      </div>`,
  }),
};

/** Иконка берёт цвет текста вокруг. */
export const Color: Story = {
  name: 'Цвет — от текста',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center">
        <span style="color: var(--color-text-default)"><ui-icon name="star" /></span>
        <span style="color: var(--color-text-accent)"><ui-icon name="star" /></span>
        <span style="color: var(--color-text-muted)"><ui-icon name="star" /></span>
        <span style="color: var(--color-text-disabled)"><ui-icon name="star" /></span>
      </div>`,
  }),
};
