import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { UiTag } from './tag';

const meta: Meta<UiTag> = {
  title: 'Теги и чипсы/Tag',
  tags: ['autodocs'],
  component: UiTag,
  decorators: [moduleMetadata({ imports: [UiTag] })],
  parameters: {
    docs: {
      description: {
        component:
          'Тег — фильтр или ключевое слово. Figma: **Tag**. Без иконки. Текст label/md-strong (14/16 Medium) на обоих размерах: ' +
          'Desktop 28, поля 6/8; Mobile 36, поля 10/12. ' +
          'Обычный — `fill/tag` и `text/muted`, Hover — `fill/tag-hover`, выбранный (`aria-pressed`) — `fill/tag-active`, текст белый.',
      },
    },
  },
  args: { size: 'desktop' },
  argTypes: { size: { control: 'inline-radio', options: ['desktop', 'mobile'] } },
};
export default meta;
type Story = StoryObj<UiTag & { label: string; pressed: boolean; disabled: boolean }>;

export const Playground: Story = {
  args: { label: 'chelini', pressed: false, disabled: false },
  render: (args) => ({
    props: args,
    template: `<button ui-tag [size]="size" [attr.aria-pressed]="pressed" [disabled]="disabled">{{ label }}</button>`,
  }),
};

/** Состояния Desktop и Mobile. Hover показан принудительно. */
export const States: Story = {
  name: 'Состояния',
  parameters: { pseudo: { hover: ['.is-hover'] }, controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, max-content); gap: 16px; align-items: center">
        <button ui-tag>chelini</button>
        <button ui-tag class="is-hover">chelini</button>
        <button ui-tag aria-pressed="true">chelini</button>
        <button ui-tag disabled>chelini</button>
        <button ui-tag size="mobile">chelini</button>
        <button ui-tag size="mobile" class="is-hover">chelini</button>
        <button ui-tag size="mobile" aria-pressed="true">chelini</button>
        <button ui-tag size="mobile" disabled>chelini</button>
      </div>`,
  }),
};

/** Ряд тегов: на компьютере переносится, на телефоне — одна строка с прокруткой. */
export const Row: Story = {
  name: 'Ряд тегов',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px">
        <div class="ui-tag-row" style="width: 196px">
          <button ui-tag aria-pressed="true">Современный</button>
          <button ui-tag>Лофт</button>
          <button ui-tag>Классика</button>
          <button ui-tag>Сканди</button>
        </div>
        <div class="ui-tag-row ui-tag-row--scroll" style="width: 320px">
          <button ui-tag size="mobile">Современный</button>
          <button ui-tag size="mobile">Лофт</button>
          <button ui-tag size="mobile">Классика</button>
          <button ui-tag size="mobile">Сканди</button>
          <button ui-tag size="mobile">Минимализм</button>
        </div>
      </div>`,
  }),
};
