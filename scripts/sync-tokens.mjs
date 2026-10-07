// Копирует собранные токены из 3ddd-design-system/dist/css в библиотеку.
// Источник токенов — Figma «Кит для ии 2026» → 3ddd-design-system (npm run build там).
// Запуск: npm run sync-tokens
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../../3ddd-design-system/dist/css/', import.meta.url));
const dest = fileURLToPath(new URL('../projects/ui/src/styles/', import.meta.url));
const files = ['tokens.css', 'text-styles.css'];

if (!existsSync(src)) {
  console.error('Нет папки с токенами: ' + src + '\nСоберите их в 3ddd-design-system: npm run build');
  process.exit(1);
}
mkdirSync(dest, { recursive: true });
for (const f of files) {
  copyFileSync(src + f, dest + f);
  console.log('→ ' + f);
}
