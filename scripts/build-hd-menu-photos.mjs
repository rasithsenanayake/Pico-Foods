/**
 * Prepare consistently cropped WebP assets from the current 12 menu
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
const destinationDirectory = path.join(root, 'public', 'menu-polished');
const dishes = [
  'golden-crunch', 'sunkissed-bowl', 'creamy-crave', 'ocean-gold',
  'island-harvest', 'creamy-garden-crunch', 'chicken-chickpea-fresh-bowl',
  'herb-harvest', 'muscle-builder', 'iron-plate', 'protein-crunch', 'mass-gainer'
];

// The original 800x600 files contain spliced seams near the top/bottom. Exclude them, without cutting off the food.
const legacySource = { width: 800, height: 600 };
const bowlCrop = { left: 83, top: 58, width: 634, height: 478 };


await mkdir(destinationDirectory, { recursive: true });
let count = 0;
for (const name of dishes) {
  const src = path.join(sourceDirectory, name + '.webp');
  const dst = path.join(destinationDirectory, name + '.webp');
  await stat(src); // Fail the build if a menu photo has gone missing.
  const metadata = await sharp(src).metadata();
  const isLegacy = metadata.width === legacySource.width && metadata.height === legacySource.height;
  const pipeline = sharp(src).rotate();
  if (isLegacy) pipeline.extract(bowlCrop);
  const output = await pipeline
    // Keep processed output near the actual source resolution. Artificially
    // enlarging 634x478 crops to 1600x1200 produced no additional detail.
    // Next/Image creates the final responsive derivatives for each viewport.
    .resize(isLegacy ? 960 : undefined, isLegacy ? 720 : undefined, {
      fit: 'cover',
      position: 'centre',
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: !isLegacy
    })
    .modulate({ brightness: 1.025, saturation: 1.08 })
    .sharpen({ sigma: 1.05, m1: 0.28, m2: 1.4 })
    .webp({ quality: 94, effort: 5, smartSubsample: true })
    .toFile(dst);
  if (!output.width || !output.height || output.width < 600 || output.height < 450) {
    throw new Error('Dish photo was unexpectedly small: ' + name);
  }
  count += 1;
  process.stdout.write('Prepared ' + name + ' (' + output.width + 'x' + output.height + '; ' + Math.round(output.size / 1024) + ' KB)\n');
}
if (count !== 12) throw new Error('Menu photo output incomplete');
console.log('Prepared all ' + count + ' menu photos.');
