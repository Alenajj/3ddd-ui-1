# 3ddd-ui

Библиотека компонентов 3ddd.ru на Angular 22 со Storybook.

> **Требуется Angular 22.** Компоненты используют сигнальные входы (`input()`, `model()`) и `@if` — на Angular 16 не заработают. Стили (`projects/ui/src/styles/`) — обычный CSS и работают на любой версии и без Angular.

- Эталон дизайна — Figma «Кит для ии 2026».
- Токены (цвета, отступы, скругления, шрифты) — CSS-переменные из [3ddd-design-system](../3ddd-design-system), лежат в `projects/ui/src/styles/`.
- Каждый компонент работает и как Angular-компонент, и как CSS-класс без Angular (для старой серверной части сайта: форум, /work).

## Запуск

Нужен Node.js 24.15 или новее.

```bash
npm install
npm run storybook
```

Storybook откроется на http://localhost:6006 — **только на том компьютере, где запущена команда**. Это режим для разработки: правите код и сразу видите результат.

Чтобы посмотреть компоненты без установки (для согласования), откройте Storybook по ссылке Chromatic — см. следующий раздел.

## Storybook по ссылке (Chromatic)

При каждом обновлении ветки GitHub сам собирает Storybook из её кода и публикует в Chromatic (`.github/workflows/chromatic.yml`). В pull request появляется проверка со ссылкой на Storybook этого PR — то, что по ссылке, и есть код из PR. Ссылка вида `https://<ветка>--<проект>.chromatic.com` всегда показывает последнюю сборку ветки и открывается у любого, кому её отправили. Там же в Chromatic можно оставлять замечания к компонентам и принимать изменения внешнего вида.

## Подключение стилей на сайт

Токены и текстовые стили подключаются **один раз на весь сайт** — в Angular и в старой серверной части одинаково.

Angular (`angular.json` → `styles`):

```json
"styles": [
  "node_modules/@3ddd/ui/src/styles/tokens.css",
  "node_modules/@3ddd/ui/src/styles/text-styles.css"
]
```

Без Angular (форум, /work) — те же два файла через `<link rel="stylesheet">`.

**Текст** — классом в разметке (`<h2 class="text-heading-md">`) или миксином в стилях компонента:

```scss
@use '@3ddd/ui/src/styles/text-styles' as *;
.card__title { @include text-label-lg; }
```

Все 15 стилей, где какой применять и как они выглядят на телефоне — в Storybook, «Основы / Типографика».

## Команды

| Команда | Что делает |
|---|---|
| `npm run storybook` | Storybook для разработки |
| `npm run build-storybook` | Статичная сборка Storybook в `storybook-static/` |
| `npm run build` | Сборка библиотеки в `dist/ui` |
| `npm test` | Тесты |
| `npm run sync-tokens` | Обновить токены и текстовые стили из `../3ddd-design-system/dist` |
| `npm run lint:css` | Проверить, что в стилях компонентов только токены и текстовые стили (без своих размеров шрифта, цветов, времени анимации) |

## Как утверждаем компоненты

1. Пачка из 3–5 компонентов — отдельная ветка и pull request.
2. В PR: компоненты, стили и истории Storybook со всеми вариантами и состояниями.
3. Дизайнер сверяет вид с Figma, разработчик проверяет код. Сливаем после одобрения обоих.

## Структура

```
projects/ui/
  src/lib/<component>/   компонент: .ts (логика и свойства), .html (разметка), .stories.ts (истории)
  src/styles/            токены, текстовые стили и миксины (не править вручную)
  src/styles/components/ стили компонентов (глобальные классы)
  src/docs/              страницы «Основы»: типографика, анимация
  .storybook/            настройки Storybook
scripts/sync-tokens.mjs  копирование токенов
```
