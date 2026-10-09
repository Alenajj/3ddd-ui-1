import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { UiInput } from './input';

const meta: Meta<UiInput> = {
  title: 'Поля/Input',
  tags: ['autodocs'],
  component: UiInput,
  decorators: [moduleMetadata({ imports: [UiInput] })],
  parameters: {
    docs: {
      description: {
        component:
          'Однострочное поле. Figma: **Input**. Рамка: пустое — `border/strong`, наведение и фокус — `border/focus`, ' +
          'заполненное — `border/default`, ошибка — `border/danger`, проверено — `border/success`. ' +
          'Введённый текст 16/24 Medium, плейсхолдер 16/24 Regular. Подпись под полем стоит абсолютом — между полями формы `space-32`.',
      },
    },
  },
  args: { label: 'Название модели', placeholder: 'Плейсхолдер', hint: '', size: 'small', clearable: true, invalid: false, valid: false, disabled: false, readonly: false },
  argTypes: { size: { control: 'inline-radio', options: ['small', 'mobile'] } },
};
export default meta;
type Story = StoryObj<UiInput>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 320px">
        <ui-input [label]="label" [placeholder]="placeholder" [hint]="hint" [size]="size" [clearable]="clearable"
                  [invalid]="invalid" [valid]="valid" [disabled]="disabled" [readonly]="readonly" />
      </div>`,
  }),
};

/** Все состояния из кита. Hover показан принудительно. */
export const States: Story = {
  name: 'Состояния',
  parameters: { pseudo: { hover: ['.is-hover .ui-input'], focusWithin: ['.is-focus .ui-input'] }, controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 272px); column-gap: 32px; row-gap: 32px">
        <ui-input label="Default" placeholder="Плейсхолдер" />
        <ui-input label="Hover" placeholder="Плейсхолдер" class="is-hover" />
        <ui-input label="Focus" placeholder="Плейсхолдер" class="is-focus" />
        <ui-input label="Filled" value="123" clearable />
        <ui-input label="Hover Filled" value="123" clearable class="is-hover" />
        <ui-input label="Invalid" value="123" clearable invalid hint="Неверный адрес почты" />
        <ui-input label="Valid" value="123" clearable valid hint="Адрес свободен" />
        <ui-input label="Disabled" value="123" disabled hint="Подпись" />
        <ui-input label="Read Only" value="123" readonly />
        <ui-input label="С иконкой" icon="search" placeholder="Поиск по моделям" />
      </div>`,
  }),
};

/** Small 36 и Mobile 44. Small сам становится 44 на экранах уже 768. */
export const Sizes: Story = {
  name: 'Размеры',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: flex; gap: 32px; align-items: flex-start">
        <div style="width: 272px"><ui-input label="Small 36" value="123" clearable /></div>
        <div style="width: 205px"><ui-input label="Mobile 44" size="mobile" value="123" clearable /></div>
      </div>`,
  }),
};

/** Форма: заголовки над полями, подписи не двигают соседей, шаг между полями space-32. */
export const Form: Story = {
  name: 'В форме',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <form style="display: flex; flex-direction: column; gap: 32px; width: 320px">
        <ui-input label="Электронная почта" type="email" placeholder="mail@example.ru" autocomplete="email" hint="На неё придёт письмо" />
        <ui-input label="Имя" placeholder="Как к вам обращаться" invalid hint="Введите имя" />
        <ui-input label="Город" value="Москва" clearable />
      </form>`,
  }),
};
