import assert from 'node:assert/strict';
import { test } from 'node:test';
import { animateBowl } from './animateBowl.ts';

test('bowl flight respects reduced motion, missing targets, and cleans up', async () => {
  let reduced = true;
  let appended = 0;
  let removed = 0;
  let bounced = 0;
  let cancelled = false;
  const rect = { left: 20, top: 100, width: 100, height: 100 };
  const image = {
    style: {}, setAttribute() {}, remove() { removed++; },
    animate(frames) {
      assert.equal(frames.length, 3);
      return { finished: cancelled ? Promise.reject(new Error('cancelled')) : Promise.resolve() };
    },
  };
  const source = { getBoundingClientRect: () => rect, cloneNode: () => image };
  const cart = { getBoundingClientRect: () => rect, isConnected: true, animate() { bounced++; } };
  globalThis.window = { innerHeight: 800, matchMedia: () => ({ matches: reduced }) };
  globalThis.requestAnimationFrame = (callback) => callback();
  globalThis.document = { body: { append() { appended++; } } };
  animateBowl(source, () => cart);
  assert.equal(appended, 0);
  reduced = false;
  animateBowl(null, () => cart);
  animateBowl(source, () => null);
  assert.equal(appended, 0);
  animateBowl(source, () => cart);
  await Promise.resolve();
  assert.equal(appended, 1);
  assert.equal(removed, 1);
  assert.equal(bounced, 1);
  cancelled = true;
  animateBowl(source, () => cart);
  await Promise.resolve();
  assert.equal(removed, 2);
  assert.equal(bounced, 1);
});
