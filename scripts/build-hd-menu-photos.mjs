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
const destinationDirectory = path.join(root, 'public', 'menu-clean');
const dishes = [
  'golden-crunch', 'sunkissed-bowl', 'creamy-crave', 'ocean-gold',
  'island-harvest', 'creamy-garden-crunch', 'chicken-chickpea-fresh-bowl',
  'herb-harvest', 'muscle-builder', 'iron-plate', 'protein-crunch', 'mass-gainer'
];

// The current 800x600 renders contain visible horizontal seams near their
// bottom edge. Crop those defects at source rather than magnifying them.
// These coordinates apply ONLY to the legacy originals; authentic replacement
// photography at other resolutions is processed without cropping.
const legacySeamCutoffs = {
  'golden-crunch': 543,
  'sunkissed-bowl': 546,
  'creamy-crave': 541,
  'ocean-gold': 590,
  'island-harvest': 594,
  'creamy-garden-crunch': 518,
  'chicken-chickpea-fresh-bowl': 531,
  'herb-harvest': 514,
  'muscle-builder': 508,
  'iron-plate': 513,
  'protein-crunch': 515,
  'mass-gainer': 503
};


await mkdir(destinationDirectory, { recursive: true });
let count = 0;
for (const name of dishes) {
  const src = path.join(sourceDirectory, name + '.webp');
  const dst = path.join(destinationDirectory, name + '.webp');
  await stat(src); // Fail the build if a menu photo has gone missing.
  const metadata = await sharp(src).metadata();
  const legacy = metadata.width === 800 && metadata.height === 600;
  const top = 85;
  const bottom = legacySeamCutoffs[name];
  const cropHeight = bottom - top;
  const cropWidth = Math.round(cropHeight * (4 / 3));
  const pipeline = sharp(src).rotate();
  // Focus on the meal itself. Removing the baked-in divider also prevents
  // the horizontal white strip visible in product cards.
  if (legacy) {
    pipeline.extract({
      left: Math.round((800 - cropWidth) / 2),
      top,
      width: cropWidth,
      height: cropHeight
    });
  }
  const output = await pipeline
    .resize(1920, 1440, {
      fit: 'cover',
      position: 'centre',
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
