# 3ddd-ui

Библиотека компонентов 3ddd.ru на Angular 22 со Storybook.

- Эталон дизайна — Figma «Кит для ии 2026».
- Токены (цвета, отступы, скругления, шрифты) — CSS-переменные из [3ddd-design-system](../3ddd-design-system), лежат в `projects/ui/src/styles/`.
- Каждый компонент работает и как Angular-компонент, и как CSS-класс без Angular (для старой серверной части сайта: форум, /work).

## Запуск

Нужен Node.js 24.15 или новее.

```bash
npm install
npm run storybook
```

Storybook откроется на http://localhost:6006.

## Команды

| Команда | Что делает |
|---|---|
| `npm run storybook` | Storybook для разработки |
| `npm run build-storybook` | Статичная сборка Storybook в `storybook-static/` |
| `npm run build` | Сборка библиотеки в `dist/ui` |
| `npm test` | Тесты |
| `npm run sync-tokens` | Обновить токены из `../3ddd-design-system/dist/css` |

## Как утверждаем компоненты

1. Пачка из 3–5 компонентов — отдельная ветка и pull request.
2. В PR: компоненты, стили и истории Storybook со всеми вариантами и состояниями.
3. Дизайнер сверяет вид с Figma, разработчик проверяет код. Сливаем после одобрения обоих.

## Структура

```
projects/ui/
  src/lib/<component>/   компонент: .ts, .css, .stories.ts
  src/styles/            токены и текстовые стили (не править вручную)
  .storybook/            настройки Storybook
scripts/sync-tokens.mjs  копирование токенов
```
