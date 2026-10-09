// Копирует собранные токены и текстовые стили из 3ddd-design-system/dist в библиотеку.
// Источник токенов — Figma «Кит для ии 2026» → 3ddd-design-system (npm run build там).
// Запуск: npm run sync-tokens
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../3ddd-design-system/dist/', import.meta.url));
const dest = fileURLToPath(new URL('../projects/ui/src/styles/', import.meta.url));
// [откуда в dist, куда в projects/ui/src/styles]
const files = [
  ['css/tokens.css', 'tokens.css'],
  ['css/text-styles.css', 'text-styles.css'],
  ['scss/_text-styles.scss', '_text-styles.scss'],
];

if (!existsSync(root)) {
  console.error('Нет папки с токенами: ' + root + '\nСоберите их в 3ddd-design-system: npm run build');
  process.exit(1);
}
mkdirSync(dest, { recursive: true });
for (const [from, to] of files) {
  copyFileSync(root + from, dest + to);
  console.log('→ ' + to);
}
