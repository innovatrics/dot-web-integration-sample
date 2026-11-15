/*
This setup is for mocking canvas for vitest while canvas package is not working with vitest yet
https://github.com/hustcc/jest-canvas-mock/issues/88
*/
// @ts-expect-error mocks
// @ts-nocheck mocks

import { afterAll, vi } from 'vitest';

global.jest = vi;

declare global {
  var jest: typeof vi | undefined;
}

const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap',
] as const;

async function importMockWindow() {
  const getCanvasWindow = await import('jest-canvas-mock/lib/window.js').then(
    (res) => res.default?.default || res.default || res,
  );

  const canvasWindow = getCanvasWindow({ document: window.document });

  apis.forEach((api) => {
    global[api] = canvasWindow[api];
    global.window[api] = canvasWindow[api];
  });
}

importMockWindow();

afterAll(() => {
  delete global.jest;
  delete global.window.jest;
});
