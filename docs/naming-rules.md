# Правила имён

Согласовано в сентябре–октябре 2026. Figma: «Кит для ии 2026».

## Компоненты
- Имя — «Семейство / Вариант» на английском: `Button / Primary`, `Menu Item / With Button`, `Popup / Header`.
- Свойства вариантов: **State**, **Size**, **Type** (и Tone, Expanded, где нужно).
- Значения State: **Default / Hover / Active / Disabled** (+ Loading, где есть загрузка). Не Normal, Norm, Pressed.
- Значения Size: **Desktop / Mobile** (или размер по смыслу: Medium / Large, Small / Mobile у полей).
- **Active** — нажато и осталось выбранным (лайкнуто, выбранный таб). В коде `aria-pressed` / `aria-selected`, а не CSS `:active`.
- Части компонента — через «/»: `Comment / Author`, `Comment / Badge`.
- В коде: `ui-<семейство>` + свойство варианта, например `<ui-like-button type="top">`.

## Иконки
- «Icon / размер / Имя»: `Icon / 20 / Chevron Down`, `Icon / 16 / Forum Outline`.
- Размер — сторона квадратной рамки иконки.
- Имя — по рисунку, а не по месту использования: Heart, а не Favorite Header. Вариации — словом в конце: Filled, Outline, Thin, Light, Bold.
- Внутри одноцветной иконки один слой с именем **Union** — от этого имени зависит, сохранится ли цвет при замене иконки.

## Токены
- Коллекции: Color New (примитивы), Color (семантика), Dimension, Number, Typography, Responsive (режимы Desktop / Mobile).
- Семантические цвета — по роли: `color/text/*`, `color/icon/*`, `color/fill/*`, `color/surface/*`, `color/border/*`, `color/bg/*`. Состояния — суффиксами `-hover`, `-active` (не `-pressed`).
- Отступы и скругления — по значению: `space/8`, `space/60`, `radius/24`, `radius/full`. В CSS: `--space-8`, `--radius-full`.
- Адаптивные значения — только в коллекции Responsive; Dimension и Typography — один режим.
- Шкалы примитивов gray и green не меняем: их используют разработчики.

## Текстовые стили
- Группа / размер: `heading/xl`, `body/md`, `body/md-strong`, `label/sm`, `caption/sm`. Полный список — typography.md.
