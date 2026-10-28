/**
 * Generate dedicated, high-quality WebP deliverables from the current 12 menu
 * source photographs. Designed to be deterministic and safe to run in CI.
 *
 * IMPORTANT: Upsampling cannot introduce detail missing in the original photo.
 * Replace public/menu source assets with native-resolution shots when available.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, stat } from 'node:fs/promises';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(root, 'public', 'menu');
const destinationDirectory = path.join(root, 'public', 'menu-hd');
const dishes = [
  'golden-crunch', 'sunkissed-bowl', 'creamy-crave', 'ocean-gold',
  'island-harvest', 'creamy-garden-crunch', 'chicken-chickpea-fresh-bowl',
  'herb-harvest', 'muscle-builder', 'iron-plate', 'protein-crunch', 'mass-gainer'
];

await mkdir(destinationDirectory, { recursive: true });
let count = 0;
for (const name of dishes) {
  const src = path.join(sourceDirectory, name + '.webp');
  const dst = path.join(destinationDirectory, name + '.webp');
  await stat(src); // Fail the build if a menu photo has gone missing.
  const output = await sharp(src)
    .rotate()
    .resize(1920, 1440, {
      fit: 'contain',
      background: { r: 251, g: 252, b: 250, alpha: 1 },
      kernel: sharp.kernel.lanczos3
    })
    .modulate({ brightness: 1.025, saturation: 1.045 })
    .sharpen({ sigma: 1.15, m1: 0.25, m2: 1.8 })
    .webp({ quality: 94, effort: 5, smartSubsample: true })
    .toFile(dst);
  if (output.width !== 1920 || output.height !== 1440) {
    throw new Error('Unexpected output dimensions for ' + name);
  }
  count += 1;
  process.stdout.write('Prepared ' + name + ' (1920x1440; ' + Math.round(output.size / 1024) + ' KB)\n');
}
if (count !== 12) throw new Error('Menu photo output incomplete');
console.log('Prepared all ' + count + ' menu photos.');
