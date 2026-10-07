import type { Preview } from '@storybook/angular-vite';
// Токены и текстовые стили — глобально, как на сайте.
import '../src/styles/tokens.css';
import '../src/styles/text-styles.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      options: {
        page: { name: 'Страница', value: 'var(--color-bg-page)' },
        section: { name: 'Секция', value: 'var(--color-bg-section)' },
        inverse: { name: 'Тёмный', value: 'var(--color-fill-inverse)' },
      },
    },
    viewport: {
      options: {
        mobile: { name: 'Телефон 375', styles: { width: '375px', height: '812px' } },
        desktop: { name: 'Компьютер 1440', styles: { width: '1440px', height: '900px' } },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
