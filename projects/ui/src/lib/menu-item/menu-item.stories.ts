import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { UiCheckbox } from '../checkbox/checkbox';
import { UiIcon } from '../icon/icon';
import { UiMenuItem } from './menu-item';

const meta: Meta<UiMenuItem> = {
  title: 'Навигация/Menu Item',
  tags: ['autodocs'],
  component: UiMenuItem,
  decorators: [moduleMetadata({ imports: [UiMenuItem, UiIcon, UiCheckbox] })],
  parameters: {
    docs: {
      description: {
        component:
          'Пункт меню, выпадающего списка и фильтров. Figma: **Menu Item / Unified**. ' +
          'Размер пункта — его содержимое, подсветка выходит за него: Medium — 12/8 (36 в высоту), Large — 16/12 (44). ' +
          'Шаг между пунктами задаёт список: `.ui-menu-list` — 16, `.ui-menu-list--large` — 24.',
      },
    },
  },
  args: { tone: 'neutral', size: 'medium', selected: false, chevron: false, expanded: false, fill: false },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'accent'] },
    size: { control: 'inline-radio', options: ['medium', 'large'] },
    counter: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<UiMenuItem & { label: string; disabled: boolean }>;

export const Playground: Story = {
  args: { label: 'Кресла', disabled: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 16px">
        <button ui-menu-item [tone]="tone" [size]="size" [selected]="selected" [chevron]="chevron"
                [expanded]="expanded" [counter]="counter" [fill]="fill" [disabled]="disabled">{{ label }}</button>
      </div>`,
  }),
};

/** Neutral и Accent, Medium и Large, во всех состояниях. Hover показан принудительно. */
export const States: Story = {
  name: 'Состояния',
  parameters: { pseudo: { hover: ['.is-hover'] }, controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 140px); row-gap: 40px; padding: 16px 24px">
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Default</span>
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Hover</span>
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Active</span>
        <span class="text-caption-md" style="color: var(--color-text-subtle)">Disabled</span>

        <div><button ui-menu-item>Текст</button></div>
        <div><button ui-menu-item class="is-hover">Текст</button></div>
        <div><button ui-menu-item selected>Текст</button></div>
        <div><button ui-menu-item disabled>Текст</button></div>

        <div><button ui-menu-item tone="accent">Текст</button></div>
        <div><button ui-menu-item tone="accent" class="is-hover">Текст</button></div>
        <div><button ui-menu-item tone="accent" selected>Текст</button></div>
        <div><button ui-menu-item tone="accent" disabled>Текст</button></div>

        <div><button ui-menu-item size="large">Large</button></div>
        <div><button ui-menu-item size="large" class="is-hover">Large</button></div>
        <div><button ui-menu-item size="large" selected>Large</button></div>
        <div><button ui-menu-item size="large" disabled>Large</button></div>
      </div>`,
  }),
};

/** Слоты: флажок, иконка, шеврон, счётчик. Иконки — цвета текста. */
export const Slots: Story = {
  name: 'Слоты',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="ui-menu-list" style="padding: 16px 24px">
        <button ui-menu-item tone="accent"><ui-icon name="star" />С иконкой</button>
        <button ui-menu-item chevron>Свёрнутая группа</button>
        <button ui-menu-item chevron expanded>Раскрытая группа</button>
        <a ui-menu-item href="#" [counter]="12">Со счётчиком</a>
        <label ui-menu-item><ui-checkbox aria-label="Выбрать" />С флажком</label>
      </div>`,
  }),
};

/** Список фильтров каталога: ширина 196 и 136, длинные подписи переносятся. */
export const FilterList: Story = {
  name: 'Список фильтров',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 48px; padding: 16px 24px">
        <nav class="ui-menu-list" style="width: 196px" aria-label="Категории">
          <button ui-menu-item fill chevron expanded>Мебель</button>
          <a ui-menu-item tone="accent" fill href="#" selected>Кресла</a>
          <a ui-menu-item tone="accent" fill href="#">Диваны</a>
          <a ui-menu-item tone="accent" fill href="#">Пуфы и банкетки</a>
          <a ui-menu-item tone="accent" fill href="#">Столы</a>
        </nav>
        <nav class="ui-menu-list" style="width: 136px" aria-label="Категории, узкая колонка">
          <button ui-menu-item fill chevron expanded>Освещение</button>
          <a ui-menu-item tone="accent" fill href="#">Настольные лампы</a>
          <a ui-menu-item tone="accent" fill href="#">Бра и подсветка</a>
        </nav>
        <nav class="ui-menu-list ui-menu-list--large" style="width: 280px" aria-label="Категории на телефоне">
          <button ui-menu-item size="large" fill chevron expanded>Мебель (телефон)</button>
          <a ui-menu-item size="large" tone="accent" fill href="#">Кресла</a>
          <a ui-menu-item size="large" tone="accent" fill href="#">Диваны</a>
        </nav>
      </div>`,
  }),
};
